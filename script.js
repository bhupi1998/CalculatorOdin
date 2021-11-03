//TODO lots of repetitive code. Need to clear some bugs and then clean the code up
let inputDataValue=null;
let inputClass=null;
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

//used to validate the input
function inputValidate(input){
    const dividerIndex=input.indexOf('!');

}

function inputDecoder(input,valueObj){  // takes in array input from the user, converts it to num1 and num2
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

//Main function below
window.addEventListener('click', function(e){

   inputDataValue=e.srcElement.attributes[0].value; //!Not a good way of doing it.  
   inputClass=e.target.className;   //Capturing this data here and associating it with a variable reduces repetitive code and makes it clearer

   if(!(inputClass === "userInput" ||inputClass === "userOperand"))
       return; //just exit the function..
   if(inputClass === "userOperand"){
    }
    else{ //it's a number. Save it
        numberInput.push(inputDataValue); 
        calcScreen.textContent+=inputDataValue; 
    }
})