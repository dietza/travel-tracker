import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/OOP/Traveler';

describe('Traveler', () => {
  let allTravelersData;
  let traveler1;
  let traveler2;
  
  beforeEach(() => {
    allTravelersData = [{
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer",
    },
    {
      "id": 2,
      "name": "Rachael Vaughten",
      "travelerType": "thrill-seeker"
    }]

    traveler1 = new Traveler(allTravelersData[0]);
    traveler2 = new Traveler(allTravelersData[1]);
  })

  it('should be an single traveler', () => {
    expect(traveler2).to.be.an.instanceOf(Traveler);
    expect(traveler1).to.deep.equal({
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer",
    });
  })

  it('should have an id', () => {
    expect(traveler1.id).to.be.a("number");
    expect(traveler1.id).to.equal(1);
    expect(traveler2.id).to.equal(2);
  })

  it('should have a name', () => {
    expect(traveler2.name).to.be.a("string");
    expect(traveler1.name).to.equal("Ham Leadbeater");
    expect(traveler2.name).to.equal("Rachael Vaughten");
  })

  it('should have a traveler type', () => {
    expect(traveler1.travelerType).to.be.a("string");
    expect(traveler1.travelerType).to.equal("relaxer");
    expect(traveler2.travelerType).to.equal("thrill-seeker");
  })

});