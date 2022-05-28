// Todo: Dump same data in Db
const rideTypes = [
  { id: 1, name: 'SUV', type: 'SUV' },
  {
    id: 2,
    name: 'Sedan',
    type: 'Sedan',
  },
  {
    id: 3,
    name: 'Van',
    type: 'Van',
  },
  {
    id: 4,
    name: 'Truck',
    type: 'Truck',
  },
  {
    id: 5,
    name: 'Motorcycle',
    type: 'Motorcycle',
  },
  {
    id: 6,
    name: 'Bicycle',
    type: 'Bicycle',
  },
  {
    id: 7,
    name: 'Hatchback',
    type: 'Hatchback',
  },
];

export const rideImages = {
  SEDAN: require('../assets/SEDAN.webp'),
  SUV: require('../assets/SUV.webp'),
  // Van: require('../assets/images/van.png'),
  // Truck: require('../assets/images/truck.png'),
  // Motorcycle: require('../assets/images/motorcycle.png'),
  // Bicycle: require('../assets/images/bicycle.png'),
  // Hatchback: require('../assets/images/hatchback.png'),
};
export default rideTypes;
