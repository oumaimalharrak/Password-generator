const generateBtn =document.getElementById('generate')
const decrementBtn = document.getElementById('decrement')
const incrementBtn = document.getElementById('increment')
const inputLenght = document.getElementById('password-length')
const passwordLs =document.querySelectorAll('.password')

let pwdLenght = 15

// Event Handlers
function lengthCheck(event){
    const number = Math.floor(event.target.value)
    if(number >= 8 && number <=20){
        pwdLenght= number
    }else{
        alert('password lenght must be between 8 and 20')
    }
    event.target.value = pwdLenght
}


function inputStepper(event){
    // decrement & increment buttons
    if(event.target.id === "decrement"){
        inputLenght.stepDown()
        console.log('down  ')

    }
    if(event.target.id === "increment"){
        inputLenght.stepUp()
    }
    pwdLenght = inputLenght.value
}

 async  function copyTextToClipBoard(event){
    // copy text using clipboard API
    const copyText = event.target.textContent
    try{
        await navigator.clipboard.writeText(copyText)
        alert('the password had been copied')
    }catch(err){
        console.log('Something went wrong', err);
    }

}


// Generator function

function generatePassword(){
    const uppercase ="BCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const logograms = "#$%&@^`~"
    const mathsym = "<*+!?="


    let characters = uppercase + lowercase + numbers + logograms + mathsym
    characters = characters.split("")

    let password =""

    for(let i=0 ; i < pwdLenght; i++){
        let randomIndex = Math.floor(Math.random() * characters.length)
        password += characters[randomIndex]
        
    }
    return password
}
 // generate a list of pwd based on the num of element
function generatePasswords(){
    let passwords =[]
    for( let i=0; i< passwordLs.length; i++){
        const password= generatePassword()
        passwords.push(password)
    }
    for(let i=0; i < passwords.length; i++){
        passwordLs[i].textContent= passwords[i]
        // passwordLs[i].classList.remove('hidden')
    }
}




inputLenght.value = pwdLenght
decrementBtn.addEventListener('click', inputStepper)
incrementBtn.addEventListener('click', inputStepper)
inputLenght.addEventListener('blur', lengthCheck)
generateBtn.addEventListener('click', generatePasswords)

passwordLs.forEach(element =>{
    element.addEventListener('click',copyTextToClipBoard)
})

