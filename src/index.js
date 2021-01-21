// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// IMPORTS

import './css/index.scss';
import moment from 'moment';

import Traveler from './OOP/Traveler';
import TripsRepository from './OOP/TripsRepository';
import DestinationsRepository from './OOP/DestinationsRepository'

import {fetchApi} from './Fetch-API';
import {
  domUpdates,
  main,
  requestForm,
  dateInput,
  durationInput,
  numTravelersInput,
  destinationInput,
  estimateButton,
  requestButton,
  errorMessageDisplay,
  tripEstimateDisplay} from './DOM-updates';

// // QUERY SELECTORS

// const dateInput = document.querySelector(".form__date-input");
// const durationInput = document.querySelector(".form__duration-input");
// const numTravelersInput = document.querySelector(".form__travelers-input");
// const destinationInput = document.querySelector(".form__destination-input");
// const quoteButton = document.querySelector('.form__estimate-trip-button');
// const requestButton = document.querySelector('.form__submit-request-button');

// // const usernameInput = document.querySelector(".form__username-input");
// // const passwordInput = document.querySelector(".form__password-input");
// // const loginButton = document.querySelector(".form__submit-login-button");


// GLOBAL

const getRandomID = () => {
  return Math.floor((Math.random() * (50 - 1)) + 1);
}

let destinationsRepository;
let tripsRepository;
let traveler;
let yearlyCost;

const today = moment().format('YYYY/MM/DD');
const oneYearAgo = moment().subtract(366, 'days').format('YYYY/MM/DD');

const travelerID = getRandomID();
const fetchedTravelerData = fetchApi.fetchCurrentTravelerData(travelerID);
const fetchedDestinationsData = fetchApi.fetchDestinationsData();
const fetchedTripsData = fetchApi.fetchTripsData();

// DASH LOAD

Promise.all([
  fetchedTravelerData,
  fetchedDestinationsData,
  fetchedTripsData
])
  .then(response => {
    traveler = new Traveler(response[0]);
    destinationsRepository = new DestinationsRepository(response[1]);
    tripsRepository = new TripsRepository(response[2]);
  })
  .then( () => {
    buildTravelerDashboard();
    setEventListeners();
  });

const buildTravelerDashboard = () => {
  // domUpdates.clearErrors();
  
  domUpdates.displayTrips
  (traveler, tripsRepository, destinationsRepository);
  
  domUpdates.displayYearlyCost
  (travelerID, today, oneYearAgo, destinationsRepository, tripsRepository);

  domUpdates.populateDestinationOptions(destinationsRepository);
};


const setEventListeners = () => {
  estimateButton.addEventListener('click', getTripEstimate);
// requestButton.addEventListener('click', );
}


const getTripEstimate = (event) => {
  event.preventDefault()
  const tripInputs = 
  {
    userID: travelerID,
    destinationID: destinationsRepository.findByName(destinationInput.value).id,
    travelers: numTravelersInput.value,
    date: dateInput.value,
    duration: durationInput.value,
    status: 'pending',
  };
  const tripEstimate = 
  destinationsRepository.calculateTripEstimate(tripInputs);

  console.log('tripEstimate >>>>> ', tripEstimate);

  checkEstimate(tripInputs, tripEstimate);

}

const checkEstimate = (tripInputs, tripEstimate) => {
  if (tripEstimate > 0) {
    domUpdates.displayEstimate
    (tripEstimate, tripInputs, destinationsRepository);
    domUpdates.clearInputs();
    domUpdates.clearErrors();
  } else {
    domUpdates.displayErrorMessage(tripEstimate);
  }
}



// window.addEventListener('load', buildTravelerDashboard());
// estimateButton.addEventListener('click', getTripEstimate());
// requestButton.addEventListener('click', );

