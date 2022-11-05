// document.getElementById("display").innerHTML ="hello wordl";

var splashScreen = document.querySelector('.splash');
document.addEventListener('DOMContentLoaded',(e)=>{
  setTimeout(() =>{
    splashScreen.classList.add('display-none')
  },2000)

})
var stam =document.getElementById('stam');
stam.innerHTML="Please select a continent";

var lock =document.getElementById('lock');

function displaychart(url) {
    fetch(url).then((response) => {
    return response.json()
 }).then((result) => {
 // document.getElementById('h2').innerHTML= `please choose a continent`; 
   // console.log(result)
    var name = [];
    var population=[];
    for(var i =0; i<result.length;i++){
        name[i] = result[i]["name"]["common"];
        population[i] =result[i]["population"]
    }
    // console.log(name);
   //console.log(name.reverse());
    //console.log(population.reverse());

lock.innerHTML= "please choose a country";
    var xValues = name;
    const data = {
      labels: xValues,
      datasets: [{
        label: 'population',
      //  label2: 'neighboor',
        backgroundColor: 'rgb(255, 99, 132)',

        borderColor: 'rgb(255, 99, 132)',
        data: population,
      }]
    };
    const config = {
      type: 'line',
      data: data,
      options: {}
    };
    const myChart = new Chart(
document.getElementById('myChart'),
config
    );  
    var print = document.getElementById("buttons");
    print.innerHTML =" "
    for(var i =0; i<name.length;i++){
        print.innerHTML+=`<button onclick="displaychartcountrys('${name[i]}')" >${name[i]}</button>`   
    }
})
}
function displaychartcountrys(name) {
let cityName = [];
let cityPopulation = [];

function createAndAppendCanvas(){
  const div = document.querySelector('#chart-div');
  div.replaceChildren('');
  const canvas = document.createElement('canvas');
  canvas.id = 'myChart';
  div.appendChild(canvas);
}

postData('https://countriesnow.space/api/v0.1/countries/population/cities/filter',  `${name}` )
.then((data) => {
   console.log(data); 
if(!data.error){
  for( i = 0 ; i<data.data.length;i++){
   cityName.push(data.data[i]['city'])
   cityPopulation.push(data.data[i].populationCounts[0].value)
  }
}
else {
  alert('there is no data');
}
  console.log(cityName);
  console.log(cityPopulation);
  var c = document.querySelector('#buttons');
  lock.innerHTML =`you chose a ${name}`
  c.addEventListener('click', ()=>{
  createAndAppendCanvas();
  const data = {
    labels: cityName,
    datasets: [{
      label: 'population',
    //  label2: 'neighboor',
      backgroundColor: 'rgb(255, 99, 132)',

      borderColor: 'rgb(255, 99, 132)',
      data: cityPopulation,
    }]
  };
  const config = {
    type: 'line',
    data: data,
    options: {}
  };
  const myChart = new Chart(
document.getElementById('myChart'),
config
  );  
 
  })
});
}
async function postData(url = ''  , country) {
  try{
    const response = await fetch(url, {
      method: 'POST', 
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'limit': 35,
        'order': "asc",
        'orderBy': "name",
        'country': country,
     }),
    });
    const data = await response.json();
    return data ;
  }
  catch(err){
    console.log(err);
  };
}

  
  


