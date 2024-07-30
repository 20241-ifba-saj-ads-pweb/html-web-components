const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="pet-card/styles.css"/>
    <div class="pet-card">
      <div class="avatar">
        <img />
      </div>
      <div class="details">
        <h2></h2>
        <div class="info">
          <p>Breed: <slot name="breed" /></p>
          <p>Age: <slot name="age" /></p>
        </div>
        <div class="actions">
            <button id="greet">Say Hi!</button>
            <button id="toggle">View Details</button>
        </div>
      </div>
     
    </div>
`;
class PetCard extends HTMLElement {

  #name;
  #avatar;
  #showInfo;
  #breed;
  #age;

  
  constructor(name,avatar) {
    super();
    this.#showInfo = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    //console.log(name)
    if(name){
      this.name = name;
    }
    if(avatar){
      this.avatar = avatar;
    }
  }

  get breed(){
    return this.#breed
  }

  set breed(newValue){
    this.#breed = newValue;
    this.shadowRoot.querySelector('slot[name=breed]').outerHTML = this.#breed;
  }

  get age(){
    return this.#age
  }

  set age(newValue){
    this.#age = newValue;
    this.shadowRoot.querySelector('slot[name=age]').outerHTML = this.#age;
  }


  #toggleInfo = () => {
    this.#showInfo = !this.#showInfo;
    this.shadowRoot.querySelector(".info").style.display = this.#showInfo
      ? "block"
      : "none";
    this.shadowRoot.querySelector("#toggle").innerHTML = this.#showInfo
      ? "Hide Details"
      : "View Details";
  };

  get name() {
    return this.#name
  }
  
  set name(newValue) {
    this.setAttribute("name", newValue);
  }
  
  #changedname(newValue){
    this.#name = newValue;
    this.shadowRoot.querySelector(".details h2").innerText = newValue;
    this.shadowRoot.querySelector(".avatar img").alt = newValue;    
  }

  get avatar() {
    return this.#avatar;
  }

  #changedavatar(newValue){
    this.#avatar = newValue;
    this.shadowRoot.querySelector(".avatar img").src = newValue;
  }
  
  set avatar(newValue) {
    this.setAttribute("avatar", newValue);
  }


  static get observedAttributes() {
    return ["name", "avatar"];
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if(attributeName =="name"){
      this.#changedname(newValue);
    }      
    if(attributeName =="avatar"){
      this.#changedavatar(newValue);
    }    
    console.log("Changed " + attributeName + " from " + oldValue + " to " + newValue);
  }


  connectedCallback() {
    console.log("connectedCallback");
    this.shadowRoot
      .querySelector("#toggle")
      .addEventListener("click", this.#toggleInfo);
    this.shadowRoot
      .querySelector("#greet")
      .addEventListener("click", this.seyHi.bind(this));
  }

  seyHi() {
    console.log("seyHi");
    window.alert(`Hey there! I'm ${this.name}`);
  }


  disconnectedCallback() {
    console.log("disconnectedCallback");
    this.shadowRoot
      .querySelector("#toggle")
      .removeEventListener("click", this.toggleInfo);
    this.shadowRoot
      .querySelector("#greet")
      .removeEventListener("click", this.seyHi.bind(this));
  }
}

export default PetCard;
