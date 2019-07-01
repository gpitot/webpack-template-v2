import {
    phases, 
    endpoints
} from './config';
import '../../sass/form.scss';

async function addEntry(url, data) {
    const config = {
        method:'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body : JSON.stringify(data)
    }
    const resp = await fetch(url, config);
    const json = await resp.json();
    console.log(json);
    return json;
}


function getPhase() {
    const currentDate = new Date('07/09/2019');
    

    if (currentDate < phases[0].startDate) return null;

    for (let i=0; i<phases.length - 1; i+=1) {
        if (currentDate >= phases[i].startDate && currentDate < phases[i + 1].startDate) {
            return phases[i];
        }
    }
    //this will send last phase (even if comp end date is past) fix this!
    return phases[phases.length - 1];

}


function validateFields(fields) {
    //validation
    return true;
}

function submitForm(e, fields) {
    e.preventDefault();

    if (validateFields(fields)) {
        const phase = getPhase();
        console.log(phase);
        if (phase) {
            const url = endpoints.url + phase.phase;
            addEntry(url, fields);
        } else {
            //before comp opens
            console.warn('no phase');
        }
    } else {
        //validation error
        console.warn('validation err');
    }
    console.log(fields);
}

function renderForm(parent) {
    const form = document.createElement('form');
    form.classList.add('comp-form');

    const fields = {};

    endpoints.formConfig.forEach(({name, value, type}) => {
        const input = document.createElement('input');
        input.name = name;
        input.type = type;
        input.value = value;
        form.appendChild(input);

        fields[name] = value;
    });


    //submit btn
    const submit = document.createElement('input');
    submit.type = "submit";
    submit.value = "submit";
    form.appendChild(submit);

    form.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            fields[e.target.name] = e.target.checked;
        } else {
            fields[e.target.name] = e.target.value;
        }
        
    });

    form.addEventListener('submit', (e) => {
        submitForm(e, fields);
    });



    parent.appendChild(form);

}




export default renderForm;