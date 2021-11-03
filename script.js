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
    resultDisplayed:1
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

   if(!(inputClass === "userInput" || inputClass === "userOperand" || inputClass === "userFunction")) //If the event is not one of the desired classes, ignore it and exit right away. This prevents unecessary calculations
       return; //just exit the function..

   if(inputClass === "userOperand"){
       switch(inputDataValue){
           case '=': 
                //Math time!!!!
                break;
            default:
                if(dividerIndex == -1){ //if there is no ! present then just add
                    numberInput.push('!');
                    mathValues.operation=inputDataValue; //save the operation sign
                }
                else if(numberInput[dividerIndex+1] == undefined){//update the operant the user wants to use.
                    mathValues.operation=inputDataValue; //update the operation with the latest input
                }
                else if(typeof(numberInput[dividerIndex+1])=="string"){ //if ! is present and the next value in the numberInput array is a number the do the math
                    //math time!!!
                    alert("all looks good here");
                }
                console.log(`value of index+1= ${typeof(numberInput[dividerIndex+1])}`);
        };
    }
    //this bottom part is fine
    else if(inputClass === "userInput"){ //it's a number. Save it.
        numberInput.push(inputDataValue); 
        calcScreen.textContent+=inputDataValue; 
    }
    else if(inputClass === "userFunction"){
        switch(inputDataValue){
            case "clear":
                    mathValues.num1=0;
                    mathValues.num2=0;
                    calcScreen.textContent="0"; 
                    numberInput=[];
                break;
            default:
                alert("Selected function does not currently exist.");
        }
    }
})