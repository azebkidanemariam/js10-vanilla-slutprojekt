//  localStorage.setItem("myKey","hello world")
// console.log(localStorage.getItem("myKey"))
 
 const links=document.querySelectorAll("nav > a")

for (let link of links) {
    link.addEventListener("click",() =>{
        document.querySelectorAll("main > section").forEach(
            section => section.classList.remove("active")
        )

        const section=document.querySelector("." + link.innerText.toLowerCase())
        section.classList.add("active")
    })

}


let randomBeer = async () => {
    let randomBeer = "https://api.punkapi.com/v2/beers/random"
    
    let beerData = await fetch(randomBeer)
    const data= await beerData.json()
    console.log(data[0].name)
    document.querySelector(".name").innerHTML=data[0].name
    document.querySelector(".image").src=data[0].image_url
}

randomBeer()


















