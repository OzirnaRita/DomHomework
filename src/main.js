const url = 'https://rickandmortyapi.com/api/character';
let rawData;

fetch(url)
  .then(response => response.json())
  .then(data => {
    rawData = data.results;
    createList(rawData);
  })
  .catch((error) => {
    console.log(JSON.stringify(error));
  });

function createList(rawData) {
  let cardList = document.querySelector('.cardList')
  let cards = `<div class="column">`;
  rawData.forEach(function (character, index) {
    if (index < 20) {
      cards += 
      ` 
        <div class="card">
          <img class="persImage" src="${character.image}">
          <div class="persInfo">
            <div class="persName">
              ${character.name}
            </div>
            <div class="created">
              ${character.created}
            </div>
            <div class="persSpecies">
              Species: ${character.species}
            </div>
            <div class="persLocation">
              <a href="${character.location.url}">
                Location: ${character.location.name}
              </a>
            </div>
            Episodes: ${createLinklist(character.episode)}
          </div>
        </div>
      `
    }
  });
  cards += '</div>';
  cardList.innerHTML = cards;
}
function createLinklist(episodes){
  let episodesList = `<div class="persEpisode">`;
    episodes.forEach((episode) => {
      episodesList+=
        `
          <a href = '${episode}'> 
            ${episode} 
          </a>
        `
    });
  episodesList += `</div>`
  return episodesList;
}
 //function checkPosition() {
//   const height = document.body.offsetHeight
//   const screenHeight = window.innerHeight
//   const scrolled = window.scrollY
//   const threshold = height - screenHeight / 6
//   const position = scrolled + screenHeight

//   if (position >= threshold) {
//     createList(rawData, 20)
//   }
// }

// (() => {
//   window.addEventListener("scroll", checkPosition)
//   window.addEventListener("resize", checkPosition)
// })() 

function showLessCards() {
  console.log(document.querySelectorAll('.card'))
  let cardsOnPage = document.querySelectorAll('.card');
  cardsOnPage.forEach(function (element, index) {
    if (index > 9) {
      element.remove();
    }
  });
  showLess.setAttribute('disabled', '');
}

function sortDataAscendind(a,b){
  let div = document.querySelector('.column');
  let para = document.querySelectorAll('.card');
  let paraArr = [].slice.call(para).sort(function (a, b) {
    return a.querySelector('.created').textContent > b.querySelector('.created').textContent ? 1 : -1;
  });
  paraArr.forEach(function (p) {
    div.appendChild(p);
  });
}

function sortDataDescendind() {
  let div = document.querySelector('.column');
  let para = document.querySelectorAll('.card');
  let paraArr = [].slice.call(para).sort(function (a, b) {
    return a.querySelector('.created').textContent < b.querySelector('.created').textContent ? 1 : -1;
  });
  paraArr.forEach(function (p) {
    div.appendChild(p);
  });
}
function sortByEpisodes() {
  sortDataAscendind();
  let div = document.querySelector('.column');
  let para = document.querySelectorAll('.card');
  let paraArr = [].slice.call(para).sort(function (a, b) {
    return a.querySelectorAll('.persEpisode a').length < b.querySelectorAll('.persEpisode a').length ? 1 : -1;
  });
  paraArr.forEach(function (p) {
    div.appendChild(p);
  });
}

let showLess = document.querySelector('.showLessButton');
showLess.addEventListener('click', showLessCards);
let ascendingButton = document.querySelector('.sortButtonAscending');
ascendingButton.addEventListener("click", sortDataAscendind)
let descendingButton = document.querySelector('.sortButtonDescending');
descendingButton.addEventListener("click", sortDataDescendind)
let episodesSortButton = document.querySelector('.sortButtonEpisodes');
episodesSortButton.addEventListener("click", sortByEpisodes);

window.onload = function deleteElent() {
  let cardsOnPage = document.querySelectorAll('.card');
  cardsOnPage.forEach(function (element, index) {
    newButton = document.createElement('button');
    newButton.innerText = 'X';
    newButton.classList.add('deleteButton')
    newButton.addEventListener('click', event => {
      element.remove();
    });
    element.appendChild(newButton);
  });
}
  