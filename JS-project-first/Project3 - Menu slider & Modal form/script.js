const toggle = document.getElementById('toggle');
const open = document.getElementById('open');
const modal = document.getElementById('modal');
const close = document.getElementById('close');

toggle.addEventListener('click',()=>{
    // document.body.classList.add('show-nav');  //Add class 'show-nav' on Body section in HTML, When click on the toggle
    document.body.classList.toggle('show-nav');  //Add toggle (It will add class 'Show-nav', Can click for open toggle and click it again for close toggle) on Body section in HTML, When click on the toggle
})

open.addEventListener('click',()=>{
    modal.classList.add('show-modal'); //show modal by click on "Create account button"
})

close.addEventListener('click',()=>{
    modal.classList.remove('show-modal'); //Close modal by click on "X" in top right of modal
})

window.addEventListener('click',e=>e.target == modal ? modal.classList.remove('show-modal') : false);