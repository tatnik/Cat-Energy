
    // cat-slider for mobile

    const sliderToggle = document.querySelector('.slider__toggle');
    const sliderToggleButton = document.querySelector('.slider__toggle-button');
    const sliderButton1 = document.querySelector('.slider__button--1');
    const sliderButton2 = document.querySelector('.slider__button--2');
    const sliderSlide1 = document.querySelector('.slider__slide--1');
    const sliderSlide2 = document.querySelector('.slider__slide--2');

    function sliderToLeft() {
      sliderToggleButton.style = "";
      sliderToggleButton.classList.add('slider__toggle-button--left');
      sliderToggleButton.classList.remove('slider__toggle-button--right');
      sliderButton1.classList.add('slider__button--current');
      sliderButton2.classList.remove('slider__button--current');
      sliderSlide1.classList.add('slider__slide--current');
      sliderSlide2.classList.remove('slider__slide--current');
    }

    function sliderToRight() {
      sliderToggleButton.style = "";
      sliderToggleButton.classList.remove('slider__toggle-button--left');
      sliderToggleButton.classList.add('slider__toggle-button--right');
      sliderButton1.classList.remove('slider__button--current');
      sliderButton2.classList.add('slider__button--current');
      sliderSlide1.classList.remove('slider__slide--current');
      sliderSlide2.classList.add('slider__slide--current');
    }

    sliderButton1.addEventListener('click', function () {
      sliderToLeft();
    });

    sliderButton2.addEventListener('click', function () {
      sliderToRight();
    });

    function onSliderClick() {
      if (sliderToggleButton.classList.contains('slider__toggle-button--left')) {
        sliderToRight();
      } else {
        sliderToLeft();
      }
    }


    // cat-slider for tablet and desktop

    function onMouseDown(event) {

      let sliderRect = sliderToggle.getBoundingClientRect();
      let sliderToggleButtonRect = sliderToggleButton.getBoundingClientRect();
      let shiftX = event.pageX - sliderToggleButtonRect.x;
      let centerToggle = (sliderRect.width - 32) / 2;
      let lastX = 0;

      function onMouseMove(event) {
        let x = event.pageX - sliderRect.x - shiftX;
        if (x < 0) x = 0;
        if (x > sliderToggle.clientWidth - sliderToggleButton.offsetWidth)
          x = sliderToggle.clientWidth - sliderToggleButton.offsetWidth;
        sliderToggleButton.style.left = x + "px";
        lastX = x;
      }

      document.addEventListener("mousemove", onMouseMove);

      function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        if (lastX > centerToggle) {
          sliderToRight();
        }
        else {
          sliderToLeft();
        }
      };

      document.addEventListener("mouseup", onMouseUp);
    }


    // mediaQuery

    const mediaQueryS = window.matchMedia('(max-width: 768px)')

    function handleTabletChangeS(e) {

      if (e.matches) {
        // for cat-slider mobile
        sliderToggle.addEventListener('click', onSliderClick);
        sliderToggleButton.removeEventListener('mousedown', onMouseDown);

      }
      else {
        // for cat-slider tablet & desktop
        sliderToggle.removeEventListener('click', onSliderClick);
        sliderToggleButton.addEventListener('mousedown', onMouseDown);


      }
    }

    handleTabletChangeS(mediaQueryS);
    mediaQueryS.addEventListener("change", handleTabletChangeS);

