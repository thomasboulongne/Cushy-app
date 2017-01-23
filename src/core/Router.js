import Home from '../containers/Home';
import VueRouter from 'vue-router';

Vue.use( VueRouter );

class Router extends VueRouter {

	constructor() {

		let routes = [
			{ path: '/', component: Home }
		];

		super({
			mode: 'history',
			base: '/',
			routes: routes
		});

	}
}

export default new Router;