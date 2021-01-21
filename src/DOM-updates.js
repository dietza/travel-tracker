// QUERY SELECTORS

export const main = document.querySelector("main");
export const requestForm = document.querySelector("form");
export const dateInput = document.querySelector(".form__date-input");
export const durationInput = document.querySelector(".form__duration-input");
export const numTravelersInput = 
document.querySelector(".form__travelers-input");
export const destinationInput = 
document.querySelector(".form__destination-input");
export const estimateButton = 
document.querySelector('.form__estimate-trip-button');
export const requestButton = 
document.querySelector('.form__submit-request-button');
export const yearlyCostDisplay = 
document.querySelector(".traveler-detail__yearly-cost-display");
export const errorMessageDisplay = 
document.querySelector('.form__error-message');
export const tripEstimateDisplay = 
document.querySelector(".trip-estimate-display");

// const usernameInput = document.querySelector(".form__username-input");
// const passwordInput = document.querySelector(".form__password-input");
// const loginButton = document.querySelector(".form__submit-login-button");

// DISPLAY FUNCTIONS

let domUpdates = {

  displayTrips(traveler, tripsRepo, destinationsRepo) {
    const travelerTrips = tripsRepo.filterByTravelerID(traveler.id);
    main.innerHTML = ''

    domUpdates.buildTripDisplayHTML(traveler, destinationsRepo, travelerTrips);
  },

  buildTripDisplayHTML(traveler, destinationsRepo, travelerTrips) {
    let tripsDisplay = 
    main.insertAdjacentHTML('afterbegin', 
      `<h2 class="welcome traveler-name">
      WELCOME BACK, ${(traveler.name).toUpperCase()}!
      </h2>`)

    travelerTrips.forEach(trip => {

      const displayDate = domUpdates.reformatDate(trip.date);
      const destination = destinationsRepo.findByID(trip.destinationID);
      main.insertAdjacentHTML('beforeend', 
        `<article tabindex="0" class="trip-display">
        <img src=${destination.image}" alt ="${destination.alt}">
        <br>
          <section class="trip-details">
          <h3 class-"trip-detail__destination">
          ${destination.destination}</h3>
          <p class="trip-detail__date">START DATE: ${displayDate}</p>
          <p class="trip-detail__travelers">
          NUMBER of TRAVELERS: ${trip.travelers}</p>
          <p class="trip-detail__duration">
          NUMBER of DAYS: ${trip.duration}</p>
          <p class="trip-detail__status">TRIP STATUS: ${trip.status}</p>
          </section>
        </article>
      `); 
    })

    return tripsDisplay;
  },

  displayYearlyCost
  (travelerID, today, oneYearAgo, destinationsRepository, tripsRepository) {
    const yearlyCost = domUpdates.calculateYearlyCost
    (travelerID, today, oneYearAgo, destinationsRepository, tripsRepository);

    const displayDate = domUpdates.reformatDate(oneYearAgo);

    requestForm.insertAdjacentHTML('afterend', 
      `<article tabindex="0" class="traveler-detail__yearly-cost-display">
        <label for="traveler-detail__yearly-cost" class="label-text">
          YOU'VE SPENT: </label>
            <h2 class-"traveler-detail__yearly-cost" 
            name="traveler-detail__yearly-cost">
            $${yearlyCost}</h2>
            <p class="traveler-detail__past-year">
            ON TRIPS SINCE ${displayDate}</p>
        </article>
      `);
  },

  reformatDate(rawDate) {
    const splitDate = rawDate.split("/");
    const year = splitDate[0];
    const month = splitDate[1];
    const day = splitDate[2];
    const reformattedDate = 
    new Date([month, day, year]).toLocaleDateString("en-US");

    return reformattedDate;
  },

  calculateYearlyCost
  (travelerID, today, oneYearAgo, destinationsRepo, tripsRepo) {
    const yearlyTripsTotal = tripsRepo.calculateYearlyTotal
    (travelerID, today, oneYearAgo, destinationsRepo);

    const commission = yearlyTripsTotal * .10;
    const totalCost = (yearlyTripsTotal + commission).toFixed(2);
    return totalCost;
  },

  populateDestinationOptions(destinationsRepo) {
    const sortedDestinations = 
    domUpdates.sortDestinationsList(destinationsRepo);

    destinationInput.insertAdjacentHTML('afterend',
      `<datalist id="destination-options" 
      class="form__destination-options datalist">
      </datalist>`);

    const destinationOptions = 
    document.querySelector(".form__destination-options");

    sortedDestinations.forEach(destination => {

      destinationOptions.insertAdjacentHTML('beforeend',
        `<option value="${destination.destination}">
        ${destination.destination}
        </option>
        `);
    });
  },

  sortDestinationsList(destinationsRepo) {
    const sortedDestinations = destinationsRepo.allDestinations.sort((a, b)=> {
      if ((a.destination.split(",")[0] > b.destination.split(",")[0])) {
        return 1;
      } else if (a.destination.split(",")[0] < b.destination.split(",")[0]) {
        return -1;
      }
    });
    return sortedDestinations;
  },

  displayEstimate(tripEstimate, tripInputs, destinationsRepo) {

    const destination = destinationsRepo.findByID(tripInputs.destinationID);
    // const displayDate = domUpdates.reformatDate(tripInputs.date);

    // yearlyCostDisplay.classList.add('.hidden');

    tripEstimateDisplay.innerHTML = 
      `<article tabindex="0" class="trip-estimate-display">
        <img src=${destination.image}" 
        alt ="${destination.alt}" class="trip-detail__trip-estimate-image">
        <label for="trip-detail__trip-estimate-display" class="label-text">
        ESTIMATE: </label>
          <h2 class-"trip-detail__trip-estimate-display" 
          name="trip-detail__trip-estimate-display">
          $${tripEstimate}</h2>
          <section class="trip-details">
          <label for="trip-detail__destination" class="label-text">
          TO VISIT </label>
          <h3 class-"trip-detail__destination">
          ${destination.destination}</h3>
          <p class="trip-detail__date">START DATE: ${tripInputs.date}</p>
          <p class="trip-detail__travelers">
          NUMBER of TRAVELERS: ${tripInputs.travelers}</p>
          <p class="trip-detail__duration">
          NUMBER of DAYS: ${tripInputs.duration}</p>
          <p class="trip-detail__status">
          TRIP STATUS: ${tripInputs.status}</p>
          </section>
      </article>
    `;

    console.log('destination >>>', destination);

  },

  displayErrorMessage(message) {

    // alert(message);

    console.log('ERROR >> ', message);

    errorMessageDisplay.innerHTML =
      `<article tabindex="0" class="error-message">
          <label for="form__input-error" class="label-text">
            CHECK INPUTS!</label>
          <p class="form__input-error" name="form__input-error">
          ${message}</p>
        </article>`;

  },

  clearErrors() {
    errorMessageDisplay.innerHTML = '';
  },

  clearInputs() {
    dateInput.value = '';
    durationInput.value = '';
    numTravelersInput.value = '';
    destinationInput.value = '';
  },

}

export {domUpdates};