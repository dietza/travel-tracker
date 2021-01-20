class DestinationsRepository {
  constructor(allDestinationsData) {
    this.allDestinations = allDestinationsData || [];
  }

  findByName(requestDestinationName) {

    const targetDestination = this.allDestinations.find(destination => {
      return destination.destination.includes(requestDestinationName);
    });

    if (targetDestination) {
      return targetDestination;
    } else {
      const unavailDestinationMsg = 
      `Sorry, we can't get you to ${requestDestinationName} ...yet!`;
      return unavailDestinationMsg;
    }

  }

  findByID(destinationID) {

    const targetDestination = this.allDestinations.find(destination => {
      return destination.id === destinationID;
    });

    if (targetDestination) {
      return targetDestination;
    } else {
      const unknownDestinationMsg = 
      `Wait..., where are we?`;
      return unknownDestinationMsg;
    }

  }

  calculateTripEstimate(requestedTrip) {

    // this.confirmRequestedTripDetails(requestedTrip);

    const numTravelers = requestedTrip.travelers;
    const numDays = requestedTrip.duration;
    const requestDestination = this.findByID(requestedTrip.destinationID);

    console.log('requestDestination >>>>> ', requestDestination);
    console.log('requestedTrip.travelers >>>>> ', requestedTrip.travelers);
    console.log('requestedTrip.duration >>>>> ', requestedTrip.duration);

    const estFlightTotal = 
    (requestDestination.estimatedFlightCostPerPerson * numTravelers);
    console.log('estFlightTotal >>>>> ', estFlightTotal);

    const estLodgingTotal = 
    ((requestDestination.estimatedLodgingCostPerDay * numTravelers) * numDays);
    console.log('estLodgingTotal >>>>> ', estLodgingTotal);

    const estTripTotal = estFlightTotal + estLodgingTotal;
    
    console.log('EST TRIP TOTAL>>>>> ', estTripTotal);
    return estTripTotal;

  }





  // method to search for a single destination by name (based on traveler request input)

  // method to find single destination by destination id (to display for each of a traveler's trips)
  
  // method to calculate cost estimate for a trip (estimates in each destination object * days duration input)

}

export default DestinationsRepository;