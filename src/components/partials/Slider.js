import React, { Component } from 'react';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      styles: {
        styleOpacity: 0.7,
        styleLeft: '-150%',
      },
    };
  }

  componentDidMount() {
    const allSlider = document.querySelectorAll('.il-sliders--item');
    if (allSlider && allSlider[0].classList.contains('il-slider--hidden')) {
      allSlider[0].classList.remove('il-slider--hidden');
      this.startSlider();
    } else {
      allSlider[0].classList.add('il-slider--hidden');
      this.startSlider();
    }
  }

  startSlider = () => {
    const allSlider = document.querySelectorAll('.il-sliders--item');
    //time out each slider
    let sliderTime = 10000;
    let init = 0;

    const sliderRun = () => {
      allSlider[init].classList.add('il-slider--hidden');
      init++;
      allSlider[init].classList.remove('il-slider--hidden');
      if (init === 3) {
        clearInterval(time);
        setTimeout(() => {
          allSlider[0].classList.remove('il-slider--hidden');
          allSlider[init].classList.add('il-slider--hidden');
          this.startSlider();
        }, sliderTime);
      }
    };

    let time = setInterval(() => {
      sliderRun();
    }, sliderTime);
  };

  render() {
    const sliderItem = this.props.data.map((item) => (
      <div className="il-sliders--item" key={'slider-' + item.id}>
        <div className="il-container--wrapper">
          <div className="il-slider--content">
            <h3>{item.title}</h3>
            <p className="il-slider-description il-color-text--light">
              {item.description}
            </p>
            <div className="il-slider--buttom">
              <a href="!#" className="il-btn il-btn--slider">
                Saiba mais
              </a>
            </div>
          </div>
        </div>
      </div>
    ));

    return <div className="il-slider">{sliderItem}</div>;
  }
}

export default Slider;
