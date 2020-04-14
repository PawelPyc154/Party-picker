export default interface EventType {
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
  fbList: boolean;
  time: {
    start: number;
    end: number;
  };
}
