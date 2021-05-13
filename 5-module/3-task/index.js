function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const arrowRight = carousel.querySelector('.carousel__arrow_right');
  const arrowLeft = carousel.querySelector('.carousel__arrow_left');
  const carouselInner = carousel.querySelector('.carousel__inner');

  const slidesCount = carouselInner.querySelectorAll('.carousel__slide').length;
  const slideWidth = carouselInner.querySelector('.carousel__slide').offsetWidth;
  let currentSlide = 0;

  const toggleVisibleArrow = () => {
    arrowRight.style.display = currentSlide === slidesCount - 1 ? 'none' : '';
    arrowLeft.style.display = currentSlide === 0 ? 'none' : '';
  };

  toggleVisibleArrow();

  carousel.addEventListener('click', (event) => {
    const arrow = event.target.closest('.carousel__arrow');
    if (!arrow) return;

    currentSlide = arrow.classList.contains('carousel__arrow_right') ? ++currentSlide : --currentSlide;
    carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    toggleVisibleArrow();
  });
}
