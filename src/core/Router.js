import VueRouter from 'vue-router';

import HomePageComponent from 'containers/Homepage';

import AboutPageComponent from 'containers/About';

import ProjectPageComponent from 'containers/Project';

Vue.use( VueRouter );

class Router extends VueRouter {

  constructor() {

    super({
      hashbang: true,
      pushState: true,
      history: false,
      abstract: false,
      saveScrollPosition: false,
      transitionOnLoad: false
    });

    this.path = '/';
    this.firstRoute = true;
    this.routeTimeout = null;


    this.map({

      '/': {
        name: "home",
        component: HomePageComponent
      },

      '/about': {
        name: "about",
        component: AboutPageComponent
      },

      '/project/:projectName': {
        name: "project",
        component: ProjectPageComponent
      }

    });
  }
}

export default new Router;
