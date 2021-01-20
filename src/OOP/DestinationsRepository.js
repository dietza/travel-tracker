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
    console.log('missingDetails >>>>> ', missingDetails);

    if (missingDetails) {
      return missingDetails;
    }

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




  // method to search for a single destination by name (based on traveler request input)

  // method to find single destination by destination id (to display for each of a traveler's trips)
  
  // method to calculate cost estimate for a trip (estimates in each destination object * days duration input)

}

export default DestinationsRepository;