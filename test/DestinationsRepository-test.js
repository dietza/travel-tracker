import chai from 'chai';
const expect = chai.expect;

import DestinationsRepository from '../src/OOP/DestinationsRepository';


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

const requestedTripsData = [
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
    "id": 138,
    "userID": 25,
    "destinationID": 22,
    "travelers": 3,
    "date": "2020/10/29",
    "duration": 18,
    "status": "pending",
    "suggestedActivities": []
  }
];

describe('DestinationsRepository', () => {

  let destinationsRepository;
  
  beforeEach(() => {

    destinationsRepository = new DestinationsRepository(allDestinationsData);

  });

  it('should be an instance of the DestinationsRepository class', ()=> {
    expect(destinationsRepository).to.be.an.instanceof(DestinationsRepository);
  })

  it('should contain an array of destination data objects', () => {
    const accessIndex = (destinationsRepository.allDestinations.length - 1);
    const destination = destinationsRepository.allDestinations[accessIndex];

    expect(destinationsRepository.allDestinations).to.be.an('array');
    expect(destination).to.deep.equal({
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

  it('should find a destination by destinationID', () => {
    const destinationID14 = destinationsRepository.allDestinations[1].id;

    const foundByID14 = destinationsRepository.findByID(destinationID14);
    const foundByID49 = destinationsRepository.findByID(49);
    const foundByIDxx = destinationsRepository.findByID(99);

    expect(foundByID14).to.deep.equal({
      "id": 14,
      "destination": "Marrakesh, Morocco",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 830,
      "image": "https://images.unsplash.com/photo-1517821362941-f7f753200fef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
      "alt": "people buying oranges and other fruit from a street vendor"
    });
    expect(foundByID49).to.deep.equal({
      "id": 49,
      "destination": "Castries, St Lucia",
      "estimatedLodgingCostPerDay": 650,
      "estimatedFlightCostPerPerson": 90,
      "image": "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
      "alt": "aerial photography of rocky mountain under cloudy sky"
    });
    expect(foundByIDxx).to.deep.equal("Wait..., where are we?");
  })

  it('should calculate a cost estimate for a requested trip', () => {

    const requestedTrip2 = requestedTripsData[0];
    const requestedTrip3 = requestedTripsData[1];
    const requestedTrip138 = requestedTripsData[2];

    const trip2Estimate = destinationsRepository.calculateTripEstimate
    (requestedTrip2);
    const trip3Estimate = destinationsRepository.calculateTripEstimate
    (requestedTrip3);
    const trip138Estimate = destinationsRepository.calculateTripEstimate
    (requestedTrip138);

    expect(trip2Estimate).to.equal(16750);
    expect(trip3Estimate).to.equal(8720);
    expect(trip138Estimate).to.equal(6810);
  })

  it('should return a message if the trip request is missing info', () => {
    const requestedTripXX = 
    {"travelers": 3, "duration": 18};
    const requestedTripYY = 
    {"destinationID": 22, "duration": 18};
    const requestedTripZZ = 
    {"destinationID": 22, "travelers": 3};

    const tripXEstimate = destinationsRepository.calculateTripEstimate
    (requestedTripXX);
    const tripYEstimate = destinationsRepository.calculateTripEstimate
    (requestedTripYY);
    const tripZEstimate = destinationsRepository.calculateTripEstimate
    (requestedTripZZ);

    expect(tripXEstimate).to.equal('Missing info: Where are we going?');
    expect(tripYEstimate).to.equal
    ('Missing info: How many people are traveling?');
    expect(tripZEstimate).to.equal
    ('Missing info: How long do you want to be there?');
  })

})