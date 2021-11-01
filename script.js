//TODO lots of repetitive code. Need to clear some bugs and then clean the code up

let numberInput=[];
let mathValues={
    operation:'',
    activation:0,
    num1:0,
    num2:0,
    result:0,
    resultDisplayed:1,
    cleared:0, //used to clear the screen
    prevResult:0 //save previous result to reuse.
};
const calcScreen= document.querySelector("#display");


function inputDecoder(input,valueObj){  // takes in array input from the user, converts it to num1 and num2
    //console.log(`Input is ${input}`);
    //console.log(valueObj);
    let num1Array=[];
    let num2Array=[];
    const dividerIndex=input.indexOf('!')
    num1Array=input.slice(0,dividerIndex);
    num2Array=input.slice(dividerIndex+1);
    //conjugating all the array strings and then converting them to a float number.
    if(dividerIndex == 0){ //if the divider index is at 0, it means the user has input nothing. Therefor just assign num one to the prev result.
        valueObj.num1=valueObj.result;
        //console.log(`divider is at position 0`);
    }else{
    valueObj.num1=parseFloat(num1Array.reduce(function(prevVal, currVal){
        return prevVal+currVal;
    },'0'));
    }
    valueObj.num2=parseFloat(num2Array.reduce(function(prevVal, currVal){
        return prevVal+currVal;
    },'0'));
    
}
function mathOperations(mathObj){
    let toReturn=0; 
    switch (mathObj.operation){
        case '+': toReturn=mathObj.num1 + mathObj.num2; 
            break;
        case '-': toReturn=mathObj.num1 - mathObj.num2; 
            break;
        case '*': toReturn=mathObj.num1 * mathObj.num2; 
            break;
        case '/': toReturn=mathObj.num1 / mathObj.num2; 
            break;
    }
    return toReturn;
}


window.addEventListener('click', function(e){
   // console.log(`User activation: ${mathValues.activation}`);
    if(!(e.target.className === "userInput" ||e.target.className === "userOperand"))
        return; //just exit the function..
    if(e.target.className === "userOperand"){
        if(mathValues.activation!=1){ //is user is pressing an operand for the first time
            mathValues.activation++;
            mathValues.operation=e.srcElement.attributes[0].value;  //!not a good way of doing this. 
                                                                    //TODO Carry on for now. Will come back later
            numberInput.push('!'); // ! used to divide the 2 input numbers
        }else{
            //time to do math and display it!
            inputDecoder(numberInput,mathValues);
            mathValues.activation=0; //resetting since math has been performed
            numberInput=[];//clear array.
            mathValues.result=mathOperations(mathValues);
            calcScreen.textContent=mathValues.result;
            mathValues.cleared=0;
            mathValues.resultDisplayed=1; //means that the result of the operation is displayed.
            //console.log(`result is ${mathValues.result}`);
            if(!numberInput.length && e.srcElement.attributes[0].value != '=' ){ //if the array is empty and the user input a number
                mathValues.operation=e.srcElement.attributes[0].value;  //!not a good way of doing this. 
                //TODO Carry on for now. Will come back later
                numberInput.push('!'); // ! used to divide the 2 input numbers
                mathValues.activation++;
            }
        }
        
    }else{ //it's a number. Save it
        if(mathValues.activation == 1 && mathValues.cleared == 0){ //used to clear screen when inputting 2 numbers. If user has pressed an operation, clear screen and display next input
            calcScreen.textContent="";    
            mathValues.cleared=1;
            }
        if(mathValues.resultDisplayed ==1){
            calcScreen.textContent="";    
            mathValues.resultDisplayed=0;
        }
        numberInput.push(e.srcElement.attributes[0].value); //!not a good way of doing this. 
                                                        //TODO Carry on for now. Will come back later
        calcScreen.textContent+=e.srcElement.attributes[0].value; //!not a good way of doing this. 
    }
    console.log(`User input: ${numberInput}`);
})