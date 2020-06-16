import React, { Component } from 'react';

/**Includes */
import Casts from './includes/Casts';
import Gallery from './includes/Gallery';

export default class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      showCasts: false,
      showGallery: false,
      showTrailer: false,
    };
  }

  componentDidMount = () => {
    this.setState({
      id: this.props.id,
    });
  };

  close = (e) => {
    e.preventDefault();
    this.setState({
      showCasts: false,
      showGallery: false,
      showTrailer: false,
    });
    const btnClose = document.getElementById('il-close-modal');
    btnClose.classList.remove('show');
  };

  showModal = (e, modal) => {
    const btnClose = document.getElementById('il-close-modal');
    if (btnClose) {
      btnClose.classList.add('show');
    }
    e.preventDefault();
    switch (modal) {
      case 'casts':
        this.setState({
          showCasts: true,
          showGallery: false,
          showTrailer: false,
        });
        break;
      case 'gallery':
        this.setState({
          showCasts: false,
          showGallery: true,
          showTrailer: false,
        });
        break;
      case 'trailers':
        this.setState({
          showCasts: false,
          showGallery: false,
          showTrailer: true,
        });
        break;
      default:
        this.setState({
          showCasts: false,
          showGallery: false,
          showTrailer: false,
        });

        break;
    }
  };

  render() {
    return (
      <div className="il-modal--grid">
        <h5 className="il-text-color--salmon il-center">Veja mais detalhes</h5>
        <div className="il-buttoms--details">
          <div className="il-buttom--item">
            <button
              className="il-btn il-btn--small"
              onClick={(e) => this.showModal(e, 'casts')}
            >
              casts
            </button>
          </div>
          <div className="il-buttom--item">
            <button
              className="il-btn il-btn--small"
              onClick={(e) => this.showModal(e, 'gallery')}
            >
              gallery
            </button>
          </div>
          <div className="il-buttom--item">
            <button
              className="il-btn il-btn--small"
              onClick={(e) => this.showModal(e, 'trailers')}
            >
              trailers
            </button>
          </div>
        </div>
        <a
          href="#!"
          id="il-close-modal"
          className="il-btn--close"
          onClick={(e) => this.close(e)}
        >
          X
        </a>
        <div className="il-detail--modal">
          <div
            className={
              this.state.showCasts
                ? 'il-modal--casts il-modal--show'
                : 'il-modal--casts'
            }
          >
            <Casts config={{ type: 'casts', id: this.props.id }} />
          </div>
          <div
            className={
              this.state.showGallery
                ? 'il-modal--gallery il-modal--show'
                : 'il-modal--gallery'
            }
          >
            <Gallery config={{ type: 'galleries', id: this.props.id }} />
          </div>
          <div
            className={
              this.state.showTrailer
                ? 'il-modal--streaming il-modal--show'
                : 'il-modal--streaming'
            }
          >
            <div>
              <div className="il-detail--gallery">
                <h5 className="il-text-color--salmon il-center">Vídeos</h5>
                <div className="il-cards il-posters">os vídeos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
