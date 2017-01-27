<template>
	<div id="my-movies">
		<h2>
			<span v-for="genre in genres">{{ genre }}</span>
		</h2>
		<br>
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
			slides: []
		};
	},

	created() {
		Axios.get('http://localhost:3637/app/' + this.id)
		.then( response => {
			this.movies = response.data.movies;
			this.genres = response.data.genres;
			setTimeout(this.initSlides, 200);
		});
	},

	mounted() {
	},

	methods: {
		initSlides() {
			for (let i = 0; i < this.$refs.list.childNodes.length; i++) {
				const elt = this.$refs.list.childNodes[i];

				TweenLite.set(elt, {x: (-50 + i * 10) + '%', y: '-50%'});

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

			this.slides = [];
			
			for (let i = 0; i < this.$refs.list.childNodes.length; i++) {
				const elt = this.$refs.list.childNodes[i];
				this.slides.push({
					elt: elt,
					position: {
						x: elt._gsTransform.x,
						y: elt._gsTransform.yPercent,
					}
				});
			}

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

			if (!this.isScrolling && this.touchOffset) {
				e.preventDefault();
				for (let i = 0; i < this.slides.length; i++) {
					TweenLite.to(this.slides[i].elt, 1, {x: this.slides[i].position.x + this.delta.x});
				}
			}

		},

		onTouchEnd(e) {
			console.log('onTouchEnd');
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
			height: 100%;
			li {
				position: absolute;
				top: 50%;
				left: 50%;
				width: 75vw;
				flex-shrink: 0;
				img {
					width: 100%;
					height: 75vw;
					object-fit: cover;
				}
				&:nth-child(2) {
					left: 125%;
					transform: scale(.8);
				}
				&:nth-child(3) {
					left: 200%;
					transform: scale(.8);
				}
				&:nth-child(4) {
					left: 275%;
					transform: scale(.8);
				}
				&:nth-child(5) {
					left: 350%;
					transform: scale(.8);
				}
			}
		}

	}
</style>