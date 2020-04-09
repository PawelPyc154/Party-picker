import React from "react";
import styled from "styled-components";
import Map from "./map/Map";
import Events from "./events/Events";
export interface ContentProps {}

const Content: React.SFC<ContentProps> = () => {
  return (
    <ContentContainer>
      <Events />
      <Map />
    </ContentContainer>
  );
};

export default Content;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  grid-template-rows: calc(100vh - 50px);
`;
