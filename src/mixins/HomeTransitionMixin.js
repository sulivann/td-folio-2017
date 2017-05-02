import { TimelineLite, TweenMax, Expo } from 'gsap';

/*
 *  ==== Home ====
 */

const HomeTransitionMixin = {

  route: {

    deactivate: function( { next } ) {

      const selectedWorks = document.querySelectorAll('.projectsRightSide__typo');
      const projectName = document.querySelector('.projectsList__name--selected, .projectsList__name--selectedIsLoaded');
      const discover = document.querySelector('.projectsList__discover--active span');
      const about = document.querySelector('.projectsLeftSide__about');
      const projectNumber = document.querySelector('.projectRightSide__selectedNumber');
      const projectsList = document.querySelector('.projectsList');
      const cover = document.querySelector('.projectsLeftSide__cover');
      const coverMask = document.querySelector('.projectsLeftSide__mask');
      const projectRightSide = document.querySelector('.projectsRightSide');

      const tl = new TimelineLite({
        onComplete:next
      });

      tl.to(selectedWorks, 0.3, {
        y:'100%',
        ease: Expo.easeOut
      });

      tl.add(() => {
        projectName.classList.add('projectsList__name--selectedExit');
      }, '-=0.1');

      tl.add(() => {
        TweenMax.set(about, {css:{transition:'none'}});
        TweenMax.set(discover, {css:{transition:'none'}});
        TweenMax.set(projectNumber, {css:{transition:'none'}});

        TweenMax.to(about, 0.4, {
          y:'100%',
          ease: Expo.easeOut
        });
        TweenMax.to(discover, 0.4, {
          y:'100%',
          ease: Expo.easeOut
        });
        TweenMax.to(projectNumber, 0.4, {
          y:'100%',
          ease: Expo.easeOut
        });
      }, '+=0.5');

      tl.to(projectsList, 0.4, {
        opacity:0,
        ease: Expo.easeOut
      });

      tl.add(() => {

        TweenMax.set(coverMask, {css:{transition:'none'}});

        TweenMax.to(cover, 0.5, {
          y:40
        });

        TweenMax.fromTo(coverMask, 0.5, {
          x:0,
          y:'-100%',
          z:0
        }, {
          x:0,
          y:'0%',
          z:0
        });

        TweenMax.to(projectRightSide, 0.65, {
          height:0
        });

      }, '+=0.25');

      tl.set({}, {}, 3);

    }

  }

};

module.exports = HomeTransitionMixin;
