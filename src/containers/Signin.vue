<template>
	<div id="sign-in">
		<form action="#" @submit="submit($event)">
			<label for="cushy-id">Your Cushy ID</label>
			<input type="text" name="cushy-id" id="cushy-id" ref="cushyInput">
		</form>
	</div>
</template>

<script>

// import Emitter from '../core/Emitter';

export default {

	data() {
		return {
		};
	},

	created() {
	},

	mounted() {
	},

	methods: {
		submit(e) {
			e.preventDefault();
			Cookie.set('cushy-id', this.$refs.cushyInput.value);
			this.$router.push('my-movies');
		}
	},

	components: {
	}
}

</script>

<style lang="sass">
	@import '../stylesheets/variables.scss';
</style>