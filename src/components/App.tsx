import React from "react";
import styled from "styled-components";

import Navigation from "./navigation/Navigation";
import Content from "./content/Content";

function App() {
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
