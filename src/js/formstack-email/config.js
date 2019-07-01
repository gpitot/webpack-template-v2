/*
create formstack form
go to live form
find these hidden input fields
and the email field
*/

const FORMSTACKURL = 'https://ninedigital.formstack.com/forms/index.php';



const config = [
    {
        name : 'form',
        value : 3504405,
        type : 'hidden'
    },
    {
        name : 'viewkey',
        value : 'gaB4El2yqh',
        type : 'hidden'
    },
    {
        name : '_submit',
        value : '1',
        type : 'hidden'
    },
    {
        name : 'field79393676', //EMAIL field,
        field : 'email',
        value : null,
        type : 'text'
    }
]

export {
    config,
    FORMSTACKURL

};