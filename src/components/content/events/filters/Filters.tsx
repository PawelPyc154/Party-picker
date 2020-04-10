import React, {useState, useRef} from "react";
import styled from "styled-components";
import {Button} from "../../../../styledComponents";
import {IoMdOptions} from "react-icons/io";
import {motion} from "framer-motion";
import Scroll from "react-scroll";
import media from "../../../../utils/MediaQueries";

export interface FiltersProps {}

const Filters: React.SFC<FiltersProps> = () => {
  const [openFilterOptions, setOpenFilterOptions] = useState(false);

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

  const container = useRef<HTMLDivElement>(null);
  const handleOpenFilterOptions = () => {
    if (!openFilterOptions) {
      Scroll.animateScroll.scrollTo(
        container.current ? container.current.offsetTop - 5 : 0
      );
    }

    setOpenFilterOptions((prevState) => !prevState);
  };
  return (
    <FiltersContainer ref={container}>
      <Button onClick={() => handleOpenFilterOptions()}>
        <IoMdOptionsStyled />
        Filtry
      </Button>
      <FilterOptionsContainer
        animate={openFilterOptions ? "open" : "close"}
        variants={variants}
      >
        yyy
      </FilterOptionsContainer>
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

const FilterOptionsContainer = styled(motion.div)`
  position: absolute;
  background-color: #202020;
  height: calc(100vh - 55px);
  width: calc(100% + 4px);
  top: 49px;
  left: -2px;
  transform: translateX(calc(-100% - 10px));

  ${media.tablet} {
    height: calc(100vh - 110px);
  }
`;
