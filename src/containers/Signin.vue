<template>
	<div id="sign-in">
		<div class="overlay" ref="overlay">
			<div class="logo" ref="wrapper">
				<svg class="logo" id="logo" ref="logo" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 90 90" style="enable-background:new 0 0 90 90;" xml:space="preserve">
					<path id="logo" style="fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;" class="st0" d="M88.4,69.2c0.8-4.2,1.2-13.9-3-34.1c-3.6-17.5-7.2-25.7-9.5-29.5c0-1.8,0.4-4.8-1.9-5.5
						c-2.3-0.7-3.7,0.9-4.3,1.8C65.3,1.8,56.4,2.4,38,6.2C19,10.1,10,13.4,5.9,15.2c-1.4-0.7-4.4-1.4-5.6,0.7c-1.2,2.1,1.2,4.6,2.6,6.2
						c0.5,5,1.9,14.4,5.2,30c4,19.3,6.8,28.1,8.2,31.9c-1.1,1.3-2.3,4,0,5.4c2.3,1.4,4.9,0,6.5-1.5c5,0.5,14.4,0.3,31.3-3.2
						c17.7-3.6,26-7.2,29.9-9.6c1.8,0,3.5,1.8,5.1,0C90.8,73.4,89.7,70.4,88.4,69.2z M56.3,39.6c1.1,0,2.1,0.9,2.1,2c0,1.1-0.9,2-2.1,2
						c-1.1,0-2.1-0.9-2.1-2C54.3,40.5,55.2,39.6,56.3,39.6z M46.4,42c1.1,0,2.1,0.9,2.1,2c0,1.1-0.9,2-2.1,2c-1.1,0-2.1-0.9-2.1-2
						C44.3,42.9,45.2,42,46.4,42z M55.8,63.4c-9,2.3-15.8-1.7-18.1-4.8c-1.5-2-1.3-3.3-0.3-4.2c1-0.9,2.9-0.5,5,0.1
						c3.4,1.1,5.8,1.6,11.3,0.5c5-1,7.4-2.3,11.3-6c1.7-1.6,3.6,0.4,3.6,2.5C68.7,54.8,64.8,61,55.8,63.4z"/>
				</svg>

				<div class="bubbles" ref="bubbles">
					<img v-for="i in 16" :src="__PROD__ ? 'http://app.cushy.thomasboulongne.com/assets/bubbles/genre' + i + '.png' : '/assets/bubbles/genre' + i + '.png'" class="logo" alt="">
				</div>
			</div>
			<div class="wrapper">
				<h1 ref="title">Cushy!</h1>
				<div id="slider" ref="slider">
					<div class="frame js_frame">
						<ul class="slides js_slides">
							<li class="js_slide">
								<p>
									Aren't you tired  of struggling every night  to find what movie to watch ?
								</p>
							</li>
							<li class="js_slide">
								<p>
									Cushy has the solution !
									He can feel your mood and get the perfect movie for you.
								</p>
							</li>
							<li class="js_slide">
								<p>
									Squeeze, cuddle or punch him.
									Express yourself and he will find the best movie for you !
								</p>
							</li>
						</ul>
					</div>
				</div>
				<div class="pager">
					<span v-for="i in 3" :class="i == currentSlide + 1 ? 'selected':''"></span>
				</div>
			</div>
			<div class="footer">
				<span ref="cta">If you are ready to watch a movie</span>
				<span ref="label" class="hidden">Enter your Cushy ID to connect</span>
				<div ref="button" class="button" @click="button">
					squeeze cushy!
				</div>
				<div ref="input" class="hidden input">
					<form action="#" @submit="submit($event)">
						<input type="text" class="button" ref="cushyInput"><input type="image" :src="__PROD__ ? 'http://app.cushy.thomasboulongne.com/assets/submit.svg' : '/assets/submit.svg'" alt="" class="button">
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

// import Emitter from '../core/Emitter';
import {lory} from 'lory.js';

