// Hide login section

document.getElementById("login-button").addEventListener("click", function () {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("index-section").style.display = "block";
});

// create account page
document.getElementById("id").addEventListener("click", function () {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("create-account").style.display = "block";
});

// Forget password page
document.getElementById("forget").addEventListener("click", function () {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("forgot-password-modal").style.display = "block";
});

const profilePic = document.getElementById("profile-pic-top-right");
const changePhotoPopover = document.getElementById("change-photo-popover");

// Toggle popover display
profilePic.addEventListener("click", function (event) {
  event.stopPropagation();

  changePhotoPopover.style.display =
    changePhotoPopover.style.display === "none" ? "block" : "none";
});

document.addEventListener("click", function () {
  if (changePhotoPopover.style.display === "block") {
    changePhotoPopover.style.display = "none";
  }
});

changePhotoPopover.addEventListener("click", function (event) {
  event.stopPropagation();
});

// Add click event for the change photo option
document.getElementById("change-photo").addEventListener("click", function () {
  console.log("Change photo clicked"); // Placeholder for actual functionality
});

// Slider Animation
const menuItems = document.querySelectorAll(".menu-item");

const changeActiveItems = () => {
  menuItems.forEach((item) => {
    item.classList.remove("active");
  });
};

// Adding click event listeners to each menu item
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    changeActiveItems();
    item.classList.add("active");
    if (item.id != "notifications") {
      document.querySelector(".notifications-popup").style.display = "none";
    } else {
      document.querySelector(".notifications-popup").style.display = "block";
      document.querySelector(
        "#notifications . notification-count"
      ).style.display = "none";
    }
  });
});

// Password visibility
function togglePasswordVisibility() {
  var passwordInput = document.getElementById("password");
  var toggleIcon = document.querySelector(".toggle-password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    toggleIcon.textContent = "👁";
  }
}

document
  .getElementById("togglePassword")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const passwordInput = document.getElementById("Password");
    const type = passwordInput.getAttribute("type");

    // Toggle the type attribute
    passwordInput.setAttribute(
      "type",
      type === "password" ? "text" : "password"
    );

    this.textContent = this.textContent === "Show" ? "Hide" : "Show";
  });

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("forgot-password-modal");
  const closeBtn = document.querySelector(".close-button");
  const loginSection = document.getElementById("login-section");

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    loginSection.style.display = "block";
  });
});

// For Messages
const messagesNotification = document.querySelector("#messages-notification");
const messages = document.querySelector(".messages");
const message = messages.querySelectorAll(".message");
const messageSearch = document.querySelector("#message-search");

messagesNotification.addEventListener("click", () => {
  messages.style.boxShadow = "0 0 1rem var(--color-primary)";
  messagesNotification.querySelector(".notification-count").style.display =
    "none";
  setTimeout(() => {
    messages.style.boxShadow = "none";
  }, 2000);
});

// Filtering messages
const searchMessages = () => {
  const val = messageSearch.value.toLowerCase();
  console.log(val);
  message.forEach((chat) => {
    let name = chat.querySelector("h5").textContent.toLowerCase();
    if (name.includes(val)) {
      chat.style.display = "flex";
    } else {
      chat.style.display = "none";
    }
  });
};
messageSearch.addEventListener("keyup", searchMessages);

// Theme Customization
const theme = document.querySelector("#theme");
const themeModel = document.querySelector(".custamize-theme");
const fontSizes = document.querySelectorAll(".choose-size span");
var root = document.querySelector(":root");
const colorPalette = document.querySelectorAll(".choose-color span");
const Bg1 = document.querySelector(".bg-1");
const Bg2 = document.querySelector(".bg-2");
const Bg3 = document.querySelector(".bg-3");

const openThemeModel = () => {
  themeModel.style.display = "grid";
};

const closeThemeModel = (e) => {
  if (e.target.classList.contains("custamize-theme")) {
    themeModel.style.display = "none";
  }
};

themeModel.addEventListener("click", closeThemeModel);
theme.addEventListener("click", openThemeModel);

// Font Customization
const removeSizeSelector = () => {
  fontSizes.forEach((size) => {
    size.classList.remove("active");
  });
};

