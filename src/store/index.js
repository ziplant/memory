import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: [],
    score: 0,
  },
  getters: {
    getBoard(state) {
      return state.board;
    },
    getScore(state) {
      return state.score;
    },
    pairStatusCount: (state) => (completed) => {
      return state.board.filter((el) => el.completed == completed).length / 2;
    },
  },
  mutations: {
    updateBoard(state, data) {
      state.board = data;
      state.score = 0;
    },
    successPair(state, data) {
      state.board.map((el) => {
        if (el.name == data && !el.completed) {
          state.score += this.getters.pairStatusCount(false) * 42;
          return (el.completed = true);
        }
      });
    },
    wrongPair(state) {
      state.score -= this.getters.pairStatusCount(true) * 42;
      if (state.score < 0) state.score = 0;
    },
    flipCard(state, id) {
      if (!id) {
        state.board.map((el) => {
          return (el.hidden = !el.hidden);
        });
      } else {
        state.board.map((el) => {
          if (el.id == id) {
            return (el.hidden = !el.hidden);
          }
        });
      }
    },
  },
  actions: {
    createBoard({ commit }, amt = 9) {
      return new Promise((res, rej) => {
        const deck = [
          "0C",
          "0D",
          "0H",
          "0S",
          "2C",
          "2D",
          "2H",
          "2S",
          "3C",
          "3D",
          "3H",
          "3S",
          "4C",
          "4D",
          "4H",
          "4S",
          "5C",
          "5D",
          "5H",
          "5S",
          "6C",
          "6D",
          "6H",
          "6S",
          "7C",
          "7D",
          "7H",
          "7S",
          "8C",
          "8D",
          "8H",
          "8S",
          "9C",
          "9D",
          "9H",
          "9S",
          "AC",
          "AD",
          "AH",
          "AS",
          "JC",
          "JD",
          "JH",
          "JS",
          "QC",
          "QD",
          "QH",
          "QS",
          "KC",
          "KD",
          "KH",
          "KS",
        ];

        if (amt > deck.length / 2) return;

        let cardIndexes = new Set();

        while (cardIndexes.size < amt) {
          cardIndexes.add(Math.floor(Math.random() * deck.length));
        }

        let board = [];

        cardIndexes.forEach((el) => {
          for (let i = 0; i < 2; i++) {
            let empty = true;
            while (empty) {
              let index = Math.floor(Math.random() * amt * 2);
              if (!board[index]) {
                board[index] = {};
                board[index].id = index + 1;
                board[index].name = deck[el];
                board[index].image = new Image();
                board[index].image.src = require(`@/assets/images/deck/${deck[el]}.png`);
                board[index].image.alt = deck[el];
                board[index].hidden = false;
                board[index].completed = false;
                empty = false;
              }
            }
          }
        });
        commit("updateBoard", board);
        setTimeout(() => {
          res();
        }, 400);
      });
    },
  },
});
