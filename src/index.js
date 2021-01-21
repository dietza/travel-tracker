// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// IMPORTS

import './css/index.scss';
import moment from 'moment';

import Traveler from './OOP/Traveler';
import TripsRepository from './OOP/TripsRepository';
import DestinationsRepository from './OOP/DestinationsRepository'

import fetchApi from './Fetch-API';
import {
  domUpdates,
  main,
  requestForm,
  dateInput,
  durationInput,
  numTravelersInput,
  destinationInput,
  estimateButton,
  requestSubmitButton,
  errorMessageDisplay,
  tripEstimateDisplay} from './DOM-updates';

// // QUERY SELECTORS

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
// let yearlyCost;
let newTrip;

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
  domUpdates.clearErrors();
  
  domUpdates.displayTrips
  (traveler, tripsRepository, destinationsRepository);
  
  domUpdates.displayYearlyCost
  (travelerID, today, oneYearAgo, destinationsRepository, tripsRepository);

  domUpdates.populateDestinationOptions(destinationsRepository);
};

const setEventListeners = () => {
  estimateButton.addEventListener('click', getTripEstimate);
  requestSubmitButton.addEventListener('click', submitTripRequest);
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
  checkEstimate(tripInputs, tripEstimate);
}

const checkEstimate = (tripInputs, tripEstimate) => {
  if (tripEstimate > 0) {
    domUpdates.displayEstimate
    (tripEstimate, tripInputs, destinationsRepository);
    domUpdates.clearInputs();
    domUpdates.clearErrors();
    newTrip = domUpdates.buildNewTrip(tripInputs, tripsRepository);
  } else {
    domUpdates.displayErrorMessage(tripEstimate);
  }
}

const submitTripRequest = (event) => {
  event.preventDefault()

  fetchApi.postNewTrip(newTrip)
    .then(result => domUpdates.displayPostMessage(result.message))
    .catch(err => domUpdates.displayErrorMessage(err))

}


