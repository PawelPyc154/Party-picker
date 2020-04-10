export default interface Event {
  _id: number;
  coordinates: {
    longitude: number;
    latitude: number;
  };
  createdAt: Date;
  __v: number;
}
