let fetchApi = {

  fetchCurrentTravelerData(travelerID) {
    console.log('travelerID', travelerID);
    let fetchedTravelerData = 
    fetch(`http://localhost:3001/api/v1/travelers/${travelerID}`)
      .then(response => response.json())
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
    let fetchedDestinationsData = 
    fetch('http://localhost:3001/api/v1/destinations')
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

  postNewTrip(tripRequest) {
    console.log('IN POST >>>', tripRequest.destinationID);
    console.log('2 IN POST >>>', tripRequest);

    return fetch('http://localhost:3001/api/v1/trips', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tripRequest)
      // body: JSON.stringify({
      //   "id": parseInt(`${newID}`),
      //   "userID": parseInt(`${tripRequest.userID}`),
      //   "destinationID": parseInt(`${tripRequest.destinationID}`),
      //   "travelers": parseInt(`${tripRequest.travelers}`),
      //   "date": `"${tripRequest.date}"`,
      //   "duration": parseInt(`${tripRequest.duration}`),
      //   "status": "pending",
      //   "suggestedActivities": []
      // })
    })
      .then(response => response.json())
      .then(promise => promise)
      .catch(error => alert(error.message))
  },

}

export default fetchApi;