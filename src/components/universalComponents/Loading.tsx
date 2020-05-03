import React, { useContext } from 'react';
import Loader from 'react-loader-spinner';
import styled, { ThemeContext } from 'styled-components';
import media from '../../utils/MediaQueries';

export interface LoadingProps {
  height?: number;
  width?: number;
  marginMobile?: string;
}

const Loading: React.SFC<LoadingProps> = ({ height = 80, width = 80, marginMobile = '0' }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Container margin={marginMobile}>
      <Loader type="Audio" color={themeContext.colors.layout} height={height} width={width} />
    </Container>
  );
};

export default Loading;

export interface ContainerProps {
  margin: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: ${(props) => props.margin};
  ${media.tablet} {
    margin: 0;
  }
`;
