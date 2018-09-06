class HogController {}

const hogForm = document.querySelector("#hog-form");

function getHogs() {
  fetch("http://localhost:3000/hogs")
    .then(r => r.json())
    .then(json => {
      json.forEach(hog => {
        const hogObj = new Hog(hog);
        hogObj.render();
      });
    });
}

function addNewHog() {
  const data = grabFormValues();

  fetch("http://localhost:3000/hogs", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(r => r.json())
    .then(json => {
      const hogObj = new Hog(json);
      hogObj.render();
    });
}

function destroyHog(e, id) {
  fetch(`http://localhost:3000/hogs/${id}`, {
    method: "DELETE"
  })
    .then(r => r.json())
    .then(json => {
      e.path[1].remove();
    });
}

function grabFormValues() {
  const hogName = hogForm.name.value;
  const hogSpecialty = hogForm.specialty.value;
  const hogMedal = hogForm.medal.value;
  const hogWeight = Number(hogForm.weight.value);
  const hogImage = hogForm.img.value;
  const hogGreased = hogForm.greased.checked;

  return {
    name: hogName,
    specialty: hogSpecialty,
    greased: hogGreased,
    "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": hogWeight,
    "highest medal achieved": hogMedal,
    image: hogImage
  };
}

function addNewHogHandler() {
  hogForm.addEventListener("submit", e => {
    e.preventDefault();
    addNewHog();
    e.target.reset();
  });
}
