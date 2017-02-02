<template>
	<div id="my-movies" :class="genres[0]">
		<div class="bg" ref="bg"></div>
		<div class="header" ref="header">
			<div class="switch" ref="switch" @click="switchList()">
				<svg v-if="currentList == shows" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ref="movies-icon" viewBox="0 0 27 27">
					<path class="stroke-colored" fill="white" d="M1.38057143,23.269 L22.3221429,23.269 L22.3221429,11.4288571 L1.38057143,11.4288571 L1.38057143,23.269 Z M4.74542857,4.87942857 L3.24857143,7.36642857 L1.28728571,7.85657143 L0.790285714,5.86785714 L4.74542857,4.87942857 Z M21.6038571,2.779 L17.7291429,3.74728571 L19.2222857,1.26671429 C19.2234286,1.26471429 19.224,1.26257143 19.2251429,1.26057143 L21.1068571,0.790285714 L21.6038571,2.779 Z M15.294,8.64685714 L18.916,8.64685714 L16.8761429,10.6867143 C16.8674286,10.6952857 16.8608571,10.7052857 16.8532857,10.7145714 L13.2261429,10.7145714 L15.294,8.64685714 Z M10.6618571,8.64685714 L14.284,8.64685714 L12.244,10.6867143 C12.2352857,10.6952857 12.2287143,10.7052857 12.2211429,10.7145714 L8.59414286,10.7145714 L10.6618571,8.64685714 Z M6.02971429,8.64685714 L9.65185714,8.64685714 L7.612,10.6867143 C7.60328571,10.6952857 7.59671429,10.7052857 7.58914286,10.7145714 L3.962,10.7145714 L6.02971429,8.64685714 Z M2.957,10.7145714 L1.38057143,10.7145714 L1.38057143,8.64685714 L5.01971429,8.64685714 L2.97985714,10.6867143 C2.97114286,10.6952857 2.96457143,10.7052857 2.957,10.7145714 L2.957,10.7145714 Z M18.2447143,1.50571429 L16.7478571,3.99257143 L13.2294286,4.87185714 L14.7262857,2.385 L18.2447143,1.50571429 Z M13.745,2.63028571 L12.2481429,5.11714286 L8.72971429,5.99657143 L10.2264286,3.50957143 L13.745,2.63028571 Z M9.24514286,3.75485714 L7.74842857,6.24171429 L4.22985714,7.12114286 L5.72671429,4.63414286 L9.24514286,3.75485714 Z M22.3221429,10.7145714 L17.8582857,10.7145714 L19.9261429,8.64685714 L22.3221429,8.64685714 L22.3221429,10.7145714 Z M23.0364286,8.28971429 C23.0364286,8.09242857 22.8765714,7.93257143 22.6792857,7.93257143 L3.92928571,7.93257143 L22.1235714,3.38528571 C22.2155714,3.36242857 22.2944286,3.30385714 22.3432857,3.22271429 C22.392,3.14142857 22.4064286,3.04414286 22.3834286,2.95228571 L21.7132857,0.270714286 C21.6654286,0.0791428571 21.4708571,-0.0372857143 21.2802857,0.0107142857 L0.270571429,5.26157143 C0.178571429,5.28442857 0.0997142857,5.343 0.0508571429,5.42414286 C0.00214285714,5.50542857 -0.0122857143,5.60271429 0.0107142857,5.69457143 L0.666285714,8.31785714 L0.666285714,23.6261429 C0.666285714,23.8234286 0.826142857,23.9832857 1.02342857,23.9832857 L22.6792857,23.9832857 C22.8765714,23.9832857 23.0364286,23.8234286 23.0364286,23.6261429 L23.0364286,8.28971429 Z" ></path>
					<path class="stroke-colored" fill="white" d="M9.54642857,18.235 L13.8902857,18.235 L13.8902857,14.12 L9.54642857,14.12 L9.54642857,18.235 Z M18.6345714,18.2348571 L14.6045714,18.2348571 L14.6045714,14.12 L18.6345714,14.12 C18.8318571,14.12 18.9917143,13.96 18.9917143,13.7628571 C18.9917143,13.5655714 18.8318571,13.4057143 18.6345714,13.4057143 L4.923,13.4057143 C4.72571429,13.4057143 4.56585714,13.5655714 4.56585714,13.7628571 C4.56585714,13.96 4.72571429,14.12 4.923,14.12 L8.83214286,14.12 L8.83214286,18.2348571 L4.923,18.2348571 C4.72571429,18.2348571 4.56585714,18.3947143 4.56585714,18.592 C4.56585714,18.7892857 4.72571429,18.9491429 4.923,18.9491429 L18.6345714,18.9491429 C18.8318571,18.9491429 18.9917143,18.7892857 18.9917143,18.592 C18.9917143,18.3947143 18.8318571,18.2348571 18.6345714,18.2348571 L18.6345714,18.2348571 Z" ></path>
					<path fill="#ffffff" d="M18.6346143,20.6056286 L4.92304286,20.6056286 C4.72575714,20.6056286 4.5659,20.7654857 4.5659,20.9627714 C4.5659,21.1600571 4.72575714,21.3199143 4.92304286,21.3199143 L18.6346143,21.3199143 C18.8319,21.3199143 18.9917571,21.1600571 18.9917571,20.9627714 C18.9917571,20.7654857 18.8319,20.6056286 18.6346143,20.6056286" ></path>
				</svg>
				<svg v-else version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27 27">
					<path class="fill-colored" d="M23.7089427,25.490669 L3.03816742,25.490669 C1.52768427,25.490669 0.303279775,24.284508 0.303279775,22.796531 L0.303279775,8.56018621 C0.303279775,7.0722092 1.52768427,5.86604828 3.03816742,5.86604828 L23.7089427,5.86604828 C25.2194258,5.86604828 26.4438303,7.0722092 26.4438303,8.56018621 L26.4438303,22.796531 C26.4438303,24.284508 25.2194258,25.490669 23.7089427,25.490669 Z"></path>
					<polygon fill="#ffffff" stroke-linejoin="round" points="3.03370787 22.4797494 19.0004157 22.4797494 19.0004157 8.87726667 3.03370787 8.87726667"></polygon>
					<polyline class="fill-colored" stroke-linecap="round" stroke-linejoin="bevel" points="13.9550562 0.298850575 17.8988764 5.87749425 22.5001011 1.59377011"></polyline>
					<path fill="#ffffff" d="M24.219091,10.2966575 C24.219091,11.0805425 23.5738213,11.7161977 22.7780798,11.7161977 C21.9823382,11.7161977 21.3370685,11.0805425 21.3370685,10.2966575 C21.3370685,9.51277241 21.9823382,8.87711724 22.7780798,8.87711724 C23.5738213,8.87711724 24.219091,9.51277241 24.219091,10.2966575 Z" stroke-linecap="round" stroke-linejoin="bevel"></path>
					<path fill="#ffffff" d="M24.219091,15.2911678 C24.219091,16.0750529 23.5738213,16.710708 22.7780798,16.710708 C21.9823382,16.710708 21.3370685,16.0750529 21.3370685,15.2911678 C21.3370685,14.5072828 21.9823382,13.8716276 22.7780798,13.8716276 C23.5738213,13.8716276 24.219091,14.5072828 24.219091,15.2911678 Z" stroke-linecap="round" stroke-linejoin="bevel"></path>
				</svg>
			</div>
			<div class="mood" ref="mood">
				<h2>
					{{ mood.title }}
				</h2>
				<h3>
					{{ mood.subtitle }}
				</h3>
			</div>
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
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.09 57.15">
							<polygon :class="rate == 'starred' ? 'fill-colored':''" points="30.04 0 37.13 21.83 60.09 21.83 41.52 35.32 48.61 57.15 30.04 43.66 11.47 57.15 18.57 35.32 0 21.83 22.95 21.83 30.04 0"/>
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
					<circle fill="#E5E5E5" cx="37.5" cy="37.5" r="37.5"></circle>
					<path d="M52.6066451,26.7460554 C50.7852003,24.9752168 48.4070867,24 45.9087356,24 C43.2170915,24 40.6163864,25.1647049 38.7732532,27.1961847 L37.3452435,28.7722082 L35.9153313,27.1954237 C34.0725786,25.1647049 31.4722541,24 28.7798489,24 C26.2818784,24 23.9030037,24.9752168 22.0804174,26.7464359 C18.1483492,30.5750086 17.9546757,37.0042864 21.6489325,41.0782804 C21.659206,41.0896953 21.6698599,41.1014908 21.6808944,41.1125252 L36.3395868,56.2605384 C36.6158285,56.545912 36.9773018,56.6878378 37.338014,56.6878378 C37.6991068,56.6878378 38.0605801,56.5455315 38.3360608,56.2609189 L53.0054072,41.1125252 C53.0160611,41.1014908 53.0267151,41.0896953 53.037369,41.0782804 C56.7323869,37.0065694 56.5390938,30.5776721 52.6066451,26.7460554 Z" fill="transparent" class="stroke-colored" stroke-width="2"></path>
				</svg>
			</div>
			<div>
				<svg @click="play()" viewBox="0 0 75 75" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<circle fill="#E5E5E5" cx="37.5" cy="37.5" r="37.5"></circle>
					<circle fill="#C51DB0" cx="37.5" cy="37.5" r="31.5" class="fill-colored"></circle>
					<path d="M29.0341876,22.4734126 L29.0341876,52.5266964 L52.0003908,37.4999511 L29.0341876,22.4734126 Z M28.5170938,54 C28.4327041,54 28.3481075,53.9793162 28.271164,53.9377419 C28.1040393,53.8473539 28,53.6727831 28,53.4829062 L28,21.5172028 C28,21.327326 28.1040393,21.1527551 28.271164,21.0623671 C28.437875,20.9719791 28.6409895,20.9802526 28.8002543,21.0844987 L53.2279714,37.0674539 C53.3739987,37.1628059 53.4619047,37.3255871 53.4619047,37.4999511 C53.4619047,37.674522 53.3739987,37.8373031 53.2279714,37.9326552 L28.8002543,53.9156103 C28.7146236,53.9716633 28.6159621,54 28.5170938,54 L28.5170938,54 Z" fill="#E5E5E5" ></path>
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
					const detailsSlideWidth = window.innerWidth * .9;
					const detailsSlideHeight = detailsSlideWidth * 9 / 16;
					const detailsSlideMargin = (window.innerWidth - detailsSlideWidth) / 2;
					const headerHeight = this.$refs.header.offsetHeight * 2;

					this.detailsTl.to(slide.elt, .4, {
						top: detailsSlideMargin,
						left: detailsSlideMargin,
						x: '0%',
						y: '0%',
						height: detailsSlideHeight,
						width: detailsSlideWidth,
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
					.to([this.$refs.mood, this.$refs.switch], .4, {
						y: -headerHeight
					}, 0)
					.to(this.$refs.list, .4, {
						flexGrow: 0,
						height: detailsSlideHeight + 2 * detailsSlideMargin
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

		@each $key, $value in $genres {
			&.#{$key} .bg {
				background: linear-gradient( -10deg, $grey 40%, $value 40%, $value );
			}
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
				top: 50%;
				transform: translateY(-50%);
				width: 15vw;
				height: 15vw;

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

			h2 {
				margin: $margin/2 0;
			}

			h3 {
				color: rgba(255,255,255, 0.4);
				margin-bottom: $margin/2;
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

			#movie-title {
				font-size: 1.7em;
			}

			.line {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-content: flex-start;
				font-size: 1.3em;
			}
			.time, .rating {
				position: relative;
				flex-grow: 1;
				svg {
					display: inline-block;
					width: 1em;
					height: 1em;
					margin: 0 .3em;
					fill: $darker-grey;
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