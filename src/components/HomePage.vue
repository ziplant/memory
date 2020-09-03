<template lang="pug">
	.homepage
		img.homepage_image(
			src="../assets/images/homepage-logo.png" 
			alt="Cards image"
		)
		h2.homepage_title.title memory game
		button.homepage_btn.btn(
			@click="$emit('switchPage', 'game')"
		) Start game
</template>

<script>
export default {};
</script>

<style lang="sass">
.homepage
	&_image
		min-width: 190px
		max-width: 35vw
		pointer-events: none
	&_title
		text-transform: uppercase
		margin: 20px 0
	&_btn
</style>
