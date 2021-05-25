import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = createElement(this._stepSliderTemplate());
    this.elem.addEventListener('click', this._onSliderClick);

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
    const coords = event.currentTarget.getBoundingClientRect();
    const stepLength = coords.width / (this.steps - 1);
    const step = event.target.dataset.step || Math.round((event.pageX - coords.x) / stepLength);

    const sliderValueElement = this.elem.querySelector('.slider__value');
    sliderValueElement.textContent = +step + 1;

    this._activeStepToggle(step);

    const thumbElement = this.elem.querySelector('.slider__thumb');
    const progressElement = this.elem.querySelector('.slider__progress');

    const leftPercents = Math.round(stepLength * step / coords.width * 100);
    thumbElement.style.left = `${leftPercents}%`;
    progressElement.style.width = `${leftPercents}%`;

    const onSliderChangeEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(onSliderChangeEvent);
  };
}
