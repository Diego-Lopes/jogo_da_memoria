//criando constantes

const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

startGamer();

function startGamer() {
  //criando os modelos visual das catas
  initializeCards(game.createCardsFromTechs());
}

function initializeCards() {
  let gameBoard = document.getElementById("gameBoard");

  game.cards.forEach((card) => {
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

createCardsFromTechs(techs);

//flip cards
function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add("flip");

    /**chamando a função para verificar se são iguais.
     * colocamos um if quando o match for true, executar outra função
     * de limpar as variáveis.
     */
    if (game.checkMatch()) {
      game.clearCards();
    } else {
      /** caso não, pegamos os id das cartas que estão flipada e
       * removemos a class flip
       */

      setTimeout(() => {
        let firstCardView = document.getElementById(game.firstCard.id);
        let secondCardView = document.getElementById(game.secondCard.id);

        firstCardView.classList.remove("flip");
        secondCardView.classList.remove("flip");
        game.clearCards();
      }, 1000);
    }
  }
}
