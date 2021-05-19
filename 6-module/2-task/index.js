import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this._product = product;
    this._render();
  }

  _render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('card');
    this.elem.innerHTML = this._cardTemplate();

    this._button = this.elem.querySelector('[data-action="add"]');
    this._button.addEventListener('click', this._onButtonClick);
  }

  _cardTemplate() {
    return `
      <div class="card__top">
        <img src="/assets/images/products/${this._product.image}" class="card__image" alt="product">
        <span class="card__price">€${this._product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${this._product.name}</div>
        <button type="button" class="card__button" data-action="add">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    `;
  }

  _onButtonClick = () => {
    const onProductAddEvent = new CustomEvent('product-add', {
      detail: this._product.id,
      bubbles: true
    });

    this._button.dispatchEvent(onProductAddEvent);
  }
}
