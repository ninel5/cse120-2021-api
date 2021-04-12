var additionalInfo = document.getElementById("additionalInfo");

var alergiesDescription = document.getElementById('allergiesDescription');

var image1 = 'https://www.tarifinisevdim.com/uploads/others/8619a50a-bd59-43f5-8527-59f87cf0ec6b.Jpeg';

var image2 = 'https://i2.wp.com/www.eatthis.com/wp-content/uploads/2020/07/cooking-with-olive-oil.jpg?resize=640%2C360&ssl=1';

var forCookies = document.getElementById("cookies");
var forBooks = document.getElementById("books");
var forOthers = document.getElementById("others");

var fullData= [];

var fields = {

    owner: "Ninel Grigoryan",
    project:"cooking",
    fname: '',
    eaddress: '',
    birthDate: '',
    startCookingAnswer: '',
    hasFoodAllergies: '',
    allergiesDescription: '',
    dishes: '',
    cooking: '',
    goodcook: '',
    hardestthing: '',
    chocolate: '',
    pans: '',
}

var fieldsBooks = {
  owner: "Ninel Grigoryan",
  project:"books",
  fname: '',
  title: '',
  author: '',
  colour: '',
  bookCover: '',
  numberOfPages: '',
  price: '',
  currency: '',
  language: ''
}

function handleFullNameChange(event) {
  fieldsBooks.fname = event.value;
}

function handleTitleChange(event) {
  fieldsBooks.title = event.value;
}

function handleAuthorChange(event) {
  fieldsBooks.author = event.value;
}

function handlColourChange(event) {
  fieldsBooks.colour = event.value;
}

function handleRadioBookChange(event) {
  fieldsBooks.bookCover = event.value;
}


function handleCurrencyChange(event) {
  fieldsBooks.currency = event.value;
}

function handleNumberOfPagesChange(event) {
  fieldsBooks.numberOfPages = event.value;
}

function handlePriceChange(event) {
  fieldsBooks.price = event.value;
}

function handleLanguageChange(event) {
  fieldsBooks.language = event.value;
}





function handleStartCookingAnswerChange(event) {
  fields.startCookingAnswer = event.value;
}

function handleFullNameChange(event) {
  fields.fname = event.value;
}

function handleEmailChange(event) {
  fields.eaddress = event.value;
}

function handleBirthDateChange(event) {
  fields.birthDate = event.value;
}

function handleStartCookingAnswerChange(event) {
  fields.startCookingAnswer = event.value;
}

function handleRadioChange(event) {
  if (event.value === 'yes') {
    alergiesDescription.style.display = 'block';
  } else {
    alergiesDescription.style.display = 'none';
  }
  fields.hasFoodAllergies = event.value;
}

function handleAllergiesDescriptionChange(event) {
  fields.allergiesDescription = event.value;
}
function handleCookingChange(event) {
  fields.cooking = event.value;
}
function handleGoodCookChange(event) {
  fields.goodcook = event.value;

}
function handleHardestThingChange(event) {
  fields.hardestthing = event.value;
}

function handleChocolateChange(event) {
  fields.chocolate = event.value;
}

function handlePansChange(event) {
  fields.pans = event.value;
}

function handleAdditionalInfoCheckboxChange(event) {
  document.getElementById('additionalInfo').style.display = event.checked ? "block" : "none";
}

function handleDishesChange(event) {
  fields.dishes = event.value;
}

function handleFormSubmit() {
  event.preventDefault();

  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api-ninel.herokuapp.com/data",
    data: fields,
    cache: false,
    dataType: 'json',
    success: function (data) {
     alert("success");
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");
    }
  });
}

function handleFormSubmitBooks() {
  event.preventDefault();

  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api-ninel.herokuapp.com/data",
    data: fieldsBooks,
    cache: false,
    dataType: 'json',
    success: function (data) {
     alert("success");
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");
    }
  });
}

function handleImageClick(element) {
  if (element.src === image1) {
    element.src = image2;
  } else {
    element.src = image1;
  }
}

function newCookie(){
  document.location = "cookingForm.html"
}
function newBook(){
  document.location = "booksForm.html"
}

var cookiesData=[]
  var booksData=[]
  var othersData=[]

function getCookies() {
  
  $.ajax({
    type: "GET",
    url: "https://cse120-2021-api-ninel.herokuapp.com/data",
    dataType: "json",
    success: function (data) {
      fullData=data.data
      for(var item of fullData){
      if(item.owner == "Ninel Grigoryan" && item.project == "cooking"){
        cookiesData.push(item)
      }else if(item.owner == "Ninel Grigoryan" && item.project == "books"){
        booksData.push(item)
      }else{othersData.push(item)}
      }
      renderData(cookiesData,booksData)
    }
  
  ,
    error: function (data) {
      console.log("Error")
    }
  });
  console.log(cookiesData,booksData,othersData)
}

function deleteData(id) {

  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api-ninel.herokuapp.com/data/delete",
    data: {
      id: id,
    },
    cache: false,
    dataType: 'json',
    success: function (data) {
      console.log("success");
      document.getElementById(id).style.display = "none";
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");
    }
  });
}

