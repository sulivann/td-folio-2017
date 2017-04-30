/*
 *  ==== Home ====
 */

const HomeTransitionMixin = {

  route: {

    deactivate: function( { next } ) {

      const selectedWorks = document.querySelectorAll('.projectsRightSide__typo');

      for (const el of selectedWorks) {
        el.classList.add('projectsRightSide__typo--exit');
      }

      setTimeout(() => {
        next();
      }, 20050);
    }

  }

};

module.exports = HomeTransitionMixin;
