// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// IMPORTS

import './css/index.scss';
import moment from 'moment';

import Traveler from './OOP/Traveler';
import TripsRepository from './OOP/TripsRepository';
import DestinationsRepository from './OOP/DestinationsRepository'

import {fetchApi} from './Fetch-API';
import {domUpdates} from './DOM-updates';

// QUERY SELECTORS

const dateInput = document.querySelector(".form__date-input");
const durationInput = document.querySelector(".form__duration-input");
const numTravelersInput = document.querySelector(".form__travelers-input");
const destinationInput = document.querySelector(".form__destination-input");
const quoteButton = document.querySelector('.form__estimate-trip-button');
const requestButton = document.querySelector('.form__submit-request-button');

// const usernameInput = document.querySelector(".form__username-input");
// const passwordInput = document.querySelector(".form__password-input");
// const loginButton = document.querySelector(".form__submit-login-button");


// GLOBAL

let destinationsRepository;
let tripsRepository;
let traveler;

const today = moment().format('YYYY/MM/DD');
const oneYearAgo = moment().subtract(366, 'days').format('YYYY/MM/DD');

const travelerID = getRandomID();
const fetchedTravelerData = fetchApi.fetchCurrentTravelerData(travelerID);
const fetchedDestinationsData = fetchApi.fetchDestinationsData();
const fetchedTripsData = fetchApi.fetchTripsData();

// DASH LOAD

const getRandomID = () => {
  return Math.floor(Math.random() * 50)
}


const buildTravelerDash = () => {
  Promise.all([
    fetchedTravelerData,
    fetchedDestinationsData,
    fetchedTripsData
  ])
    .then(response => {
      traveler = new Traveler(response[0]);
      destinationsRepository = new DestinationsRepository(response[1]);
      tripsRepository = new TripsRepository(response[2]);


      domUpdates.displayTravelerTrips
      (traveler, tripsRepository, destinationsRepository);
    });
}

buildTravelerDash();
