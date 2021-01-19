import chai from 'chai';
const expect = chai.expect;

import TripsRepository from '../src/OOP/TripsRepository';

const allTravelersData = [
  {
    "id": 3,
    "name": "Sibby Dawidowitsch",
    "travelerType": "shopper"
  },
  {
    "id": 25,
    "name": "Leighton Doerrling",
    "travelerType": "relaxer"
  }
];

const allTripsData = [
  {
    "id": 1,
    "userID": 44,
    "destinationID": 49,
    "travelers": 1,
    "date": "2019/09/16",
    "duration": 8,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 2,
    "userID": 35,
    "destinationID": 25,
    "travelers": 5,
    "date": "2020/10/04",
    "duration": 18,
    "status": "pending",
    "suggestedActivities": []
  },
  {
    "id": 3,
    "userID": 3,
    "destinationID": 22,
    "travelers": 4,
    "date": "2020/05/22",
    "duration": 17,
    "status": "pending",
    "suggestedActivities": []
  },
  {
    "id": 4,
    "userID": 43,
    "destinationID": 14,
    "travelers": 2,
    "date": "2020/02/25",
    "duration": 10,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 41,
    "userID": 3,
    "destinationID": 25,
    "travelers": 3,
    "date": "2020/08/30",
    "duration": 11,
    "status": "approved",
    "suggestedActivities": []
  }
];

describe('TripsRepository', () => {

  let traveler3;
  let traveler25;
  let tripsRepository;
  
  beforeEach(() => {

    traveler3 = allTravelersData[0];
    traveler25 = allTravelersData[1];

    tripsRepository = new TripsRepository(allTripsData)
  });

  it('should be an instance of the TripsRepository class', ()=> {
    expect(tripsRepository).to.be.an.instanceof(TripsRepository);
  })

  it('should contain an array of trip data objects', () => {
    expect(tripsRepository.allTrips).to.be.an('array');
    expect(tripsRepository.allTrips[1]).to.deep.equal({
      "id": 2,
      "userID": 35,
      "destinationID": 25,
      "travelers": 5,
      "date": "2020/10/04",
      "duration": 18,
      "status": "pending",
      "suggestedActivities": []
    });
  })

  it('should filter trips based on a traveler\'s id number', () => {
    const travelerTrips25 = tripsRepository.filterByTravelerID(traveler25.id);
    const travelerTrips3 = tripsRepository.filterByTravelerID(traveler3.id);

    expect(travelerTrips25).to.deep.equal([]);
    expect(travelerTrips3.length).to.equal(2);
  })

  it('should calc total a traveler spent on trips in the past year', () => {
    // const travelerTotal25 = tripsRepository.calculateTravelerYearTotal();
    const travelerTotal = tripsRepository.calculateTravelerYearTotal(traveler3.id);

    expect(travelerTotal).to.equal(0);
  })

})