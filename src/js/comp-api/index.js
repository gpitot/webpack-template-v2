import submitEmail from '../formstack-email';

import {
    phases, 
    endpoints,
    form
} from './config';

import {
    setCookies,
    readCookie
} from '../utils';

import '../../sass/form.scss';


class CompApi {

    constructor(parent) {
        this.parent = parent;
        this.form = form;
    }


    async getResults(phase, status=1, sortOrder='ASC', limit=100, offset=0) {
        //https://stash.9msn.net/projects/COMPETITION/repos/competition-api/browse

        const url = endpoints.entriesUrl + phase;
        try {
            const resp = await fetch(`${url}?status=${status}&sortOrder=${sortOrder}&limit=${limit}&offset=${offset}`);
            const json = await resp.json();
            return json;
        } catch(err) {
            console.warn(err);
            return null;
        }
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

    validateFields = () => {
        
        
        return {
            success : true,
            message : 'valid'
        };
    }

    convertToCorrectFormat = () => {
        //convert this.form to data for api
        const data = {
            customFields : []
        };
        for (let [key, obj] of Object.entries(this.form)) {
            if (key !== 'customFields') {
                data[key] = obj.value;
            } else {

                for (let i=0; i<obj.length; i+=1) {
                    const {
                        id,
                        type,
                        value
                    } = obj[i];

                    data.customFields.push({
                        id,
                        type,
                        value 
                    });
                }
                
            } 
        }

        return data;
    }

    handleSubmit = token => {
        this.form.googleToken.value = token;
        
        const validation = this.validateFields();
    
        if (validation.success) {
            const phase = this.getPhase();
            console.log(phase);
            if (phase.success) {
                const url = endpoints.url + phase.phase.phase;

                const data = this.convertToCorrectFormat();
                this.submitEntry(url, data);
            } else {
                //before comp opens
                console.warn('no phase');
                this.showError(phase.message);
            }
        } else {
            //validation error
            this.showError(validation.message);
        }
    }

    async submitEntry(url, data) {
        console.log(data);
        const config = {
            method:'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body : JSON.stringify(data)
        }
        console.log(url);
        
        
        
        
        const resp = await fetch(url, config);
        const json = await resp.json();
        console.log(json);
        if (json.success) {

            //set up cookies for on submission message based on form data
            // setCookies([
            //     ['optin' , true,],
            //     ['name' , 'name',]
            // ])

            // submitEmail({
            //     email : data.email
            // });
        } else {
            grecaptcha.reset();
            this.showError(json.message);
        }
        
        return json;
    }


    handleChange = e => {
        let val;
        if (e.target.type === 'checkbox') {
            val = e.target.checked;
        } else {
            val = e.target.value;
        }
        if (this.form[e.target.name] === undefined) {
            //custom field
            for (let i=0; i<this.form.customFields.length; i+=1) {
                const custom = this.form.customFields[i];
                if (custom.name === e.target.name) {
                    custom.value = val;
                }
            }
        } else {
            this.form[e.target.name].value = val;
        }
    }

    renderForm = () => {
        const form = document.createElement('form');
        form.classList.add('comp-form');
    
        

        const createInput = ({parent, name, value, inputType}) => {
            if (!inputType) return;
            const input = document.createElement('input');
            input.name = name;
            input.type = inputType;
            input.value = value;
            parent.appendChild(input);
        }

        const createLabel = ({parent, label}) => {
            if (!label) return;
            const labelEl = document.createElement('label');
            labelEl.innerText = label;
            parent.appendChild(labelEl);
        }

        const createParent = ({customClass, label=null, name, value, inputType=null}) => {
            const parent = document.createElement('div');

            if (inputType !== 'hidden') {
                parent.classList.add('form-item');
            }
            

            if (customClass) {
                parent.classList.add(customClass);
            }
           
            createLabel({parent, label});
            createInput({parent, name, value, inputType});

            
            form.appendChild(parent);
        }

        for (let [key, obj] of Object.entries(this.form)) {
            if (key !== 'customFields') {
                //standard key
                const {
                    label,
                    value,
                    inputType,
                    customClass=null,
                } = obj;
                const name = key;
                createParent({customClass, label, name, value, inputType});

            } else {
                for (let i=0; i<obj.length; i+=1) {
                    //custom fields;
                    const {
                        label,
                        value,
                        inputType,
                        customClass=null,
                        name
                    } = obj[i];
                    createParent({customClass, label, name, value, inputType});
                }
            }
        }
        

       
    
        //error message
        const error = document.createElement('div');
        error.classList.add('error');
        form.appendChild(error);
    
       
        const submit = document.createElement('input');
        submit.type = "submit";
        submit.value = "submit";
        submit.classList.add('g-recaptcha');
        submit.setAttribute('data-sitekey', endpoints.google_site_key);
        submit.setAttribute('data-callback', 'onSubmit');
       
        form.appendChild(submit);

        window.handleSubmit = this.handleSubmit;

        form.addEventListener('change', this.handleChange);
        form.addEventListener('submit', this.handleSubmit);
        
        this.parent.appendChild(form);
    }
}




export default CompApi;