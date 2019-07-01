
import {
    config,
    FORMSTACKURL
} from './config';


function createInput({type, name, value}) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.value = value;
    return input;
}

function submitEmail(fields) {
    
    
    const form = document.createElement('form');
    form.action = FORMSTACKURL;
    form.method = "post";
    form.enctype = "multipart/form-data";

    config.forEach((inp) => {
        if (inp.value === null) {
            inp.value = fields[inp.field];
        }
        form.appendChild(createInput(inp));
    })


    document.getElementById('parent').appendChild(form);
    form.submit();
    

}


export default submitEmail;
