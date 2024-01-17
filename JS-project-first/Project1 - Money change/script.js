const currency_one = document.getElementById("currency-one");  /*--Dropdown list1--*/
const currency_two = document.getElementById("currency-two");  /*--Dropdown list2--*/

const amout_one = document.getElementById("amout-one"); /*--Input box1--*/
const amout_two = document.getElementById("amout-two"); /*--Input box2--*/

const rateText = document.getElementById("rate")
const swap = document.getElementById("btn")

currency_one.addEventListener("change",calculateMoney); /*--"Change" That mean, when selected the dropdown list of "currency_one" then will run "calculateMoney" function--*/
currency_two.addEventListener("change",calculateMoney); /*--"Change" That mean, when selected the dropdown list then will run "calculateMoney" function--*/
amout_one.addEventListener("input",calculateMoney);
amout_two.addEventListener("input",calculateMoney);



function calculateMoney() {
    const one = currency_one.value; /*--After run this function then will put the value of "currency_one" to "one" constant--*/
    const two = currency_two.value;
    fetch(`https://api.exchangerate-api.com/v4/latest/${one}`)
    .then(res=>res.json()).then(data=>{
       const rate = data.rates[two];
       rateText.innerText=`1 ${one} = ${rate} ${two}`;
       amout_two.value=(amout_one.value*rate).toFixed(2); /*--.toFixed(2) This mean display 2 decimal--*/
    }) /*--For run API and display to Json--*/
}


swap.addEventListener("click",()=>{
    const temp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculateMoney
})


