// comp entry
const closeDate = new Date('Aug 10 2019');
let today = new Date();

function checkStatus() {
    // if currentDate is greater than closed date, do same as below
    if (today > closeDate) {
        const blockRight = document.querySelector('.block__right');
        blockRight.style.display = 'none';
        const closePage = document.querySelector('.block__right--closed');
        closePage.style.display = 'block';
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get('state');
    const thankYouPage = document.querySelector('.block__right--thankyou');
    const blockRight = document.querySelector('.block__right');
    if (state === 'submitted') {
        thankYouPage.style.display = 'block';
        blockRight.style.display = 'none';
    } else {
        thankYouPage.style.display = 'none';
        blockRight.style.display = 'block';
    }
}

export default checkStatus;