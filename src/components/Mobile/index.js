'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

import VirtualScroll from 'virtual-scroll';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  emitterEvents: [],

  domEvents: [],

  data() {

    return {
      scroll: new VirtualScroll(),
      scrollEasing: 0,
      _hidden: null
    };
  },

  ready() {

    setTimeout(() => {
      this.smoothScroll();

      const content = document.querySelector('.about__content.isMobile');
      content.classList.add('about__content--enter');
    }, 500);
  },

  methods: {

    smoothScroll() {
      let section = document.querySelector('.mobile');
      let targetY = 0;

      this.scroll.on((e) => {
        targetY += e.deltaY;
        targetY = Math.max( (section.scrollHeight - window.innerHeight) * -1, targetY);
        targetY = Math.min(0, targetY);
      });

      let currentY = 0;
      this.scrollEasing = 0.11;

      let run = () => {
        this.request = requestAnimationFrame(run);
        currentY += (targetY - currentY) * this.scrollEasing;
        let t = 'translateY(' + currentY + 'px) translateZ(0)';
        let s = section.style;
        s["transform"] = t;
        s["webkitTransform"] = t;
        s["mozTransform"] = t;
        s["msTransform"] = t;
      };

      run();
    }
  },

  transitions: {},

  components: {}
});
