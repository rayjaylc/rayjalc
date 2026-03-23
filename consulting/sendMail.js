const submitBtn = document.querySelector('.submit-btn')
console.log(submitBtn)
function consultMail() {
  let params ={
    subject: "Consultation",
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    businessEmail: document.getElementById('email').value,
    businessEmail: document.getElementById('email').value,
    phoneNumber: document.getElementById('phone').value,
    companyName: document.getElementById('company').value,
    ServiceRequired: document.getElementById('service').value,
    Description: document.getElementById('message').value,
  }

  emailjs.send('service_vseoh05','template_yikqjls',params).then(alert('Request successfully sent'))
}