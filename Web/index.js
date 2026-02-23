const gridContainer = document.querySelector(".grid-container");

const sideBar = document.querySelector(".side-bar");
const sideBtn = document.querySelector(".side-btn");

sideBtn.addEventListener("click", () => {
  sideBar.classList.toggle("active");

  
});

gridContainer.addEventListener("click", (event) => {
  if (sideBar.classList.contains("active")) {
    sideBar.classList.remove("active");
  }
});

document.querySelector('.container').addEventListener('click',()=>{
  sideBar.classList.remove('active');
})
