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
        phase : 40
    },
    {
        startDate : new Date(startCompTime + (weekInSeconds * 2)), 
        phase : 41
    }
];

const endpoints = {
    url : 'https://staging.competition.nine.com.au/enter-phase/',
    entriesUrl: 'https://staging.competition.nine.com.au/entries/',

    formConfig : [
        {
            label : 'First name',
            name : 'firstName',
            value : '',
            type : 'text',
        },
        {
            label : 'Last name',
            name : 'lastName',
            value : '',
            type : 'text'
        },
        {
            label : 'Email',
            name : 'email',
            value : '',
            type : 'email'
        },
        {
            label : 'Phone Number',
            name : 'phone',
            value : '',
            type : 'number'
        },
        {
            label : 'State',
            name : 'state',
            value : '',
            type : 'text'
        },
        {
            label : 'Postcode',
            name : 'postcode',
            value : '',
            type : 'number'
        },
        {
            label : 'Yes, I consent to receive information on Suncorp Products.',
            name : 'newsletter',
            value : '',
            type : 'checkbox'
        },
        {
            label : 'Yes, I am happy for Suncorp to use my above details for marketing and understand I can opt out at any time.',
            name : 'optin',
            value : '',
            type : 'checkbox'
        },


    ]
}


export {
    phases,
    endpoints
}