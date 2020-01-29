export function validateEmail(email : string) : boolean {
    const regex = /([a-zA-Z0-9\+_.@])+@successive.tech/gm;
    
    const result = regex.test(email);
    
    return result


}
