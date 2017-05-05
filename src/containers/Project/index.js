'use strict';

import './styles.scss';

import throttle from 'lodash.throttle';

import VirtualScroll  from 'virtual-scroll';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
  changeProject
} from 'vuex/projectNumber/actions';

import {
  projectNumber
} from 'vuex/projectNumber/getters';

import {
  updateFromCase
} from 'vuex/status/actions';

import projectsData from 'config/projectsData';

import ProjectHeader from 'components/ProjectHeader';
import ProjectShow from 'components/ProjectShow';
import Preview from 'components/Preview';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  vuex: {
    getters: {
      projectNumber: projectNumber
    },
    actions: {
      changeProject,
      updateFromCase
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
      projectData: this.projectData,
      _hidden: null
    };
  },

  created() {
    setTimeout( () => {
      this.broadcastScrollDown();
      this.smoothScroll();

    }, 1050);

    document.addEventListener('touchmove', function(e) {
      e.preventDefault();
    });
  },

  beforeDestroy() {
    this.scroll.destroy();
    window.cancelAnimationFrame(this.request);
  },

  methods: {

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
      const projectShow = document.querySelector('.projectShow');

      if ((projectEnd.getBoundingClientRect().top - window.innerHeight) < 0) {
        let scrollProgress = (Math.abs(projectEnd.getBoundingClientRect().top - window.innerHeight)/projectEnd.getBoundingClientRect().height).toFixed(2);

        if(scrollProgress >= 0.98) {
          this.updateFromCase();
          this.changeProject(this.returnNextProject());
          this.$router.go('/');
        }

        projectShow.style.opacity = 1-scrollProgress;
        projectEnd.style.opacity = scrollProgress;

      }
    },

    smoothScroll() {
      let section = document.querySelector('.project');
      let targetY = 0;

      this.scroll.on((e) => {
        targetY += e.deltaY;
        targetY = Math.max( (section.scrollHeight - window.innerHeight) * -1, targetY);
        targetY = Math.min(0, targetY);

        this.handleScrollDown();
        this.handleBackToHome();
      });

      let currentY = 0, ease = 0.158;

      let run = () => {
        this.request = requestAnimationFrame(run);
        currentY += (targetY - currentY) * ease;
        let t = 'translateY(' + currentY + 'px) translateZ(0)';
        let s = section.style;
        s["transform"] = t;
        s["webkitTransform"] = t;
        s["mozTransform"] = t;
        s["msTransform"] = t;
      };

      run();
    },

    returnNextProject() {
      if (this.projectNumber >= projectsData.length) {
        return 1;
      }
      else {
        return this.projectNumber+1;
      }
    }


  },

  components: {
    'project-header': ProjectHeader,
    'project-show': ProjectShow,
    'preview': Preview
  }
});
