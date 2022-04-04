let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,

  techs: [
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
  ],

  cards: null,

  //configurando a carta escolhida.
  setCard: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0];
    //vai fazer um filtro e retornar um array e queremos apenas o index zero.

    //condição, se a carta já for virada ou em lockMode retornar false.
    if (card.flipped || this.lockMode) {
      return false;
    }

    //depois de passar desse condições acima
    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      // se a firstCard estiver preenchido vai para secondCard
      this.secondCard = card;
      this.lockMode = true; //e em seguida é feito o lockMode.
      this.secondCard.flipped = true;
      return true;
    }
  },

  //criando função de matchCard.
  checkMatch: function () {
    //verificar se a carta 2 está selecionada.
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  //função de liberar as cartas em verificação da condição.
  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflipCards: function () {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver() {
    return this.cards.filter((card) => !card.flipped).length == 0;
  },

  //criando o modelo da carta
  createCardsFromTechs: function () {
    //criando as cards
    this.cards = [];

    // for (let tech of techs) {
    //   cards.push(createPairFromTech(tech));
    // }

    this.techs.forEach((tech) => {
      this.cards.push(this.createPairFromTech(tech));
    });

    /** flatMap ele desmebra qualquer array
     * isolada e pega seu conteúdo e
     * coloca em uma única */
    this.cards = this.cards.flatMap((pair) => pair);
    this.shuffleCards();

    return this.cards;
  },

  createPairFromTech: function (tech) {
    //conteúdo da card
    return [
      {
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false,
      },
      {
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false,
      },
    ];
  },

  createIdWithTech: function (tech) {
    return tech + parseInt(Math.random() * 1000); //sendo o id.
  },

  //embaralhando as cartas
  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex],
      ]; //inversão de valores
    }
  },
};
