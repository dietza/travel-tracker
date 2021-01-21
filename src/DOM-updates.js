// QUERY SELECTORS

const main = document.querySelector("main");
const requestForm = document.querySelector("form");
const dateInput = document.querySelector(".form__date-input");
const durationInput = document.querySelector(".form__duration-input");
const numTravelersInput = document.querySelector(".form__travelers-input");
const destinationInput = document.querySelector(".form__destination-input");
const quoteButton = document.querySelector('.form__estimate-trip-button');
const requestButton = document.querySelector('.form__submit-request-button');
const tripEstimateDisplay = document.querySelector(".trip-estimate-display");

// const usernameInput = document.querySelector(".form__username-input");
// const passwordInput = document.querySelector(".form__password-input");
// const loginButton = document.querySelector(".form__submit-login-button");

// DISPLAY FUNCTIONS

let domUpdates = {

  displayTrips(traveler, tripsRepo, destinationsRepo) {
    const travelerTrips = tripsRepo.filterByTravelerID(traveler.id);
    main.innerHTML = ''

    let tripsDisplay = 
    main.insertAdjacentHTML('afterbegin', `<h2 class="welcome traveler-name">WELCOME BACK, ${(traveler.name).toUpperCase()}!</h2>`)
    
    travelerTrips.forEach(trip => {
      //////////////////////////////////////////////////////////////////////////
      console.log('TRIP >>>>>> ', trip);
      //////////////////////////////////////////////////////////////////////////
      const destination = destinationsRepo.findByID(trip.destinationID);
      main.insertAdjacentHTML('beforeend', 
        `<article tabindex="0" class="trip-display">
        <img src=${destination.image}" alt ="${destination.alt}">
        <br>
          <section class="trip-details">
            <p class="trip-detail__date">${trip.date}</p>
            <h3 class-"trip-detail__destination">
            ${destination.destination}</p>
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
  }


}

export {domUpdates};