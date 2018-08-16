import React, { Component } from 'react';

/*
 * This class is used as wrapper for MapComponent in main App component
 * to catch the error thrown by react-google-maps package in offline mode (bug).
 * It displays a clean alternative message content when the app works offline
 * instead of crashing by this known issue.
 */
class ErrorBoundary extends Component {
  state = { error: null, errorInfo: null }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // logs error to console
    console.log('Map Error:', error, errorInfo);

    // calls handler passed by parent App component
    this.props.handleMapError();
  }

  render() {
    const {error} = this.state;
    if(error) {
      return (
        <section id="map-container" className="map-container">
          Error loading Google Map!
        </section>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
