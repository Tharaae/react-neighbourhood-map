import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import imgPlaceholder from './img/img-not-available400.jpg';
import './App.css';

/*
 * PlaceInfoModal component is state component to display more information
 * about the selected place in a dialogue window.
 * It fetches data asynchronously from Wikipedia.
 */
class PlaceInfoModal extends Component {

  static propTypes = {
    place: PropTypes.object.isRequired
  }

  state = {
    isOpen: false,
    imageError: false
  }

  constructor() {
    super();

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getPlacePhotoSrc = this.getPlacePhotoSrc.bind(this);
    this.handleImageError = this.handleImageError.bind(this);
  }

  /*
   * Called when modal is attempted to be opened.
   * It sets the state to rerender accordingly.
   */
  openModal() {
    this.setState({isOpen: true});
  }

  /*
   * Called right after modal is opened.
   * It populates madal elements with data fetched asynchronously.
   */
  afterOpenModal() {
    const {place} = this.props;
    const imageElement = document.getElementById(`image${place.id}`);
    const descriptionElement = document.getElementById(`modal${place.id}`);
    const linkElement = document.getElementById(`link${place.id}`);

    imageElement.src = this.getPlacePhotoSrc(place);

    // console log messages
    const NO_AVAILABLE_DATA = 'No desription available on Wikipedia!';
    const API_FAILED = 'Could not retrieve description from Wikipedia!'

    // Fetch required park description from Wikipedia
    fetch(`https://en.wikipedia.org/w/api.php?titles=${place.name}&prop=info|extracts&exintro=&explaintext=&format=json&action=query&inprop=url&origin=*`)
    .then((response) => {
      if(response.ok) { // if successful Wikipedia API call
        return response.json();
      } else { // if failed Wikipedia API call
        descriptionElement.innerHTML = NO_AVAILABLE_DATA;
      }
    }).then((data) => { // if successful Wikipedia API call
      // get pages data from retrieved JSON
      const pages = data.query.pages;
      // get the first page if exists or null otherwise
      const firstPage = pages.length !== 0 ? pages[Object.keys(pages)[0]] : null;

      if(firstPage) { // if a relavent Wikipedia page exists
        descriptionElement.innerHTML =
          firstPage.extract ?
            firstPage.extract + ' <strong><em>(Description from Wikipedia)</em></strong>'
            : NO_AVAILABLE_DATA;
        linkElement.href = firstPage.fullurl;
      } else { // if no relavent Wikipedia page
        descriptionElement.innerHTML = NO_AVAILABLE_DATA;
      }
    }).catch((error) => { // if error calling Wikipedia API
      descriptionElement.innerHTML = API_FAILED;
      console.log('Error fetching data from Wikipedia: ', error);
    });
  }

  /*
   * Gets photo url via getUrl function provided by Google Maps APIs
   * or from static data if getURL is not available.
   * Otherwise, image placeholder is displayed.
   */
  getPlacePhotoSrc(place) {
    if(!this.state.imageError && place.photos && place.photos[0] && place.photos[0].getUrl && window.google) {
      return place.photos[0].getUrl({'maxWidth': 400, 'maxHeight': 400});
    } else {
      return place.largeImageUrl? place.largeImageUrl : imgPlaceholder;
    }
  };

  /*
   * Called in case of error loading the image.
   * It sets the state to rerender with the image placeholder instead.
   */
  handleImageError() {
    this.setState({imageError: true});
  }

  /*
   * Called when the madal is attempted to bet closed.
   * It sets the state to rerender accordingly.
   */
  closeModal() {
    this.setState({isOpen: false});
  }

  render() {
    const {place} = this.props;
    const {isOpen, imageError} = this.state;

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
          contentLabel={place.name + ' details modal'}
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
            aria-label="close park details modal"
          >
            &times;
          </a>
          <div className="place-info-title">{place.name}</div>
          <div className="place-info-address" arial-label="park short address">
            {place.vicinity}
          </div>
          <img
            id={`image${place.id}`}
            className="place-info-img"
            alt={place.name + ' image'}
            src={imageError ? imgPlaceholder : ''}
            onError={this.handleImageError}
          />
          <div className="place-info-desc-container">
            <div
              id={`modal${place.id}`}
              className="place-info-description"
              aria-label="park description from Wikipedia"
            >
            </div>
            <a
              id={`link${place.id}`}
              className="place-info-more-link"
              target="_blank"
              tabIndex="0"
            >
              Tell me more on Wikipedia!
            </a>
          </div>
        </Modal>
      </div>
    );
  }
}

export default PlaceInfoModal;