export default {

	data() {
		return {
			currentSlide: 0
		};
	},

	created() {
	},

	mounted() {
		this.$refs.slider.addEventListener('after.lory.slide', this.updateAnimation);

		lory(this.$refs.slider, {enableMouseEvents: true});

		this.bubbles = this.$refs.bubbles.childNodes;
		this.tl1 = new TimelineLite({paused: true});
		this.tl1.set(this.bubbles[0], {
			scale: .1
		}).set(this.bubbles[1], {
			scale: .1
		}).set(this.bubbles[2], {
			scale: .1
		}).set(this.bubbles[3], {
			scale: .1
		}).set(this.bubbles[4], {
			scale: .1
		}).set(this.bubbles[5], {
			scale: .1
		}).set(this.bubbles[6], {
			scale: .1
		}).set(this.bubbles[7], {
			scale: .18
		}).set(this.bubbles[8], {
			scale: .18
		}).set(this.bubbles[9], {
			scale: .18
		}).set(this.bubbles[10], {
			scale: .18
		}).set(this.bubbles[11], {
			scale: .18
		}).set(this.bubbles[12], {
			scale: .32
		}).set(this.bubbles[13], {
			scale: .32
		}).set(this.bubbles[14], {
			scale: .32
		}).set(this.bubbles[15], {
			scale: .32
		})
		;


		this.tl1.to(this.$refs.wrapper, 1.5, {
			y: "-=" + window.innerHeight * 0.2
		}, 0)
		.to(this.bubbles[0], 1.5, {
			x: "+=" + window.innerWidth * -0.230,
			y: "-=" + window.innerHeight * 0,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0).to(this.bubbles[1], 1.5, {
			x: "+=" + window.innerWidth * -0.4,
			y: "-=" + window.innerHeight * 0.04,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0).to(this.bubbles[2], 1.5, {
			x: "+=" + window.innerWidth * -0.28,
			y: "-=" + window.innerHeight * 0.15,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0).to(this.bubbles[3], 1.5, {
			x: "+=" + window.innerWidth * -0.21,
			y: "-=" + window.innerHeight * 0.27,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0).to(this.bubbles[4], 1.5, {
			x: "+=" + window.innerWidth * 0.2,
			y: "-=" + window.innerHeight * 0.2,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0).to(this.bubbles[5], 1.5, {
			x: "+=" + window.innerWidth * 0.3,
			y: "-=" + window.innerHeight * 0.01,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0).to(this.bubbles[6], 1.5, {
			x: "+=" + window.innerWidth * 0.4,
			y: "-=" + window.innerHeight * 0.08,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		.to(this.bubbles[7], 1.5, {
			x: "+=" + window.innerWidth * -0.26,
			y: "-=" + window.innerHeight * 0.1,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0).to(this.bubbles[8], 1.5, {
			x: "+=" + window.innerWidth * -0.020,
			y: "-=" + window.innerHeight * 0.26,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0).to(this.bubbles[9], 1.5, {
			x: "+=" + window.innerWidth * 0.3,
			y: "-=" + window.innerHeight * 0.18,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0).to(this.bubbles[10], 1.5, {
			x: "+=" + window.innerWidth * 0.4,
			y: "-=" + window.innerHeight * 0,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0).to(this.bubbles[11], 1.5, {
			x: "+=" + window.innerWidth * 0.45,
			y: "-=" + window.innerHeight * 0.18,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		.to(this.bubbles[12], 1.5, {
			x: "+=" + window.innerWidth * -0.42,
			y: "-=" + window.innerHeight * 0.22,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0).to(this.bubbles[13], 1.5, {
			x: "+=" + window.innerWidth * -0.06,
			y: "-=" + window.innerHeight * 0.18,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0).to(this.bubbles[14], 1.5, {
			x: "+=" + window.innerWidth * 0.4,
			y: "-=" + window.innerHeight * 0.26,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0).to(this.bubbles[15], 1.5, {
			x: "+=" + window.innerWidth * 0.28,
			y: "-=" + window.innerHeight * 0.1,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		;

		this.tl1.fromTo(this.$refs.title, .8, {
			y: window.innerHeight * .07,
			opacity: 0
		}, {
			y: 0,
			opacity: 1
		}, "-= .5").fromTo(this.$refs.slider, .6, {
			y: window.innerHeight * .07,
			opacity: 0
		}, {
			y: 0,
			opacity: 1
		}, "-= .5");





		this.tl2 = new TimelineLite({paused: true});
		this.tl2
		.to(this.bubbles[0], 1.5, {
			x: "+=" + window.innerWidth * -0.15,
			scale: .5,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		.to(this.bubbles[1], 1.5, {
			x: "+=" + window.innerWidth * -0.4,
			y: "-=" + window.innerHeight * 0.04,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		.to(this.bubbles[2], 1.5, {
			x: "+=" + window.innerWidth * -0.28,
			y: "-=" + window.innerHeight * 0.15,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		.to(this.bubbles[3], 1.5, {
			x: "+=" + window.innerWidth * -0.21,
			y: "-=" + window.innerHeight * 0.27,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		.to(this.bubbles[4], 1.5, {
			x: "+=" + window.innerWidth * 0.2,
			y: "-=" + window.innerHeight * 0.2,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		.to(this.bubbles[5], 1.5, {
			x: "+=" + window.innerWidth * 0.3,
			y: "-=" + window.innerHeight * 0.01,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		.to(this.bubbles[6], 1.5, {
			x: "+=" + window.innerWidth * 0.4,
			y: "-=" + window.innerHeight * 0.08,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)

		.to(this.bubbles[7], 1.5, {
			x: "+=" + -window.innerWidth * 0.2,
			y: "-=" + window.innerHeight * 0.11,
			scale: .65,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		.to(this.bubbles[8], 1.5, {
			x: "+=" + window.innerWidth * -0.09,
			y: "-=" + window.innerHeight * 0.26,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		.to(this.bubbles[9], 1.5, {
			x: "+=" + window.innerWidth * 0.14,
			y: "-=" + window.innerHeight * 0,
			scale: 1.1,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		.to(this.bubbles[10], 1.5, {
			x: "+=" + window.innerWidth * 0.4,
			y: "-=" + window.innerHeight * 0,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		.to(this.bubbles[11], 1.5, {
			x: "+=" + window.innerWidth * 0.45,
			y: "-=" + window.innerHeight * 0.18,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)

		.to(this.bubbles[12], 1.5, {
			x: "+=" + window.innerWidth * -0.41,
			y: "-=" + window.innerHeight * 0.22,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		.to(this.bubbles[13], 1.5, {
			x: "+=" + window.innerWidth * 0.06,
			y: "-=" + window.innerHeight * 0.1,
			scale: .8,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		.to(this.bubbles[14], 1.5, {
			x: "+=" + window.innerWidth * 0.4,
			y: "-=" + window.innerHeight * 0.26,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		.to(this.bubbles[15], 1.5, {
			x: "+=" + window.innerWidth * 0.4,
			y: "-=" + window.innerHeight * 0.1,
			ease: Elastic.easeOut.config(1, 0.75)
		}, 0)
		;

		this.tl2.fromTo(this.$refs.cta, .3, {
			y: window.innerHeight * .07,
			opacity: 0
		}, {
			y: 0,
			opacity: 1
		}, "-= .5").fromTo(this.$refs.button, .4, {
			y: window.innerHeight * .07,
			opacity: 0
		}, {
			y: 0,
			opacity: 1
		}, "-= .4");





		this.tl3 = new TimelineLite({paused: true});
		this.tl3
		.to(this.bubbles[0], 1.5, {
			x: "+=" + window.innerWidth * -0.45,
			scale: .8,
			ease: Power3.easeIn
		}, 0)
		.to(this.bubbles[7], 1.5, {
			x: "+=" + -window.innerWidth * 0.3,
			y: "-=" + window.innerHeight * 0.17,
			scale: .9,
			ease: Power3.easeIn
		}, 0)
		.to(this.bubbles[9], 1.5, {
			x: "+=" + window.innerWidth * 0.45,
			y: "-=" + window.innerHeight * .20,
			scale: 1.5,
			ease: Power3.easeIn
		}, 0)
		.to(this.bubbles[13], 1.5, {
			x: "+=" + window.innerWidth * 0.06,
			y: "-=" + window.innerHeight * 0.18,
			scale: 1.2,
			ease: Power3.easeIn
		}, 0)
		;

		this.tl3.to(this.$refs.logo, .4, {
			scale: 1.1,
			rotation: -13
			// ease: Power3.easeOut
		}, 0)
		.to(this.$refs.logo, 1.1, {
			scale: 1,
			rotation: 360,
			ease: Power3.easeOut
		}, ".4")
		;

		this.tl1.play();
	},

	methods: {
		button() {
			TweenLite.to([this.$refs.cta, this.$refs.button], .3, {
				opacity: 0,
				onComplete: () => {
					TweenLite.set([this.$refs.cta, this.$refs.button], {
						display: 'none',
						onComplete: () => {
							TweenLite.to([this.$refs.input, this.$refs.label], .30, {
								display: 'block',
								opacity: 1
							});
						}
					});
				}
			});
		},

		submit(e) {
			e.preventDefault();
			Cookie.set('cushy-id', this.$refs.cushyInput.value);
			this.$router.push('my-movies');
		},

		updateAnimation(e) {
			if(this.currentSlide == 0 && e.detail.currentSlide == 1) {
				this.tl2.play();
			}
			else if(this.currentSlide == 1 && e.detail.currentSlide == 0) {
				this.tl2.reverse();
			}
			else if(this.currentSlide == 1 && e.detail.currentSlide == 2) {
				this.tl3.play();
			}
			else if(this.currentSlide == 2 && e.detail.currentSlide == 1) {
				this.tl3.reverse();
			}
			this.currentSlide = e.detail.currentSlide;
		}
	}, 

	components: {
	}
}

</script>

<style lang="sass">
	@import '../stylesheets/variables.scss';

	#sign-in {
		img.logo, svg.logo {
			width: 100%;
		}
		
		#logo {
			z-index: 5;
		}

		.wrapper {
			width: 100%;
			position: absolute;
			bottom: 20vh;
			h1 {
				margin: 0;
				margin-left: $margin;
				color: #ff8787;
				text-transform: uppercase;
				letter-spacing: .2em;
			}
		}

		#slider {
			width: 100%;
		}

		.frame {
			/**
			* (optional) wrapper width, specifies width of the slider frame.
			*/
			width: 100%;

			position: relative;
			font-size: 0;
			line-height: 0;
			overflow: hidden;
			white-space: nowrap;
		}

		.slides {
			display: inline-block;
		}

		ul {
			width: 100%;
		}

		li {
			position: relative;
			display: inline-block;
			box-sizing: border-box;
			padding: $margin;
			padding-bottom: $margin;
			color: white;
			white-space: normal;
			vertical-align: top;
			width: 100%;

			p {
				vertical-align: top;
				margin: 0;
				font-size: 1rem;
				line-height: 1.5em;
			}
		}

		.pager {
			margin: 0 $margin;
			span {
				display: inline-block;
				width: 3vw;
				height: 3vw;
				margin: 0 0.5vw;
				box-sizing: border-box;
				transition: all 0.2s;
				border-radius: 50%;
				background: #ff8787;
				transform: scale(0.6);
				&.selected {
					position: relative;
					background: white;
					transform: scale(1);
				}
			}
		}

		.footer {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 20vh;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			span {
				color: #ff8787;
				font-size: .85rem;
			}

			.button {
				text-transform: uppercase;
				padding: $margin/1.5 $margin*1.5;
				margin-top: $margin/2;
				background: white;
				border-radius: 0.5em;
				font-size: 1rem;
				letter-spacing: 0.15em;
				color: #e61d1e;
				box-shadow: 0 0.3em 0 0 #c92a2a;
			}

			.input {
				form {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: $margin/2;
				}

				input[type=text] {
					border: none;
					max-width: 30vw;
					margin: 0;
					margin-right: $margin/2;
				}
		
				input[type=image] {
					display: inline-block;
					margin: 0;
					height: 2.9em;
					padding: 0;
					background: transparent;
				}
			}

			.hidden {
				display: none;
				opacity: 0;
			}
		}
	}
</style>