function getOthersData() {
  document.getElementById('showButton').style.display="none"

  for (let i = 0; i <othersData.length; i++) {
    let currentothersData = othersData[i];
   

    var currentChildOthers = document.createElement('div');
    currentChildOthers.id = currentothersData._id;
    currentChildOthers.classList.add('sectionItem');
    currentChildOthers.innerHTML = '<b> Full Name :  ' + (currentothersData.fname || "-")  + '</b>';
    currentChildOthers.innerHTML += '<b> Title :  ' + (currentothersData.title || "-") + '</b>' ;
  

    forOthers.appendChild(currentChildOthers);
  }
}






function editDataItem() {
    var storage = window.localStorage;
    editUser = JSON.parse(storage.getItem("editItem"))
    document.getElementById("userId").innerHTML += editUser["_id"]
    document.getElementById("fname").value = (editUser["fname"] || "-")
    document.getElementById("email").value = (editUser["eaddress"]  || "-")  
    document.getElementById("birthdate").value = (editUser["birthdate"] || "-")  
    document.getElementById("startcooking").value = (editUser["startCookingAnswer"] || "-")
    document.getElementById("allergies").value = (editUser["allergies"] || "-")
    document.getElementById("allergiesdescription").value = (editUser["allergiesDescription"] || "-")
    document.getElementById("dishes").value = (editUser["dishes"] || "-")
    document.getElementById("cooking").value = (editUser["cooking"] || "-")
    document.getElementById("goodcook").value = (editUser["goodcooks"] || "-") 
    document.getElementById("hardestthing").value = (editUser["hardestThing"] || "-")
    document.getElementById("chocolate").value = (editUser["chocolate"] || "-")
    document.getElementById("pans").value = (editUser["pans"] || "-")
}

function editData(id) {

  
        fullData.forEach(elem => {
        if (elem._id == id) {
            storage = window.localStorage;
            storage.setItem('editItem', JSON.stringify(elem))
            document.location  = "edit.html"}
        }   
    )
}

function saveChanges() {    
    var storage = window.localStorage;
    editItem = JSON.parse(storage.getItem("editItem"))
    editUser = {};
    
    editUser["id"] = editItem["_id"]
    editUser["fname"] = document.getElementById("fname").value
    editUser["eaddress"] = document.getElementById("email").value
    editUser["birthdate"] = document.getElementById("birthdate").value
    editUser["startCookingAnswer"] = document.getElementById("startcooking").value
    editUser["allergies"] = document.getElementById("allergies").value
    editUser["allergiesDescription"]  = document.getElementById("allergiesdescription").value
    editUser["dishes"] = document.getElementById("dishes").value
    editUser["cooking"] = document.getElementById("cooking").value
    editUser["goodcooks"] = document.getElementById("goodcook").value 
    editUser["hardestThing"] = document.getElementById("hardestthing").value
    editUser["chocolate"] = document.getElementById("chocolate").value
    editUser["pans"] = document.getElementById("pans").value
    
    $.ajax({
        type: 'POST',
        url: "https://cse120-2021-api-ninel.herokuapp.com/data/update",
        data: editUser,
        cache: false,
        dataType: 'json',
        success: function (data) {
          console.log("success");
        },
        error: function (xhr) {
          console.error("Error in request", xhr);
        },
        complete: function () {
          console.log("Complete");
        }
      });
} 



function renderData(cookies,books) {
  
  for (let i = 0; i <cookies.length; i++) {
    let currentCookie = cookies[i];

    var currentChild = document.createElement('div');
    currentChild.id = currentCookie._id;
    currentChild.classList.add('sectionItem');

    currentChild.innerHTML += '<b> Full Name :  ' + (currentCookie.fname || "-")  + '</b>';
    currentChild.innerHTML += '<b> Email :  ' + (currentCookie.eaddress || "-") + '</b>' ;
    



    currentChild.innerHTML += '<div class = "changeButtons"> <input type="button" id="button-' +currentCookie._id + '" value="Delete"> <input type="button" id="editButton-' + currentCookie._id + '" value= "Edit"></input>'
   
  


    forCookies.appendChild(currentChild);

    document.getElementById('button-' + currentCookie._id).addEventListener('click', () => {
      deleteData(currentCookie._id);
    });

    document.getElementById('editButton-' + currentCookie._id).addEventListener('click', () => {editData(currentCookie._id)},false);
  

  } 




    for (let i = 0; i <books.length; i++) {
      let currentBook = books[i];
  
      var currentChildBooks = document.createElement('div');
      currentChildBooks.id = currentBook._id;
      currentChildBooks.classList.add('sectionItem');
  
      currentChildBooks.innerHTML += '<b> Full Name :  ' + (currentBook.fname || "-")  + '</b>';
      currentChildBooks.innerHTML += '<b> Email :  ' + (currentBook.title || "-") + '</b>' ;
      
  
  
  
      currentChildBooks.innerHTML += '<div class = "changeButtons"> <input type="button" id="button-' + currentBook._id + '" value="Delete"> <input type="button" id="editButton-' + currentBook._id + '" value= "Edit"></input>'
     
  
      forBooks.appendChild(currentChildBooks);

      document.getElementById('button-' + currentBook._id).addEventListener('click', () => {
        deleteData(currentBook._id);
      });
  
      document.getElementById('editButton-' + currentBook._id).addEventListener('click', () => {editData(currentBook._id )},false);
    
    }

  
}