fontSizes.forEach((size) => {
  size.addEventListener("click", () => {
    removeSizeSelector();
    let fontSize;

    size.classList.toggle("active");

    if (size.classList.contains("font-size-1")) {
      fontSize = "10px";
      root.style.setProperty("----sticky-top-left", "5.4rem");
      root.style.setProperty("----sticky-top-right", "5.4rem");
    } else if (size.classList.contains("font-size-2")) {
      fontSize = "13px";
      root.style.setProperty("----sticky-top-left", "5.4rem");
      root.style.setProperty("----sticky-top-right", "-7rem");
    } else if (size.classList.contains("font-size-3")) {
      fontSize = "16px";
      root.style.setProperty("----sticky-top-left", "-2rem");
      root.style.setProperty("----sticky-top-right", "-17rem");
    } else if (size.classList.contains("font-size-4")) {
      fontSize = "19px";
      root.style.setProperty("----sticky-top-left", "-5rem");
      root.style.setProperty("----sticky-top-right", "-25rem");
    } else if (size.classList.contains("font-size-5")) {
      fontSize = "22px";
      root.style.setProperty("----sticky-top-left", "-12rem");
      root.style.setProperty("----sticky-top-right", "-35rem");
    }

    // Change font size of the root html element
    document.querySelector("html").style.fontSize = fontSize;
  });
});

// Color Customization
const removeColorSelector = () => {
  colorPalette.forEach((color) => {
    color.classList.remove("active");
  });
};

colorPalette.forEach((color) => {
  color.addEventListener("click", () => {
    let primary;

    if (color.classList.contains("color-1")) {
      primaryHue = 252;
    } else if (color.classList.contains("color-2")) {
      primaryHue = 52;
    } else if (color.classList.contains("color-3")) {
      primaryHue = 352;
    } else if (color.classList.contains("color-4")) {
      primaryHue = 152;
    } else if (color.classList.contains("color-5")) {
      primaryHue = 202;
    }
    color.classList.add("active");

    root.style.setProperty("--primary-color-hue", primaryHue);
  });
});

// Background Customization
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

const changeBG = () => {
  root.style.setProperty("--light-color-lightness", lightColorLightness);
  root.style.setProperty("--white-color-lightness", whiteColorLightness);
  root.style.setProperty("--dark-color-lightness", darkColorLightness);
};

Bg1.addEventListener("click", () => {
  lightColorLightness = "95%";
  whiteColorLightness = "100%";
  darkColorLightness = "20%";

  Bg1.classList.add("active");
  Bg2.classList.remove("active");
  Bg3.classList.remove("active");

  changeBG();
});

Bg2.addEventListener("click", () => {
  lightColorLightness = "17%";
  whiteColorLightness = "20%";
  darkColorLightness = "95%";

  Bg2.classList.add("active");
  Bg1.classList.remove("active");
  Bg3.classList.remove("active");

  changeBG();
});

Bg3.addEventListener("click", () => {
  lightColorLightness = "0%";
  whiteColorLightness = "10%";
  darkColorLightness = "95%";

  Bg3.classList.add("active");
  Bg2.classList.remove("active");
  Bg1.classList.remove("active");

  changeBG();
});

// <======================================Fetch Method=====================================>

// Fetch method for the registration
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        date: document.getElementById("dateOfBirth").value,
        password: document.getElementById("password").value,
      };

      fetch("/M00896814/Registration-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.message || "An error occurred, please try again."
            );
          }

          // Handle successful registration
          return data;
        })
        .then((data) => {
          alert(data.message || "Registration successful!");
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          alert(error.message);
        });
    });
});

// Fetch method for the login
document.getElementById("login-button").addEventListener("click", function () {
  // Extracting the values from the form inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Using these values in the fetch request
  fetch("/M00896814/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.text();
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
      // Store the token securely
      localStorage.setItem("token", data.token);

      document.getElementById("login-section").style.display = "none";
      document.getElementById("index-section").style.display = "block";
    });
});


// Posting a massage
document
  .getElementById("messageForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    const messageText = document.getElementById("text").value.trim();
    const imageFile = document.getElementById("imageUpload").files[0];

    if (messageText) {
      formData.append("message", messageText);
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (!messageText && !imageFile) {
      alert("Please enter a message or select an image.");
      return;
    }

    try {
      const response = await fetch("/post-message", {
        method: "POST",
        body: formData, // Note: No 'Content-Type' header. The browser will set it with the correct boundary.
      });

      if (!response.ok) throw new Error("Network response was not ok.");

      const data = await response.json();
      console.log(data);

      document.getElementById("text").value = "";
      if (document.getElementById("imageUpload").value) {
        document.getElementById("imageUpload").value = ""; // Reset file input
      }

      updateUIWithNewMessage(data);
      showFeedback("Message posted successfully.", "success");
    } catch (error) {
      console.error("Error:", error);
      alert("Uploaded Successful:", error);
    }
  });


