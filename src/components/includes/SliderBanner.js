import React, { Component } from 'react';
import { SliderContext } from '../../contexts/SliderContext';

/**components */
import Slider from '../partials/Slider';
import Banner from '../partials/Banner';

class SliderBanner extends Component {
  static contextType = SliderContext;
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    };
  }

  getComponent = () => {
    const page = this.props.location.pathname,
      { slider } = this.context,
      path = '/details';
    if (page && page.search(path) !== -1) {
      return <Banner />;
    }
    return <Slider data={slider} />;
  };

  render() {
    return <>{this.getComponent()}</>;
  }
}

export default SliderBanner;
