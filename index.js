import PetCard from "./pet-card/index.js";

window.customElements.define("pet-card", PetCard);


document.querySelector("#pet1").name="FFFF"
document.querySelector("#pet1").age = "14"
//document.querySelector("#pet1").changedname("aaaaaaaaaaaaa")

var pet = new PetCard("asdas","images/retriever.jpeg");
//pet.name = "aaaaaa";
pet.breed = "breed";
pet.age = "4"


document.querySelector(".app").appendChild(pet);
