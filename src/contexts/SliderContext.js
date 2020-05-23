import React, { createContext, Component } from 'react';

export const SliderContext = createContext();

class SliderContextProvider extends Component {
  state = {
    isDetailsPage: false,
    slider: [
      {
        id: 1,
        title: 'Slider 1',
        img: 'slider1.jpg',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, optio assumenda. Aspernatur quibusdam repudiandae numquam nisi blanditiis facere, maiores et.',
      },
      {
        id: 2,
        title: 'Slider 2',
        img: 'slider2.jpg',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, optio assumenda. Aspernatur quibusdam repudiandae numquam nisi blanditiis facere, maiores et.',
      },
      {
        id: 3,
        title: 'Slider 3',
        img: 'slider3.jpg',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, optio assumenda. Aspernatur quibusdam repudiandae numquam nisi blanditiis facere, maiores et.',
      },
      {
        id: 4,
        title: 'Slider 4',
        img: 'slider4.jpg',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, optio assumenda. Aspernatur quibusdam repudiandae numquam nisi blanditiis facere, maiores et.',
      },
    ],
  };

  getAuthorize = (flag) => {
    if (flag) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <SliderContext.Provider
        value={{
          ...this.state,
          authorize: this.getAuthorize,
        }}
      >
        {this.props.children}
      </SliderContext.Provider>
    );
  }
}

export default SliderContextProvider;
