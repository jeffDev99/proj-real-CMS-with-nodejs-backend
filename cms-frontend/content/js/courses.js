import "./shared.js";
const $ = document;
const courseModal = $.querySelector(".course-modal");
const addNewCourseBtn = $.querySelector(".add-new-course-btn");
const courseTitleInput = $.querySelector("#course-title-input");
const coursePriceInput = $.querySelector("#course-price-input");
const courseCategoryInput = $.querySelector("#course-category-input");
const courseTimeInput = $.querySelector("#course-time-input");
const UpdateInfoBtn = $.querySelector("#UpdateInfoBtn");
const courseTitleMessage = $.querySelector(".course-title-message");
const coursePriceMessage = $.querySelector(".course-price-message");
const courseCategoryMessage = $.querySelector(".course-category-message");
const courseTimeMessage = $.querySelector(".course-time-message");
const coursesWrapper = $.querySelector(".courses-wrap");
let newCourseinfo;
window.addEventListener("load", (e) => {
  let adminId = localStorage.getItem("adminID");
  if (!adminId) {
    location.href = "./login.html";
  }
});

// validate inputes
let isCourseTitleValid = {
  valid: false,
};
let isCoursePriceValid = {
  valid: false,
};
let isCourseCategoryValid = {
  valid: false,
};
let isCourseTimeValid = {
  valid: false,
};
window.validateInputes = function validateInputes() {
  validationInput(courseTitleInput, courseTitleMessage, isCourseTitleValid);
  validationInput(coursePriceInput, coursePriceMessage, isCoursePriceValid);
  validationInput(
    courseCategoryInput,
    courseCategoryMessage,
    isCourseCategoryValid
  );
  validationInput(courseTimeInput, courseTimeMessage, isCourseTimeValid);
};
courseTitleInput.addEventListener("keyup", (e) => {
  validationInput(e.target, courseTitleMessage, isCourseTitleValid);
});
coursePriceInput.addEventListener("keyup", (e) => {
  validationInput(e.target, coursePriceMessage, isCoursePriceValid);
});
courseCategoryInput.addEventListener("keyup", (e) => {
  validationInput(e.target, courseCategoryMessage, isCourseCategoryValid);
});
courseTimeInput.addEventListener("keyup", (e) => {
  validationInput(e.target, courseTimeMessage, isCourseTimeValid);
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

// add new course
UpdateInfoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    isCourseTitleValid.valid &&
    isCoursePriceValid.valid &&
    isCourseCategoryValid.valid &&
    isCourseTimeValid.valid
  ) {
    newCourseinfo = {
      title: courseTitleInput.value,
      body: `
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam id
      iure inventore eligendi nam possimus, veritatis reiciendis .`,
      time: courseTimeInput.value,
      price: Number(coursePriceInput.value),
      students: 0,
      category: courseCategoryInput.value,
      cover: "./content/img/course/course.png",
    };

    fetch("http://localhost:3000/api/courses", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCourseinfo),
    }).then((res) => {
      console.log(res);
      closeCourseModal();
      clearModalInput();
      getAllCourses();
    });
  }else{
    alert("check your inputes");
  }
});
// show courses when page is load
window.addEventListener("DOMContentLoaded", getAllCourses);
function getAllCourses() {
  fetch("http://localhost:3000/api/courses")
    .then((res) => res.json())
    .then((courseArr) => {
      coursesWrapper.innerHTML = "";
      courseArr.forEach((course) => {
        coursesWrapper.insertAdjacentHTML(
          "beforeend",
          `
          <article class="course-box">
                <img src="${course.cover}" class="course-img" alt="">
                <!-- course image -->
                <div class="course-right-section-box">
                  <div class="course-explanation">
                    <!-- course title -->
                    <h1 class="course-title">
                    ${course.title}
                    </h1>
                    <!-- course text -->
                    <p class="course-text">
                    ${course.body}
                    </p>
                  </div>
                  <div class="course-description">
                    <h3 class="course-price">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <g id="vuesax_linear_dollar-square" data-name="vuesax/linear/dollar-square" transform="translate(-172 -572)">
                          <g id="dollar-square">
                            <path id="Vector" d="M0,6.99A2.272,2.272,0,0,0,2.22,9.32H4.73A1.988,1.988,0,0,0,6.67,7.29,1.75,1.75,0,0,0,5.35,5.36L1.32,3.96A1.75,1.75,0,0,1,0,2.03,1.988,1.988,0,0,1,1.94,0H4.45A2.272,2.272,0,0,1,6.67,2.33" transform="translate(180.672 579.34)" fill="none" stroke="var(--dark-blue)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                            <path id="Vector-2" data-name="Vector" d="M0,0V12" transform="translate(184 578)" fill="none" stroke="var(--dark-blue)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                            <path id="Vector-3" data-name="Vector" d="M13,20H7c-5,0-7-2-7-7V7C0,2,2,0,7,0h6c5,0,7,2,7,7v6C20,18,18,20,13,20Z" transform="translate(174 574)" fill="none" stroke="var(--dark-blue)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                            <path id="Vector-4" data-name="Vector" d="M0,0H24V24H0Z" transform="translate(172 572)" fill="none" opacity="0"></path>
                          </g>
                        </g>
                      </svg>
                      <span>${course.price}</span>
                      <!-- course price -->
                    </h3>
                    <h3 class="course-category">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g id="vuesax_linear_folder-open" data-name="vuesax/linear/folder-open" transform="translate(-492 -188)">
                          <g id="folder-open">
                            <path id="Vector" d="M19.354,3.3l-.4,5c-.15,1.53-.27,2.7-2.98,2.7H3.394C.684,11,.564,9.83.414,8.3l-.4-5a3.031,3.031,0,0,1,.65-2.19l.02-.02A2.975,2.975,0,0,1,2.994,0h13.38a2.965,2.965,0,0,1,2.29,1.07c.01.01.02.02.02.03A2.925,2.925,0,0,1,19.354,3.3Z" transform="translate(494.316 199)" fill="none" stroke="var(--dark-blue)" stroke-width="1.5"></path>
                            <path id="Vector-2" data-name="Vector" d="M0,9.4V4.25C0,.85.85,0,4.25,0H5.52A2.017,2.017,0,0,1,7.56,1.02l1.27,1.7a1.352,1.352,0,0,0,1.36.68h2.55c3.4,0,4.25.85,4.25,4.25V9.44" transform="translate(495.5 190.03)" fill="none" stroke="var(--dark-blue)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                            <path id="Vector-3" data-name="Vector" d="M0,0H5.14" transform="translate(501.43 205)" fill="none" stroke="var(--dark-blue)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                            <path id="Vector-4" data-name="Vector" d="M0,0H24V24H0Z" transform="translate(516 212) rotate(180)" fill="none" opacity="0"></path>
                          </g>
                        </g>
                      </svg>
                      <span>${course.category}</span>
                      <!-- course cateogry -->
                    </h3>
                    <h3 class="course-students">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <g id="vuesax_linear_people" data-name="vuesax/linear/people" transform="translate(-620 -252)">
                          <g id="people">
                            <g id="Group">
                              <path id="Vector" d="M2.67,5.16a.605.605,0,0,0-.19,0,2.585,2.585,0,1,1,.19,0Z" transform="translate(635.33 254)" fill="none" stroke="var(--dark-blue)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                              <path id="Vector-2" data-name="Vector" d="M.03,4.94a5.635,5.635,0,0,0,3.94-.72A1.911,1.911,0,0,0,3.97.8,5.67,5.67,0,0,0,0,.09" transform="translate(636.94 261.5)" fill="none" stroke="var(--dark-blue)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                            </g>
                            <g id="Group-2" data-name="Group">
                              <path id="Vector-3" data-name="Vector" d="M2.49,5.16a.605.605,0,0,1,.19,0,2.585,2.585,0,1,0-.19,0Z" transform="translate(623.48 254)" fill="none" stroke="var(--dark-blue)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                              <path id="Vector-4" data-name="Vector" d="M5,4.94a5.635,5.635,0,0,1-3.94-.72,1.911,1.911,0,0,1,0-3.42A5.67,5.67,0,0,1,5.027.09" transform="translate(622.003 261.5)" fill="none" stroke="var(--dark-blue)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                            </g>
                            <g id="Group-3" data-name="Group">
                              <path id="Vector-5" data-name="Vector" d="M2.67,5.16a.605.605,0,0,0-.19,0,2.585,2.585,0,1,1,.19,0Z" transform="translate(629.33 261.47)" fill="none" stroke="var(--dark-blue)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                              <path id="Vector-6" data-name="Vector" d="M1.058.795a1.911,1.911,0,0,0,0,3.42,5.677,5.677,0,0,0,5.82,0,1.911,1.911,0,0,0,0-3.42A5.723,5.723,0,0,0,1.058.795Z" transform="translate(628.032 268.985)" fill="none" stroke="var(--dark-blue)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                            </g>
                            <path id="Vector-7" data-name="Vector" d="M0,0H24V24H0Z" transform="translate(620 252)" fill="none" opacity="0"></path>
                          </g>
                        </g>
                      </svg>
                      <span>${course.students}</span>
                      <!-- course students number -->
                    </h3>
                  </div>
                </div>
              </article>
          
      `
        );
      });
    });
}
// show or remove course Modal
addNewCourseBtn.addEventListener("click", (e) => {
  courseModal.classList.add("visible");
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    courseModal.classList.remove("visible");
  }
});
courseModal.addEventListener("click", (e) => {
  if (e.target.querySelector(".modal-content")) {
    closeCourseModal();
  }
});
function closeCourseModal() {
  courseModal.classList.remove("visible");
}
function clearModalInput() {
  courseTitleInput.value = "";
  coursePriceInput.value = "";
  courseCategoryInput.value = "";
  courseTimeInput.value = "";
}
