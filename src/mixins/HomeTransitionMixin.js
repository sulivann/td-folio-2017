import { TimelineLite, TweenMax } from 'gsap';

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

      const tl = new TimelineLite({
        onComplete:next
      });

      tl.to(selectedWorks, 0.7, {
        y:'100%',
        ease: Expo.easeOut
      });

      tl.add(() => {
        projectName.classList.add('projectsList__name--selectedExit');
      }, '-=0.5');

      tl.add(() => {
        TweenMax.to(about, 0.7, {
          y:'100%',
          ease: Expo.easeOut
        });
        TweenMax.to(discover, 0.7, {
          y:'100%',
          ease: Expo.easeOut
        });
        TweenMax.to(projectNumber, 0.7, {
          y:'100%',
          ease: Expo.easeOut
        });
      });

      tl.to(projectsList, 0.7, {
        opacity:0,
        ease: Expo.easeOut
      });

      tl.add(() => {
        cover.classList.add('projectsLeftSide__cover--out');
        coverMask.classList.add('projectsLeftSide__mask--out');
      }, '-=0.5');

      tl.set({}, {}, 3);

    }

  }

};

module.exports = HomeTransitionMixin;
