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


  calculateYearlyTotal(travelerID, currentDate, yearAgoDate, destinationsRepo) {
    const pastYearTrips = 
    this.filterPastYear(travelerID, currentDate, yearAgoDate);

    if (pastYearTrips.length > 0) {
      const yearlyTotal = pastYearTrips.reduce((sum, trip) => {

        const tripTotal = destinationsRepo.calculateTripEstimate(trip);
        sum += tripTotal

        return sum;
      }, 0);

      return yearlyTotal;
    } else {
      return 0;
    }
  }

}

export default TripsRepository;