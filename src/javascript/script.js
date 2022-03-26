//criando constantes

const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
let cards = null;

let techs = [
  "bootstrap",
  "css",
  "electron",
  "firebase",
  "html",
  "javascript",
  "jquery",
  "mongo",
  "node",
  "react",
];

startGamer();

function startGamer() {
  cards = createCardsFromTechs(techs);
  shuffleCards(cards);

  //criando os modelos visual das catas
  initializeCards(cards);
}

function initializeCards(cards) {
  let gameBoard = document.getElementById("gameBoard");

  cards.forEach((card) => {
    //criando elemento
    let cardElement = document.createElement("div");
    cardElement.id = card.id; //add id
    cardElement.classList.add(CARD); //add class
    cardElement.dataset.icon = card.icon; //add icon

    createCardContent(card, cardElement);

    cardElement.addEventListener("click", flipCard);

    gameBoard.appendChild(cardElement);
  });
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement("div");

  cardElementFace.classList.add(face);

  if (face === FRONT) {
    let iconElement = document.createElement("img");

    iconElement.classList.add(ICON);
    iconElement.src = "src/assets/images/" + card.icon + ".png";
    cardElementFace.appendChild(iconElement);
  } else {
    cardElementFace.innerHTML = "&lt/&gt";
  }

  element.appendChild(cardElementFace);
}

//embaralhando as cartas
function shuffleCards(cards) {
  let currentIndex = cards.length;
  let randomIndex = 0;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [cards[randomIndex], cards[currentIndex]] = [
      cards[currentIndex],
      cards[randomIndex],
    ]; //inversão de valores
  }
}

createCardsFromTechs(techs);

//criando o modelo da carta
function createCardsFromTechs(techs) {
  //criando as cards
  let cards = [];

  // for (let tech of techs) {
  //   cards.push(createPairFromTech(tech));
  // }

  techs.forEach((tech) => {
    cards.push(createPairFromTech(tech));
  });

  /** flatMap ele desmebra qualquer array
   * isolada e pega seu conteúdo e
   * coloca em uma única */
  return cards.flatMap((pair) => pair);
}

function createPairFromTech(tech) {
  //conteúdo da card
  return [
    {
      id: createIdWithTech(tech),
      icon: tech,
      flipped: false,
    },
    {
      id: createIdWithTech(tech),
      icon: tech,
      flipped: false,
    },
  ];
}

function createIdWithTech(tech) {
  return tech + parseInt(Math.random() * 1000); //sendo o id.
}

//flip cards
function flipCard() {
  this.classList.add("flip");
}
