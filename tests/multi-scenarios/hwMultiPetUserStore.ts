import petJourney from '../scenarios/hwPetJourney.ts';
import storeJourney from '../scenarios/hwStoreJourney.ts';
import userJourney from '../scenarios/hwUserJourney.ts';

export const options = {
  scenarios: {
    pet_journey: {
      executor: 'per-vu-iterations',
      exec: 'petJourney',
      vus: 1,
      iterations: 1,
    },
    store_journey: {
      executor: 'per-vu-iterations',
      exec: 'storeJourney',
      vus: 1,
      iterations: 1,
    },
    user_journey: {
      executor: 'per-vu-iterations',
      exec: 'userJourney',
      vus: 1,
      iterations: 1,
    },
  },
};

export { petJourney, storeJourney, userJourney };