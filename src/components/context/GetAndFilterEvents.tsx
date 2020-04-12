import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../state/allReducers';
import Event from '../../state/events/Event';

export interface Filters {
  name: string;
  province: string;
}

export const FilterContext = React.createContext(
  {} as {
    eventsFiltered: Event[];
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    handleChangeFilters: (value: string, filterProperty: string) => void;
  },
);

export interface GetAndFilterEventProps {}

const GetAndFilterEvent: React.SFC<GetAndFilterEventProps> = ({ children }) => {
  const events = useSelector((state: AppState) => state.EventsReducer);
  const [eventsFiltered, setEventsFiltered] = useState(events);
  const [filters, setFilters] = useState({
    name: '',
    province: '',
  });

  useEffect(() => {
    setEventsFiltered(
      events.filter(
        (event) => event.name.includes(filters.name) && event.province.includes(filters.province),
      ),
    );
  }, [events, filters]);

  const handleChangeFilters = (value: string, filterProperty: string) => {
    setFilters((prev: any) => {
      if (prev[filterProperty] === value) {
        return { ...prev, [filterProperty]: '' };
      }
      return { ...prev, [filterProperty]: value };
    });
  };
  return (
    <FilterContext.Provider
      value={{
        eventsFiltered,
        filters,
        setFilters,
        handleChangeFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default GetAndFilterEvent;
