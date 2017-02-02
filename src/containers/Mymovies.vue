<template>
	<div id="my-movies">
		<div class="bg" :class="genres[0]" ref="bg"></div>
		<div class="header" ref="header">
			<div class="switch" @click="switchList()">
				<svg :class="genres[0]" v-if="currentList == shows" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ref="movies-icon" viewBox="0 0 27 27">
					<path d="M1.9,23.8h20.9V11.9H1.9V23.8z M5.2,5.4L3.7,7.9l-2,0.5l-0.5-2L5.2,5.4z M22.1,3.3l-3.9,1l1.5-2.5
						c0,0,0,0,0,0l1.9-0.5L22.1,3.3z M15.8,9.1h3.6l-2,2c0,0,0,0,0,0h-3.6L15.8,9.1z M11.2,9.1h3.6l-2,2c0,0,0,0,0,0H9.1L11.2,9.1z
						 M6.5,9.1h3.6l-2,2c0,0,0,0,0,0H4.5L6.5,9.1z M3.5,11.2H1.9V9.1h3.6L3.5,11.2C3.5,11.2,3.5,11.2,3.5,11.2L3.5,11.2z M18.7,2
						l-1.5,2.5l-3.5,0.9l1.5-2.5L18.7,2z M14.2,3.1l-1.5,2.5L9.2,6.5L10.7,4L14.2,3.1z M9.7,4.3L8.2,6.7L4.7,7.6l1.5-2.5L9.7,4.3z
						 M22.8,11.2h-4.5l2.1-2.1h2.4V11.2z M23.5,8.8c0-0.2-0.2-0.4-0.4-0.4H4.4l18.2-4.5c0.1,0,0.2-0.1,0.2-0.2c0-0.1,0.1-0.2,0-0.3
						l-0.7-2.7c0-0.2-0.2-0.3-0.4-0.3l-21,5.3c-0.1,0-0.2,0.1-0.2,0.2c0,0.1-0.1,0.2,0,0.3l0.7,2.6v15.3c0,0.2,0.2,0.4,0.4,0.4h21.7
						c0.2,0,0.4-0.2,0.4-0.4V8.8z"/>
					<path d="M10,18.7h4.3v-4.1H10V18.7z M19.1,18.7h-4v-4.1h4c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4H5.4
						c-0.2,0-0.4,0.2-0.4,0.4c0,0.2,0.2,0.4,0.4,0.4h3.9v4.1H5.4c-0.2,0-0.4,0.2-0.4,0.4c0,0.2,0.2,0.4,0.4,0.4h13.7
						c0.2,0,0.4-0.2,0.4-0.4C19.5,18.9,19.3,18.7,19.1,18.7L19.1,18.7z"/>
					<path d="M19.1,21.1H5.4c-0.2,0-0.4,0.2-0.4,0.4c0,0.2,0.2,0.4,0.4,0.4h13.7c0.2,0,0.4-0.2,0.4-0.4
						C19.5,21.3,19.3,21.1,19.1,21.1"/>
				</svg>
				<svg :class="genres[0]" v-else version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27 27">
					<path d="M23.4,25.2H2.7C1.2,25.2,0,24,0,22.5V8.3c0-1.5,1.2-2.7,2.7-2.7h20.7c1.5,0,2.7,1.2,2.7,2.7v14.2
						C26.1,24,24.9,25.2,23.4,25.2z"/>
					<polygon points="2.7,22.2 18.7,22.2 18.7,8.6 2.7,8.6 "/>
					<polyline points="13.7,0 17.6,5.6 22.2,1.3 "/>
					<path d="M23.9,10c0,0.8-0.6,1.4-1.4,1.4S21,10.8,21,10s0.6-1.4,1.4-1.4S23.9,9.2,23.9,10z"/>
					<path d="M23.9,15c0,0.8-0.6,1.4-1.4,1.4S21,15.8,21,15c0-0.8,0.6-1.4,1.4-1.4S23.9,14.2,23.9,15z"/>
				</svg>
			</div>
			<h2>
				{{ mood.title }}
			</h2>
			<h3>
				{{ mood.subtitle }}
			</h3>
		</div>
		<ul v-if="currentList.length" ref="list" @touchstart="onTouchStart($event)" @touchmove="onTouchMove($event)" @touchend="onTouchEnd($event)">
			<li v-for="current in currentList">
				<img class="poster" :src="current.backdropImage" alt="">
				<div class="trailer" ref="trailer" v-if="current.trailer">
					<iframe :src="'https://www.youtube.com/embed/' + current.trailerId" frameborder="0" allowfullscreen></iframe>
				</div>
			</li>
		</ul>
		<span v-else>Pas de films associés :(</span>
		<div v-if="current" id="movie-description" ref="description" @touchstart="onDetailsTouchStart($event)" @touchmove="onDetailsTouchMove($event)" @touchend="onDetailsTouchEnd($event)">
			<h2 id="movie-title" ref="title">{{ current.title }}</h2>
			<div class="line">
				<div class="rating">
					<span v-for="rate in current.customRating">
						<svg :class="genres[0]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.09 57.15">
							<polygon :class="rate" points="30.04 0 37.13 21.83 60.09 21.83 41.52 35.32 48.61 57.15 30.04 43.66 11.47 57.15 18.57 35.32 0 21.83 22.95 21.83 30.04 0"/>
						</svg>
					</span>
				</div>
				<div class="time">
					<span v-if="current.hours">{{ current.hours }}h{{ current.minutes }}</span>
					<span v-else>{{ current.minutes }} minutes</span>
				</div>
			</div>
			<div class="overview" ref="overview">
				{{ current.overview }}
			</div>
			<div class="crew" ref="crew">
				<!-- {{ current.authors }} -->
			</div>
			<div class="cast" ref="cast">
				<h4>With</h4>
				<span v-for="character in current.cast">{{ character.name }}</span>
			</div>
		</div>
		<div id="actions">
			<div>
				<svg @click="discard()" id="discard" viewBox="0 0 38 38" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<circle fill="#E5E5E5" cx="19" cy="19" r="19"></circle>
					<path d="M19.3575317,19 L24.9259556,13.4315761 C25.0247489,13.3328839 25.0247489,13.1728125 24.9259556,13.0740191 C24.8273645,12.975327 24.6671919,12.975327 24.5684997,13.0740191 L19.0000758,18.6425442 L13.4315508,13.0740191 C13.3328586,12.975327 13.1726861,12.975327 13.074095,13.0740191 C12.9753017,13.1728125 12.9753017,13.3328839 13.074095,13.4315761 L18.64262,19 L13.074095,24.568525 C12.9753017,24.6672172 12.9753017,24.8272887 13.074095,24.9259809 C13.1234411,24.975327 13.1881573,25 13.2527723,25 C13.3174885,25 13.3822047,24.975327 13.4315508,24.9259809 L19.0000758,19.3574558 L24.5684997,24.9259809 C24.6178458,24.975327 24.682562,25 24.7472782,25 C24.8118933,25 24.8767106,24.975327 24.9259556,24.9259809 C25.0247489,24.8272887 25.0247489,24.6672172 24.9259556,24.568525 L19.3575317,19 Z" stroke="#D9D9D9" stroke-width="1.5" fill="#D9D9D9"></path>
				</svg>
				<svg @click="like()" viewBox="0 0 75 75" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<circle id="Button-Copy-2" fill="#E5E5E5" cx="37.5" cy="37.5" r="37.5"></circle>
					<path d="M52.6066451,26.7460554 C50.7852003,24.9752168 48.4070867,24 45.9087356,24 C43.2170915,24 40.6163864,25.1647049 38.7732532,27.1961847 L37.3452435,28.7722082 L35.9153313,27.1954237 C34.0725786,25.1647049 31.4722541,24 28.7798489,24 C26.2818784,24 23.9030037,24.9752168 22.0804174,26.7464359 C18.1483492,30.5750086 17.9546757,37.0042864 21.6489325,41.0782804 C21.659206,41.0896953 21.6698599,41.1014908 21.6808944,41.1125252 L36.3395868,56.2605384 C36.6158285,56.545912 36.9773018,56.6878378 37.338014,56.6878378 C37.6991068,56.6878378 38.0605801,56.5455315 38.3360608,56.2609189 L53.0054072,41.1125252 C53.0160611,41.1014908 53.0267151,41.0896953 53.037369,41.0782804 C56.7323869,37.0065694 56.5390938,30.5776721 52.6066451,26.7460554 Z" id="Page-1-Copy" stroke="#C51DB0" stroke-width="2"></path>
				</svg>
			</div>
			<div>
				<svg @click="play()" viewBox="0 0 75 75" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<circle fill="#E5E5E5" cx="37.5" cy="37.5" r="37.5"></circle>
					<circle fill="#C51DB0" cx="37.5" cy="37.5" r="31.5"></circle>
					<path d="M29.0341876,22.4734126 L29.0341876,52.5266964 L52.0003908,37.4999511 L29.0341876,22.4734126 Z M28.5170938,54 C28.4327041,54 28.3481075,53.9793162 28.271164,53.9377419 C28.1040393,53.8473539 28,53.6727831 28,53.4829062 L28,21.5172028 C28,21.327326 28.1040393,21.1527551 28.271164,21.0623671 C28.437875,20.9719791 28.6409895,20.9802526 28.8002543,21.0844987 L53.2279714,37.0674539 C53.3739987,37.1628059 53.4619047,37.3255871 53.4619047,37.4999511 C53.4619047,37.674522 53.3739987,37.8373031 53.2279714,37.9326552 L28.8002543,53.9156103 C28.7146236,53.9716633 28.6159621,54 28.5170938,54 L28.5170938,54 Z" id="Fill-1" stroke="#F5F5F5" fill="#F5F5F5"></path>
				</svg>
			</div>
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
			},
			details: false
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
					y: window.innerWidth * .03
				}, {
					opacity: 1,
					y: 0
				});
			}
		}
	},

	created() {
	},

	mounted() {
		const url = __PROD__ ? 'https://coussflix.thomasboulongne.com' : 'http://localhost:3637';
		Axios.get(url + '/app/' + this.id)
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
					TweenLite.set(elt, {
						scale: this.downscale,
						y: this.yoffset,
						filter: 'blur(' + this.bluroffset + 'px) brightness(' + this.opacityoffset + ')'
					});
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

			if (!this.isScrolling && this.touchOffset && Math.abs(this.delta.x) < this.slideWidth && !this.details) {
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
				
				if(Math.abs(this.delta.x) > 0 && !this.details) {

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
				else {
					if(!this.details)
						this.openDetails();
					else
						this.closeDetails();
				}
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
		},

		discard() {
			if(this.currentList == this.movies) {
				const index = this.movies.indexOf(this.current);
				if (index > -1) {
					this.movies.splice(index, 1);
				}
				this.currentList = this.movies;
			}
			else {
				const index = this.shows.indexOf(this.current);
				if (index > -1) {
					this.shows.splice(index, 1);
				}
				this.currentList = this.shows;
			}
		},

		play() {

			window.open('https://www.netflix.com/search?q=' + this.current.title, '_blank');
		},

		onDetailsTouchStart(e) {
			if(this.details) {
				this.detailsTouches = e.touches ? e.touches[0] : e;
				this.detailsTouchOffset = {
					x: this.detailsTouches.pageX,
					y: this.detailsTouches.pageY,
					time: Date.now()
				};

				this.detailsIsScrolling = undefined;
				this.detailsDelta = {};
			}
		},

		onDetailsTouchMove(e) {
			if(this.details) {
				this.detailsTouches = event.touches ? event.touches[0] : event;
				this.detailsPageX = this.detailsTouches.pageX;
				this.detailsPageY = this.detailsTouches.pageY;

				this.detailsDelta = {
					x: this.detailsPageX - this.detailsTouchOffset.x,
					y: this.detailsPageY - this.detailsTouchOffset.y
				};

				this.detailsOrientation = this.detailsDelta.x > 0 ? 1 : -1;
			}

		},

		onDetailsTouchEnd(e) {

			if (this.details && this.detailsDelta.y > window.innerHeight * .15) {
				e.preventDefault();
				this.closeDetails();
			}
		},

		openDetails() {

			this.detailsTl = new TimelineLite({
				paused: true,
				onStart: () => {
					this.details = true;
				},
				onReverseComplete: () => {
					this.details = false;
				}
			});
			for (let i = 0; i < this.slides.length; i++) {
				const slide = this.slides[i];
				if(i == this.paginationIndex) {
					this.detailsTl.to(slide.elt, .4, {
						top: 0,
						left: 0,
						x: '0%',
						y: '0%',
						height: window.innerHeight * .3,
						width: window.innerWidth,
						borderRadius: 0
					}, 0)
					.set(slide.elt.childNodes[0], {
						height: '100%',
						borderRadius: 0
					}, 0)
					.to(this.$refs.header, .4, {
						height: 0,
						margin: 0
					}, 0)
					.to(this.$refs.list, .4, {
						flexGrow: 0,
						height: window.innerHeight * .3
					}, 0)
					.fromTo(this.$refs.description, .4, {
						flexGrow: 0
					}, {
						flexGrow: 1
					}, 0)
					.to(this.$refs.bg, .4, {
						height: '40%'
					}, 0)
					.fromTo(this.$refs.overview, .4,{
						display: 'none',
						opacity: 0,
						y: window.innerHeight * .05
					}, {
						display: 'block',
						opacity: 1,
						y: 0
					}, "-= 0.2")
					.fromTo(this.$refs.crew, .4,{
						display: 'none',
						opacity: 0,
						y: window.innerHeight * .05
					}, {
						display: 'block',
						opacity: 1,
						y: 0
					}, "-= 0.2")
					.fromTo(this.$refs.cast, .4,{
						display: 'none',
						opacity: 0,
						y: window.innerHeight * .05
					}, {
						display: 'block',
						opacity: 1,
						y: 0
					}, "-= 0.4")
					.to(this.$refs.trailer, .4, {
						display: 'block',
						opacity: 1
					})
					;
				}
				else {
					this.detailsTl.to(slide.elt, .3, {
						opacity: 0,
						scale: .3
					}, 0);
				}
			}
			this.detailsTl.play();
		},

		closeDetails() {
			this.detailsTl.reverse();
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
		position: relative;

		.bg {
			position: absolute;
			top: 0;
			height: 100%;
			left: 0;
			width: 100%;
		}

		.bg.thriller {
			background: linear-gradient( -10deg, $grey 40%, $thriller 40%, $thriller );
		}

		.bg.romance {
			background: linear-gradient( -10deg, $grey 40%, $romance 40%, $romance );
		}

		.bg.drama {
			background: linear-gradient( -10deg, $grey 40%, $drama 40%, $drama );
		}

		.bg.comedy {
			background: linear-gradient( -10deg, $grey 40%, $comedy 40%, $comedy );
		}

		.bg.action {
			background: linear-gradient( -10deg, $grey 40%, $action 40%, $action );
		}

		.bg.fantasy {
			background: linear-gradient( -10deg, $grey 40%, $fantasy 40%, $fantasy );
		}

		.header {
			display: inline-block;
			width: 100%;
			text-align: center;
			margin: $margin 0;
			color: white;
			position: relative;
			flex-shrink: 0;

			.switch {
				position: absolute;
				left: $margin;
				width: 11vw;
				height: 11vw;

				border-radius: 50%;
				background-color: white;

				svg {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 60%;
					height: 60%;
				}
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
			margin: .9em 0
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
			flex-shrink: 0;
			li {
				position: absolute;
				top: 50%;
				left: 50%;
				flex-shrink: 0;
				perspective: 5000px;
				box-shadow: 0 1vw 6px rgba(0,0,0,.2);
				background: transparent;
				border-radius: 1.5vw;

				.poster {
					border-radius: 1.5vw;
					width: 100%;
					height: auto;
					object-fit: cover;
					display: block;
				}

				.trailer {
					display: none;
					opacity: 0;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					iframe {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		#movie-description {
			width: 100%;
			text-align: center;
			height: min-content;

			overflow: scroll;

			#movie-title, .overview {
				display: inline-block;
				flex-basis: 100%;
				position: relative;
			}
			.line {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-content: flex-start;
			}
			.time, .rating {
				position: relative;
				flex-grow: 1;
				svg {
					display: inline-block;
					width: 1em;
					height: 1em;
					margin: 0 .3em;
					polygon:not(.starred) {
						fill: $darker-grey !important;
					}
				}
			}

			.overview {
				display: none;
				margin: $margin 0;
				padding: $margin;
				background: white;
				font-size: 1.3em;
				text-align: left;
				line-height: 1.5em;
			}

			.cast, .crew {
				text-align: left;
				display: none;
				margin: $margin;
				h4 {
					text-transform: uppercase;
					color: $lighter-grey;
				}

				span:not(:last-child) {
					&:after {
						content: ', '
					}
				}
			}
		}

		#actions {
			display: flex;
			justify-content: center;
			width: 100%;
			margin: #{$margin * 2} 0 $margin 0;
			position: relative;
			flex: none;

			div {
				position: relative;
			}
			svg#discard {
				position: absolute;
				top: 0;
				left: 0;
				width: 8vw;
				transform: translate(-50%, -50%);
			}

			svg {
				width: 15vw;
			}
		}

	}
</style>