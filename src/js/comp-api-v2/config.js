

const PHASES = [
    {
        startDate : new Date('07/22/2019'),
        id : 44,
        customFields : [
            {
                id : 90,
                type : 'bool',
                value : false,
                name : 'optin'
            }
        ]
    }
];


const ENDPOINTS = {
    url : 'https://staging.competition.nine.com.au/enter-phase/',
    entriesUrl: 'https://staging.competition.nine.com.au/entries/',
    google_site_key : '6LcmPUAUAAAAAMjQoABDjyGQkH46afELBYthy7VH'
}

const FORM = {
    firstName : '',
    lastName : '',
    email : '',
    phone : '',
    state : '',
    postcode : '',
    newsletter : false,
    googleToken : ''
}



export {
    PHASES,
    ENDPOINTS,
    FORM
}