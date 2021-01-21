let domUpdates = {

  displayTravelerTrips(traveler, tripsRepository, destinationsRepository) {
    const travelerTrips = tripsRepository.filterByTravelerID(traveler.id);

    let tripsDisplay = 
    `
    


    `
    return tripsDisplay;
  }


}

export {domUpdates};