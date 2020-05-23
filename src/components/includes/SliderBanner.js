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
      location: '',
    };
  }

  getComponent = () => {
    const page = this.props.location.pathname,
      { authorize, slider } = this.context,
      path = '/details';
      let show = false
    if (page && page.search(path) !== -1) {
      show = authorize(false);
    } else {
      show = authorize(true);
    }
    if(show){
      return <Slider data={slider} />
    }
    return <Banner />
  };

  render() {
    return <>{this.getComponent()}</>;
  }
}

export default SliderBanner;
