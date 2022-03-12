const thoughts = document.querySelector(".thoughts");

document.addEventListener("DOMContentLoaded", function () {
  // nav menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });
  // add recipe form
  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
});

// download button to install the PWA
// let deferredPrompt;

// window.addEventListener("beforeinstallprompt", (e) => {
//   e.preventDefault();
//   deferredPrompt = e;
//   console.log(`'beforeinsallprompt' event was fired`);
// });

// const buttonDownload = document.querySelector(".download-btn");
// buttonDownload.addEventListener("click", () => {
//   console.log("test download");
//   deferredPrompt.prompt();
// });

// window.addEventListener("appinstalled", () => {
//   // Hide the app-provided install promotion
//   // Clear the deferredPrompt so it can be garbage collected
//   deferredPrompt = null;
//   // Optionally, send analytics event to indicate successful install
//   console.log("PWA was installed");
//   buttonDownload.remove();
// });

// render thought data
const renderThought = (data, id) => {
  const html = `
    <div class="card-panel thought white" data-id="${id}">
      <div class="thought-details">
        <div class="thought-title">${data.title}</div>
        <div class="thought-ingredients">${data.content}</div>
       
      </div>
      <div class="thought-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;

  thoughts.innerHTML += html;
};

// remove thought from DOM
const removeThought = (id) => {
  // console.log(id);
  const thought = document.querySelector(`.thought[data-id="${id}"]`);
  // console.log(thought);
  thought.remove();
};
