export default interface EventType {
  _id: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
  place: string;
  province: string;
  createdAt: Date;
  __v: number;
  name: string;
  type: string;
  fbList: boolean;
  date: number;
  user: {
    _id: string;
    name: string;
  };
}
