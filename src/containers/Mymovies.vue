<template>
	<div id="my-movies">
		<div class="header">
			<div class="switch" @click="switchList()">
				
			</div>
			<h2>
				{{ mood.title }}
			</h2>
			<h3>
				{{ mood.subtitle }}
			</h3>
		</div>
		<ul v-if="currentList.length" ref="list" @touchstart="onTouchStart($event)" @touchmove="onTouchMove($event)" @touchend="onTouchEnd($event)">
			<li v-for="movie in currentList">
				<img class="poster" :src="movie.backdropImage" alt="">
			</li>
		</ul>
		<span v-else>Pas de films associés :(</span>
		<div v-if="current" id="movie-description">
			<h2 id="movie-title" ref="title">{{ current.title }}</h2>
			<div class="rating">
				<span v-for="rate in current.customRating">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.09 57.15">
						<polygon :class="rate" points="30.04 0 37.13 21.83 60.09 21.83 41.52 35.32 48.61 57.15 30.04 43.66 11.47 57.15 18.57 35.32 0 21.83 22.95 21.83 30.04 0"/>
					</svg>
				</span>
			</div>
			<div class="time">
				<span v-if="current.hours">{{ current.hours }}h{{ current.minutes }}</span>
				<span v-else>{{ current.minutes }} minutes</span>
			</div>
		</div>
		<div id="actions">
			
		</div>
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
			currentList: [],
			movies: [],
			genres: [],
			slides: [],
			delta: {
				x: 0,
				y: 0
			},
			pagination: 1,
			downscale: .7,
			yoffset: window.innerHeight * .05,
			bluroffset: 1.2,
			opacityoffset: .5,
			current: null,
			orientation: 0,
			mood: {
				title: "",
				subtitle: ""
			}
		};
	},

	computed: {
		paginationIndex() {
			return this.pagination - 1;
		}
	},

	watch: {
		currentList: function() {
			this.$nextTick( () => {
				this.initSlides();
			});
		},

		current: function() {
			if(this.$refs.title){
				TweenLite.fromTo(this.$refs.title, .3, {
					opacity: 0,
					scale: .65,
					x: this.orientation * -1 * window.innerWidth * .4
				}, {
					opacity: 1,
					scale: 1,
					x: 0
				});
			}
		}
	},

	created() {
	},

	mounted() {
		Axios.get('http://localhost:3637/app/' + this.id)
		.then( response => {
			this.movies = response.data.movies;
			this.shows = response.data.shows;
			this.genres = response.data.genres;
			this.mood = response.data.mood;
			this.slideWidth = window.innerWidth * .668;

			this.currentList = this.shows;

		});
	},

	methods: {
		initSlides() {
			this.slides = [];
			this.pagination = 1;
			for (let i = 0; i < this.$refs.list.childNodes.length; i++) {
				const elt = this.$refs.list.childNodes[i];

				TweenLite.set(elt, {x: (-50 + i * 100) + '%', y: '-50%', width: this.slideWidth});

				if(i != this.paginationIndex) {
					TweenLite.set(elt, {scale: this.downscale, y: this.yoffset, filter: 'blur(' + this.bluroffset + 'px) brightness(' + this.opacityoffset + ')'});
				}

				this.slides.push({
					elt: elt,
					position: {
						x: elt._gsTransform.x,
						y: elt._gsTransform.yPercent,
					}
				});

			}

			this.resetSlides();

			this.current = this.currentList[this.paginationIndex];
			
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
				this.orientation = this.delta.x > 0 ? 1 : -1;

				const percentage = Math.abs(this.delta.x) / (this.slideWidth/100);

				for (let i = 0; i < this.slides.length; i++) {
					TweenLite.to(this.slides[i].elt, .3, {x: this.slides[i].position.x + this.delta.x});
					if(i == this.paginationIndex - 1 && this.delta.x > 0) {
						TweenLite.to(this.slides[i].elt, .3, {
							scale: this.downscale + ((1 - this.downscale) * percentage/100),
							y: this.yoffset - this.yoffset * percentage/100,
							filter: 'blur(' + this.bluroffset - this.bluroffset * percentage/100 + 'px) brightness(' + this.opacityoffset + ((1 - this.opacityoffset) * percentage/100) + ')'
						});
					}
					else if(i == this.paginationIndex) {
						TweenLite.to(this.slides[i].elt, .3, {
							scale: 1 - ((1 - this.downscale) * percentage/100), 
							y: this.yoffset * percentage/100,
							filter: 'blur(' + this.bluroffset * percentage/100+ 'px) brightness(' + 1 - ((1 - this.opacityoffset) * percentage/100) + ')'
						});
					}
					else if(i == this.paginationIndex + 1 && this.delta.x < 0) {
						TweenLite.to(this.slides[i].elt, .3, {
							scale: this.downscale + ((1 - this.downscale) * percentage/100), 
							y: this.yoffset - this.yoffset * percentage/100,
							filter: 'blur(' + this.bluroffset * percentage/100+ 'px) brightness(' + this.opacityoffset + ((1 - this.opacityoffset) * percentage/100) + ')'
						});
					}
				}
			}

		},

		onTouchEnd(e) {

			if (!this.isScrolling && this.touchOffset) {
				e.preventDefault();
				
				const newPagination = this.pagination - this.orientation;

				let tempSlides = [];

				if(Math.abs(this.delta.x) > this.slideWidth / 3 && newPagination > 0 && newPagination < this.slides.length + 1) {
					for (let i = 0; i < this.slides.length; i++) {
						TweenLite.to(this.slides[i].elt, .3, {x: this.slides[i].position.x + this.slideWidth * this.orientation});
						if(i == newPagination - 1) {
							TweenLite.to(this.slides[i].elt, .3, {
								scale: 1,
								y: 0,
								filter: 'blur(' + 0 + 'px) brightness(1)'
							});
						}
						else {
							TweenLite.to(this.slides[i].elt, .3, {
								scale: this.downscale, 
								y: this.yoffset,
								filter: 'blur(' + this.bluroffset + 'px) brightness(' + this.opacityoffset + ')'
							});
						}

						tempSlides.push({
							elt: this.slides[i].elt,
							position: {
								x: this.slides[i].position.x + this.slideWidth * this.orientation,
								y: this.slides[i].elt._gsTransform.yPercent,
							}
						});
					}
					this.pagination = newPagination;
					this.current = this.currentList[this.paginationIndex];
				}
				else {
					tempSlides = this.resetSlides();
				}
				this.slides = tempSlides.slice();
			}
		},

		resetSlides() {
			let tempSlides = [];
			for (let i = 0; i < this.slides.length; i++) {
				TweenLite.to(this.slides[i].elt, .3, {x: this.slides[i].position.x});
				if(i == this.paginationIndex - 1 && this.delta.x > 0) {
					TweenLite.to(this.slides[i].elt, .3, {
						scale: this.downscale, 
						y: this.yoffset,
						filter: 'blur(' + this.bluroffset + 'px) brightness(' + this.opacityoffset + ')'
					});
				}
				else if(i == this.paginationIndex) {
					TweenLite.to(this.slides[i].elt, .3, {
						scale: 1,
						opacity: 1,
						y: 0,
						filter: 'blur(' + 0 + 'px) brightness(1)'
					});
				}
				else if(i == this.paginationIndex + 1 && this.delta.x < 0) {
					TweenLite.to(this.slides[i].elt, .3, {
						scale: this.downscale, 
						y: this.yoffset,
						filter: 'blur(' + this.bluroffset + 'px) brightness(' + this.opacityoffset + ')'
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
			return tempSlides;
		},

		switchList() {
			if(this.currentList == this.movies)
				this.currentList = this.shows;
			else
				this.currentList = this.movies;
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
		height: 100%;
		display: flex;
		flex-direction: column;
		background: linear-gradient( -10deg, $grey 40%, $romance 40%, $romance );

		.header {
			display: inline-block;
			width: 100%;
			text-align: center;
			margin: $margin 0;
			color: white;

			.switch {
				position: absolute;
				top: $margin;
				left: $margin;
				width: 10vw;
				height: 10vw;
				background: red;
			}

			h3 {
				color: rgba(255,255,255, 0.4);
			}
		}

		h2 {
			display: block;
			margin: auto;
			text-transform: uppercase;
			letter-spacing: .2em;
			margin: .5em 0
		}

		h3 {
			display: block;
			font-weight: 400;
			margin: auto;
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
				.poster {
					border-radius: 1.5vw;
					width: 100%;
					height: auto;
					object-fit: cover;
					box-shadow: 0 1vw 6px rgba(0,0,0,.2);
				}
			}
		}

		#movie-description {
			width: 100%;
			text-align: center;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			#movie-title {
				display: inline-block;
				flex-basis: 100%;
			}
			.time, .rating {
				flex-grow: 1;
				svg {
					display: inline-block;
					width: 1em;
					height: 1em;
					margin: 0 .3em;
					fill: $darker-grey;
					.starred {
						fill: $romance;
					}
				}
			}
		}

		#actions {
			height: 20vh;
		}

	}
</style>