// this is the grid mobile sidebar, try and animate in in future verisons
const menuBtn = document.querySelector('.menu')
const closeBtn = document.querySelector('.close')
const mobileSidebar = document.querySelector('.mobile-sidebar')
const iPhone = document.querySelector('.graphics-phone')
const phoneCase = document.querySelector('.graphics-phone-case')

menuBtn.addEventListener('click',()=>{
  mobileSidebar.classList.add('active')
  document.body.classList.add('no-scroll');
})
closeBtn.addEventListener('click',()=>{
  mobileSidebar.classList.remove('active')
  document.body.classList.remove('no-scroll');
})


iPhone.addEventListener('mouseenter',() =>{
  if(phoneCase.classList.contains('upwards')){
    return
  } else{
    phoneCase.classList.add('upwards')
    setTimeout(() => {
      phoneCase.classList.remove('upwards')
      
    }, 3000);
  }
})

// carousel js
const items = document.querySelectorAll('.carousel')
const content = document.querySelectorAll('.start-learn-link')
let itemCount = 0
console.log(items)

function slider() {
  if(itemCount < items.length - 1) {
    items[itemCount].classList.remove('show')
    itemCount += 1
    items[itemCount].classList.add('show')
  } else{
    items[itemCount].classList.remove('show')
    itemCount = 0
    items[itemCount].classList.add('show')
  }

}

let carousel;

carousel = setInterval(slider, 5000)
content.forEach(item =>{
  item.addEventListener('mouseout',()=>{
    carousel = setInterval(slider, 5000)
   
  })
})
content.forEach(item =>{
  item.addEventListener('mouseover',()=>{
    clearInterval(carousel)
  
  })
})