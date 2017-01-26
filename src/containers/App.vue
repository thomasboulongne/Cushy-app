<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>

// import Emitter from '../core/Emitter';

export default {
	data() {
		return {
			id: null
		};
	},

	created() {
		if(Cookie.get('cushy-id')) {
			this.id = Cookie.get('cushy-id');
			this.$router.push('my-movies');
		}
		else {
			this.$router.push('sign-in');
		}
	},

	mounted() {
	},

	methods: {
	},

	components: {
	}
}

</script>

<style lang="sass">
	@import '../stylesheets/variables.scss';

	#app {
		height: 100%;
		width: 100%;
	}
</style>