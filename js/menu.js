const holamm = document.querySelector('.holamm');
const menu = document.querySelector('.menu-navegacion');

//console.log(menu)
//console.log(holamm)

holamm.addEventListener('click', ()=>{
    menu.classList.toggle("spread")
})

window.addEventListener('click', e=>{
    if(menu.classList.contains('spread') && e.target !=menu && e.target != holamm  ){

        menu.classList.toggle("spread")

    }

})