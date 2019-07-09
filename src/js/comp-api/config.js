const weekInSeconds = 7 * 24 * 60 * 60 * 1000;

const startComp = new Date('07/01/2019');//current
const startCompTime = startComp.getTime();

const phases = [
    {
        startDate : new Date(startCompTime), 
        phase : 39
    },
    {
        startDate : new Date(startCompTime + (weekInSeconds * 1)), 
        phase : 42
    },
    {
        startDate : new Date(startCompTime + (weekInSeconds * 2)), 
        phase : 42
    }
];

const endpoints = {
    url : 'https://staging.competition.nine.com.au/enter-phase/',
    entriesUrl: 'https://staging.competition.nine.com.au/entries/',
}


const form = {
    firstName : {
        label : 'First name',
        value : '',
        inputType : 'text'
    },
    lastName : {
        label : 'Last name',
        value : '',
        inputType : 'text'
    },
    email : {
        label : 'Email',
        value : '',
        inputType : 'text'
    },
    phone : {
        label : 'Phone Number',
        value : '',
        inputType : 'number'
    },
    state : {
        label : 'State',
        value : '',
        inputType : 'text'
    },
    postcode : {
        label : 'Postcode',
        value : '',
        inputType : 'number'
    },
    newsletter : {
        label : 'Yes, I consent to receive information on Suncorp Products.',
        value : '',
        inputType : 'checkbox'
    },
    customFields : [
        {
            id :87,
            type : 'bool',
            label : 'Yes, I am happy for Suncorp to use my above details for marketing and understand I can opt out at any time.',
            name : 'optin',
            value : '',
            inputType : 'checkbox',
            customClass : 'optin-row',
        }
    ]
}
    


export {
    phases,
    endpoints,
    form
}