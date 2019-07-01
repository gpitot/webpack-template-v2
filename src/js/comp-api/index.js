import submitEmail from '../formstack-email';

import {
    phases, 
    endpoints
} from './config';
import '../../sass/form.scss';


class CompApi {

    constructor(parent) {
        this.parent = parent;

        this.renderForm();
    }

    showError = (error) => {
        const errorEl = this.parent.querySelector('.error');
        if (!errorEl) return;
    
        errorEl.innerText = error;
        errorEl.style.opacity = "1";
        setTimeout(()=> {
            errorEl.style.opacity = "0";
        }, 3000);
    }

    getPhase = () => {
        const currentDate = new Date();
    

        if (currentDate < phases[0].startDate) return {
            success : false,
            message : 'This competition is not yet open'
        };
    
        for (let i=0; i<phases.length - 1; i+=1) {
            if (currentDate >= phases[i].startDate && currentDate < phases[i + 1].startDate) {
                return {
                    success : true,
                    phase : phases[i]
                }
            }
        }
        //this will send last phase (even if comp end date is past) fix this!
        return {
            success : true,
            phase : phases[phases.length - 1]
        }
    }

    validateFields = (data) => {
        const arrData = Object.entries(data);

        for (let i=0; i<arrData.length; i+=1) {
            const [key, value] = arrData[i];
            if (value.length < 1) {
                return {
                    success : false,
                    message : `Please fill in ${key}`
                };
            }
        }
        
        return {
            success : true,
            message : 'valid'
        };
    }

    handleSubmit = (e, fields) => {
        e.preventDefault();

        const validation = this.validateFields(fields);
    
        if (validation.success) {
            const phase = this.getPhase();
            console.log(phase);
            if (phase.success) {
                const url = endpoints.url + phase.phase.phase;
                this.submitEntry(url, fields);
            } else {
                //before comp opens
                console.warn('no phase');
                this.showError(phase.message);
            }
        } else {
            //validation error
            this.showError(validation.message);
        }
        console.log(fields);
    }

    async submitEntry(url, data) {
        console.log(data);
        console.log(url);
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
        if (json.success) {
            submitEmail({
                email : data.email
            });
        } else {
    
        }
        
        return json;
    }

    renderForm = () => {
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
    
    
        //error message
        const error = document.createElement('div');
        error.classList.add('error');
        form.appendChild(error);
    
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
            this.handleSubmit(e, fields);
        });
    
        this.parent.appendChild(form);
    }
}




export default CompApi;