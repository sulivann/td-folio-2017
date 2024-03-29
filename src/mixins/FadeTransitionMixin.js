import { TweenMax, Expo } from 'gsap';

/*
 *  === FadeTransitionMixin ====
 */

const FadeTransitionMixin = {

  route: {

    deactivate: function( { next } ) {

      TweenMax.to(this.$el, 0.7, {
        opacity: 0,
        onComplete: next,
        ease: Expo.easeOut
      });
    }

  }

};

module.exports = FadeTransitionMixin;
