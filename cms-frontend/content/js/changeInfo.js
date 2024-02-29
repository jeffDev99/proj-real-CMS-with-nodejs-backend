import "./shared.js";
const $ = document;
const firstNameInput = $.querySelector("#first-name-input");
const lastNameInput = $.querySelector("#last-name-input");
const userNameInput = $.querySelector("#username-input");
const newPasswordInput = $.querySelector("#new-password-input");
const confirmPasswordInput = $.querySelector("#confirm-password-input");
const emailInput = $.querySelector("#email-input");
const updateInfoBtn = $.querySelector("#updateInfoBtn");
const firstNameMessage = $.querySelector(".first-name-message");
const lastNameMessage = $.querySelector(".last-name-message");
const usernameMessage = $.querySelector(".username-message");
const newPasswordMessage = $.querySelector(".new-password-message");
const confirmPasswordMessage = $.querySelector(".confirm-password-message");
const emailMessage = $.querySelector(".email-message");
const newPasswordEye = $.querySelector(".new-password-eye");
const confirmPasswordEye = $.querySelector(".confirm-password-eye");

window.getMainAdmin = async function getMainAdmin(id) {
 await fetch(`http://localhost:3000/api/admins/${id}`)
    .then((res) => res.json())
    .then((mainAdmin) => {
      firstNameInput.value = mainAdmin.firstName;
      lastNameInput.value = mainAdmin.lastName;
      userNameInput.value = mainAdmin.userName;
      newPasswordInput.value = mainAdmin.password;
      emailInput.value = mainAdmin.email;
    });
};
 window.addEventListener("DOMContentLoaded",async (e) => {
  let adminId = localStorage.getItem("adminID");
  if (!adminId) {
    location.href = "./login.html";
  } else {
   await getMainAdmin(adminId);
    validateInputes()
  }
});
// validate inputes
let isFirstNameValid = {
  valid: false,
};
let isLastNameValid = {
  valid: false,
};
let isUserNameValid = {
  valid: false,
};
let isNewPasswordValid = {
  valid: false,
};
let isConfirmPasswordValid = {
  valid: false,
};
let isEmailValid = {
  valid: false,
};
window.validateInputes =  function validateInputes() {
  validationInput(firstNameInput, firstNameMessage, isFirstNameValid);
  validationInput(lastNameInput, lastNameMessage, isLastNameValid);
  validationInput(userNameInput, usernameMessage, isUserNameValid);
  validationInput(newPasswordInput, newPasswordMessage, isNewPasswordValid);
  validationInput(
    confirmPasswordInput,
    confirmPasswordMessage,
    isConfirmPasswordValid
  );
  validationInput(emailInput, emailMessage, isEmailValid);
};

firstNameInput.addEventListener("keyup", (e) => {
  validationInput(e.target, firstNameMessage, isFirstNameValid);
});
lastNameInput.addEventListener("keyup", (e) => {
  validationInput(e.target, lastNameMessage, isLastNameValid);
});
userNameInput.addEventListener("keyup", (e) => {
  validationInput(e.target, usernameMessage, isUsernameValid);
});
newPasswordInput.addEventListener("keyup", (e) => {
  validationInput(e.target, newPasswordMessage, isNewPasswordValid);
});
confirmPasswordInput.addEventListener("keyup", (e) => {
  validationInput(e.target, confirmPasswordMessage, isConfirmPasswordValid);
});
emailInput.addEventListener("keyup", (e) => {
  validationInput(e.target, emailMessage, isEmailValid);
});

window.validationInput = function validationInput(
  inputEl,
  inputMessageEl,
  validtyVar
) {
  if (inputEl.value) {
    inputMessageEl.innerHTML = "valid message";
    inputMessageEl.classList.add("valid-message");
    inputMessageEl.classList.remove("invalid-message");
    inputEl.parentElement.classList.remove("invalid");
    inputEl.parentElement.classList.add("valid");
    validtyVar.valid = true;
  } else {
    inputMessageEl.innerHTML = "invalid message";
    inputMessageEl.classList.add("invalid-message");
    inputMessageEl.classList.remove("valid-message");
    inputEl.parentElement.classList.remove("valid");
    inputEl.parentElement.classList.add("invalid");
    validtyVar.valid = false;
  }
};

updateInfoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    newPasswordInput.value === confirmPasswordInput.value &&
    isFirstNameValid.valid &&
    isLastNameValid.valid &&
    isUsernameValid.valid &&
    isNewPasswordValid &&
    isConfirmPasswordValid &&
    isEmailValid
  ) {
    let adminNewInfo = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      userName: userNameInput.value,
      password: confirmPasswordInput.value,
      email: emailInput.value,
    };
    fetch(`http://localhost:3000/api/admins/${adminId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(adminNewInfo),
    }).then((res) => console.log(res));
  } else {
    alert("check your inputes");
  }
});

togglePasswordInput(newPasswordInput, newPasswordEye);
togglePasswordInput(confirmPasswordInput, confirmPasswordEye);

function togglePasswordInput(inputEl, btnToggle) {
  btnToggle.addEventListener("click", () => {
    if (inputEl.getAttribute("type") === "password") {
      inputEl.setAttribute("type", "text");
    } else if (inputEl.getAttribute("type") === "text") {
      inputEl.setAttribute("type", "password");
    }
  });
}
