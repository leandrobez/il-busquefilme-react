import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      word: '',
      button: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    let word = e.target.value;
    this.setState({
      button: false,
      word: word
    });
    if (word.length > 3) {
      if (!this.state.button) {
        this.setState({ button: true });
      }
      localStorage.setItem('word-param', JSON.stringify(word));
    }
  };

  submit = e => {
    e.preventDefault();
    const form = document.getElementById('form-search');
    if (this.state.word.length > 3) {
      form.setAttribute('action', '/result');
      form.submit();
    } else {
      alert('A sua busca só pode ser feita com no mínimo 4 caracteres');
      return;
    }
  };

  render() {
    const button = () => {
      if (this.state.button) {
        return (
          <div className="il-card--button">
            <button className="il-btn il-btn--search">
              <span>Buscar</span>
              <i className="fas fa-search"></i>
            </button>
          </div>
        );
      }
      return '';
    };
    return (
      <div className="il-form--content">
        <form
          className="il-form"
          method="GET"
          onSubmit={this.submit}
          id="form-search"
        >
          <div className="il-form--field il-flex">
            <input
              type="search"
              name="word"
              placeholder="Filmes, séries e trilhas sonoras..."
              value={this.state.word}
              onChange={this.handleChange}
            />
            {button()}
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
