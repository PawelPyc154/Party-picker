export default interface Event {
  _id: number;
  coordinates: {
    longitude: number;
    latitude: number;
  };
  place: string;
  voivodeship: string;
  createdAt: Date;
  __v: number;
}
