// check what the state is of the URL - submitted? 
// how to get query parameter from a URL


// if submitted, display none on first block and show thankyou block

// if state =?close, hide firstblock then 
function checkStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get('state');
    if (state ==='submitted') {
        const thankYouPage = document.querySelector('.block__right--thankyou');
        thankYouPage.style.display = 'block';
        const blockRight = document.querySelector('.block__right');
        blockRight.style.display = 'none';
    } else {
        thankYouPage.style.display = 'none';
        blockRight.style.display = 'block';
    }
}

export default checkStatus;