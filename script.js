let numberInput=[];
let mathValues={
    operation:'',
    activation:0,
    num1:0,
    num2:0
};

function inputDecoder(input){  // takes in array input from the user, converts it to num1 and num2
    let num1Array=[];
    let num2Array=[];
    const dividerIndex=input.indexOf('!')
    num1Array=input.slice(0,dividerIndex);
    num2Array=input.slice(dividerIndex+1);

    num1=parseFloat(num1Array.reduce(function(prevVal, currVal){
        return prevVal+currVal;
    },'0'));
    num2=parseFloat(num2Array.reduce(function(prevVal, currVal){
        return prevVal+currVal;
    },'0'));
    console.log(num1);
    console.log(num2);
    
}

window.addEventListener('click', function(e){
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
            inputDecoder(numberInput);
            mathValues.activation=0; //resetting after displaying value
            numberInput=[];//clear array.
        }
        
    }else
        numberInput.push(e.srcElement.attributes[0].value); //!not a good way of doing this. 
                                                        //TODO Carry on for now. Will come back later
    
    
})