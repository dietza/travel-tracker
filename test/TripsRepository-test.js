import chai from 'chai';
const expect = chai.expect;
import moment from 'moment';

import TripsRepository from '../src/OOP/TripsRepository';
import DestinationsRepository from '../src/OOP/DestinationsRepository';


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
  },
  {
    "id": 35,
    "name": "Lorilyn Frostdick",
    "travelerType": "shopper"
  }
];

const allDestinationsData = [
  {
    "id": 1,
    "destination": "Lima, Peru",
    "estimatedLodgingCostPerDay": 70,
    "estimatedFlightCostPerPerson": 400,
    "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    "alt": "overview of city buildings with a clear sky"
  },
  {
    "id": 14,
    "destination": "Marrakesh, Morocco",
    "estimatedLodgingCostPerDay": 70,
    "estimatedFlightCostPerPerson": 830,
    "image": "https://images.unsplash.com/photo-1517821362941-f7f753200fef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
    "alt": "people buying oranges and other fruit from a street vendor"
  },
  {
    "id": 22,
    "destination": "Rome, Italy",
    "estimatedLodgingCostPerDay": 90,
    "estimatedFlightCostPerPerson": 650,
    "image": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "people standing inside a colosseum during the day"
  },
  {
    "id": 25,
    "destination": "New York, New York",
    "estimatedLodgingCostPerDay": 175,
    "estimatedFlightCostPerPerson": 200,
    "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "people crossing the street during the day surrounded by tall buildings and advertisements"
  },
  {
    "id": 49,
    "destination": "Castries, St Lucia",
    "estimatedLodgingCostPerDay": 650,
    "estimatedFlightCostPerPerson": 90,
    "image": "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
    "alt": "aerial photography of rocky mountain under cloudy sky"
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
  },
  {
    "id": 189,
    "userID": 25,
    "destinationID": 15,
    "travelers": 4,
    "date": "2019/12/01",
    "duration": 10,
    "status": "approved",
    "suggestedActivities": []
  }
];

describe('TripsRepository', () => {

  let traveler3;
  let traveler25;
  let traveler35;
  let destinationsRepository;
  let tripsRepository;
  let today;
  let oneYearAgo;
  
  beforeEach(() => {

    traveler3 = allTravelersData[0];
    traveler25 = allTravelersData[1];
    traveler35 = allTravelersData[2];

    destinationsRepository = new DestinationsRepository(allDestinationsData);

    tripsRepository = new TripsRepository(allTripsData);

    today = moment().format('YYYY/MM/DD');

    oneYearAgo = moment().subtract(366, 'days').format('YYYY/MM/DD');
    
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

  it('should be able to access trips by the tripID', () => {
    const tripByID = tripsRepository.findByTripID(41);

    expect(tripsRepository.allTrips[2].id).to.equal(3);
    expect(tripByID).to.deep.equal({
      "id": 41,
      "userID": 3,
      "destinationID": 25,
      "travelers": 3,
      "date": "2020/08/30",
      "duration": 11,
      "status": "approved",
      "suggestedActivities": []
    });
  })

  it('should filter trips based on a traveler\'s id number', () => {
    const travelerTrips25 = tripsRepository.filterByTravelerID(traveler25.id);
    const travelerTrips3 = tripsRepository.filterByTravelerID(traveler3.id);

    expect(travelerTrips25).to.deep.equal([{
      "id": 189,
      "userID": 25,
      "destinationID": 15,
      "travelers": 4,
      "date": "2019/12/01",
      "duration": 10,
      "status": "approved",
      "suggestedActivities": []
    }]);
    expect(travelerTrips3.length).to.equal(2);
  })

  it('should filter a traveler\'s trips for the past year', () => {
    const travelYear3 = tripsRepository.filterPastYear
    (traveler3.id, today, oneYearAgo);
    const travelYear35 = tripsRepository.filterPastYear
    (traveler35.id, today, oneYearAgo);
    const travelYear25 = tripsRepository.filterPastYear
    (traveler25.id, today, oneYearAgo);

    expect(travelYear3).to.deep.equal([
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
        "id": 41,
        "userID": 3,
        "destinationID": 25,
        "travelers": 3,
        "date": "2020/08/30",
        "duration": 11,
        "status": "approved",
        "suggestedActivities": []
      }
    ]);    
    expect(travelYear35).to.deep.equal([
      {
        "id": 2,
        "userID": 35,
        "destinationID": 25,
        "travelers": 5,
        "date": "2020/10/04",
        "duration": 18,
        "status": "pending",
        "suggestedActivities": []
      }
    ]);
    expect(travelYear25).to.deep.equal([]);
  })

  it('should calc total a traveler spent on trips in the past year', () => {

    const yearlyTotalCost3 = tripsRepository.calculateYearlyTotal
    (traveler3.id, today, oneYearAgo, destinationsRepository);
    const yearlyTotalCost35 = tripsRepository.calculateYearlyTotal
    (traveler35.id, today, oneYearAgo, destinationsRepository);
    const yearlyTotalCost25 = tripsRepository.calculateYearlyTotal
    (traveler25.id, today, oneYearAgo, destinationsRepository);
    
    expect(yearlyTotalCost3).to.equal(15095);
    expect(yearlyTotalCost35).to.equal(16750);
    expect(yearlyTotalCost25).to.equal(0);


    let date = new Date([10, 31, 2020]).toLocaleDateString("en-US");
    console.log('REFORMAT >>>', date);
  })

})