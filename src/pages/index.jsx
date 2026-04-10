import React from 'react';
import styled from 'styled-components';
import { Hero, About, Jobs, Featured, Projects, Contact } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = () => (
  <StyledMainContainer className="fillHeight">
    <Hero />
    <About />
    <Jobs />
    <Featured />
    <Projects />
    <Contact />
  </StyledMainContainer>
);

export default IndexPage;
