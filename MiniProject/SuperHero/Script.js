let HeroName = document.getElementById('superHeroName');
let submit = document.getElementById('submitbtn');
let results = document.getElementById('result');
let superHeroDetails = document.getElementById('superHeroDetails');

let superheros= JSON.parse(localStorage.getItem('superheros')) || [];

function searchSuperHero(){
    const name = superHeroName.value;
    superHeroData(name);
}

async function superHeroData(name){
   
    try{
        const response = await fetch(`https://www.superheroapi.com/api.php/1628132770683309/search/${name}`);
        var data =await response.json();
        console.log(data);

        superheros = data.results;
        localStorage.setItem('superheros',JSON.stringify(data.results));
        for(let index =0;index<data.results.length;index++){
            renderSuperHero(data.result[index],index);
        }
        if(data.response == "error"){
            throw new Error();
        }
       
    }
    catch(error){
        console.log("No data found!");
    }

}
function renderSuperHero(data,index){
    //console.log(data);
    let div = document.createElement('div');
    div.id = index;
    div.onclick = (event)=>{
        heandleShuperHeroClick(event);
    }
    div.innerHTML = 
    `<h1>${data.name}</h1>
    <img src=${data.image.url} />
    `
    div.classList.add('herocard');
    results.appendChild(div);

}
function heandleShuperHeroClick(event){
    let superheros= JSON.parse(localStorage.getItem('superheros')) || [];
    const index = event.target.id;
    window.open("index2.html");
    renderSuperHeroDetails(superheros[index]);
}

function renderSuperHeroDetails(data){

    let div = document.createElement('div');
   
    div.innerHTML = 
    `
    <h1>${data.name}</h1>
    <img src="${data.image.url}" />
    `
    superHeroDetails.appendChild(div);
}

submit && submit.addEventListener('click',searchSuperHero);





 