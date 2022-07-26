const getCurrentTime = () => {
    const currentTime = new Date();

    const yr = currentTime.getFullYear();
    const mm = currentTime.getMonth() + 1;
    const dd = currentTime.getDate();
    const hr = currentTime.getHours();
    const minu = currentTime.getMinutes();
    const sec = currentTime.getSeconds();

    const now = yr + '/' +  mm + '/' + dd + ' ' + hr + ':' + minu 

    return now;
}

export{
    getCurrentTime
}

