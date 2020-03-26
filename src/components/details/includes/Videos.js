import React, { Component } from 'react';

class Videos extends Component {
  constructor(props) {
    super(props);
    this.videos = null;
    this.iframeVideo = null;
    this.setVideos = this.setVideos.bind(this);
  }

  getBackground = path => {
    const urlBase = 'http://image.tmdb.org/t/p/original';
    if (path) {
      return { backgroundImage: 'url(' + urlBase + path + ')' };
    } else {
      return { backgroundColor: '#870a66' };
    }
  };
  player = key => {
    let video = this.videos[key];
    this.iframeVideo = (
      <iframe
        className="il-youtube"
        title={video.name}
        width="480"
        height="270"
        src={'https://www.youtube.com/embed/' + video.key}
      />
    );
  };
  setVideos = () => {
    this.iframeVideo = null;
    this.videos = this.props.listVideos;
    if (this.videos && this.videos.length) {
      let items = this.videos;
      //console.log(items);
      if (items.length) {
        return items.map((item, index) => (
          <div className="il-card--item" key={'video-' + item.id}>
            <div
              className="il-card--poster"
              style={this.getBackground(null)}
            ></div>
            <div className="il-card--header">
              <h4>{item.name}</h4>
            </div>
            <div className="il-card--body il-body--transparent">
              <p className="il-text-color--light il-center">Disponível em: {item.site}</p>
            </div>
            <div className="il-card--button">
              <button
                className="il-btn il-btn--search"
                onClick={this.player(index)}
              >
                Ver
              </button>
            </div>
          </div>
        ));
      }
    }
  };
  render() {
    return (
      <div className="il-detail--videos">
        <h4 className="il-color--light">Vídeos</h4>
        <div className="il-cards">{this.setVideos()}</div>
        {this.iframeVideo ? this.iframeVideo : ''}
      </div>
    );
  }
}

export default Videos;
