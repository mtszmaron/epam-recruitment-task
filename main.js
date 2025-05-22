document.addEventListener("DOMContentLoaded", function () {
  const REGEX = {
    email: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
    phone: /^\d{9}$/,
    name: /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]/g,
    digits: /\D/g,
  };

  const form = document.getElementById("registerForm");

  const nameInput = document.getElementById("name");
  const surnameInput = document.getElementById("surname");
  const countryInput = document.getElementById("country");
  const codeInput = document.getElementById("code");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const experienceInput = document.getElementById("experience");
  const checkboxInput = document.getElementById("checkbox");

  const nameError = document.getElementById("nameError");
  const surnameError = document.getElementById("surnameError");
  const countryError = document.getElementById("countryError");
  const codeError = document.getElementById("codeError");
  const phoneError = document.getElementById("phoneError");
  const emailError = document.getElementById("emailError");
  const experienceError = document.getElementById("experienceError");
  const checkboxError = document.getElementById("checkboxError");

  const countryCodes = {
    Poland: "+48",
    Germany: "+49",
    France: "+33",
    "United Kingdom": "+44",
    India: "+91",
    "United States": "+1",
  };

  form.addEventListener("submit", function (e) {
    const name = nameInput.value.trim();
    const surname = surnameInput.value.trim();
    const country = countryInput.value;
    const phone = phoneInput.value.trim();
    const code = codeInput.value.trim();
    const email = emailInput.value.trim();
    const experience = experienceInput.value;

    let valid = true;

    const showError = (element, condition) => {
      element.classList.toggle("hidden", condition);
      if (!condition) valid = false;
    };

    showError(emailError, REGEX.email.test(email));
    showError(nameError, name !== "");
    showError(surnameError, surname !== "");
    showError(countryError, country !== "");
    showError(phoneError, REGEX.phone.test(phone));
    showError(codeError, code !== "");
    showError(experienceError, experience !== "");
    showError(checkboxError, checkboxInput.checked);

    if (!valid) {
      e.preventDefault();
    }
  });

  document.querySelectorAll(".joinBtn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .getElementById("formSection")
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  const toggleMenuBtn = document.getElementById("toggleMenu");
  if (toggleMenuBtn) {
    toggleMenuBtn.addEventListener("click", function () {
      const menu = document.getElementById("menu");
      if (menu) menu.classList.toggle("hidden");
    });
  }

  const sanitizeNameInput = (input) => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(REGEX.name, "");
    });
  };
  sanitizeNameInput(nameInput);
  sanitizeNameInput(surnameInput);

  phoneInput.addEventListener("input", function () {
    let digits = this.value.replace(REGEX.digits, "").substring(0, 9);
    this.value = digits;
  });

  codeInput.addEventListener("input", function () {
    let digits = this.value.replace(REGEX.digits, "").substring(0, 3);
    this.value = digits ? "+" + digits : "";
  });

  const styleOnChange = (input) => {
    input.style.color = "#999999";
    input.addEventListener("change", function () {
      if (this.value) {
        this.style.color = "black";
      }
    });
  };
  styleOnChange(countryInput);
  styleOnChange(experienceInput);

  countryInput.addEventListener("change", function () {
    const selected = this.value;
    if (countryCodes[selected]) {
      codeInput.value = countryCodes[selected];
    } else {
      codeInput.value = "";
    }
  });
});
