const inputSlider= document.querySelector("[data-lengthSlider]")

const lengthDisplay=document.querySelector("[data-lengthNumber]")

const passwordDisplay=document.querySelector("[data-passwordDisplay]")

const copyBtn=document.querySelector("[data-copy]")

const copyMsg=document.querySelector("[data-copyMsg]")

const uppercaseCheck=document.querySelector("#uppercase")

const lowercaseCheck=document.querySelector("#lowercase")

const numbersCheck=document.querySelector("#number")

const symbolCheck=document.querySelector("#symbol")

const indercator=document.querySelector("[data-indecator]")

const generatorBtn=document.querySelector(".generateButton")

const allCheckBox=document.querySelectorAll("input[type=checkbox]")

const symbol= '~`!@#$%^&*()_-+=[]{}|\:;"<,>.?';


let password ="";
let passwordLength=10;
let checkCount="0"


handleSlider()

//set password length

function handleSlider(){
    inputSlider.value=passwordLength
    lengthDisplay.innerText=passwordLength;

}

function setIndecator(color){
    indercator.style.backgroundColor=color;
}



function getRndInteger(min,max){
return Math.floor(Math.random()*(max-min))+min
}


function generateRandomNumber(){
    return getRndInteger(0,10)
}


function  generateLowerCase(){
    return  String.fromCharCode(getRndInteger(97,123));
}




function  generateUpperCase(){
    return  String.fromCharCode(getRndInteger(65,90));
}



function generateSymbol(){
    const randNum=getRndInteger(0,symbol.length)
    return symbol.charAt(randNum)

}

function calcStrength(){
    let hasUpper=false;
    let hasLower=false
    let hasNum=false;
    let hasSym=false;

      if(uppercaseCheck.checked) hasUpper=true;
      if(lowercaseCheck.checked) hasUpper=true;
      if(numberCheck.checked) hasUpper=true;
      if(symbolCheck.checked) hasUpper=true;


      if(hasUpper && hasLower &&(hasNum||hasSym)&& passwordLength>=8){
        setIndecator("#0f0");

}
else if(
    (hasLower||hasUpper)&&(hasNum||hasSym)&&passwordLength>=6
)
{
    setIndecator("#fff0")
}else{
    setIndecator("#f00")
}
}
async function copyContent(){
    try{

    await navigator.clipboard.writeText(passwordDisplay.value);
 copyMsg.innerText="copied"
    }
    catch(e){
        copyMsg.innerText="Failed"
    }
    copyMsg.classList.add("active");


    setTimeout(()=>{
    copyMsg.classList.remove("active");
    },2000);
}

// function shufflePassword(array){

// // fisher method   
//   for( let i=array.length-1; i>0; i--){
//     const j=Math.floor(Math.random()*(i+1))
//     const temp=array[i]
//     array[i]=array[j]
//     array[j]=temp;
//   }
// let str =""
// array.forEach((el)=>(str=+el));
// return str

// }


function shufflePassword(array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }
    let str="";
    array.forEach(el => str += el);
    return str;
}








function  handCheckBoxChange(){
     checkCount=0;
     allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++
        }
     })

     if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider()
     }
}



allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handCheckBoxChange)
});








inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})

generatorBtn.addEventListener('click',()=>{
    // none of the checkbox are sdelected
    if(checkCount<=0)return;
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider()
     }

//  find new pass 
//  remove old pass 
password=""


// let put the stuff mentioned by checkboxes 
// if(uppercaseCheck.checked){
//     password+=generateUpperCase();
// }
// if(lowercaseCheck.checked){
//     password+=generateLowerCase();
// }
// if(numberCheck.checked){
//     password+=generateRandomNumber();
// }
// if(symbolCheck.checked){
//     password+=generateSymbol();
// }


let funcArr=[]
if(uppercaseCheck.checked)
    funcArr.push(generateUpperCase)

if(lowercaseCheck.checked)
    funcArr.push(generateLowerCase)

if(numbersCheck.checked)
    funcArr.push(generateRandomNumber)

if(symbolCheck.checked)
    funcArr.push(generateSymbol)



// compulsory addition 
for(let i=0;i<funcArr.length;i++){
    password+=funcArr[i]();
}

for(let i=0;i<passwordLength-funcArr.length;i++){
    let randIndex=getRndInteger(0,funcArr.length)
    password+= funcArr[randIndex]()
}
// shuffle the password  
password =shufflePassword(Array.from(password));


// show in ui  
passwordDisplay.value=password
calcStrength();


}
)


