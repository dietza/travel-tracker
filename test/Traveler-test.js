import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/OOP/Traveler';

describe('Traveler', () => {
  let travelerData;
  let traveler1;
  let traveler2;
  
  beforeEach(() => {
    travelerData = [{
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer",
    },
    {
      "id": 2,
      "name": "Rachael Vaughten",
      "travelerType": "thrill-seeker"
    }]

    traveler1 = new Traveler(travelerData[0]);
    traveler2 = new Traveler(travelerData[1]);
  })

  it('should be an single traveler', () => {
    expect(traveler1).to.be.an.instanceOf(Traveler);
    expect(traveler1).to.deep.equal({
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer",
    });
  })


});