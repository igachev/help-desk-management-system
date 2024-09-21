
export function setCookie(name:string,value:string):void {
    let expires = ""
    
        let date = new Date()
        date.setTime(date.getTime() + 7000000);
        expires = "; expires=" + date.toUTCString()
    
    document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/"
}

export function getCookie(name:string):string | null {
    let nameEQ = name + "="
    let ca = document.cookie.split(";")
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while(c.charAt(0) === " ") {
            c = c.substring(1,c.length)
        }
        if(c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length)
        }
    }
    return null;
}

export function removeCookie(name: string): void {
    document.cookie = name + "=; path=/; expires=Tue, 27 Aug 1970 10:32:36 GMT;"
}