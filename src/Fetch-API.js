let fetchApi = {

  fetchCurrentTravelerData(travelerID) {
    console.log('travelerID', travelerID);
    let fetchedTravelerData = fetch(`http://localhost:3001/api/v1/travelers/${travelerID}`)
      .then(response => response.json())
      // .then(data => console.log('data', data))
      .then(data => data)
      .catch(error => console.log(error.message));
    return fetchedTravelerData;
  },

  // fetchAllTravelersData() {
  //   let fetchedAllTravelersData = fetch('http://localhost:3001/api/v1/travelers')
  //     .then(response => response.json())
  //     .then(data => data.travelers)
  //     .catch(error => console.log(error.message));
  //   return fetchedAllTravelersData;
  // },

  fetchDestinationsData() {
    let fetchedDestinationsData = fetch('http://localhost:3001/api/v1/destinations')
      .then(response => response.json())
      .then(data => data.destinations)
      .catch(error => console.log(error.message));
    return fetchedDestinationsData;
  },

  fetchTripsData() {
    let fetchedTripsData = fetch('http://localhost:3001/api/v1/trips')
      .then(response => response.json())
      .then(data => data.trips)
      .catch(error => console.log(error.message));
    return fetchedTripsData;
  },

  postNewTrip(tripRequest, tripDate, tripsRepo) {
    fetch('http://localhost:3001/api/v1/trips', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "id": parseInt(tripsRepo.allTripsData.length + 1),
        "userID": parseInt(tripRequest.userID),
        "destinationID": parseInt(tripRequest.destinationID),
        "travelers": parseInt(tripRequest.userID),
        "date": `${tripDate}`,
        "duration": parseInt(tripRequest.duration),
        "status": "pending",
        "suggestedActivities": []
      })
    })
      .then(response => response.json())
      .catch(error => console.log(error.message))
  },

  // displayErrorMessage(message) {
  //   const messages = document.querySelector('.messages');
  //   messages.innerText = message;
  //   ///// add messages section to HTML where this will display the error message
  //   ///// move this display to call from DOM-updates
  // }

}

export {fetchApi};