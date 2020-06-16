import React, { Component } from 'react';
import Cards from '../common/cardPlans';
class About extends Component {
  render() {
    const aboutPanel = Cards.map((item) => (
      <div className="il-panel--card" key={'panel-' + item.id}>
        <div className="il-panel--img">
          <div className="il-icon--img">
            {/* <img src={item.icons} alt={item.alt} /> */}
            <i className={item.icon}></i>
          </div>
        </div>
        <div className="il-panel--content">
          <h1 className="il-panel--title">{item.title}</h1>
          <p className="il-panel--description">{item.description}</p>
          <div className="il-panel--buttom">
            <a
              href="!#"
              className="il-btn il-btn--plan il-background--color__gradient"
            >
              Saiba mais
            </a>
          </div>
        </div>
      </div>
    ));
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--medium-dark">
          <i className="fas fa-low-vision"></i>
          <span>Sobre</span>
        </h2>
        <div className="il-panel">{aboutPanel}</div>
      </section>
    );
  }
}

export default About;
