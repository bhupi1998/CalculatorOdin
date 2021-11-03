//TODO lots of repetitive code. Need to clear some bugs and then clean the code up
let inputDataValue=null;
let inputClass=null;
let dividerIndex=0;
let numberInput=[];
let mathValues={
    operation:'',
    num1:0,
    num2:0,
    result:0,
    resultDisplayed:1,
    operationOccurences:0

};
const calcScreen= document.querySelector("#display");



function inputDecoder(input,valueObj){  // takes in array input from the user, converts it to num1 and num2
    let num1Array=[];
    let num2Array=[];
    const dividerIndex=input.indexOf('!');
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

//Main function below
window.addEventListener('click', function(e){

   inputDataValue=e.srcElement.attributes[0].value; //!Not a good way of doing it.  
   inputClass=e.target.className;   //Capturing this data here and associating it with a variable reduces repetitive code and makes it clearer
   dividerIndex=numberInput.indexOf('!'); //finding the index of the first operation. It will be equal to -1 if nothing is found.

   if(!(inputClass === "userInput" || inputClass === "userOperand")) //If the event is not one of the desired classes, ignore it and exit right away. This prevents unecessary calculations
       return; //just exit the function..

   if(inputClass === "userOperand"){
       switch(inputDataValue){
           case '=': //= is not pushed on the input array.
                //check for input integrity.
                //display the result if all good
                break;
            default:
                mathValues.operationOccurences++; //counts how many times an operation other than '=' is pressed
                if(!(mathValues.operationOccurences >1)){ //if it's bigger than one, do not add another ! into the array. Just update the operation value
                    numberInput.push('!');
                }
                mathValues.operation=inputDataValue; //update the operation with the latest input
        };
    }
    
    else if(inputClass === "userInput"){ //it's a number. Save it

        numberInput.push(inputDataValue); 
        calcScreen.textContent+=inputDataValue; 
    }
    console.log(mathValues.operationOccurences);
})