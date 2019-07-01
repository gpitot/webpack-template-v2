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
            name : 'firstName',
            value : '',
            type : 'text',
        },
        {
            name : 'email',
            value : '',
            type : 'email'
        },
        {
            name : 'postcode',
            value : '',
            type : 'number'
        },
        {
            name : 'newsletter',
            value : '',
            type : 'checkbox'
        }
    ]
}


export {
    phases,
    endpoints
}