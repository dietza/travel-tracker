let fetchApi = {

  fetchCurrentTravelerData(userID) {
    let fetchedCurrentTravelerData = fetch('http://localhost:3001/api/v1/travelers/${userID}')
      .then(response => response.json())
      .then(data => data.travelers.find(traveler => traveler.id === userID))
      .catch(error => console.log(error.message));
    return fetchedCurrentTravelerData;
  },

  fetchAllTravelersData() {
    let fetchedAllTravelersData = fetch('http://localhost:3001/api/v1/travelers')
      .then(response => response.json())
      .then(data => data.travelers)
      .catch(error => console.log(error.message));
    return fetchedAllTravelersData;
  },

  fetchTripsData() {
    let fetchedTripsData = fetch('http://localhost:3001/api/v1/trips')
      .then(response => response.json())
      .then(data => data.trips)
      .catch(error => console.log(error.message));
    return fetchedTripsData;
  },

  fetchDestinationsData() {
    let fetchedDestinationsData = fetch('http://localhost:3001/api/v1/destinations')
      .then(response => response.json())
      .then(data => data.destinations)
      .catch(error => console.log(error.message));
    return fetchedDestinationsData;
  },

  postNewTrip(tripRequest, tripDate) {
    fetch('http://localhost:3001/api/v1/trips', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
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