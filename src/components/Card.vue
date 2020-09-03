<template lang="pug">
.card(
	@click="checkCard",
	:class="{ 'card--flipped': !card.hidden, 'card--hidden': card.completed }"
)
	.card_inner
		.card_front
			img.card_image(src="../assets/images/backcard.png", alt="backcard")
		.card_back
</template>

<script>
export default {
	props: {
		card: {
			type: Object,
			required: true,
		},
		hideCard: {
			type: Boolean,
		},
	},
	data() {
		return {};
	},
	methods: {
		checkCard() {
			if (this.$el.className.includes("card--flipped")) return;

			this.$emit("cardFlipped", this.card);
		},
	},
	mounted() {
		this.card.image.classList.add("card_image");
		this.$el.querySelector(".card_back").appendChild(this.card.image);

		// setTimeout(this.flipCard.bind(this), 2000);
	},
};
</script>

<style lang="sass">
.card
  width: 8.4vw
  margin: 0.8vw
  perspective: 1000px
  transition: opacity .25s
  @media screen and (max-width: 600px)
    width: 11.73vw
    margin: .8vw
  &_inner
    position: relative
    width: 100%
    height: 100%
    text-align: center
    transition: transform 0.5s
    transform-style: preserve-3d
  &_front

  &_image
    float: left
    width: 100%
  &_back
    position: absolute
    width: 100%
    height: 100%
    -webkit-backface-visibility: hidden
    backface-visibility: hidden
  &_back
    transform: rotateY(180deg)
  &:hover
    opacity: .8
    .card
      &_inner
        cursor: pointer
  &--flipped
    .card
      &_inner
        transform: rotateY(180deg)
        &:hover
          cursor: default
    &:hover
      opacity: 1
  &--hidden
    opacity: 0
    visibility: hidden
</style>
