class Hog {
  constructor(args) {
    this.id = args.id;
    this.name = args.name;
    this.specialty = args.specialty;
    this.medal = args["highest medal achieved"];
    this.weight =
      args[
        "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"
      ];
    this.imgUrl = args.image;
    this.greased = args.greased;
  }

  render() {
    const hogContainer = document.querySelector("#hog-container");
    const hogCard = document.createElement("div");
    const hogNameElement = document.createElement("h2");
    const hogImageElement = document.createElement("img");
    const hogSpecialtyElement = document.createElement("p");
    const hogMedalElement = document.createElement("p");
    const hogWeightElement = document.createElement("p");
    const hogGreasedElement = document.createElement("p");
    const greasedCheckboxElement = document.createElement("input");
    const deleteButton = document.createElement("button");

    hogCard.classList.add("hog-card");
    hogContainer.appendChild(hogCard);
    hogNameElement.innerText = this.name;
    hogCard.appendChild(hogNameElement);
    hogImageElement.src = this.imgUrl;
    hogCard.appendChild(hogImageElement);
    hogSpecialtyElement.innerText = `Specialty: ${this.specialty}`;
    hogCard.appendChild(hogSpecialtyElement);
    hogMedalElement.innerText = `Highest Medal Achieved: ${this.medal}`;
    hogCard.appendChild(hogMedalElement);
    hogWeightElement.innerText = `Weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water: ${
      this.weight
    }`;
    hogCard.appendChild(hogWeightElement);
    hogGreasedElement.innerText = "Greased: ";
    greasedCheckboxElement.type = "checkbox";
    if (this.greased) {
      greasedCheckboxElement.checked = true;
    }
    greasedCheckboxElement.addEventListener("click", e => {
      this.grease();
    });
    hogGreasedElement.appendChild(greasedCheckboxElement);
    hogCard.appendChild(hogGreasedElement);
    deleteButton.innerText = "Delete";
    deleteButton.id = `hog-${this.id}`;
    deleteButton.addEventListener("click", e => {
      destroyHog(e, this.id);
    });
    hogCard.appendChild(deleteButton);
  }

  grease() {
    fetch(`http://localhost:3000/hogs/${this.id}`, {
      method: "PATCH",
      body: JSON.stringify({ greased: !this.greased }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(r => r.json)
      .then();
  }
}
