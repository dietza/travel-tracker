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

    const missingDetails = this.confirmRequestedTripDetails(requestedTrip);

    if (missingDetails) {
      return missingDetails;
    }

    const numTravelers = requestedTrip.travelers;
    const numDays = requestedTrip.duration;
    const requestDestination = this.findByID(requestedTrip.destinationID);

    const estFlightTotal = 
    (requestDestination.estimatedFlightCostPerPerson * numTravelers);
    const estLodgingTotal = 
    ((requestDestination.estimatedLodgingCostPerDay * numTravelers) * numDays);
    const estTripTotal = estFlightTotal + estLodgingTotal;
    
    return estTripTotal;

  }

  confirmRequestedTripDetails(requestedTrip) {

    const missingInfoMsg = 'Missing info: ';

    if (!requestedTrip.destinationID) {
      return missingInfoMsg + 'Where are we going?';
    } else if (!requestedTrip.travelers) {
      return missingInfoMsg + 'How many people are traveling?';
    } else if (!requestedTrip.duration) {
      return missingInfoMsg + 'How long do you want to be there?';
    }

  }

}

export default DestinationsRepository;