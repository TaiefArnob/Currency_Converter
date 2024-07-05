const baseURL='https://api.currencyapi.com/v3/latest?apikey=cur_live_mnVgh7jrbpaB3zDe1YporjWRQwWi5Cc7MWp47gAT';

const dropDowns=document.querySelectorAll('.dropDown select');

const btn=document.querySelector('form button');

const fromCurr=document.getElementById('fromSelect');

const toCurr=document.getElementById('toSelect');

const msg=document.querySelector('.msg');


for(let select of dropDowns){
    for(currCode in countryList){
        let newOption=document.createElement('option');
        newOption.innerText=currCode;
        newOption.value=currCode;

        if(select.name==='from' && currCode==='USD'){
            newOption.selected='selected';
        }
        else if(select.name==='to' && currCode==='BDT'){
            newOption.selected='selected';
        }
        select.append(newOption);
    }

    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target);
    });
}

function updateFlag(element){
    console.log(element);
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;

    let img=element.parentElement.querySelector('img');

    img.src=newSrc;
}


btn.addEventListener('click',async (evt)=>{
    evt.preventDefault();

    let amount=document.querySelector('.amount input');

    let amtVal=amount.value;
    console.log(amtVal);

    if(amtVal===''||amtVal<1){
        amtVal=1;
        amount.value=1
    }

    console.log(fromCurr.value,toCurr.value);

    const URL=`${baseURL}&currencies=${toCurr.value}&base_currency=${fromCurr.value}`;

    let response = await fetch(URL);
    let data= await response.json();
    
    let rate=data.data[toCurr.value].value;
    
    console.log(rate);

    let finalAmount=amtVal*rate;

    console.log(finalAmount);
    
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
})