import React from "react";
import styled from "styled-components";
import Map from "./map/Map";
import Events from "./events/Events";
import media from "../../utils/MediaQueries";

export interface ContentProps {}
console.log(media);

const Content: React.SFC<ContentProps> = () => {
  return (
    <ContentContainer>
      <Map />
      <Events />
    </ContentContainer>
  );
};

export default Content;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50vh auto;
  margin: 15px 10px 0px 5px;
  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: calc(100vh - 50px);
    margin: 0;
  }
`;
