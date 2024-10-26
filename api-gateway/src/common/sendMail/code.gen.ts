 function generateVerificationCode (){
    let min = 100000;
    let max = 999999;
    let random = Math.floor(min + Math.random() * max).toString();
    return random;
}

export { generateVerificationCode };