import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { error: null, errorInfo: null }


  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log error messages to an error reporting service here
    console.log('Map Error:', error, errorInfo);

    this.props.handleError();
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
