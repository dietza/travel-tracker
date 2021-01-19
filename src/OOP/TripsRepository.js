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

  calculateTravelerYearTotal() {
    // const yearlyTotalCost
  }

  // method to  filter trips (by traveler id) from fetched data
  
  // method to calculate amount spent on trips in past 365 days (by traveler id, and date)

}

export default TripsRepository;