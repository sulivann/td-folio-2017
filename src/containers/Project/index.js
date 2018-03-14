'use strict';

import './styles.scss';

import throttle from 'lodash.throttle';

import VirtualScroll from 'virtual-scroll';
import { TimelineLite, TweenMax } from 'gsap';

import EventManagerMixin from 'mixins/EventManagerMixin';
import loaderMixin from 'vue-loader-mixin';

import {
  changeProject
} from 'vuex/projectNumber/actions';

import {
  projectNumber
} from 'vuex/projectNumber/getters';

import {
  updateFromCase,
  updateAssets
} from 'vuex/status/actions';

import {
  assets
} from 'vuex/status/getters';

import projectsData from 'config/projectsData';

import LogoLoader from 'components/LogoLoader';
import ProjectHeader from 'components/ProjectHeader';
import ProjectShow from 'components/ProjectShow';
import Preview from 'components/Preview';
import Mobile from 'components/Mobile';

export default Vue.extend({

  mixins: [ EventManagerMixin, loaderMixin ],

  events: {
    'load:progress': 'onLoadProgress',
    'load:complete': 'onLoadComplete'
  },

  template: require( './template.html' ),

  vuex: {
    getters: {
      projectNumber: projectNumber,
      assets: assets
    },
    actions: {
      changeProject,
      updateFromCase,
      updateAssets
    }
  },

  data() {
    for (const data of projectsData) {
      if (data.slug == this.$route.params.projectName) {
        this.projectData = data;
        break;
      }
    }

    return {
      request: '',
      scroll: new VirtualScroll(),
      scrollEasing: 0,
      projectData: this.projectData,
      timeline: new TimelineLite(),
      _hidden: null
    };
  },

  created() {
    this.$options.manifest = [];

    for(const asset of this.projectData.show) {
      this.$options.manifest.push('./images/' + asset.image);
    }

  },

  beforeDestroy() {
    this.scroll.destroy();
    window.cancelAnimationFrame(this.request);
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

  methods: {

    initEvents() {

      /* project show */
      setTimeout( () => {
        const firstElement = document.querySelector('.projectShow__element');

        firstElement.classList.add('projectShow__element--enter');
      }, 1950);

      /* project header */
      const title = document.querySelectorAll('.projectHeader__titleTypo');
      const presentation = document.querySelector('.projectHeader__description');
      const links = document.querySelectorAll('.projectHeader__link');

      setTimeout(() => {
        for (const el of title) {
          el.classList.add('projectHeader__titleTypo--enter');
        }
      }, 1200);

      setTimeout(() => {
        presentation.classList.add('projectHeader__description--enter');
        for (const el of links) {
          el.classList.add('projectHeader__link--enter');
        }
      }, 1950);

      /* project */
      setTimeout( () => {
        const project = document.querySelector('.project');
        project.classList.add('project--enter');
      }, 500);

      setTimeout( () => {
        this.broadcastScrollDown();
        this.smoothScroll();

      }, 1750);

      document.addEventListener('touchmove', function(e) {
        e.preventDefault();
      });
    },

    bind() {
      this.handleScrollDown = throttle(this.broadcastScrollDown, 200, { trailing: false, leading: true });
      this.handleBackToHome = throttle(this.broadcastBackToHome, 200, { trailing: false, leading: true });
    },

    broadcastScrollDown() {
      let images = document.querySelectorAll('.projectShow__imageContainer, .projectShow__imageContainer--centered');
      for (let elm of images) {
        if ((elm.getBoundingClientRect().top - window.innerHeight) < 130 && !elm.classList.contains('projectShow__imageContainer--active')) {
          elm.classList.add('projectShow__imageContainer--active');
        }
      }
    },

    broadcastBackToHome() {
      const projectEnd = document.querySelector('.preview');
      const blackLayer = document.querySelector('.preview__layer');
      //const projectShow = document.querySelector('.projectShow');

      if ((projectEnd.getBoundingClientRect().top - window.innerHeight) < 0) {
        let scrollProgress = (Math.abs(projectEnd.getBoundingClientRect().top - window.innerHeight)/(projectEnd.getBoundingClientRect().height)).toFixed(2);

        if(scrollProgress >= 0.98) {
          this.updateFromCase();
          this.changeProject(this.returnNextProject());
          this.$router.go('/');
        }

        scrollProgress = scrollProgress < 0 ? 0 : scrollProgress;

        blackLayer.style.opacity = (1-scrollProgress)-0.20;

        //projectShow.style.opacity = 1-scrollProgress;
        //projectEnd.style.opacity = scrollProgress;

      }
    },

    smoothScroll() {
      // let section = document.querySelector('.project');
      // let targetY = 0;

      this.scroll.on(() => {
      //   targetY += e.deltaY;
      //   targetY = Math.max( (section.scrollHeight - window.innerHeight) * -1, targetY);
      //   targetY = Math.min(0, targetY);

        this.handleScrollDown();
        this.handleBackToHome();
      });

      // let currentY = 0;
      // this.scrollEasing = 0.07;
      //
      // let run = () => {
      //   this.request = requestAnimationFrame(run);
      //   currentY += (targetY - currentY) * this.scrollEasing;
      //   let t = 'translateY(' + currentY + 'px) translateZ(0)';
      //   let s = section.style;
      //   s["transform"] = t;
      //   s["webkitTransform"] = t;
      //   s["mozTransform"] = t;
      //   s["msTransform"] = t;
      // };

      // run();
    },

    returnNextProject() {
      if (this.projectNumber >= projectsData.length) {
        return 1;
      }
      else {
        return this.projectNumber+1;
      }
    },

    onLoadProgress(event) {
      this.progress = event.progress*0.01;
      const loaderLogo = document.querySelector('.logoLoader__logo');

      this.timeline.to(loaderLogo, 0.8, {
        opacity: this.progress
      });

      this.timeline.to(loaderLogo, 0.8, {
        opacity: 0.1
      });
    },

    onLoadComplete() {
      const loaderLogo = document.querySelector('.logoLoader__logo');
      const logoLoader = document.querySelector('.logoLoader');
      const htmlElm = document.querySelector('html');

      if(this.timeline.progress() <= 2) {
        this.timeline.progress(1, false);
        this.timeline.to(loaderLogo, 0.8, {
          opacity: 0.5
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
          onComplete:this.loadProject
        }
      ), '+=0.5');

      setTimeout(() => {
        htmlElm.classList.remove('hidden');
      }, 3000)
    },

    loadProject() {
      this.updateAssets();
      this.initEvents();
    }


  },

  components: {
    'project-header': ProjectHeader,
    'project-show': ProjectShow,
    'preview': Preview,
    'logo-loader': LogoLoader,
    'mobile': Mobile
  }
});
