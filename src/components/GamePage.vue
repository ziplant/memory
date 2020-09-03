<template lang="pug">
.gamepage(:class="{ hidden: !loaded }")
	.gamepage_head
		button.gamepage_retry(@click="restartGame()") Retry
		.gamepage_score Score:
			span.score-points {{ getScore }}

	.gamepage_board
		Card(
			v-for="item in board",
			:key="getBoard.id",
			:card="item",
			@cardFlipped="cardFlipped"
		)
</template>

<script>
import Card from "./Card";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
	data() {
		return {
			board: [],
			loaded: false,
			flippedCard: null,
			comparedCard: null,
			sleep: false,
			timer: null,
			clickSound: new Audio(require("../assets/sounds/click.mp3")),
			winSound: new Audio(require("../assets/sounds/win.mp3")),
		};
	},
	computed: {
		...mapGetters(["getBoard", "getScore", "pairStatusCount"]),
	},
	methods: {
		...mapActions(["createBoard", "clearBoard"]),
		...mapMutations(["flipCard", "successPair", "wrongPair"]),
		closeCards() {
			this.sleep = false;
			if (this.flippedCard.name == this.comparedCard.name) {
				this.successPair(this.comparedCard.name);
			} else {
				this.wrongPair();
			}
			this.flipCard(this.comparedCard.id);
			this.flipCard(this.flippedCard.id);
			this.flippedCard = this.comparedCard = null;
			if (this.pairStatusCount(false) == 0) {
				this.winSound.load();
				this.winSound.play();
				this.$emit("switchPage", "end");
			}
		},
		cardFlipped(card) {
			if (this.sleep) return;
			this.clickSound.load();
			this.clickSound.play();
			this.flipCard(card.id);
			if (this.flippedCard) {
				this.comparedCard = card;
				this.sleep = true;
				setTimeout(this.closeCards.bind(this), 500);
			} else {
				this.flippedCard = card;
			}
		},
		async renderBoard() {
			this.loaded = false;
			this.board = [];
			await this.createBoard().then(() => {
				this.loaded = true;
				this.board = this.getBoard;
				this.timer = setTimeout(this.flipCard, 3000);
			});
		},
		async restartGame() {
			clearTimeout(this.timer);
			await this.renderBoard();
		},
	},
	async created() {
		await this.renderBoard();
	},
	components: {
		Card,
	},
};
</script>

<style lang="sass">
.gamepage
	box-sizing: border-box
	width: 60vw
	display: flex
	flex-direction: column
	@media screen and (max-width: 600px)
		width: 80vw
	&_head
		display: flex
		justify-content: space-between
		align-items: center
		font-size: 14px
		margin: 5px 0.8vw 20px
		min-height: 21px
	&_retry
		font-weight: 600
		opacity: 0.8
		cursor: pointer
		color: #fff
		transition-duration: 0.2s
		background-color: transparent
		border: none
		padding: 0
		&:hover
			opacity: 1

	&_score
		font-weight: bold
		opacity: 0.8
	&_board
		display: flex
		flex-wrap: wrap

.score-points
	font-family: Krungthep, OpenSans, sans-serif
	width: 18px
	text-align: right
	display: inline-block
	font-weight: normal
</style>
