const $ = document;
const usernameInput = $.querySelector("#username-input");
const passwordInput = $.querySelector("#password-input");
const PasswordEye = $.querySelector(".PasswordEye");
const submitLoginFormBtnEl = $.querySelector("#submitLoginFormBtnEl");

submitLoginFormBtnEl.addEventListener("click", (e) => {
  e.preventDefault();
  let adminUsername = usernameInput.value;
  let adminPassword = passwordInput.value;
  let adminID = null
  fetch("http://localhost:3000/api/admins")
    .then((res) => res.json())
    .then((adminArr) => {
      let isAdmin = adminArr.some((admin) => {
        if (admin.userName === adminUsername && admin.password === adminPassword) {
          adminID = admin._id
          return (admin.userName === adminUsername && admin.password === adminPassword);
        }
      });
      if (isAdmin) {
        clearInput();
        localStorage.setItem("adminID",adminID)
        location.href = "./panel-users.html";
      } else {
        clearInput();
        alert("your username OR password is incorrect");
      }
    });
});
function clearInput() {
  usernameInput.value = "";
  passwordInput.value = "";
}

togglePasswordInput(passwordInput, PasswordEye);

function togglePasswordInput(inputEl, btnToggle) {
  btnToggle.addEventListener("click", () => {
    if (inputEl.getAttribute("type") === "password") {
      inputEl.setAttribute("type", "text");
    } else if (inputEl.getAttribute("type") === "text") {
      inputEl.setAttribute("type", "password");
    }
  });
}
