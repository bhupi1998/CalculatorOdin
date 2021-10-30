let numberInput=[];
let operand={
    operation:"",
    activation:0
};
window.addEventListener('click', function(e){
    if(!(e.target.className === "userInput" ||e.target.className === "userOperand"))
        return; //just exit the function..
    numberInput.push(e.srcElement.attributes[0].value); //!not a good way of doing this. 
                                                        //TODO Carry on for now. Will come back later
    console.table(numberInput);
    
})