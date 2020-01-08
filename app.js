let peopleURL = 'http://star-cors.herokuapp.com/people'
let filmsURL = 'http://star-cors.herokuapp.com/films'
let starshipsURL = 'http://star-cors.herokuapp.com/starships'
let vehiclesURL = 'http://star-cors.herokuapp.com/vehicles'
let peopleData, filmsData, starshipsData, vehiclesData

async function loadData(){
  await Promise.all([axios.get(peopleURL), axios.get(filmsURL), axios.get(starshipsURL), axios.get(vehiclesURL)])
  .then(function(responses){
    let [peopleData, filmsData, starshipsData, vehiclesData] = responses.map(function(response){
      return response.data;
    })
    let testArr = [];
    console.log(filmsData);
    printList(peopleData, '#peopleList')
    printList(filmsData, '#filmsList')
    printList(starshipsData, '#starshipsList')
    printList(vehiclesData, '#vehiclesList')
  })

}
function printList(data, column){

  let items = data.results.map(function(item){

    if(column === "#filmsList"){
      return item.title;
    }
    else{
     return item.name;
    }
  })

  let listHTML = items.map(function(item){
    return `
    <li>${item}</li>
    `
  }).join(' ');

  let list = document.querySelector(`${column}`);
  list.innerHTML = listHTML;
}

loadData();
