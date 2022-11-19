//Variables Decleration
let courseName = document.getElementById("name");
let courseCat = document.getElementById("cat");
let coursePrice = document.getElementById("price");
let courseDis = document.getElementById("dis");
let addbtn = document.getElementById("click");
let clrall = document.getElementById("clrall");
let data = document.getElementById("data");
let dd = document.getElementById("nameAlert");
let theambtn = document.getElementById("darkbtn");
let head = document.getElementById("head");
let nameAlert = document.getElementById("nameAlert");
let currentIndex;
var courses;
if (localStorage.getItem("course-list") == null) {
  var courses = [];
} else {
  var courses = JSON.parse(localStorage.getItem("course-list"));
  displayData();
}
// add new course
addbtn.onclick = () => {
  if (addbtn.innerHTML == "Add Course") {
    addCourse();
  } else {
    updateCourse();
    addbtn.innerHTML = "Add Course";
  }
  displayData();
  clearData();
};
//clear all courses
clrall.onclick = () => {
  localStorage.removeItem("course-list");
  courses = [];
  data.innerHTML = "";
};
// add new course function
function addCourse() {
  var course = {
    name: courseName.value,
    cat: courseCat.value,
    price: coursePrice.value,
    dis: courseDis.value,
  };
  let x = courses.push(course);
  console.log(x);
  localStorage.setItem("course-list", JSON.stringify(courses));
}
// display table data
function displayData() {
  var result = " ";
  for (var i = 0; i < courses.length; i++) {
    result += `
        <tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].cat}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].dis}</td>
            <td>
              <button type="button" id="delete" onclick="deleteCourse(${i})" class="btn btn-outline-primary">delete</button>
              <button type="button" id="update" onclick="getcoursedata(${i})" class="btn btn-outline-primary">update</button>
            </td>
          </tr> 
        `;
  }
  document.getElementById("data").innerHTML = result;
}

// clear all data (tables row) function
function clearData() {
  courseName.value = " ";
  courseCat.value = " ";
  courseDis.value = " ";
  coursePrice.value = " ";
}

// delete on course usig its index
function deleteCourse(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      courses.splice(index, 1);
      localStorage.setItem("course-list", JSON.stringify(courses));
      displayData();
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
}

//update course function
function getcoursedata(index) {
  var course = courses[index];
  courseName.value = course.name;
  courseCat.value = course.cat;
  courseDis.value = course.dis;
  coursePrice.value = course.price;
  addbtn.innerHTML = "Update Course";
  currentIndex = index;
}
function updateCourse() {
  var course = {
    name: courseName.value,
    cat: courseCat.value,
    price: coursePrice.value,
    dis: courseDis.value,
  };
  courses[currentIndex].name = course.name;
  courses[currentIndex].cat = course.cat;
  courses[currentIndex].dis = course.dis;
  courses[currentIndex].price = course.price;
  localStorage.setItem("course-list", JSON.stringify(courses));
}
// Search function !
function Search(e) {
  let res = courses
    .filter((item, index) => {
      return item.name.toLowerCase().includes(e.toLowerCase());
    })
    .map((item, i) => {
      return `  <tr>
          <td>${i}</td>
          <td>${item.name}</td>
          <td>${item.cat}</td>
          <td>${item.price}</td>
          <td>${item.dis}</td>
          <td>
            <button
              type="button"
              id="delete"
              onclick="deleteCourse(${i})"
              class="btn btn-outline-primary"
            >
              delete
            </button>
            <button
              type="button"
              id="update"
              onclick="getcoursedata(${i})"
              class="btn btn-outline-primary"
            >
              update
            </button>
          </td>
        </tr>`;
    });

  // var result = " ";
  // for (var i = 0; i < courses.length; i++) {
  //   if (courses[i].name.toLowerCase().includes(e.toLowerCase())) {
  //     result += `
  //       <tr>
  //           <td>${i}</td>
  //           <td>${courses[i].name}</td>
  //           <td>${courses[i].cat}</td>
  //           <td>${courses[i].price}</td>
  //           <td>${courses[i].dis}</td>
  //           <td>
  //             <button type="button" id="delete" onclick="deleteCourse(${i})" class="btn btn-outline-primary">delete</button>
  //             <button type="button" id="update" onclick="getcoursedata(${i})" class="btn btn-outline-primary">update</button>
  //           </td>
  //         </tr>
  //       `;
  //   }
  // }

  document.getElementById("data").innerHTML = res;
}
courseName.onkeyup = () => {
  var nameValidate = /^[A-Z][a-z]{2,8}$/;
  if (nameValidate.test(courseName.value)) {
    addbtn.removeAttribute("disabled", "disabled");
    courseName.classList.add("is-valid");
    courseName.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
  } else {
    addbtn.setAttribute("disabled", "disabled");
    courseName.classList.replace("is-valid", "is-invalid");
    nameAlert.classList.add("d-block");
    nameAlert.classList.remove("d-none");
  }
};

dd.style.cssText = "display:none";
//Dark Theam events

darkbtn.addEventListener("click", function () {
  if (theambtn.innerHTML == "Dark") {
    document.body.style.backgroundColor = "#202020";
    document.body.style.color = "white";
    data.style.color = "white";
    theambtn.innerHTML = "Light";
    head.style.color = "white";
  } else if (theambtn.innerHTML == "Light") {
    document.body.style.backgroundColor = "#FFF";
    document.body.style.color = "black";
    data.style.color = "black";
    theambtn.innerHTML = "Dark";
    head.style.color = "black";
  }
});
