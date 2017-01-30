<template>
	<div id="my-movies">
		<h2>
			<span v-for="genre in genres">{{ genre }}</span>
		</h2>
		<h3>{{ pagination }}/{{ movies.length }}</h3>
		<ul v-if="movies.length" ref="list" @touchstart="onTouchStart($event)" @touchmove="onTouchMove($event)" @touchend="onTouchEnd($event)">
			<li v-for="movie in movies">
				<img :src="movie.backdropImage" alt="">
				{{ movie.title }} - {{ movie.year }} <br>
				<span v-for="rate in movie.customRating">{{ rate }}</span>
			</li>
		</ul>
		<span v-else>Pas de films associés :(</span>
	</div>
</template>

<script>

// import Emitter from '../core/Emitter';
import Axios from 'axios';
import 'gsap';

export default {

	data() {
		return {
			id: Cookie.get('cushy-id'),
			movies: [],
			genres: [],
			slides: [],
			pagination: 1,
			downscale: .8
		};
	},

	computed: {
		paginationIndex() {
			return this.pagination - 1;
		}
	},

	created() {
		Axios.get('http://172.18.34.14:3637/app/' + this.id)
		.then( response => {
			this.movies = response.data.movies;
			this.genres = response.data.genres;
			setTimeout(this.initSlides, 200);
		});
	},

	mounted() {
		this.slideWidth = window.innerWidth * .68;
	},

	methods: {
		initSlides() {
			this.slides = [];
			for (let i = 0; i < this.$refs.list.childNodes.length; i++) {
				const elt = this.$refs.list.childNodes[i];

				if(i != this.paginationIndex) {
					TweenLite.set(elt, {scale: this.downscale});
				}				
				TweenLite.set(elt, {x: (-50 + i * 100) + '%', y: '-50%'});
				this.slides.push({
					elt: elt,
					position: {
						x: elt._gsTransform.x,
						y: elt._gsTransform.yPercent,
					}
				});

			}

			
		},
		onTouchStart(e) {
			this.touches = e.touches ? e.touches[0] : e;
			this.touchOffset = {
				x: this.touches.pageX,
				y: this.touches.pageY,
				time: Date.now()
			};

			this.isScrolling = undefined;
			this.delta = {};
		},

		onTouchMove(e) {
			this.touches = event.touches ? event.touches[0] : event;
			this.pageX = this.touches.pageX;
			this.pageY = this.touches.pageY;

			this.delta = {
				x: this.pageX - this.touchOffset.x,
				y: this.pageY - this.touchOffset.y
			};

			if (typeof this.isScrolling === 'undefined') {
				this.isScrolling = !!(this.isScrolling || Math.abs(this.delta.x) < Math.abs(this.delta.y));
			}

			if (!this.isScrolling && this.touchOffset && Math.abs(this.delta.x) < this.slideWidth) {
				e.preventDefault();

				const percentage = Math.abs(this.delta.x) / (this.slideWidth/100);

				for (let i = 0; i < this.slides.length; i++) {
					TweenLite.to(this.slides[i].elt, .3, {x: this.slides[i].position.x + this.delta.x});
					if(i == this.paginationIndex - 1 && this.delta.x > 0) {
						TweenLite.to(this.slides[i].elt, .3, {scale: this.downscale + ((1 - this.downscale) * percentage/100)});
					}
					else if(i == this.paginationIndex) {
						TweenLite.to(this.slides[i].elt, .3, {scale: 1 - ((1 - this.downscale) * percentage/100)});
					}
					else if(i == this.paginationIndex + 1 && this.delta.x < 0) {
						TweenLite.to(this.slides[i].elt, .3, {scale: this.downscale + ((1 - this.downscale) * percentage/100)});
					}
				}
			}

		},

		onTouchEnd(e) {

			if (!this.isScrolling && this.touchOffset) {
				e.preventDefault();
				
				const orientation = this.delta.x > 0 ? 1 : -1;
				const newPagination = this.pagination - orientation;

				let tempSlides = [];

				if(Math.abs(this.delta.x) > this.slideWidth / 3 && newPagination > 0 && newPagination < this.slides.length + 1) {
					for (let i = 0; i < this.slides.length; i++) {
						TweenLite.to(this.slides[i].elt, .3, {x: this.slides[i].position.x + this.slideWidth * orientation});
						if(i == newPagination - 1) {
							TweenLite.to(this.slides[i].elt, .3, {scale: 1});
						}
						else {
							TweenLite.to(this.slides[i].elt, .3, {scale: this.downscale});
						}

						tempSlides.push({
							elt: this.slides[i].elt,
							position: {
								x: this.slides[i].position.x + this.slideWidth * orientation,
								y: this.slides[i].elt._gsTransform.yPercent,
							}
						});
					}
					this.pagination = newPagination;
				}
				else {
					for (let i = 0; i < this.slides.length; i++) {
						TweenLite.to(this.slides[i].elt, .3, {x: this.slides[i].position.x});
						if(i == this.paginationIndex - 1 && this.delta.x > 0) {
							TweenLite.to(this.slides[i].elt, .3, {scale: this.downscale});
						}
						else if(i == this.paginationIndex) {
							TweenLite.to(this.slides[i].elt, .3, {scale: 1});
						}
						else if(i == this.paginationIndex + 1 && this.delta.x < 0) {
							TweenLite.to(this.slides[i].elt, .3, {scale: this.downscale});
						}

						tempSlides.push({
							elt: this.slides[i].elt,
							position: {
								x: this.slides[i].position.x,
								y: this.slides[i].elt._gsTransform.yPercent,
							}
						});
					}
				}
				this.slides = tempSlides.slice();
			}
		}
	},

	components: {
	}
}

</script>

<style lang="sass">
	@import '../stylesheets/variables.scss';

	#my-movies {
		overflow: hidden;
		width: 100%;
		height: 90%;
		display: flex;
		flex-direction: column;
		h2 {
			display: inline-block;
			margin: auto;
			span {
				&:not(:last-child):after {
					content: ' | ';
				}
			}
		}

		ul {
			position: relative;
			width: 100%;
			flex-grow: 1;
			li {
				position: absolute;
				top: 50%;
				left: 50%;
				width: 68vw;
				flex-shrink: 0;
				img {
					width: 100%;
					height: 75vw;
					object-fit: cover;
				}
			}
		}

	}
</style>