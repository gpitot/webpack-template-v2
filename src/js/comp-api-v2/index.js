import { FORM, PHASES, ENDPOINTS } from "./config";
import submitEmail from '../formstack-email';
import {
    setCookies,
    readCookie
} from '../utils';

import '../../sass/form.scss';



//on submit
//get everything by name under parent element
//match to form
//if not in form, match to customfields
//submit



class CompApi {
    constructor(parent, ) {
        this.parent = parent;
        this.FORM = FORM;
        this.PHASE = this.getCurrentPhase();

        if (this.FORM.googleToken !== undefined && this.parent.querySelector('input[name="googleToken"]')) {
            console.log('google captcha exists')
            window.updateGoogleToken = this.updateGoogleToken;
            window.submitCompForm = this.submit;
        } else {
            this.parent.addEventListener('submit', this.submit);
        }
    }

    async getResults(phase, status=1, sortOrder='ASC', limit=100, offset=0) {
        //https://stash.9msn.net/projects/COMPETITION/repos/competition-api/browse

        const url = ENDPOINTS.entriesUrl + this.PHASE.id;
        try {
            const resp = await fetch(`${url}?status=${status}&sortOrder=${sortOrder}&limit=${limit}&offset=${offset}`);
            const json = await resp.json();
            return json;
        } catch(err) {
            console.warn(err);
            return null;
        }
    }

    updateGoogleToken = token => {
        
        this.parent.querySelector('input[name="googleToken"]').value = token;
        
    }


    getCurrentPhase = () => {
        const currentDate = new Date();
        for (let i=0; i< PHASES.length; i +=1) {
            const {startDate} = PHASES[i];
            if (currentDate < startDate) {
                return PHASES[i-1];
            }
        }
        return PHASES[PHASES.length - 1]
    }


    getRealValue = element => {
        
        if (element.type === 'checkbox') {
            return element.checked;
        }
        return element.value;
    }


    submit = () => {
        //goes through each field in form, matches against parent - then against customFields and sets values
        for (let [field, value] of Object.entries(this.FORM)) {
            const element = this.parent.querySelector(`input[name="${field}"]`);
            if (element) {
                this.FORM[field] = this.getRealValue(element);
            }
            
        }

        //iterate customfields
        this.PHASE.customFields.forEach(field => {
            const element = this.parent.querySelector(`input[name="${field.name}"]`);
            if (element) {
                field.value = this.getRealValue(element);
            }
            
        });

        this.FORM = {
            ...this.FORM,
            customFields : this.PHASE.customFields
        }
        console.log(this.FORM);

        const config = {
            method:'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body : JSON.stringify(this.FORM)
        }
        
        fetch(ENDPOINTS.url + this.PHASE.id, config)
            .then(data => data.json())
            .then(json => {
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
            })
            .catch(err => {
                console.warn(err);
                grecaptcha.reset();
                //this.showError(json.message);
            });
    }

}


export default CompApi;