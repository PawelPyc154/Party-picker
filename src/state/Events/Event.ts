export default interface Event {
  _id: number;
  coordinates: {
    longitude: number;
    latitude: number;
  };
  place: string;
  province: string;
  createdAt: Date;
  __v: number;
  attractions: string[];
  icone: string;
  name: string;
  type: string;
  time: {
    start: string;
    end: string;
  };
}
