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
			downscale: .7,
			yoffset: window.innerHeight * .03,
			bluroffset: 1.2,
			opacityoffset: .8
		};
	},

	computed: {
		paginationIndex() {
			return this.pagination - 1;
		}
	},

	created() {
	},

	mounted() {
		Axios.get('http://localhost:3637/app/' + this.id)
		.then( response => {
			this.movies = response.data.movies;
			this.genres = response.data.genres;
			this.slideWidth = window.innerWidth * .6;
			this.$nextTick( () => {
				this.initSlides();
			});
		});
	},

	methods: {
		initSlides() {
			this.slides = [];
			for (let i = 0; i < this.$refs.list.childNodes.length; i++) {
				const elt = this.$refs.list.childNodes[i];

				TweenLite.set(elt, {x: (-50 + i * 100) + '%', y: '-50%', width: this.slideWidth});

				if(i != this.paginationIndex) {
					TweenLite.set(elt, {scale: this.downscale, opacity: this.opacityoffset, y: this.yoffset, filter: 'blur(' + this.bluroffset + 'px)'});
				}

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
						TweenLite.to(this.slides[i].elt, .3, {
							scale: this.downscale + ((1 - this.downscale) * percentage/100),
							opacity: this.opacityoffset + ((1 - this.opacityoffset) * percentage/100),
							y: this.yoffset - this.yoffset * percentage/100,
							filter: 'blur(' + this.bluroffset - this.bluroffset * percentage/100 + 'px)'
						});
					}
					else if(i == this.paginationIndex) {
						TweenLite.to(this.slides[i].elt, .3, {
							scale: 1 - ((1 - this.downscale) * percentage/100), 
							opacity: 1 - ((1 - this.opacityoffset) * percentage/100), 
							y: this.yoffset * percentage/100,
							filter: 'blur(' + this.bluroffset * percentage/100+ 'px)'
						});
					}
					else if(i == this.paginationIndex + 1 && this.delta.x < 0) {
						TweenLite.to(this.slides[i].elt, .3, {
							scale: this.downscale + ((1 - this.downscale) * percentage/100), 
							opacity: this.opacityoffset + ((1 - this.opacityoffset) * percentage/100), 
							y: this.yoffset - this.yoffset * percentage/100,
							filter: 'blur(' + this.bluroffset * percentage/100+ 'px)'
						});
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
							TweenLite.to(this.slides[i].elt, .3, {
								scale: 1, 
								opacity: 1, 
								y: 0,
								filter: 'blur(' + 0 + 'px)'
							});
						}
						else {
							TweenLite.to(this.slides[i].elt, .3, {
								scale: this.downscale, 
								opacity: this.opacityoffset, 
								y: this.yoffset,
								filter: 'blur(' + this.bluroffset + 'px)'
							});
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
							TweenLite.to(this.slides[i].elt, .3, {
								scale: this.downscale,
								opacity: this.opacityoffset, 
								y: this.yoffset,
								filter: 'blur(' + this.bluroffset + 'px)'
							});
						}
						else if(i == this.paginationIndex) {
							TweenLite.to(this.slides[i].elt, .3, {
								scale: 1,
								opacity: 1,
								y: 0,
								filter: 'blur(' + 0 + 'px)'
							});
						}
						else if(i == this.paginationIndex + 1 && this.delta.x < 0) {
							TweenLite.to(this.slides[i].elt, .3, {
								scale: this.downscale, 
								opacity: this.opacityoffset, 
								y: this.yoffset,
								filter: 'blur(' + this.bluroffset + 'px)'
							});
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
				flex-shrink: 0;
				img {
					width: 100%;
					height: auto;
					object-fit: cover;
				}
			}
		}

	}
</style>