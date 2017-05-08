'use strict';

import './styles.scss';

import throttle from 'lodash.throttle';

import { TimelineLite, TweenMax } from 'gsap';

import EventManagerMixin from 'mixins/EventManagerMixin';
import HomeTransitionMixin from 'mixins/HomeTransitionMixin';
import loaderMixin from 'vue-loader-mixin';

import {
  changeProject,
  resetPrevious
} from 'vuex/projectNumber/actions';

import {
  projectNumber
} from 'vuex/projectNumber/getters';

import {
  assets,
  fromCase
} from 'vuex/status/getters';

import {
  updateInteraction,
  resetInteraction,
  resetFromCase,
  updateAssets
} from 'vuex/status/actions';

import projectsData from 'config/projectsData';

import LogoLoader from 'components/LogoLoader';
import ProjectsLeftSide from 'components/ProjectsLeftSide';
import ProjectsRightSide from 'components/ProjectsRightSide';
import Mobile from 'components/Mobile';

export default Vue.extend({

  mixins: [ EventManagerMixin, HomeTransitionMixin, loaderMixin ],

  events: {
    'load:progress': 'onLoadProgress',
    'load:complete': 'onLoadComplete'
  },

  manifest: [
    './images/VISUS_AIRFRANCE.jpg',
    './images/VISUS_ANAISPROFIT.png',
    './images/VISUS_BOUCHERON.jpg',
    './images/VISUS_MOODIE.png',
    './images/VISUS_REPOLEAK.jpg',
    './fonts/maisonneue-book-webfont.woff2',
    './fonts/maisonneue-demi-webfont.woff2',
    './fonts/maisonneue-medium-webfont.woff2'
  ],


  template: require( './template.html' ),

  vuex: {
    getters: {
      projectNumber: projectNumber,
      assets: assets,
      fromCase: fromCase
    },
    actions: {
      changeProject,
      updateInteraction,
      resetInteraction,
      resetPrevious,
      resetFromCase,
      updateAssets
    }
  },

  data() {

    return {
      timeout: '',
      timeline: new TimelineLite(),
      _hidden: null
    };
  },

  created() {
    this.resetInteraction();
    this.resetPrevious();
  },

  ready() {
    if(!this.assets) {
      setTimeout(() => {
        const logo = document.querySelector('.logoLoader__logo');

        logo.classList.add('logoLoader__logo--enter');

      }, 500);
      setTimeout(() => {
        this.load();
      }, 1250);
    }
    else {
      this.initEvents();
    }
  },

  beforeDestroy() {
    document.removeEventListener('DOMMouseScroll', this.handleScrollDown);
    document.removeEventListener('mousewheel', this.handleScrollDown);
    document.removeEventListener('wheel', this.handleScrollDown);
    clearTimeout(this.timeout);
    this.resetFromCase();
  },

  methods: {

    initEvents() {

      /* Left Side */
      if(!this.fromCase) {
        const cover = document.querySelector('.projectsLeftSide__cover');
        const coverMask = document.querySelector('.projectsLeftSide__mask');
        const about = document.querySelector('.projectsLeftSide__about');

        setTimeout(() => {
          cover.classList.add('projectsLeftSide__cover--enter');
          coverMask.classList.add('projectsLeftSide__mask--enter');
        }, 500);

        setTimeout(() => {
          about.classList.add('projectsLeftSide__about--enter');
        }, 2100);
      }


      /* List */
      if(!this.fromCase) {
        const projectName = document.querySelector('.projectsList__name--selected');
        const discover = document.querySelector('.projectsList__discover--active');
        const projectsName = document.querySelectorAll('.projectsList__name');

        setTimeout( () => {
          projectName.classList.add('projectsList__name--fade');
        }, 1400);

        setTimeout( () => {
          projectName.classList.add('projectsList__name--selectedEnter');
        }, 1600);

        setTimeout( () => {
          discover.classList.add('projectsList__discover--enter');
        }, 2100);

        setTimeout( () => {
          for(const el of projectsName) {
            el.classList.add('projectsList__name--enter');
          }
        }, 2500);
      }

      /* Right Side */
      if(!this.fromCase) {
        const selectedWorks = document.querySelectorAll('.projectsRightSide__typo');
        const projectNumber = document.querySelector('.projectRightSide__selectedNumber');
        const projectsRightSide = document.querySelector('.projectsRightSide');

        setTimeout(() => {
          projectsRightSide.classList.add('projectsRightSide--enter');
        }, 500);

        setTimeout(() => {
          for(const el of selectedWorks) {
            el.classList.add('projectsRightSide__typo--enter');
          }
        }, 1100);

        setTimeout(() => {
          projectNumber.classList.add('projectRightSide__selectedNumber--enter');
        }, 2100);
      }

      if(this.fromCase) {
        this.timeout = setTimeout(() => {
          this.bindListener();
        }, 1000);
      } else {
        this.timeout = setTimeout(() => {
          this.bindListener();
        }, 3000);
      }

    },

    bind() {
      this.handleScrollDown = throttle(this.broadcastScrollDown, 2400, { trailing: false, leading: true });
    },

    bindListener() {
      if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', this.handleScrollDown, false);
        document.addEventListener('mousewheel', this.handleScrollDown, false);
      } else {
        document.addEventListener('wheel', this.handleScrollDown);
      }
    },

    broadcastScrollDown(e) {
      const wDelta = e.wheelDelta < 0 ? 'down' : 'up';

      if (wDelta == 'down') {

        this.toggleChangeProjectUp();

      }
      else if (wDelta == 'up') {

        this.toggleChangeProjectDown();

      }

    },

    toggleChangeProjectUp() {

      let projectName = document.querySelector('.projectsList__name--selected, .projectsList__name--selectedIsLoaded');
      let discover = document.querySelector('.projectsList__discover--active');
      let cover = document.querySelector('.projectsLeftSide__cover');
      const selectedNumber = document.querySelector('.projectRightSide__selectedNumber');
      const coverMask = document.querySelector('.projectsLeftSide__mask');

      projectName.classList.add('projectsList__name--selectedOut');

      if (discover) {
        discover.classList.add('projectsList__discover');
      }

      cover.classList.add('projectsLeftSide__cover--out');
      coverMask.classList.add('projectsLeftSide__mask--out');
      selectedNumber.classList.add('projectRightSide__selectedNumber--out');

      setTimeout(() => {

        this.updateInteraction();

        if (this.projectNumber >= projectsData.length) {
          this.changeProject(1);
        }
        else {
          this.changeProject(this.projectNumber+1);
        }

        setTimeout(() => {
          cover = document.querySelector('.projectsLeftSide__cover');

          coverMask.classList.remove('projectsLeftSide__mask--out');
          coverMask.classList.remove('projectsLeftSide__mask--enter');
          void coverMask.offsetWidth;
          coverMask.classList.add('projectsLeftSide__mask--enter');

          cover.classList.remove('projectsLeftSide__cover--out');
          cover.classList.remove('projectsLeftSide__cover--enter');
          void cover.offsetWidth;
          cover.classList.add('projectsLeftSide__cover--enter');

          const prevProject = document.querySelector('.projectsList__name--previous');
          prevProject.classList.add('projectsList__name--previousEnter');
        }, 1);

        setTimeout(() => {
          projectName = document.querySelector('.projectsList__name--selected, .projectsList__name--selectedIsLoaded');
          projectName.classList.add('projectsList__name--selectedEnter');
        }, 700);

        setTimeout(() => {
          discover = document.querySelector('.projectsList__discover--active');
          if (discover) {
            discover = document.querySelector('.projectsList__discover--active');
            discover.classList.add('projectsList__discover--enter');
          }

          selectedNumber.classList.remove('projectRightSide__selectedNumber--out');
          selectedNumber.classList.add('projectRightSide__selectedNumber--enter');
        }, 1200);

      }, 1050);

    },

    toggleChangeProjectDown() {

      let projectName = document.querySelector('.projectsList__name--selected, .projectsList__name--selectedIsLoaded');
      let discover = document.querySelector('.projectsList__discover--active');
      let cover = document.querySelector('.projectsLeftSide__cover');
      const selectedNumber = document.querySelector('.projectRightSide__selectedNumber');
      const coverMask = document.querySelector('.projectsLeftSide__mask');

      projectName.classList.add('projectsList__name--selectedOut');

      if (discover) {
        discover.classList.add('projectsList__discover');
      }

      cover.classList.add('projectsLeftSide__cover--out');
      coverMask.classList.add('projectsLeftSide__mask--out');
      selectedNumber.classList.add('projectRightSide__selectedNumber--out');

      setTimeout(() => {

        this.updateInteraction();

        if (this.projectNumber <= 1) {
          this.changeProject(projectsData.length);
        }
        else {
          this.changeProject(this.projectNumber-1);
        }

        setTimeout(() => {
          cover = document.querySelector('.projectsLeftSide__cover');

          coverMask.classList.remove('projectsLeftSide__mask--out');
          coverMask.classList.remove('projectsLeftSide__mask--enter');
          void coverMask.offsetWidth;
          coverMask.classList.add('projectsLeftSide__mask--enter');

          cover.classList.remove('projectsLeftSide__cover--out');
          cover.classList.remove('projectsLeftSide__cover--enter');
          void cover.offsetWidth;
          cover.classList.add('projectsLeftSide__cover--enter');

          const prevProject = document.querySelector('.projectsList__name--previous');
          prevProject.classList.add('projectsList__name--previousEnter');
        }, 1);

        setTimeout(() => {
          projectName = document.querySelector('.projectsList__name--selected, .projectsList__name--selectedIsLoaded');
          projectName.classList.add('projectsList__name--selectedEnter');
        }, 700);

        setTimeout(() => {
          discover = document.querySelector('.projectsList__discover--active');
          if (discover) {
            discover = document.querySelector('.projectsList__discover--active');
            discover.classList.add('projectsList__discover--enter');
          }

          selectedNumber.classList.remove('projectRightSide__selectedNumber--out');
          selectedNumber.classList.add('projectRightSide__selectedNumber--enter');
        }, 1200);

      }, 1050);

    },

    onLoadProgress: function(event) {
      this.progress = event.progress*0.01;
      const loaderLogo = document.querySelector('.logoLoader__logo');

      this.timeline.to(loaderLogo, 0.8, {
        opacity: this.progress
      });

      this.timeline.to(loaderLogo, 0.8, {
        opacity: 0.1
      });
    },

    onLoadComplete: function() {
      const loaderLogo = document.querySelector('.logoLoader__logo');
      const logoLoader = document.querySelector('.logoLoader');

      if(this.timeline.progress() <= 2) {
        this.timeline.progress(1, false);
        this.timeline.to(loaderLogo, 0.8, {
          opacity: 0.5
        });
        this.timeline.to(loaderLogo, 0.8, {
          opacity: 0.1
        });
        this.timeline.to(loaderLogo, 0.8, {
          opacity: 0.8
        });
        this.timeline.to(loaderLogo, 0.8, {
          opacity: 0.1
        });
      } else {
        this.timeline.progress(1, false);
      }

      this.timeline.to(loaderLogo, 0.8, {
        opacity: 1
      });


      this.timeline.add(
        TweenMax.to(logoLoader, 0.7, {
          opacity:0,
          onComplete:this.loadHome
        }
      ), '+=0.5');
    },

    loadHome() {
      this.updateAssets();
      this.initEvents();
    }

  },

  components: {
    'logo-loader': LogoLoader,
    'projects-left-side': ProjectsLeftSide,
    'projects-right-side': ProjectsRightSide,
    'mobile': Mobile
  }
});
