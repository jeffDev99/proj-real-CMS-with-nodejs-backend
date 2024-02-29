const $ = document;
const firstNameInput = $.querySelector("#firstName-input");
const lastNameInput = $.querySelector("#lastName-input");
const usernameInput = $.querySelector("#username-input");
const submitFormBtn = $.querySelector(".submit-form-btn");
const firstNameMessage = $.querySelector("#firstName-message");
const lastNameMessage = $.querySelector("#lastName-message");
const usernameMessage = $.querySelector("#username-message");
let [firstNameValid, lastNameValid, usernameValid] = [null, null, null];
// check user login or not
window.addEventListener("load", e=>{
  let adminId = localStorage.getItem("adminID")
  if (!adminId) {
    location.href="./login.html"
  }else{
    showMainAdminInfoIntoPanel(adminId) 
  }
});
// sign out btn
const signOutBtn = $.querySelector(".sign-out-btn");
signOutBtn.addEventListener("click",e=>{
  localStorage.removeItem("adminID")
  location.href = "./login.html"
})

function showMainAdminInfoIntoPanel(id) {
  const AICUserName = $.querySelectorAll(".admin-id");
  const AICEmail = $.querySelectorAll(".admin-email");
  const AICName = $.querySelector(".admin-name");
  const AICLastName = $.querySelector(".admin-lastName");
  fetch(`http://localhost:3000/api/admins/${id}`)
    .then((res) => res.json())
    .then((mainAdmin) => {
      AICName.innerHTML = mainAdmin.firstName;
      AICLastName.innerHTML = mainAdmin.lastName;
      AICUserName.forEach(item=>{
        item.innerHTML = mainAdmin.userName
      })
      AICEmail.forEach(item=>{
        item.innerHTML = mainAdmin.email
      })
      document.title = `panel - ${mainAdmin.firstName} ${mainAdmin.lastName}`
      AICEmail.innerHTML = mainAdmin.email;
    });
}
// validation
firstNameInput.addEventListener("keyup", (e) => {
  if (firstNameInput.value && firstNameInput.value.length < 3) {
    firstNameMessage.innerHTML = "first name is not valid";
    firstNameMessage.classList.remove("valid-message");
    firstNameMessage.classList.add("invalid-message");
    firstNameValid = false;
  } else {
    firstNameMessage.innerHTML = "first name is valid";
    firstNameMessage.classList.remove("invalid-message");
    firstNameMessage.classList.add("valid-message");
    firstNameValid = true;
  }
});
lastNameInput.addEventListener("keyup", (e) => {
  if (lastNameInput.value && lastNameInput.value.length < 3) {
    lastNameMessage.innerHTML = "last name is not valid";
    lastNameMessage.classList.remove("valid-message");
    lastNameMessage.classList.add("invalid-message");
    lastNameValid = false;
  } else {
    lastNameMessage.innerHTML = "last name is valid";
    lastNameMessage.classList.remove("invalid-message");
    lastNameMessage.classList.add("valid-message");
    lastNameValid = true;
  }
});
usernameInput.addEventListener("keyup", (e) => {
  if (usernameInput.value && usernameInput.value.length < 8) {
    usernameMessage.innerHTML = "user name is not valid";
    usernameMessage.classList.remove("valid-message");
    usernameMessage.classList.add("invalid-message");
    usernameValid = false;
  } else {
    usernameMessage.innerHTML = "user name is valid";
    usernameMessage.classList.remove("invalid-message");
    usernameMessage.classList.add("valid-message");
    usernameValid = true;
  }
});

// onclick submit key
submitFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (firstNameValid && lastNameValid && usernameValid) {
    let newUserData = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      userName: usernameInput.value,
      profile: "./content/img/profile/banana.png",
    };
    fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUserData),
    }).then((res) => {
      console.log(res);
      clearInputs();
    });
  } else {
    alert("please check your inputs");
  }
});

// functions
function clearInputs() {
  firstNameInput.value = "";
  lastNameInput.value = "";
  usernameInput.value = "";
}
