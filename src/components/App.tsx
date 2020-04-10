import React, {useEffect} from "react";
import styled from "styled-components";

import Navigation from "./navigation/Navigation";
import Content from "./content/Content";
import {useDispatch} from "react-redux";
import {getEvents} from "../state/events/action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <AppContainer>
      <Navigation />
      <Content />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #181818;
`;
