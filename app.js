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

function search(event){

  let searchbox = event.target.id;
  let searchID;
  let totalDiv;
  //determine which textbox is being used
  //set the variable that picks the div element for printing the list count
  if(searchbox === 'peopleSearch'){
    searchID = '#peopleList'
    totalDiv = '#peopleTotal'
  }
  else if (searchbox === 'filmSearch'){
    searchID = '#filmsList'
    totalDiv = '#filmsTotal'
  }
  else if( searchbox === 'starshipSearch'){
    searchID = '#starshipsList'
    totalDiv = '#starshipsTotal'
  }
  else if (searchbox === 'vehicleSearch'){
    searchID = '#vehiclesList'
    totalDiv = '#vehiclesTotal'
  }


  let list = document.querySelector(searchID);
  let li = list.getElementsByTagName('li');
  let h = list.getElementsByTagName("h5");
  let searchInput = event.target.value.toUpperCase();

  let total = h.length;
  let count =0;
  //compare input to list items
  for(let i=0; i < li.length; i++){
    let a = h[i].innerText.toUpperCase();
    if (a.indexOf(searchInput) > -1){
      li[i].classList.remove('d-none');
      count++;
    }
    else{
      li[i].classList.add('d-none');
    }
  }
  console.log(`${count} out of ${total}`)
  printCount(count, total, totalDiv );
}
function printCount(count, total, totalDiv){
  let div = document.querySelector(totalDiv)
  let totalText = `Viewing ${count} of ${total} `
  let textEnd;
  if(totalDiv === '#peopleTotal'){
    textEnd = 'people';
  }
  else if (totalDiv === '#filmsTotal'){
    textEnd = 'films';
    console.log('I made it in films');
  }
  else if(totalDiv === '#starshipsTotal'){
    textEnd = 'starships';
  }
  else if(totalDiv === '#vehiclesTotal'){
    textEnd = 'vehicles';
  }
  div.innerText = totalText + textEnd;
}

loadData();
let peopleSearch = document.querySelector('#peopleSearch')
peopleSearch.addEventListener('keyup',search)

let filmSearch = document.querySelector('#filmSearch')
filmSearch.addEventListener('keyup',search)

let starshipSearch = document.querySelector('#starshipSearch')
starshipSearch.addEventListener('keyup',search)

let vehicleSearch = document.querySelector('#vehicleSearch')
vehicleSearch.addEventListener('keyup',search)
