const popUpMsg = document.querySelector('.js-popUp-msg');
const closePopupBtn = document.querySelector('.js-close-popUp');
const popUpContainer = document.querySelector('.popUp-container');
const subject = document.querySelector('.js-export')




const productDetails ={
  productName: undefined,
  description: undefined,
  productCategory: undefined,
  packagingMaterial: undefined
}

const importerInfo = {
  firstname : undefined,
  lastname : undefined,
  phoneNumber : undefined,
  email : undefined,
  social : undefined,
  pickUpAddress : undefined,
  apartmentNumber : undefined,
  zipCode : undefined
}

const deliveryAddress = {
  firstnameDel : undefined,
  lastnameDel : undefined,
  phoneNumberDel : undefined,
  socialDel : undefined,
  pickUpAddressDel : undefined,
  apartmentNumberDel : undefined,
  zipCodeDel : undefined
}


function setData() {
  productDetails.productName = document.querySelector('.js-p-name').value
  productDetails.description = document.querySelector('.js-p-descrip').value
  // productDetails.fileUpload = document.querySelector('.js-p-name').value
  productDetails.productCategory = document.querySelector('.js-p-category').value
  productDetails.packagingMaterial = document.querySelector('.js-p-material').value
      
  // importer's info
  importerInfo.firstname = document.querySelector('.js-i-firstname').value
  importerInfo.lastname = document.querySelector('.js-i-lastname').value
  importerInfo.phoneNumber = document.querySelector('.js-i-phone').value
  importerInfo.email = document.querySelector('.js-i-email').value
  importerInfo.social = document.querySelector('.js-i-social').value
  importerInfo.pickUpAddress = document.querySelector('.js-i-streetAddress').value 
  importerInfo.apartmentNumber = document.querySelector('.js-i-apartment').value
  importerInfo.zipCode = document.querySelector('.js-i-zipInfo').value

  // delivery address
  deliveryAddress.firstnameDel = document.querySelector('.js-d-firstname').value
  deliveryAddress.lastnameDel = document.querySelector('.js-d-lastname').value
  deliveryAddress.phoneNumberDel = document.querySelector('.js-d-phone').value
  deliveryAddress.socialDel = document.querySelector('.js-d-firstname').value
  deliveryAddress.pickUpAddressDel = document.querySelector('.js-d-streetAddress').value
  deliveryAddress.apartmentNumberDel = document.querySelector('.js-d-apartment').value
  deliveryAddress.zipCodeDel = document.querySelector('.js-d-zipInfo').value
    
}

const productDetArray = Object.keys(productDetails)
const importerInfoArray = Object.keys(importerInfo)
const deliveryAddressArray = Object.keys(deliveryAddress)


function sendMail(){
  let params = {
    subject:subject.value,
    productName,
    description,
    productCategory,
    packagingMaterial,
    firstname,
    lastname,
    phoneNumber,
    email,
    social,
    pickUpAddress,
    apartmentNumber,
    zipCode,
    firstnameDel,
    lastnameDel,
    phoneNumberDel,
    socialDel,
    pickUpAddressDel,
    apartmentNumberDel,
    zipCodeDel
  }

  emails.send("service_vseoh05","template_5l543ib",params).then(alert('request sent successfully'))
}



function checkData() {
  
  messagehtml = '';

  productDetArray.forEach((property) =>{
    

    if(productDetails[property] === ''){
      messagehtml += `<div class="message">Please provide ${property}</div>`
      
    }
  })

  
  importerInfoArray.forEach((property) =>{
    console.log(property === 'social');
    if(property !== 'social' && property !== 'apartmentNumber' && importerInfo[property] === ''){
      messagehtml += `<div class="message">Please provide ${property}</div>`
      
    }
  })



  deliveryAddressArray.forEach((property) =>{
    if(property !== 'social' && property !== 'apartmentNumber' && deliveryAddress[property] === ''){
      messagehtml += `<div class="message">Please provide ${property}</div>`
      
    }
  })


  if(messagehtml !== '') {
    popUpContainer.classList.add('showEmptyField')
    popUpMsg.innerHTML = messagehtml
  } else{
    // requestOrder() will be used in the future
    sendMail()
  }
}

function closePopUP() {
  popUpContainer.classList.remove('showEmptyField')
}

async function requestOrder() {
  try{
    const response = await fetch('https://rayjayshiping.com/order',{
      method:'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        productDetails,
        deliveryAddress,   
        importerInfo
      })
     })


     const order = await response.json()
     console.log(order)

  } catch(err){
    console.log(err)
  }
}


document.querySelector('.js-sub-button').
addEventListener('click',()=>{
  setData()
  checkData()

  
}
)
