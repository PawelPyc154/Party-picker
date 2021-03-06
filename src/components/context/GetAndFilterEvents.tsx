import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../state/allReducers';
import EventType from '../../state/events/EventType';

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
    handleChangeDate: (event: ChangeEvent<{}> | {}, newValue: number | number[]) => void;
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
    timeFromTo: JSON.parse(localStorage.getItem('filters-timeFromTo') || JSON.stringify(initialTimeFromTo)),
  });

  useEffect(() => {
    const timeFilterFrom = Date.now() - 1000 * 60 * 60 * 24 * 8 + filters.timeFromTo[0] * ((1000 * 60 * 60) / 2);
    const timeFilterTo = Date.now() - 1000 * 60 * 60 * 24 * 8 + filters.timeFromTo[1] * ((1000 * 60 * 60) / 2);
    setEventsFiltered(
      events
        .filter(
          (item) =>
            item.name.includes(filters.name) &&
            item.province.includes(filters.province) &&
            item.date >= timeFilterFrom &&
            item.date <= timeFilterTo,
        )
        .sort((item) => (user?._id !== item?.user._id ? 1 : -1)),
    );
  }, [events, filters, user]);

  const handleChangeFilters = (value: string, filterProperty: keyof Filters) => {
    setFilters((prev: Filters) => {
      if (prev[filterProperty] === value) return { ...prev, [filterProperty]: '' };
      return { ...prev, [filterProperty]: value };
    });
  };

  const handleChangeDate = (event: ChangeEvent<{}> | {}, newValue: number | number[]) => {
    if (newValue instanceof Object) {
      setFilters((prev: Filters) => ({ ...prev, timeFromTo: newValue }));
    }
  };

  // localStorage;
  useEffect(() => {
    if (filters.name === '') return localStorage.removeItem('filters-name');
    return localStorage.setItem('filters-name', filters.name);
  }, [filters.name]);

  useEffect(() => {
    if (filters.province === '') return localStorage.removeItem('filters-province');
    return localStorage.setItem('filters-province', filters.province);
  }, [filters.province]);

  useEffect(() => {
    if (filters.timeFromTo[0] !== initialTimeFromTo[0] || filters.timeFromTo[1] !== initialTimeFromTo[1]) {
      return localStorage.setItem('filters-timeFromTo', JSON.stringify(filters.timeFromTo));
    }
    return localStorage.removeItem('filters-timeFromTo');
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
