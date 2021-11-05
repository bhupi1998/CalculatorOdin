let inputDataValue=null;
let inputClass=null;
let dividerIndex=0;
let numberInput=[];
let mathValues={
    operation:'',
    num1:0,
    num2:0,
    result:0,
    nextInput:0
};
const calcScreen= document.querySelector("#display");
const operationScreen= document.querySelector("#operationShow");

function reset(){
    mathValues.num1=0;
    mathValues.num2=0;
    screenUpdate(null,1,0);
    operationScreen.textContent="?";
    numberInput=[];
}
//this is the main math function. It is responsible for calculating and displaying the answer
function mathMain(input,valueObj){
    if(!inputDecoder(input,valueObj) ||mathOperations(valueObj) === "ERROR"){ //if inputDecoder returns a false value then exit the function
        alert("It seems like there is an issue with your input\nMaybe you are dividing by 0?");
        return -1;
    }
    valueObj.result=mathOperations(valueObj); //doing the operation and saving the result.
    screenUpdate(valueObj.result,0,0);
    mathValues.num1=0;
    mathValues.num2=0;
    numberInput=[];
}
//if clear is 1, just clear the screen. If update is 1 then just add onto what is already on the screen. If they are both 0 just print the data in toDisplay
function screenUpdate(toDisplay,clear,update){
    if(clear){
        calcScreen.textContent='0';
    }else if(update){
        calcScreen.textContent+=toDisplay;
    }else
        calcScreen.textContent=toDisplay;
    
}
//this function decodes the input and converts it into proper numbers
function inputDecoder(input,valueObj){  // takes in array input from the user, converts it to num1 and num2
    let num1Array=[];
    let num2Array=[];
    const dividerIndex=input.indexOf('!');
    const divider2Check=input.indexOf('!',dividerIndex+1);
    if(divider2Check != -1 || dividerIndex == -1){ //if another operation is found, it means that there is an issue with the array format. Retuns an error
        //alert("error");
        return -1;
    }
    num1Array=input.slice(0,dividerIndex);
    num2Array=input.slice(dividerIndex+1);
    //conjugating all the array strings and then converting them to a float number.
    if(dividerIndex == 0){ //if the divider index is at 0, it means the user has input nothing. Therefor just assign num one to the prev result.
        valueObj.num1=valueObj.result;
    }else{
        valueObj.num1=parseFloat(num1Array.reduce(function(prevVal, currVal){ //converting array string to one number
            return prevVal+currVal;
        },'0'));
    }

    valueObj.num2=parseFloat(num2Array.reduce(function(prevVal, currVal){
        return prevVal+currVal;
    },'0'));
    return 1;
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
                  if(mathObj.num2==0){
                      //alert("Cannot divide by 0!");
                      reset();
                      toReturn="ERROR";
                  }
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
                mathMain(numberInput,mathValues);
                break;
            default:
                if(dividerIndex == -1){ //if there is no ! present then just add
                    numberInput.push('!');
                    mathValues.nextInput=1; //user is going to input the next number. Clear the display when they do.
                    mathValues.operation=inputDataValue; //save the operation sign
                    operationScreen.textContent=inputDataValue; //update the operation display
                }
                else if(dividerIndex==0){
                    mathMain(numberInput,mathValues);
                    numberInput.push('!');
                    mathValues.nextInput=1; //user is going to input the next number. Clear the display when they do.
                    mathValues.operation=inputDataValue; //save the operation sign
                    operationScreen.textContent=inputDataValue; //update the operation display
                }
                else if(numberInput[dividerIndex+1] == undefined){//update the operant the user wants to use.
                    mathValues.operation=inputDataValue; //update the operation with the latest input
                    operationScreen.textContent=inputDataValue;
                }
                else if(typeof(numberInput[dividerIndex+1])=="string"){ //if ! is present and the next value in the numberInput array is a number the do the math
                    //math time!!!
                    mathMain(numberInput,mathValues);
                    numberInput=[]; //clear the array
                    numberInput.push('!');
                    mathValues.operation=inputDataValue; //save the operation sign
                    operationScreen.textContent=inputDataValue;
                    mathValues.nextInput=1;
                }
        };
    }
    //this bottom part is fine
    else if(inputClass === "userInput"){ //it's a number. Save it.
        if(numberInput.length == 0 || mathValues.nextInput == 1){ //if this is 0, it means that the user did not input anything yet. Therefore, clear it
            screenUpdate("",0,0); //clearing it just replaces everything with 0. Need to pass a null string instead.
            mathValues.nextInput=0;
        }
        numberInput.push(inputDataValue); 
        screenUpdate(inputDataValue,0,1);
    }
    else if(inputClass === "userFunction"){
        switch(inputDataValue){
            case "clear":
                reset();
                break;
            default:
                alert("Selected function does not currently exist.");
        }
    }
    console.log("I just hold the line")
})