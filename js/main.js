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
      displayBeerInfoPage(randomBeer);
    } else {
      section.classList.add("active");
    }
  });
}

let randomBeer = {};
let fetchRandomBeer = async () => {
  let randomBeerUrl = "https://api.punkapi.com/v2/beers/random";

  const beerData = await fetch(randomBeerUrl);
  const data = await beerData.json();
  randomBeer = data[0];
  if (!randomBeer.image_url) {
    randomBeer.image_url =
      "https://cdn.discordapp.com/attachments/772019634006130718/774658712957878312/no-image-available.png";
  }
  document.querySelector(".name").innerHTML = randomBeer.name;
  document.querySelector(".image").src = randomBeer.image_url;
};

fetchRandomBeer();

let displayBeerInfoPage = (beer) => {
  //remove active class from home link
  document.querySelector(".home").classList.remove("active");
  document.querySelector(".search").classList.remove("active");
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
  displayIngredients(beer);
  displayFoodPairing(beer);
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
  await fetchRandomBeer();
});

document.querySelector(".see-more").addEventListener("click", async () => {
  displayBeerInfoPage(randomBeer);
});

let closeButt = document.querySelector(".close");
closeButt.addEventListener("click", () => {
  detail.classList.remove("active");
});

const displayIngredients = (beer) => {
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

function displayFoodPairing(beer) {
  let foodPairingUlElement = document.querySelector("ul.food-pairing");
  let foodPairingArray = beer.food_pairing;

  for (let foodPairing of foodPairingArray) {
    let foodPairingLiElemnt = elementFactory("li", foodPairing, "group-li");
    foodPairingUlElement.appendChild(foodPairingLiElemnt);
  }
}
//filter search bar
const beerResultListUl = document.getElementById("beerResultList");
const searchBar = document.getElementById("searchBar");
let beerResultList = [];
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredBeers = beerResultList.filter((beer) => {
    return beer.name.toLowerCase().includes(searchString);
  });
  displayCharacters(filteredBeers);
});
const loadCharacters = async () => {
  try {
    const res = await fetch("https://api.punkapi.com/v2/beers");
    beerResultList = await res.json();
    displayCharacters(beerResultList);
    console.log(beerResultList);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (beers) => {
  //const htmlString = beers
  console.log("beers in displayCharacters before map", beers);
  let liElements = [];
  //Get all the lis in the ul-beerResultList
  //for each of the li
  //attach an event listner
  // what do you want to happen when a user clicks on an li?
  //you pobably want to copy the same function as in the eventlisten for see_more button


  //create lis only for the number of beers to display on the specific page
  // 
  beers.map((beer) => {
    // console.log("in displayCharacters", beer);
    let liElement = elementFactory("li", "", "character");
    liElement.setAttribute("data-beer", JSON.stringify(beer));
    let h2Element = elementFactory("h2", beer.name);
    let imgElement = elementFactory("img");
    imgElement.setAttribute("src", beer.image_url);
    liElement.appendChild(h2Element);
    liElement.appendChild(imgElement);
    
    //attach click event listner to every li
    liElement.addEventListener("click", () => {
      let parsedBeer = JSON.parse(liElement.getAttribute("data-beer"));
      displayBeerInfoPage(parsedBeer);
    });
    
    //add it to the ul
    //beerResultListUl.appendChild(liElement);
    liElements.push(liElement);
  });

  beerResultListUl.innerHTML = "";
  liElements.forEach((item) => beerResultListUl.appendChild(item));
};

loadCharacters();

// const button = document.getElementById("searchBar");
// let currentPage=1
// let records_per_page=5
// for(var i = (page -1) * records_per_page; i < (page * records_per_page) && i < beers.length; i++) 

function initEvent() {
  const buttonRight = document.querySelector(".previous");
  const buttonLeft = document.querySelector(".next");
  
  buttonRight.addEventListener("click", next);
  
  buttonLeft.addEventListener("click", previous);
}

function next() {
  if (currentPage > maxPage) {
    currentPage = 1;
  } else {
    currentPage++;
  }
  displayCharacters();
}
function previous() {
  if (currentPage > 0) {
    currentPage--;
  } else {
    currentPage = maxPage;
  }
  displayCharacters();
}

function run() {
  initEvent();
  displayCharacters();
}
run();
displayCharacters();
