import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Map from './map/Map';
import Events from './pages/home/Home';
import media from '../../utils/MediaQueries';

import GetAndFilterEvent from '../context/GetAndFilterEvents';
//

export interface ContentProps {}

const Content: React.SFC<ContentProps> = () => (
  <GetAndFilterEvent>
    <ContentContainer>
      <Map />
      <Switch>
        <Route exact path="/">
          <Events />
        </Route>
        <Route exact path="/login">
          <Events />
        </Route>
        <Route exact path="/register">
          <Events />
        </Route>
        <Route exact path="/add-event">
          <Events />
        </Route>
        <Route path="/contact">
          <Events />
        </Route>
      </Switch>
    </ContentContainer>
  </GetAndFilterEvent>
);

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
