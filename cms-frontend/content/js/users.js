import "./shared.js";
const $ = document;
const usersWrapper = $.querySelector(".users-wrap");
const removeModal = $.querySelector(".remove-modal");
const editModal = $.querySelector(".edit-modal");
const usernameInput = $.querySelector("#username-input");
const firstNameInput = $.querySelector("#first-name-input");
const lastNameInput = $.querySelector("#last-name-input");
const usernameMessage = $.querySelector(".username-message");
const firstNameMessage = $.querySelector(".first-name-message");
const lastNameMessage = $.querySelector(".last-name-message");

// validate inputes
let isUsernameValid = {
  valid: false
};
let isFirstNameValid = {
  valid: false
};
let isLastNameValid = {
  valid: false
};

window.validateInputes =  function validateInputes(){
  validationInput(usernameInput, usernameMessage, isUsernameValid);
  validationInput(firstNameInput, firstNameMessage, isFirstNameValid);
  validationInput(lastNameInput, lastNameMessage, isLastNameValid);
}

usernameInput.addEventListener("keyup", (e) => {
  validationInput(e.target, usernameMessage, isUsernameValid);
});
firstNameInput.addEventListener("keyup", (e) => {
  validationInput(e.target, firstNameMessage, isFirstNameValid);
});
lastNameInput.addEventListener("keyup", (e) => {
  validationInput(e.target, lastNameMessage, isLastNameValid);
});

window.validationInput =  function validationInput(inputEl, inputMessageEl, validtyVar) {
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
}

let mainUserId = null;
window.addEventListener("load", getAllUsers);

window.closeRemoveModal = function closeRemoveModal() {
  removeModal.classList.remove("visible");
};
window.removeUser = function removeUser() {
  fetch(`http://localhost:3000/api/users/${mainUserId}`, {
    method: "DELETE",
  })
    .then((res) => {
      closeRemoveModal();
      getAllUsers();
      // location.reload()
    })
    .catch((err) => console.log(err));
};
function getAllUsers() {
  fetch("http://localhost:3000/api/users")
    .then((res) => res.json())
    .then((userArr) => {
      usersWrapper.innerHTML = "";
      userArr.forEach((user) => {
        usersWrapper.insertAdjacentHTML(
          "beforeend",
          `
      <div class="user-box">
      <div class="user-box_left">
          <img src="${user.profile}" class="user-profile-box" alt="">
          <div class="user-detail">
              <h1 class="user-id">
                  <span>${user.userName} <!-- username --> </span>
                  <span class="user-history"> ${user.created_AT} <!-- history --> </span>
              </h1>
              <h3 class="user-name">${user.firstName} ${user.lastName} <!-- user name (first name and last name) --> </h3>
          </div>
      </div>

      <div class="user-btns-group">
          <!-- ! ------------------------------ edit btn ------------------------------- ! -->
          <button class="user-edit-btn" onclick="showEditModal('${user._id}')">
              edit
          </button>
          <!-- ! ----------------------------- remove btn ------------------------------ ! -->
          <button class="user-remove-btn" onclick="showRemoveModal('${user._id}')">
              remove
          </button>
      </div>
  </div>
      `
        );
      });
    });
}

// edit modal
window.showEditModal = async function showEditModal(userId) {
  editModal.classList.add("visible");
  mainUserId = userId;
  await getMainUser(mainUserId);
  validateInputes()
};
window.showRemoveModal = function showRemoveModal(userId) {
  removeModal.classList.add("visible");
  mainUserId = userId;
};

window.closeEditModal = function closeEditModal() {
  editModal.classList.remove("visible");
};
async function getMainUser(userId) {
  await fetch(`http://localhost:3000/api/users/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      usernameInput.value = data.userName;
      firstNameInput.value = data.firstName;
      lastNameInput.value = data.lastName;
    });
}
window.updateUserInfo = function updateUserInfo(event) {
  event.preventDefault();
  if ((isFirstNameValid.valid&& isLastNameValid.valid&& isUsernameValid.valid)) {
    let newUserData = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      userName: usernameInput.value,
      profile: "./content/img/profile/banana.png",
    };
    fetch(`http://localhost:3000/api/users/${mainUserId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUserData),
    })
      .then((res) => {
        console.log(res);
        closeEditModal();
        getAllUsers();
        // location.reload()
      })
      .catch((err) => console.log(err));
  } else {
    alert("check your inputes");
  }
};
// functions
function clearInputs() {
  firstNameInput.value = "";
  lastNameInput.value = "";
  usernameInput.value = "";
}
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeEditModal();
  }
});

