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
    const data=beerData.json()
    document.getElementById("name").innerHTML=beerData[0].name
    document.querySelector("image").src=beerData[0].image_url
}







// const beerImage=document.getElementById("beer-img")
// const beerButton=document.getElementById("btn-beer")

// beerImage.addEventListener("click",getRandomBeer)

// function getRandomBeer(obj){
//     fetch('https://api.punkapi.com/v2/beers/random')
//     .then(res => res.json())
//     .then(data =>{
//         beerImage.innerHTML=`
//         <p> Photo: ${obj.image_url}/>
//         <p>beer name: ${obj.name}<p/>
//         `
//     })
// }







