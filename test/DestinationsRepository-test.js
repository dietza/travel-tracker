import chai from 'chai';
const expect = chai.expect;

import DestinationsRepository from '../src/OOP/DestinationsRepository';
// import TripsRepository from '../src/OOP/TripsRepository';


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

// const allTripsData = [
//   {
//     "id": 1,
//     "userID": 44,
//     "destinationID": 49,
//     "travelers": 1,
//     "date": "2019/09/16",
//     "duration": 8,
//     "status": "approved",
//     "suggestedActivities": []
//   },
//   {
//     "id": 2,
//     "userID": 35,
//     "destinationID": 25,
//     "travelers": 5,
//     "date": "2020/10/04",
//     "duration": 18,
//     "status": "pending",
//     "suggestedActivities": []
//   },
//   {
//     "id": 3,
//     "userID": 3,
//     "destinationID": 22,
//     "travelers": 4,
//     "date": "2020/05/22",
//     "duration": 17,
//     "status": "pending",
//     "suggestedActivities": []
//   },
//   {
//     "id": 4,
//     "userID": 43,
//     "destinationID": 14,
//     "travelers": 2,
//     "date": "2020/02/25",
//     "duration": 10,
//     "status": "approved",
//     "suggestedActivities": []
//   },
//   {
//     "id": 41,
//     "userID": 3,
//     "destinationID": 25,
//     "travelers": 3,
//     "date": "2020/08/30",
//     "duration": 11,
//     "status": "approved",
//     "suggestedActivities": []
//   }
// ];

describe('DestinationsRepository', () => {

  let traveler3;
  let traveler25;
  let destinationsRepository;
  // let tripsRepository;
  
  beforeEach(() => {

    traveler3 = allTravelersData[0];
    traveler25 = allTravelersData[1];

    destinationsRepository = new DestinationsRepository(allDestinationsData);

    // tripsRepository = new TripsRepository(allTripsData);

  });

  it('should be an instance of the DestinationsRepository class', ()=> {
    expect(destinationsRepository).to.be.an.instanceof(DestinationsRepository);
  })

  it('should contain an array of destination data objects', () => {

    const targetDestination = destinationsRepository.allDestinations[(destinationsRepository.allDestinations.length - 1)]

    expect(destinationsRepository.allDestinations).to.be.an('array');
    expect(targetDestination).to.deep.equal({
      "id": 49,
      "destination": "Castries, St Lucia",
      "estimatedLodgingCostPerDay": 650,
      "estimatedFlightCostPerPerson": 90,
      "image": "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
      "alt": "aerial photography of rocky mountain under cloudy sky"
    });
  })

  it('should find a destination by name (or just city name)', () => {
    const destinationByName1 = destinationsRepository.findByName('Lima, Peru');
    const destinationByName2 = destinationsRepository.findByName('Rome');
    const destinationByName3 = destinationsRepository.findByName('Mars');

    expect(destinationByName1).to.deep.equal({
      "id": 1,
      "destination": "Lima, Peru",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 400,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "overview of city buildings with a clear sky"
    });
    expect(destinationByName2).to.deep.equal({
      "id": 22,
      "destination": "Rome, Italy",
      "estimatedLodgingCostPerDay": 90,
      "estimatedFlightCostPerPerson": 650,
      "image": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "people standing inside a colosseum during the day"
    });
    expect(destinationByName3).to.deep.equal
    ("Sorry, we can't get you to Mars ...yet!");
  })



})