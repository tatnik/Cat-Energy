
    // mobile menu

    const navMain = document.querySelector('.site-nav');
    const navToggle = document.querySelector('.burger-button');

    navToggle.classList.remove('burger-button--nojs');

    navToggle.addEventListener('click', function () {
      if (navMain.classList.contains('site-nav--closed')) {
        navMain.classList.remove('site-nav--closed');
        navToggle.classList.add('burger-button--nav-opened');
      } else {
        navMain.classList.add('site-nav--closed');
        navToggle.classList.remove('burger-button--nav-opened');
      }
    });

   // mediaQuery

    const mediaQuery = window.matchMedia('(max-width: 768px)')

    function handleTabletChange(e) {

      if (e.matches) {
        // for menu mobile
        navMain.classList.add('site-nav--closed');
        navToggle.classList.remove('burger-button--nav-opened');
      }
    }

    handleTabletChange(mediaQuery);
    mediaQuery.addEventListener("change", handleTabletChange);

