import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../state/allReducers';
import EventType from '../state/events/EventType';

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
    initialTimeFromTo: number[];
  },
);

export interface GetAndFilterEventProps {}

const GetAndFilterEvent: React.FC<GetAndFilterEventProps> = ({ children }) => {
  const initialTimeFromTo = [7 * 24 * 2, 38 * 24 * 2];
  const events = useSelector((state: AppState) => state.EventsReducer);
  const [eventsFiltered, setEventsFiltered] = useState(events);
  const { user } = useSelector((state: AppState) => state.AuthReducer);

  const [filters, setFilters] = useState<Filters>({
    name: localStorage.getItem('filters-name') || '',
    province: localStorage.getItem('filters-province') || '',
    timeFromTo: JSON.parse(
      localStorage.getItem('filters-timeFromTo') || JSON.stringify(initialTimeFromTo),
    ),
  });

  useEffect(() => {
    setEventsFiltered(
      events
        .filter((item) => {
          const timeFrom =
            Date.now() - 1000 * 60 * 60 * 24 * 8 + filters.timeFromTo[0] * ((1000 * 60 * 60) / 2);
          const timeTo =
            Date.now() - 1000 * 60 * 60 * 24 * 8 + filters.timeFromTo[1] * ((1000 * 60 * 60) / 2);
          return (
            item.name.includes(filters.name) &&
            item.province.includes(filters.province) &&
            item.date >= timeFrom &&
            item.date <= timeTo
          );
        })
        .sort((item) => (user?._id !== item.user._id ? 1 : -1)),
    );
  }, [events, filters, user]);

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

  // localStorage;
  useEffect(() => {
    if (filters.name !== '') {
      localStorage.setItem('filters-name', filters.name);
    }
  }, [filters.name]);
  useEffect(() => {
    if (filters.province !== '') {
      localStorage.setItem('filters-province', filters.province);
    }
  }, [filters.province]);
  useEffect(() => {
    if (
      filters.timeFromTo[0] !== initialTimeFromTo[0] ||
      filters.timeFromTo[1] !== initialTimeFromTo[1]
    ) {
      localStorage.setItem('filters-timeFromTo', JSON.stringify(filters.timeFromTo));
    }
  }, [filters.timeFromTo, initialTimeFromTo]);

  return (
    <FilterContext.Provider
      value={{
        eventsFiltered,
        filters,
        setFilters,
        handleChangeFilters,
        handleChangeDate,
        initialTimeFromTo,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default GetAndFilterEvent;
