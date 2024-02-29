import "./shared.js";
const $ = document;
const sessionNameInputEl = $.querySelector("#session-name-input");
const sessionTimeInputEl = $.querySelector("#session-time-input");
const sessionPriceInputEl = $.querySelector("#session-price-input");
const sessionDropdownBoxEl = $.querySelector("#session-dropdown-box");
const sessionCheckFreeLabelEl = $.querySelector(".session-check-free-label");
const sessionDropdownTextEl = $.querySelector(".session-dropdown-text");
const addNewSessionBtnEl = $.querySelector(".add-new-session-btn ");
const sessionNameMessage = $.querySelector(".session-name-message");
const sessionTimeMessage = $.querySelector(".session-time-message");
const sessionPriceMessage = $.querySelector(".session-price-message");
const sessionWrapperEl = $.querySelector(".sessions");
const removeModal = $.querySelector(".remove-modal");
const sessionDropdownMenuItemEls = $.querySelectorAll(
  ".session-dropdown-menu-item"
);
let mainSessionId;
let sessionNameValid = {
  valid: false
};
let sessionTimeValid = {
  valid: false
};
let sessionPriceValid = {
  valid: false
};

// check user login or not
window.addEventListener("load", (e) => {
  let adminId = localStorage.getItem("adminID");
  if (!adminId) {
    location.href = "./login.html";
  }
});

// validate inputes
window.addEventListener("load", (e) => {
  validationInput(sessionNameInputEl, sessionNameMessage, sessionNameValid);
  validationInput(sessionTimeInputEl, sessionTimeMessage, sessionTimeValid);
  validationInput(sessionPriceInputEl, sessionPriceMessage, sessionPriceValid);
});
// validate inputes
sessionNameInputEl.addEventListener("keyup", (e) => {
  validationInput(sessionNameInputEl, sessionNameMessage, sessionNameValid);
});
sessionTimeInputEl.addEventListener("keyup", (e) => {
  validationInput(sessionTimeInputEl, sessionTimeMessage, sessionTimeValid);
});
sessionPriceInputEl.addEventListener("keyup", (e) => {
  validationInput(sessionPriceInputEl, sessionPriceMessage, sessionPriceValid);
});
// validation function
function validationInput(inputEl, inputMessageEl, validtyVar) {
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
// create new session
addNewSessionBtnEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    (sessionNameValid.valid, sessionTimeValid.valid, sessionPriceValid.valid)
  ) {
    let NewSessionData = {
      title: sessionNameInputEl.value,
      time: sessionTimeInputEl.value,
      isFree: !Boolean(Number(sessionPriceInputEl.value)),
      course: sessionDropdownTextEl.innerHTML,
    };
    fetch("http://localhost:3000/api/sessions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(NewSessionData),
    }).then((res) => {
      clearInputs();
      location.reload()
    });
  } else {
    alert("your inputes are incorrect");
  }
});
// click on dropdown item
sessionDropdownMenuItemEls.forEach((item) => {
  item.addEventListener("click", () => {
    sessionDropdownTextEl.innerHTML = item.innerHTML;
  });
});
// show drop down
sessionDropdownBoxEl.addEventListener("click", (e) => {
  e.target.classList.toggle("active");
});
// hide drop down
window.addEventListener("click", (e) => {
  if (e.target.id !== "session-dropdown-box") {
    sessionDropdownBoxEl.classList.remove("active");
  }
});
function clearInputs() {
  sessionNameInputEl.value = "";
  sessionTimeInputEl.value = "";
  sessionPriceInputEl.value = "";
  sessionDropdownBoxEl.value = "";
  sessionDropdownTextEl.value = "";
}
// show all sessions
window.addEventListener("load", getAllSessions);
function getAllSessions() {
  fetch("http://localhost:3000/api/sessions")
    .then((res) => res.json())
    .then((sessionArr) => {
      sessionWrapperEl.innerHTML = "";
      sessionArr.forEach((session) => {
        sessionWrapperEl.insertAdjacentHTML(
          "beforeend",
          `
                <div class="session-box">
                <div>
                    <h1 class="session-name-title">${session.title}</h1>
                    <span class="session-category">${session.course}</span>
                </div>
                <div>
                    <span class="session-price-badge">${
                      session.isFree ? "free" : "not free"
                    }</span>
                    <span class="session-time">${session.time}</span>
                    <span style="cursor:pointer;" onclick="showRemoveModal('${
                      session._id
                    }')">X</span>
                </div>
            </div>
        </div>
            `
        );
      });
    });
}

window.showRemoveModal = function showRemoveModal(sessionId) {
  removeModal.classList.add("visible");
  mainSessionId = sessionId;
};
window.closeRemoveModal = function closeRemoveModal() {
  removeModal.classList.remove("visible");
};

window.removeMainSession = function removeMainSession() {
  fetch(`http://localhost:3000/api/sessions/${mainSessionId}`, {
    method: "DELETE",
  })
    .then((res) => {
      closeRemoveModal();
      getAllSessions();
      // location.reload()
    })
    .catch((err) => console.log(err));
};
