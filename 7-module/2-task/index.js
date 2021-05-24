import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement(this._modalTemplate());
    this._bodyElement = document.querySelector('body');

    const modalCloseBtn = this.elem.querySelector('.modal__close');
    modalCloseBtn.addEventListener('click', this._closeModal);
  }

  _modalTemplate() {
    return `
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body">
            A сюда нужно добавлять содержимое тела модального окна
          </div>
        </div>
      </div>
    `;
  }

  open() {
    this._bodyElement.append(this.elem);
    this._bodyElement.classList.add('is-modal-open');

    const onKeyDownEvent = (event) => {
      if (event.code === 'Escape') this.close();
    }
    document.addEventListener('keydown', onKeyDownEvent, { once: true });
  }

  setTitle(title) {
    const modalTitleElement = this.elem.querySelector('.modal__title');
    modalTitleElement.textContent = title;
  }

  setBody(bodyElement) {
    const modalBodyElement = this.elem.querySelector('.modal__body');
    modalBodyElement.innerHTML = bodyElement.outerHTML;
  }

  _closeModal = () => {
    this.elem.remove();
    this._bodyElement.classList.remove('is-modal-open');
  }

  close() {
    this._closeModal();
  }
}
