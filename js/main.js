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

//=======UTILITY FUNCTIONS
function elementFactory(tag, text, cssClass) {
  const el = document.createElement(tag);
  el.textContent = text;
  if (cssClass) {
    el.classList.add(cssClass);
  }
  return el;
}

//=========FETCH RANDOM BEER ======//
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

document.querySelector(".btn_beer").addEventListener("click", async () => {
  await fetchRandomBeer();
});

document.querySelector(".see-more").addEventListener("click", async () => {
  displayBeerInfoPage(randomBeer);
});

//=========DISPLAY INFO PAGE

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

//========= SEARCH PAGE ======
//beers are fetched from the api
let beerResultList = [];
const loadBeers = async () => {
  try {
    const res = await fetch("https://api.punkapi.com/v2/beers");
    beerResultList = await res.json();
    displayBeers(beerResultList);
    console.log(beerResultList);
  } catch (err) {
    console.error(err);
  }
};

loadBeers();

//user searches for specific beer, and only the beers that match the users input are displayed
//filter search bar
const beerResultListUl = document.getElementById("beerResultList");
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredBeers = beerResultList.filter((beer) => {
    return beer.name.toLowerCase().includes(searchString);
  });
  displayBeers(filteredBeers);
});

let current_page = 1;
let beers_per_page = 5;
const prevButton = document.getElementById("button_prev");
const nextButton = document.getElementById("button_next");

const displayBeers = (beers) => {
  //Reset functions
  changePage(1, beers);
  pageNumbers(beers);
  selectedPage(beers);
  clickPage(beers);
};

let pageNumbers = (beers) => {
  let pageNumber = document.getElementById("page_number");
  pageNumber.innerHTML = "";

  for (let i = 1; i < numPages(beers) + 1; i++) {
    pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
  }
};

let numPages = (beers) => {
  return Math.ceil(beers.length / beers_per_page);
};

let selectedPage = () => {
  let page_number = document
    .getElementById("page_number")
    .getElementsByClassName("clickPageNumber");
  console.log("pagenumber", page_number);
  for (let i = 0; i < page_number.length; i++) {
    if (i == current_page - 1) {
      page_number[i].style.opacity = "1.0";
    } else {
      page_number[i].style.opacity = "0.5";
    }
  }
};
let clickPage = (beers) => {
  document.addEventListener("click", function (e) {
    if (
      e.target.nodeName == "SPAN" &&
      e.target.classList.contains("clickPageNumber")
    ) {
      current_page = e.target.textContent;
      changePage(current_page, beers);
    }
  });
};
let prevPage = (beers) => {
  console.log("prevPage - current-page", current_page);
  if (current_page > 1) {
    current_page--;
    changePage(current_page, beers);
  }
};

let nextPage = (beers) => {
  if (current_page < numPages(beers)) {
    current_page++;
    changePage(current_page, beers);
  }
};

let changePage = (page, beers) => {
  const beerResultListUl = document.getElementById("beerResultList");
  if (page < 1) {
    page = 1;
  }
  if (page > numPages(beers) - 1) {
    page = numPages(beers);
  }

  let liElements = [];

  for (
    let i = (page - 1) * beers_per_page;
    i < page * beers_per_page && i < beers.length;
    i++
  ) {
    let beer = beers[i];
    let liElement = elementFactory("li", "", "beer");
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
    liElements.push(liElement);
  }
  beerResultListUl.innerHTML = "";
  liElements.forEach((item) => beerResultListUl.appendChild(item));
  selectedPage();
};
