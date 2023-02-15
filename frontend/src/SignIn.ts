const API_URL = "http://localhost:5500/api" as string;

const loginForm = document.querySelector("form") as HTMLFormElement;
const loginEmail = document.querySelector("#loginEmail") as HTMLInputElement;
const loginPassword = document.querySelector(
  "#loginPassword"
) as HTMLInputElement;

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;

  const res = await fetch(`${API_URL}/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
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
