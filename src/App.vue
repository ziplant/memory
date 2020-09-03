<template lang="pug">
#app
	HomePage(v-if="page == 'home'", @switchPage="setPage")
	GamePage(v-else-if="page == 'game'", @switchPage="setPage")
	EndPage(v-else-if="page == 'end'", @switchPage="setPage")
</template>

<script>
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import EndPage from "./components/EndPage";
import Card from "./components/Card";

export default {
	name: "App",
	data() {
		return {
			page: "home",
		};
	},
	methods: {
		setPage(to) {
			this.page = to;
		},
	},
	components: {
		HomePage,
		GamePage,
		EndPage,
		Card,
	},
};
</script>

<style lang="sass">
@import /assets/styles/_fontface

$bgColor: #1b692d
$bgCenterColor: #1C7430
$textColor: #fff
$shadowColor: rgba(0,0,0,1)
$fontSize: 16px

html
	font-size: $fontSize

h2,
body
	margin: 0

img
	pointer-events: none
#app
	display: flex
	align-items: center
	justify-content: center
	font-family: 'OpenSans', sans-serif
	height: 100vh
	color: $textColor
	user-select: none
	background: radial-gradient(circle, $bgCenterColor, $bgColor)
	text-align: center
	overflow: auto
	& > *
		max-height: 100vh
.score

.title
	font-size: 1.75rem
	font-weight: bold
	&--smaller
		font-size: 1.5rem

.btn
	color: $bgColor
	font-weight: bold
	border: none
	outline: none
	border-radius: 4px
	font-size: 1rem
	opacity: .9
	cursor: pointer
	transition-duration: 0.15s
	padding: 8px 20px
	margin: 14px 0px 20px
	background: #fff
	&:hover
		box-shadow: 0px 0px 5px -1px $shadowColor, inset 0px 0px 13px 0px $bgColor
		color: $textColor
		background-color: $bgColor

.hidden
	visibility: hidden
	opacity: 0
</style>
