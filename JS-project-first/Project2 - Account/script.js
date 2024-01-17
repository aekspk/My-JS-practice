const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dataTransaction=[
    {id:1,text:"ค่าขนม",amount:-100},
    {id:2,text:"ค่าห้อง",amount:-3000},
    {id:3,text:"เงินเดือน",amount:+18000},
    {id:4,text:"ค่าอาหาร",amount:-500},
    {id:5,text:"ถูกหวย",amount:+20000}


]

let transactions=dataTransaction;

function init() {
    list.innerHTML='';
    transactions.forEach(addDataToList)   //it will loop all object in "transactions" value and display to "addDataToList" function
    calculateMoney();
}

function addDataToList(transactions){
    const symbol = transactions.amount < 0 ?'-':'+';
    const status = transactions.amount < 0 ?'minus':'plus';
    const item=document.createElement('li');
    result = formatNumber(Math.abs(transactions.amount));
    item.classList.add(status);
    item.innerHTML=`${transactions.text}<span>${symbol}${result}</span><button class="delete-btn" onclick="removeData(${transactions.id})">x</button>`; //"Math.abs" this mean change all number value to plus--number
    list.appendChild(item);
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') // it will add "," to number
}

function autoID(){
    return Math.floor(Math.random()*1000000)
}

function calculateMoney(){
    const amounts = transactions.map(transactions=>transactions.amount); //it will map "transactions.amount" to new array
    //Calculate balance (sum all amount)
    const total = amounts.reduce((result,item)=>(result+=item),0).toFixed(2);
    //Calculate income (Filter all plus value for summation)
    const income = amounts.filter(item=>item>0).reduce((result,item)=>(result+=item),0).toFixed(2);
    //Calculate expense (Filter all minus value for summation)
    const expense = (amounts.filter(item=>item<0).reduce((result,item)=>(result+=item),0)*-1).toFixed(2);

    //Display
    balance.innerText=`฿`+formatNumber(total); //Display on balance    
    money_plus.innerText=`฿`+formatNumber(income); //Display on income
    money_minus.innerText=`฿`+formatNumber(expense);; //Display on expense  
}

function removeData(id){
    transactions=transactions.filter(transactions=>transactions.id !==id);
    init();
}

function addTransaction(e) {
    e.preventDefault();//All information in page will not change after call back this function
    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert("กรุณาป้อนข้อมูลให้ครบ")}
    else{
        const data = {
            id:autoID(),
            text:text.value,
            amount:+amount.value  //add"+" for change "string" to number
        }
        transactions.push(data);  //"Push" this mean add "data" to array
        addDataToList(data);
        calculateMoney();
        text.value='';
        amount.value='';
    }    
    

    }

form.addEventListener('submit',addTransaction);

init();











