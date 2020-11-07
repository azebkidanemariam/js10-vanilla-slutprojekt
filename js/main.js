
const links = document.querySelectorAll("nav > a");

for (let link of links) {
  link.addEventListener("click", () => {
    document
      .querySelectorAll("main > section")
      .forEach((section) => section.classList.remove("active"));

    let linkName = link.innerText.toLowerCase();

    const section = document.querySelector("." + linkName);
    if (linkName === "info") {
      document.querySelector(".home").classList.add("active");
      displayBeerInfoPage();
    } else {
      section.classList.add("active");
    }
  });
}

let beer = {};
let randomBeer = async () => {
  let randomBeerUrl = "https://api.punkapi.com/v2/beers/random";

  const beerData = await fetch(randomBeerUrl);
  const data = await beerData.json();
  beer = data[0];
  if (!beer.image_url) {
    beer.image_url =
      "https://cdn.discordapp.com/attachments/772019634006130718/774658712957878312/no-image-available.png";
  }
  document.querySelector(".name").innerHTML = beer.name;
  document.querySelector(".image").src = beer.image_url;
};

randomBeer();

let displayBeerInfoPage = () => {
  //remove active class from home link
  document.querySelector(".home").classList.remove("active");
  //add the active class to info link
  document.querySelector(".info").classList.add("active");
  let detailBeerName = document.querySelector(
    "body > main > section.info.active > div > div.detail-header > h4"
  );
  
  detailBeerName.innerText = beer.name;
  //img
  document.querySelector("div.detail-body > div > class > img").src =
    beer.image_url;

  document.querySelector(
    ".description"
  ).innerHTML = `<span class="detail-label">Description</span> <p class="value-txt">${beer.description}</p>`;
  document.querySelector(
    ".abv"
  ).innerHTML = `<span class="detail-label">Alchol by volume</span> <p class="value-txt">${beer.abv}</p>`;
  document.querySelector(
    ".volume"
  ).innerHTML = `<span class="detail-label">Volume</span> <p class="value-txt">${beer.volume.value} ${beer.volume.unit}</p>`;
  document.querySelector(
    ".tips"
  ).innerHTML = `<span class="detail-label">Brewers tips</span> <p class="value-txt">${beer.brewers_tips}</p>`;
  displayIngredients();
  displayFoodPairing();

};
function elementFactory(tag, text, cssClass) {
  const el = document.createElement(tag);
  el.textContent = text;
  if (cssClass) {
    el.classList.add(cssClass);
  }
  return el;
}

document.querySelector(".btn_beer").addEventListener("click", async () => {
  await randomBeer();
});

document.querySelector(".see-more").addEventListener("click", async () => {
  displayBeerInfoPage();
});

let closeButt = document.querySelector(".close");
closeButt.addEventListener("click", () => {
  detail.classList.remove("active");
});

const displayIngredients = () => {
  let ingidientObject = beer.ingredients;
  let maltArray = ingidientObject.malt;
  let hopsArray = ingidientObject.hops;
  let maltUlElement = document.querySelector("ul.malt");
  let hopsUlElement = document.querySelector("ul.hops");

  for (let malt of maltArray) {
    let maltLiElement = elementFactory("li", "", "group-li");
    let label = elementFactory("span", malt.name, "detail-label");
    let value = elementFactory(
      "span",
      `- ${malt.amount.value} ${malt.amount.unit}`
    );

    maltLiElement.appendChild(label);
    maltLiElement.appendChild(value);

    maltUlElement.appendChild(maltLiElement);
  }

  for (let hops of hopsArray) {
    let hopsLiElement = elementFactory("li", "", "group-li");
    let label = elementFactory("span", hops.name, "detail-label");
    let value = elementFactory(
      "span",
      `-  ${hops.amount.value} ${hops.amount.unit} -  ${hops.add}  ${hops.attribute}`
    );
    hopsLiElement.appendChild(label);
    hopsLiElement.appendChild(value);
    hopsUlElement.appendChild(hopsLiElement);
  }
};

function displayFoodPairing() {
  let foodPairingUlElement = document.querySelector("ul.food-pairing");
  let foodPairingArray = beer.food_pairing;

  for (let foodPairing of foodPairingArray) {
    let foodPairingLiElemnt = elementFactory("li", foodPairing, "group-li");
    foodPairingUlElement.appendChild(foodPairingLiElemnt);
  }
}
