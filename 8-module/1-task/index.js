import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();

    this._startElemPosition;
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, { once: true });

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    const elemCoords = this.elem.getBoundingClientRect();
    const documentWidth = document.documentElement.clientWidth;
    this._startElemPosition = this._startElemPosition || elemCoords.top + window.pageYOffset;

    if (documentWidth <= 767) return;

    //console.log(this._startElemPosition, window.pageYOffset);

    if (this._startElemPosition < pageYOffset) {
      //console.log('ok');
      const containerCoords = document.querySelector('.container').getBoundingClientRect();
      this.elem.style.position = 'fixed';
      this.elem.style.zIndex = '3';
      this.elem.style.top = '50px';

      const isSpaceEnough = documentWidth - (containerCoords.right + elemCoords.width + 20) >= 10;
      if (isSpaceEnough) {
        this.elem.style.left = containerCoords.right + 20 + 'px';
      } else {
        this.elem.style.left = documentWidth - this.elem.offsetWidth - 10 + 'px';
      }
    } else {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
    }
  }
}
