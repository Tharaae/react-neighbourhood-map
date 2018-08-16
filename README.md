# Udacity FEND - React / Google Maps APIs - Neighbourhood Map Project
**By _Tharaa Elmorssi_**
---

## IMPORTANT NOTE
This project uses **Google Maps APIs** to display the map. However, the map will be greyed with "_for development purposes only_" watermark all over the map, in addition to an alert message that pops up on loading the app saying "_This page can't load Google Maps correctly._". The reason is clearly stated in the console log: "_You have exceeded your request quota for this API_". To get this message removed, payment for upgrade is required by Google.

## Project Overview
This project is a single page application featuring a map of Sydney and surrounding suburbs with National Parks locations listed and highlighted on the map. Additional information is also provided using third-party APIs.

## Project Details

* This project was bootstrapped with `create-react-app` package.

* It initially displays a list of 20 national parks located in and around Sydney, Australia. The list data is retrieved via **Google Maps APIs Places Library**. If fetching the places list by Google APIs failed for any reason (even for going offline), a static list is used by the App instead. Also, a descriptive message stating the failure is logged to the console.

* It initially displays a map of Sydney and surrounding suburbs with markers for the 20 parks locations in the list. The map and markers are implemented using **Google Maps APIs**.

* There is an input field used to filter both the list and the map markers accordingly in real time. Places are filtered by name or location address.

* When a list item or a marker is clicked, the following happens:
  - The corresponding marker bounces and the list item is highlighted.
  - An info box is opened at the marker showing information about the corresponding place (name, address, image and a link to more details about the place).

* When the _Tell me more_ link in the place info window is clicked, a modal window opens including further details about the place (name, address, a bigger photo, a description of the park obtained from Wikipedia and a link to the Wikipedia page of this park). **Wikipedia APIs** are used for this functionality.

**_Note that:_**
* When you close an InfoWindow, you can reopen it by clicking again on the selected list item or on the bouncing marker.
* Filtering closes any opened info window to prevent app user confusion.
* For few places, no image is available. In that case, image placeholder is used instead.
* Also for some places, no Wikipedia data retrieved. In that case, a descriptive message is displayed stating that no description is available.

## How to run the App

### To run the app as development build:
- Clone the submitted project repository to a folder on your local machine
- Install all project dependencies with `npm install` in the project folder
- Start the app with `npm start`
- Browse to the provided URL

**_Note that:_** When running the app as development build, **Offline-first Service Worker** will not be available to cache site assets to work offline. To allow this feature, run the app as production build using instructions below.

### To run the app as production build:
- Clone the submitted project repository to a folder on your local machine
- Install all project dependencies with `npm install` in the project folder
- Build the app for production with `npm run build` in the project folder
- Install serve with `npm i serve -g`
- Setup a static server for the app with `serve -s build` in the project folder
- Browse to the provided URL

### To test the App:
Simple tests are created to ensure that the App runs without crashes.

The following packages are used for test:
- react-test-renderer
- enzyme
- enzyme-adapter-react-16

Run the tests with `npm test`.
