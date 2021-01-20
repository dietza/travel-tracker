class TripsRepository {
  constructor(allTripsData) {
    this.allTrips = allTripsData || [];
  }

  filterByTravelerID(travelerID) {
    const travelerTrips = this.allTrips.filter(trip => {
      return trip.userID === travelerID;
    });

    return travelerTrips;
  }

  findByTripID(tripID) {
    const tripByID = this.allTrips.find(trip => {
      return trip.id === tripID;
    });
    return tripByID;
  }


  filterPastYear(travelerID, currentDate, yearAgoDate) {
    const allTravelerTrips = this.filterByTravelerID(travelerID);
    
    const pastYearTrips = allTravelerTrips.filter(trip => {
      if ((yearAgoDate < trip.date) && (trip.date < currentDate)) {
        return trip;
      }
    })

    return pastYearTrips;
  }


  calculateTravelerYearTotal() {
    // const yearlyTotalCost
  }

  // method to  filter trips (by traveler id) from fetched data
  
  // method to calculate amount spent on trips in past 365 days (by traveler id, and date)

}

export default TripsRepository;