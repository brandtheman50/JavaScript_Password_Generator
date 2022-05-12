const number_char ="1234567890";
const lowercase_char ="abcdefghijklmnopqrstuvwxyz";
const uppercase_char ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const symbol_char ="!@#$%&?";
const ambiguous_char ="^*(){}[]/\<>.,;:'\"";
function generate() {
    const number = document.getElementById("number").checked;
    const uppercase = document.getElementById("uppercase").checked;
    const symbol = document.getElementById("symbol").checked;
    const lowercase = document.getElementById("lowercase").checked;
    const amb_char = document.getElementById("amb_char").checked;
    const length = document.getElementById("length").value;
    var checkedElements = [number, uppercase, symbol, lowercase, amb_char];
    if (length > 127 || length < 8) {
        window.alert("Your password length must be a minimum of 8 and a maximum of 127 characters.")
        return;
    }
    if (checkedElements.every(element => element === false)) {
        window.alert("You must at least check one of the boxes.");
        return;
    }
    let password = checkedRequirements(checkedElements);
    document.getElementById("new_password").value = password;
    console.log(document.getElementById("newPassowrd").value)
}

function checkedRequirements(checkedElements) {
    const allStrings = [number_char, uppercase_char, lowercase_char, symbol_char, ambiguous_char];
    var checkedChars = [];
    var checkedConditions = [];
    for (let i=0; i<checkedElements.length; ++i) {
        if (checkedElements[i]) {
            checkedChars.push(allStrings[i]);
            checkedElements[i] = false;
            checkedConditions.push(checkedElements[i]);
        }
    }
    
    return randomPassword(checkedConditions, checkedChars);
}

function randomPassword(checkedConditions, checkedChars) {
    var tempConditions = checkedConditions.slice();
    var passwordLength = document.getElementById("length").value;
    let newPassword = "";
    for (let i=0; i<passwordLength; ++i) {
        let x = Math.floor(Math.random() * (checkedConditions.length));
        let y = Math.floor(Math.random() * (checkedChars[x].length));
        let character = checkedChars[x].charAt(y);
        newPassword += character;
        checkedConditions[x] = true;
        console.log(checkedConditions + " " + newPassword);
    }
    if (!checkedConditions.every(element => element === true)) {
        console.log("Temp : " + tempConditions);
        newPassword = randomPassword(tempConditions, checkedChars);
    }
    return newPassword;
}

function copyText() {
    var text = document.getElementById("new_password");

    text.select();
    text.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(text.value);

    alert("Copied the text: " + text.value);
}
