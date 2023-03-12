const initApp=()=>{
const currentValueElem =document.querySelector('.currentvalue'); //The querySelector() method returns the first element that matches a CSS selector(class).
//To return all matches (not only the first), use the querySelectorAll() instead.
const previousValueElem=document.querySelector('.previousvalue');
let itemArray =[];
const equationArray=[];
let newNumberFlag=false;
const inputButtons=document.querySelectorAll('.number');
inputButtons.forEach(button=>{ //anonomous function
    button.addEventListener('click',(event)=>{
            const newInput=event.target.textContent;
            if(newNumberFlag)
            {
                currentValueElem.value=newInput;
                newNumberFlag=false;
            }
            else
            {
              currentValueElem.value= currentValueElem.value == 0 ? newInput :`${currentValueElem.value}${newInput}`;//concatinate using ternary operation
               
            }
    });
});
/***********************operators****************************************/
const opButtons=document.querySelectorAll('.operator');
opButtons.forEach(button=>{
button.addEventListener('click',(event)=>{
  //equal sign showing
  if(newNumberFlag)
  {
    previousValueElem.textContent="";
    itemArray=[];
  }
   const newOperator=event.target.textContent;
   const currentVal=parseFloat(currentValueElem.value);

   //need number first
   if(!itemArray.length && currentVal==0) return;

   //begin new equation
   if(!itemArray.length)
   {
    itemArray.push(currentVal,newOperator);
    previousValueElem.textContent=`${currentVal} ${newOperator}`;
    return newNumberFlag=true; 
   }
   //complete equation
   if(itemArray.length)
   {
    itemArray.push(currentVal); //3rd element in the array
    const equationObj ={ //creating a object
      num1: parseFloat(itemArray[0]),
      num2: parseFloat(currentVal),
      op:itemArray[1]
    }
    equationArray.push(equationObj);
    const equationString =`${equationObj['num1']} ${equationObj['op']} ${equationObj['num2']}`;//creating the equation as a string
    const newValue=calculate(equationString,currentValueElem);//helper function
    previousValueElem.textContent=`${newValue} ${newOperator}`;
    
    //start new equation
    itemArray=[newValue ,newOperator];
    newNumberFlag=true;
    console.log(equationArray);
   }
});
});
/**************************equals button*******************************/
const equalsButton=document.querySelector('.equals');
equalsButton.addEventListener('click',()=>{
const currentVal=parseFloat(currentValueElem.value);
let equationObj;
//pressing equals repeatedly
if(!itemArray.length && equationArray.length)
{
  const lastEquation=equationArray[equationArray.length-1];
  equationObj={
    num1:currentVal,
    num2:lastEquation.num2,
    op:lastEquation.op
  }
}
else if(!itemArray.length)
{
  return currentVal;
}
else{
  itemArray.push(currentVal);
  equationObj={
    num1:parseFloat(itemArray[0]),
    num2:parseFloat(currentVal),
    op:itemArray[1]
  }
}
 equationArray.push(equationObj);
 const equationString =`${equationObj['num1']} ${equationObj['op']} ${equationObj['num2']}`;
 calculate(equationString,currentValueElem);
 previousValueElem.textContent=`${equationString} =`;
 newNumberFlag=true;
 itemArray=[];
 console.log(equationArray);
});

/******************************clear and clear all button ****************/
const clearButtons=document.querySelectorAll('.clear,.clearEntry');
clearButtons.forEach(button=>{
  button.addEventListener('click',(event)=>{
    currentValueElem.value=0;
    if(event.target.classList.contains('clear')){
      previousValueElem.textContent='';
      itemArray=[];
    }
  });
});
/******************************detele button functionality*****************/
  const deleteButton=document.querySelector('.delete');
  deleteButton.addEventListener('click',()=>{
      currentValueElem.value=currentValueElem.value.slice(0,-1);//choose everything from 0 th index till the last before index.last index is sliced
  });
/*************************************sign change button**************/
const signChangeButton=document.querySelector('.signChange');
signChangeButton.addEventListener('click',()=>{
  currentValueElem.value=parseFloat(currentValueElem.value)*-1;//parse float is used to convert the value into a number
});
}


document.addEventListener("DOMContentLoaded",initApp); //on loading the function is called
/******************calculate helper function********************************/
const calculate=(equation,currentValueElem)=>{
  const regex=/(^[*/=])|(\s)/g;
  equation.replace(regex,'');
  const divByZero=/(\/0)/.test(equation); //testing our equation with this regex pattern
  if(divByZero) return currentValueElem.value=0;
  return currentValueElem.value=eval(equation); //inbuilt function which takes a string as input and does the maths evaluation
}