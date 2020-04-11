import React, {useState, useRef, useContext} from "react";
import styled from "styled-components";
import {Button} from "../../../../styledComponents";
import {IoMdOptions} from "react-icons/io";
// import {GoSearch} from "react-icons/go";
import {motion} from "framer-motion";
import Scroll from "react-scroll";
import media from "../../../../utils/MediaQueries";
import {FilterContext} from "../../../context/GetAndFilterEvents";

export interface FiltersProps {}

const Filters: React.SFC<FiltersProps> = () => {
  const [openFilterOptions, setOpenFilterOptions] = useState(true);

  const variants = {
    open: {
      x: 0,
      transition: {ease: "linear"},
    },
    close: {
      x: "calc(-100% - 10px)",
      transition: {ease: "linear"},
    },
  };

  // Animation scroll
  const container = useRef<HTMLDivElement>(null);
  const handleOpenFilterOptions = () => {
    if (!openFilterOptions) {
      Scroll.animateScroll.scrollTo(
        container.current ? container.current.offsetTop - 5 : 0
      );
    }
    setOpenFilterOptions((prevState) => !prevState);
  };

  // Filters handle
  const {eventsFiltered, filters, setFilters} = useContext(FilterContext);
  const handleChangeFilters = (value: string, filterProperty: string) => {
    setFilters((prev: any) => {
      if (prev[filterProperty] === value) {
        return {...prev, [filterProperty]: ""};
      }
      return {...prev, [filterProperty]: value};
    });
  };

  const provinces = [
    "dolnośląskie",
    "kujawsko-pomorskie",
    "lubuskie",
    "łódzkie",
    "małopolskie",
    "mazowieckie",
    "opolskie",
    "podkarpackie",
    "podlaskie",
    "pomorskie",
    "śląskie",
    "świętokrzyskie",
    "warmińsko-mazurskie",
    "wielkopolskie",
    "zachodniopomorskie",
  ];

  return (
    <FiltersContainer ref={container}>
      {filters.name ? (
        <Badge onClick={() => handleChangeFilters(filters.name, "name")}>
          {filters.name}
        </Badge>
      ) : null}
      {filters.province ? (
        <Badge
          onClick={() => handleChangeFilters(filters.province, "province")}
        >
          {filters.province}
        </Badge>
      ) : null}
      {openFilterOptions ? (
        <Count style={{marginLeft: "auto"}}>
          Count:{eventsFiltered.length}
        </Count>
      ) : null}
      <Button
        onClick={() => handleOpenFilterOptions()}
        style={
          openFilterOptions
            ? {border: "1px solid white", color: "white", margin: "0 5px 0 5px"}
            : {margin: "0 5px 0 auto"}
        }
      >
        <IoMdOptionsStyled style={openFilterOptions ? {color: "white"} : {}} />
        Filtry
      </Button>
      <FilterOptionsWrapper
        animate={openFilterOptions ? "open" : "close"}
        variants={variants}
      >
        <SearchInput
          placeholder="Nazwa"
          value={filters.name}
          onChange={(e) => handleChangeFilters(e.target.value, "name")}
          type="text"
        />

        <ProvincesWrapper>
          {provinces.map((province) => (
            <Province
              onClick={() => handleChangeFilters(province, "province")}
              key={province}
              style={
                province === filters.province
                  ? {border: "1px solid white", color: "white"}
                  : {}
              }
            >
              {province}
            </Province>
          ))}
        </ProvincesWrapper>
      </FilterOptionsWrapper>
    </FiltersContainer>
  );
};

export default Filters;

const FiltersContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #202020;
  display: flex;
  align-items: center;
  border: 1px solid #313131;
  margin-top: 10px;
  position: relative;
`;

const IoMdOptionsStyled = styled(IoMdOptions)`
  font-size: 20px;
  color: #3498db;
  margin-right: 7px;
`;

const FilterOptionsWrapper = styled(motion.div)`
  position: absolute;
  background-color: #202020;
  height: calc(100vh - 55px);
  width: calc(100% + 4px);
  top: 49px;
  left: -2px;
  transform: translateX(calc(-100% - 10px));
  padding: 10px 5px;
  ${media.tablet} {
    height: calc(100vh - 110px);
  }
`;

const SearchInput = styled.input`
  background-color: #181818;
  color: #3498db;
  border: 1px solid #3498db;

  height: 35px;
  font-size: 20px;
  width: 100%;
  padding: 5px;
`;

const ProvincesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 20px 0;
  width: calc(100% + 20px);
  transform: translateX(-10px);
`;
const Province = styled.button`
  background-color: transparent;
  border: 1px solid #3498db;
  border-radius: 0;
  height: 35px;
  padding: 5px;
  color: #3498db;
  margin: 10px 10px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  cursor: pointer;
`;
const Badge = styled.button`
  background-color: transparent;
  border: 1px solid #3498db;
  border-radius: 0;
  height: 35px;
  padding: 5px;
  color: #3498db;
  margin: 0 5px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  cursor: pointer;
  &:hover {
    border: 1px solid #e74c3c;
    color: #e74c3c;
  }
`;
const Count = styled.div`
  height: 35px;
  padding: 5px;
  color: #3498db;
  margin: 0 5px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
`;
