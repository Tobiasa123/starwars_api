
let url = "https://swapi.dev/api/people/?page=1"
let contentWrapper = document.querySelector(".contentWrapper")
let buttonSection = document.querySelector(".buttonSection")
let infoSection = document.querySelector(".infoSection")
let infoText = document.querySelector(".infoText")
let planetInfo = document.querySelector(".planetInfo")
let previousButton = document.querySelector(".previousButton")
let nextButton = document.querySelector(".nextButton")
let currentPage = document.querySelector(".currentPage")


//få fram page
let params = new URLSearchParams(new URL(url).search);
let page = parseInt(params.get('page'));



async function loadPage() {
    buttonSection.innerHTML = `<h2>Loading characters...</h2>`;
    const data = await getData();
    createButtons(data);
}
loadPage();

//eventlistener för knappen bak
nextButton.addEventListener('click', async function() {
    if (page < 8) {
        clearButtons()
        nextButton.disabled = true
        previousButton.disabled = true
        page += 1;
        currentPage.textContent = `${page}/8`
        url = `https://swapi.dev/api/people/?page=${page}`;
        const data = await getData();
        createButtons(data)
    }
    
});
//eventlistener för knappen fram
previousButton.addEventListener('click', async function() {
    if (page > 1) {
        clearButtons()
        nextButton.disabled = true
        previousButton.disabled = true
        page -= 1;
        currentPage.textContent = `${page}/8`
        url = `https://swapi.dev/api/people/?page=${page}`;
        const data = await getData();
        createButtons(data)
    }
});

//i denna funktion fetchar vi all data
async function getData(){
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return data
} 
getData();

//skapa knappar med textcontent name i api
async function createButtons(data){

    //tar bort loading texten
    buttonSection.innerHTML = '';

    //enable knapparna igen
    nextButton.disabled = false
    previousButton.disabled = false

    //skapa knappar
    data.results.forEach(element => {
        console.log(element.name)
        let btn = document.createElement('button')
        btn.classList.add("buttons")
        btn.textContent = element.name
        btn.addEventListener('click', async () => {
            infoText.innerHTML = `
            <p>Name: ${element.name}</p>
            <p>Height: ${element.height}</p>
            <p>Mass: ${element.mass}</p>
            <p>Hair color: ${element.hair_color}</p>
            <p>Skin color: ${element.skin_color}</p>
            <p>Gender: ${element.gender}</p>`


            planetInfo.innerHTML = `<h2>Fetching planet data...</h2>`; 
            //själva url som vi fetchar i getWorld metoden
            let worldUrl = `${element.homeworld}`
            let homeworldInfo = await getWorld(worldUrl)
            planetInfo.innerHTML = homeworldInfo
        })
        buttonSection.appendChild(btn)
    })
} 

//fetcha world information
async function getWorld(url){
    const response = await fetch(url)
    const data = await response.json()
    let worldInfo = `
    <h2>${data.name}</h2> 
    <p> Rotation period: ${data.rotation_period} </p>
    <p> Orbital Period: ${data.orbital_period} </p>
    <p> Diameter: ${data.diameter} </p> 
    <p> Climate: ${data.climate} </p>
    <p> Gravity: ${data.gravity} </p> 
    <p> Terrain: ${data.terrain} </p>`
    return worldInfo
} 

function clearButtons() {
    buttonSection.innerHTML = `<h2>Loading characters...</h2>`;
}

