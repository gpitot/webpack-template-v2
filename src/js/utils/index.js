



const setCookies= (cookies) => {
    //sets up list of cookies
    for (let i=0; i<cookies.length; i+=1) {
        const [key, val] = cookies[i];
        window.localStorage.setItem(key, val);
    }
}


const readCookie = (key) => {
    return window.localStorage.getItem(key);
}



export {
    setCookies,
    readCookie
}