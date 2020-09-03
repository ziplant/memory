<template lang="pug">
.endpage
	img.endpage_image(src="../assets/images/endpage-logo.png", alt="Cards image")
	h2.endpage_title.title Congratulations!
	.endpage_score.title.title--smaller Your score: {{ getScore }}
	button.endpage_btn.btn(@click="$emit('switchPage', 'game')") Play again
</template>

<script>
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters(["getScore"]),
	},
};
</script>

<style lang="sass">
.endpage
	&_image
		min-width: 190px
		max-width: 40vw
	&_title
		margin-top: 20px
	&_score
		margin-bottom: 20px
	&_btn
</style>
