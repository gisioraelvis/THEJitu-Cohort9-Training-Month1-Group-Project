let API_URL = "http://localhost:5500/api" as string;

const signUpForm = document.querySelector("form") as HTMLFormElement;
const signUpName = document.querySelector("#name") as HTMLInputElement;
const signUpEmail = document.querySelector("#email") as HTMLInputElement;
const signUpPassword1 = document.querySelector(
  "#password1"
) as HTMLInputElement;
const signUpPassword2 = document.querySelector(
  "#password2"
) as HTMLInputElement;

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = signUpName.value;
  const email = signUpEmail.value;
  const password1 = signUpPassword1.value;
  const password2 = signUpPassword2.value;

  // check if the passwords match
  if (password1 !== password2) {
    alert("Passwords do not match");
    return;
  }

  const res = await fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password: password1,
      confirmPassword: password2,
    }),
  });

  const data = await res.json();
  if (data.JWT) {
    localStorage.setItem("jwt", data.JWT);
    window.location.href = "index.html";
  } else {
    alert(data.message);
  }
});
