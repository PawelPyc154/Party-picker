import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state/allReducers';
import EventType from '../../../state/events/EventType';

export interface Filters {
  name: string;
  province: string;
  timeFromTo: number[];
}

export const FilterContext = React.createContext(
  {} as {
    eventsFiltered: EventType[];
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    handleChangeFilters: (value: string, filterProperty: keyof Filters) => void;
    handleChangeDate: (event: ChangeEvent<{}> | {}, newValue: any) => void;
  },
);

export interface GetAndFilterEventProps {}

const GetAndFilterEvent: React.SFC<GetAndFilterEventProps> = ({ children }) => {
  const events = useSelector((state: AppState) => state.EventsReducer);
  const [eventsFiltered, setEventsFiltered] = useState(events);
  const [filters, setFilters] = useState<Filters>({
    name: '',
    province: '',
    timeFromTo: [7 * 24 * 2, 38 * 24 * 2],
  });

  useEffect(() => {
    setEventsFiltered(
      events.filter((event) => {
        const timeFrom =
          Date.now() - 1000 * 60 * 60 * 24 * 8 + filters.timeFromTo[0] * ((1000 * 60 * 60) / 2);

        const timeTo =
          Date.now() - 1000 * 60 * 60 * 24 * 8 + filters.timeFromTo[1] * ((1000 * 60 * 60) / 2);
        return (
          event.name.includes(filters.name) &&
          event.province.includes(filters.province) &&
          event.time.start >= timeFrom &&
          event.time.start <= timeTo &&
          event.time.end >= timeFrom &&
          event.time.end <= timeTo
        );
      }),
    );
    console.log(events);
  }, [events, filters]);

  const handleChangeFilters = (value: string, filterProperty: keyof Filters) => {
    setFilters((prev: Filters) => {
      if (prev[filterProperty] === value) {
        return { ...prev, [filterProperty]: '' };
      }
      return { ...prev, [filterProperty]: value };
    });
  };

  const handleChangeDate = (event: ChangeEvent<{}> | {}, newValue: any) => {
    setFilters((prev: Filters) => ({ ...prev, timeFromTo: newValue }));
  };

  return (
    <FilterContext.Provider
      value={{
        eventsFiltered,
        filters,
        setFilters,
        handleChangeFilters,
        handleChangeDate,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default GetAndFilterEvent;
