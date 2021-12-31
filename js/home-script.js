AOS.init();

const fullName = document.getElementById("name");
const userEmail = document.getElementById("useremail");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const mainForm = document.getElementById("my-form");
const errorElement = document.getElementById("error");
const successElement = document.getElementById("success");

mainForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let errorMessages = [];

  if (fullName.value === "" || fullName.value == null) {
    errorMessages.push("Name is required");
  }

  if (userEmail.value.length <= 6) {
    errorMessages.push("Invalid Email address");
  }

  if (subject.value === "" || subject.value == null) {
    errorMessages.push("Subject is required");
  }

  if (message.value.length <= 4) {
    errorMessages.push("Message must be longer than 4 characters");
  }

  if (message.value.length >= 300) {
    errorMessages.push("Message must be shorter than 300 characters");
  }

  if (errorMessages.length > 0) {
    errorElement.innerText = errorMessages.join(", ");
  } else {
    handleSubmit(event);
  }
});

function handleSubmit(event) {
  event.preventDefault();
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: mainForm.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        switch (response.status) {
          case 400:
            errorElement.innerText = "Server error";
            return;
        }
      } else {
        successElement.innerText = "Form Submitted!";
        mainForm.reset();
      }
    })
    .catch((error) => {});
}
