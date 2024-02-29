window.addEventListener("load", (e) => {
  const $ = document;
  let adminId = localStorage.getItem("adminID");
  if (!adminId) {
    location.href = "./login.html";
  } else {
    showMainAdminInfoIntoPanel(adminId);
  }
  
  
  // sign out btn
  const signOutBtn = $.querySelector(".sign-out-btn");
  signOutBtn.addEventListener("click", (e) => {
    localStorage.removeItem("adminID");
    location.href = "./login.html";
  });

  
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
        AICUserName.forEach((item) => {
          item.innerHTML = mainAdmin.userName;
        });
        AICEmail.forEach((item) => {
          item.innerHTML = mainAdmin.email;
        });
        document.title = `panel - ${mainAdmin.firstName} ${mainAdmin.lastName}`;
        AICEmail.innerHTML = mainAdmin.email;
      });
  }
});
