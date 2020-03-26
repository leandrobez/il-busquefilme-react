import React, { Component } from 'react';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      styles: {
        styleOpacity: 0.7,
        styleLeft: '-150%'
      }
    };
    this.start = this.start.bind(this);
  }

  run = () => {
    const sliders = this.props.data,
      countSlider = sliders.length,
      allSlider = document.querySelectorAll('.il-sliders--item'),
      sliderChild = document.querySelectorAll(
        '.il-sliders--item .il-slider--img'
      ),
      path = '/images/sliders/';
    this.setState({
      count: countSlider
    });
    for (let i = 0; i < countSlider; i++) {
      if (i > 0) {
        allSlider[i].style.opacity = this.state.styles.styleOpacity;
        allSlider[i].style.left = this.state.styles.styleLeft;
        sliderChild[i].style.backgroundImage =
          'url(' + path + sliders[i].img + ')';
      } else {
        allSlider[0].style.opacity = 1;
        allSlider[0].style.left = 0;
        sliderChild[0].style.backgroundImage =
          "url('" + path + sliders[0].img + "')";
      }
    }
  };

  move = current => {
    let allSlider = document.querySelectorAll('.il-sliders--item'),
      sliderActive = allSlider[current];
    sliderActive.style.left = 0;
    sliderActive.style.opacity = 1;
    if (current > 0) {
      allSlider[current - 1].style.opacity = this.state.styles.styleOpacity;
      allSlider[current - 1].style.left = this.state.styles.styleLeft;
    } else {
      allSlider[
        this.state.count - 1
      ].style.opacity = this.state.styles.styleOpacity;
      allSlider[this.state.count - 1].style.left = this.state.styles.styleLeft;
    }
  };

  start = () => {
    let currentSlider = 0;
    this.run();
    setInterval(() => {
      this.move(currentSlider);
      currentSlider++;
      if (currentSlider === this.state.count) {
        currentSlider = 0;
      }
    }, 5000);
  };

  componentDidMount() {
    this.start();
  }

  render() {
    const sliderItem = this.props.data.map(item => (
      <div className="il-sliders--item" key={'slider-' + item.id}>
        <div className="il-slider--img"></div>
        <div className="il-slider--content">
          <h3>{item.title}</h3>
          <p className="il-slider-description il-color-text--light">
            {item.description}
          </p>
          <a href="!#" className="il-btn il-btn--slider il-btn--light">
            Saiba mais
          </a>
        </div>
      </div>
    ));

    return <div className="il-slider">{sliderItem}</div>;
  }
}

export default Slider;
