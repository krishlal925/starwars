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
  // save names or titles
  let items = data.results.map(function(item){
    if(column === "#filmsList"){
      return item.title;
    }
    else{
     return item.name;
    }
  })

  //save additional data for list items
  let additionalData = items.map(function(item, index){
    if (column=== '#peopleList'){
      let count = data.results[index].films.length;
      if(count === 1){
        return `Appeared in 1 film`
      }
      else{
        return `Appeared in ${count} films`
      }
    }
    else if(column ==='#filmsList'){
      let releaseDate = data.results[index].release_date;
      return `Released on: ${releaseDate}`
    }
    else if (column === '#starshipsList'){
      return data.results[index].starship_class;
    }
    else if(column === '#vehiclesList'){
      return `Manufactured by: ${data.results[index].manufacturer}`
    }
    else{
      return "to be completed later";
    }
  });




  //create HTML for list
  let listHTML = items.map(function(item, index){
    return `
    <li class="list-group-item">
      <h5>${item}</h5>
      <p>${additionalData[index]}</p>
    </li>
    `
  }).join(' ');

  //apply created html to webpage
  let list = document.querySelector(`${column}`);
  list.innerHTML = listHTML;
}

loadData();
