import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';

class PlaceInfoModal extends Component {
  state = {
    isOpen: false
  }

  constructor() {
    super();

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({isOpen: true});
  }

  afterOpenModal() {
    const {place} = this.props;
    const descriptionElement = document.getElementById(`modal${place.id}`);
    const linkElement = document.getElementById(`link${place.id}`);

    const NO_AVAILABLE_DATA = 'No desription available on Wikipedia!';

    fetch(`https://en.wikipedia.org/w/api.php?titles=${place.name}&prop=info|extracts&exintro=&explaintext=&format=json&action=query&inprop=url&origin=*`)
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        descriptionElement.innerHTML = NO_AVAILABLE_DATA;
      }
    }).then((data) => {
      const pages = data.query.pages;
      const firstPage = pages.length !== 0 ? pages[Object.keys(pages)[0]] : null;

      if(firstPage) {
        descriptionElement.innerHTML = firstPage.extract ? firstPage.extract + ' <strong><em>(Description from Wikipedia)</em></strong>' : NO_AVAILABLE_DATA;
        linkElement.href = firstPage.fullurl;
      } else {
        descriptionElement.innerHTML = NO_AVAILABLE_DATA;
      }
    }).catch((error) => {
      descriptionElement.innerHTML = NO_AVAILABLE_DATA;
      console.log('Error fetching data from Wikipedia: ', error);
    });
  }

  closeModal() {
    this.setState({isOpen: false});
  }

  render() {
    const {place} = this.props;
    const {isOpen} = this.state;

    return(
      <div>
        <a
          className="place-info-more-link"
          onClick={this.openModal}
          onKeyUp={(event) => {
            event.preventDefault();
            if (event.keyCode === 13) {
              this.openModal();
            }
          }}
          tabIndex="0"
        >
          Tell me more!
        </a>

        <Modal
          className="place-info-modal"
          isOpen={isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel={place.name}
          ariaHideApp={false}
        >
          <a
            className="place-info-modal-close"
            onClick={this.closeModal}
            onKeyUp={(event) => {
              event.preventDefault();
              if (event.keyCode === 13) {
                this.closeModal();
              }
            }}
            tabIndex="0"
          >
            &times;
          </a>
          <div className="place-info-title">{place.name}</div>
          <div className="place-info-address">{place.vicinity}</div>
          {place.photos && place.photos[0] &&
            <img className="place-info-img" src={place.photos[0].getUrl({'maxWidth': 400, 'maxHeight': 400})} alt={place.name}/>
          }
          <div className="place-info-desc-container">
            <div id={`modal${place.id}`} className="place-info-description"></div>
            <a id={`link${place.id}`} className="place-info-more-link" target="_blank" tabIndex="0">
              Tell me more on Wikipedia!
            </a>
          </div>
        </Modal>
      </div>
    );
  }
}

export default PlaceInfoModal;
