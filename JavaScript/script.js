const subtitle = document.querySelector(".home__subtitle");
const words = ["Front-end web developer", "C/C++ Programmer"];
const tabButtons = document.querySelectorAll(".tab-links");
const tabContent = document.querySelectorAll(".tab-contents");
const themeButton = document.querySelector(".toggleBtn");
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxXsYvysx8681dlzpN8gWnAPC_Hncj6oEvffuSBOyfi1TIyNRLzqyM8mlvbUKPkNGimGA/exec";
const form = document.forms["submit-to-google-sheet"];
const submitMessage = document.querySelector(".submitMessage");
const imageHome = document.querySelector(".image-home");
const imageAbout = document.querySelector(".image-about");
const themeIcon = document.querySelector(".theme-icon");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navLinksEach = document.querySelectorAll("nav .links a");

let index = 0;
let charIndex = 0;

function type() {
  if (charIndex < words[index].length) {
    subtitle.querySelector("#typing").textContent +=
      words[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    subtitle.querySelector("#typing").textContent = words[index].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, 50);
  } else {
    index++;
    if (index >= words.length) {
      index = 0;
    }
    setTimeout(type, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (words.length) {
    setTimeout(type, 1500);
  }
});

tabButtons.forEach(function (button) {
  button.addEventListener("click", function (e) {
    tabContent.forEach(function (tc) {
      tc.classList.remove("active-tab");
    });
    tabButtons.forEach(function (b) {
      b.classList.remove("active-link");
    });
    // console.log(button.classList);
    const tabName = document.getElementsByClassName(
      `${button.classList[1]}`
    )[1];
    // console.log(tabName.classList);
    tabName.classList.toggle("active-tab");
    e.target.classList.toggle("active-link");
  });
});

themeButton.addEventListener("click", function (e) {
  console.log(e);
  if (themeButton.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeIcon.classList.value = "fa theme-icon fa-moon";
    images("dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    themeIcon.classList.value = "fa theme-icon fa-sun";
    images("light");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then(() => console.log("Success!"))
    .catch((error) => console.error("Error!", error.message));
});

function clearForm() {
  submitMessage.style.display = "block";
  setTimeout(() => {
    submitMessage.style.display = "none";
    form.reset();
  }, 2500);
}
document.addEventListener("DOMContentLoaded", () => {
  const themeMode = localStorage.getItem("theme");
  if (themeMode == "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeButton.checked = true;
    themeIcon.classList.value = "fa theme-icon fa-moon";
    images("dark");
  }
});

function images(color) {
  imageHome.src = `./CSS/Images/home-${color}.svg`;
  imageAbout.src = `./CSS/Images/about-${color}.svg`;
}

// console.log(themeIcon.classList.value);
menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("hide");
});

navLinksEach.forEach(function (link) {
  link.addEventListener("click", () => {
    navLinks.classList.add("hide");
  });
});
