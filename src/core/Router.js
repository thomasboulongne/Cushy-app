import Home from '../containers/Home';
import Signin from '../containers/Signin';
import Mymovies from '../containers/Mymovies';
import VueRouter from 'vue-router';

Vue.use( VueRouter );

class Router extends VueRouter {

	constructor() {

		let routes = [
			{ path: '/', component: Home },
			{ path: '/my-movies', component: Mymovies, name: 'my-movies' },
			{ path: '/sign-in', component: Signin, name: 'sign-in' }
		];

		super({
			mode: 'history',
			base: '/',
			routes: routes
		});

	}
}

export default new Router;