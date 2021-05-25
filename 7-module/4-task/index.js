import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = createElement(this._stepSliderTemplate());
    this.elem.addEventListener('click', this._onSliderClick);

    this._thumbElement = this.elem.querySelector('.slider__thumb');
    this._progressElement = this.elem.querySelector('.slider__progress');
    this._thumbElement.ondragstart = () => false;
    this._thumbElement.addEventListener('pointerdown', this._onThumbDown);

    this._activeStepToggle(0);
  }


  _stepSliderTemplate() {
    const sliderStepsTemplate = () => {
      let result = '';
      for (let i = 0; i < this.steps; i++) result += sliderStepTemplate(i);
      return result;
    };

    const sliderStepTemplate = (i) => {
      return `<span data-step="${i}"></span>`;
    };

    return `
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value + 1}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${sliderStepsTemplate()}
        </div>
      </div>
    `;
  }

  _activeStepToggle(step) {
    const activeClass = 'slider__step-active';

    const stepsElements = this.elem.querySelectorAll('.slider__steps span');
    stepsElements[this.value].classList.remove(activeClass);
    stepsElements[step].classList.add(activeClass);
    this.value = step;
  }

  _onSliderClick = (event) => {
    this._changeSlider(event.pageX, event.pageY);

    this._createChangeEvent();
  };

  _onThumbDown = (event) => {
    const coords = this.elem.getBoundingClientRect();

    const moveAt = (pageX) => {
      let thumbLeft = (pageX - coords.x) / coords.width * 100;
      thumbLeft = thumbLeft < 0 ? 0 :
        thumbLeft > coords.width ? coords.width : thumbLeft;
      this._thumbElement.style.left = thumbLeft + '%';
      this._progressElement.style.width = thumbLeft + '%';


      this._changeSlider(pageX, event.pageY, false);
    };

    const onThumbUp = (event) => {
      this._changeSlider(event.pageX, event.pageY);

      this.elem.classList.remove('slider_dragging');

      this._createChangeEvent();

      document.removeEventListener('pointermove', onThumbMove);
      document.removeEventListener('pointerup', onThumbUp);
    };

    const onThumbMove = (event) => {
      moveAt(event.pageX);
    }

    this.elem.classList.add('slider_dragging');

    moveAt(event.pageX);

    document.addEventListener('pointermove', onThumbMove);
    document.addEventListener('pointerup', onThumbUp)
  };

  _changeSlider(x, y, finish = true) {
    const coords = this.elem.getBoundingClientRect();
    const stepLength = coords.width / (this.steps - 1);
    const step = document.elementFromPoint(x, y).dataset.step || Math.round((x - coords.x) / stepLength);

    const sliderValueElement = this.elem.querySelector('.slider__value');
    sliderValueElement.textContent = +step + 1;

    if (finish) {
      this._activeStepToggle(step);

      const leftPercents = Math.round(stepLength * step / coords.width * 100);
      this._thumbElement.style.left = `${leftPercents}%`;
      this._progressElement.style.width = `${leftPercents}%`;
    }
  }

  _createChangeEvent() {
    const onSliderChangeEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(onSliderChangeEvent);
  }
}
