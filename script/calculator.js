// Implement here!
const nums = document.getElementById("buttons");
const screen = document.getElementById("screen");

const operators = ['+', '-', '*', '/'];
let latestResult = '0';
let mem = '0';

addButtonEvents();//Adds event listeners to buttons

function updateScreen(div){
   const id = div.dataset.symbol;
   if (screen.innerText.includes('Error') ) {
        screen.innerText = '0';
        latestResult = '0';
        return;
   }
    switch (true) {
        case (id == 'AC'):
            AC();
            break;
        case (id == '='):
            equals();
            break;
        case (id == 'MC'):
            mem = '0';
            break;
        case (id == 'M+'):
            mem = latestResult;
            break;
        case (id == 'MR'):
            screen.innerText = mem;
            break;
        case (id >=0 || id <= 9):
            digit(id);
            break;
        case (operators.includes(id)):
            operator(id, div);
            break;
        case (id == '.'):
            decimal(id, div);
            break;
       default:
            alert("Unhandled input");
            break;
    }
}

function digit(id) {
    if(screen.innerText == '0'){
        screen.innerText = id;
        latestResult = id;
    }else{
        screen.innerText += id;
        latestResult += id;
    }
}

function decimal(id, div) { 
    if (id == '.') {  
        let numOfNums = latestResult.split(/(\+|\-|\*|\/)/);
        let lastNum = numOfNums[numOfNums.length - 1];
    
        let decFound = lastNum.split('.').length;
        if (decFound > 1) {
            return;
        }else if(lastNum.length <= 1  && lastNum == 0 && latestResult.length > 1){
            console.log("here");
            screen.innerText += 0;
            latestResult += '0';
        }
    }
    screen.innerText += div.innerText;
    latestResult += id;
}

function operator(id,div) {
    if(latestResult){
        var length = latestResult.length;
        var lastInput = latestResult.substr(length - 1);
        if(operators.includes(lastInput)){
            latestResult = replaceAt(latestResult, length - 1, id);
            screen.innerText = replaceAt(screen.innerText, length - 1, div.innerText);
        }else{
            screen.innerText += div.innerText;
            latestResult += id;
        }
    }
}

function equals() {
    let result = eval(latestResult);
    result = eval(parseFloat(result).toFixed(10));//Trims decimals
    if (result === Infinity || isNaN(result)) {
        screen.innerText = 'Error';
        latestResult = '0';
    }
    else {
        screen.innerText = result;
        latestResult = '' + result;
    }
}

function AC(){
    screen.innerText = '0';
    latestResult = '0';
}

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

function addButtonEvents() {
    // Loop through the div buttons children and add event listeners to the buttons
    for(let i = 0; i < nums.children.length; i++) {
        const div = nums.children.item(i);

        // Add event listeners to all buttons
        div.addEventListener('click', e => {
            updateScreen(div);
        });
    }    
}
