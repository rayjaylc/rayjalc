const sidebar = document.getElementById('sidebar')
const toggleBtn = document.querySelector('.toggleBtn')
const menuBtn = document.querySelector('.menu')
const closeBtn = document.querySelector('.close')
const asidebar = document.querySelector('.asidebar')
const requestMeeting = document.querySelector('.callBtn')


console.log(menuBtn,closeBtn,asidebar)
menuBtn.addEventListener('click',()=>{
  asidebar.classList.add('active')
  document.body.classList.add('no-scroll');
})
closeBtn.addEventListener('click',()=>{
  asidebar.classList.remove('active')
  document.body.classList.remove('no-scroll');
})


function closeSidebar() {
  sidebar.classList.toggle('show')
  toggleBtn.classList.toggle('rotate')
}


const trottleBtn = document.querySelector('.trottle')

trottleBtn.addEventListener('click',()=>{
  if(!trottleBtn.classList.contains('dark')) {
    trottleBtn.classList.add('dark')
    trottleBtn.textContent = 'Dark'
    B.classList.add('darkmode')
  } else{
    trottleBtn.classList.remove('dark')
    trottleBtn.textContent = 'Light'
    B.classList.remove('darkmode')
  }

  console.log(B.classList)
})

requestMeeting.addEventListener('click',()=>{
  window.location.href = "/rayjalc/consulting/contact.html#meeting"
})
