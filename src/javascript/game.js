let game = {
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
