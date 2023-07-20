
export const API ='https://odinbook.herokuapp.com'

export function setCookie(key, value) {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    document.cookie = `${key}=${value}; path=/;  SameSite=none; Secure; max-age=" 30 * 24 * 60 * 60;`
}
export function eraseCookie(name) {   
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'   
}

export function getCookie(name) {
    const cookie =  document.cookie
    .split(';')
    .find((row) => row.startsWith(name))
    ?.split('=')[1]

    if(name === ' u'){
        if(cookie?.startsWith('j')) {
            return (cookie?.slice(7, 31))
        }
    }
    return cookie
}

export const shuffle = (array) => {
        let currentIndex = array.length
        let randomIndex
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--
            
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
        }

        return array;    
}
