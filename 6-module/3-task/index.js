import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this._slidesCount = slides.length;
    this._currentSlide = 0;

    this._render();
    this._toggleVisibleArrow();
  }

  _render() {
    this.elem = createElement(this._caroselWrapperTemplate());
    this._carouselInner = this.elem.querySelector('.carousel__inner');

    this.elem.addEventListener('click', this._onCarouselClick);
  }

  _caroselWrapperTemplate() {
    return `
      <div class="carousel">
      ${this._arrowsTemplate()}
      ${this._innerTemplate()}
      </div>
    `;
  }

  _arrowsTemplate() {
    return `
      <div class="carousel__arrow carousel__arrow_right" data-action="moveRight">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left" data-action="moveLeft">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `;
  }

  _innerTemplate() {
    return `
      <div class="carousel__inner">
        ${this.slides.map(slide => this._slideTemplate(slide)).join('')}
      </div>
    `;
  }

  _slideTemplate(slide) {
    return `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button" data-action="addProduct">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  _toggleVisibleArrow() {
    const arrowRight = this.elem.querySelector('.carousel__arrow_right');
    const arrowLeft = this.elem.querySelector('.carousel__arrow_left');

    arrowRight.style.display = this._currentSlide === this._slidesCount - 1 ? 'none' : '';
    arrowLeft.style.display = this._currentSlide === 0 ? 'none' : '';
  }

  _onCarouselClick = (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;

    if (action === 'moveRight' || action === 'moveLeft') this._moveSlide(action);

    if (action === 'addProduct') this._addProduct(target);
  }

  _moveSlide(action) {
    const slideWidth = this._carouselInner.querySelector('.carousel__slide').offsetWidth;
    this._currentSlide = action === 'moveRight' ? ++this._currentSlide : --this._currentSlide;
    this._carouselInner.style.transform = `translateX(-${this._currentSlide * slideWidth}px)`;
    this._toggleVisibleArrow();
  }

  _addProduct(target) {
    const productId = target.closest('[data-id]').dataset.id;
    const onProductAddEvent = new CustomEvent('product-add', {
      detail: productId,
      bubbles: true
    });

    target.dispatchEvent(onProductAddEvent);
  }
}
