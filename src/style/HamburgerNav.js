import styled from "styled-components";

export const HamburgerNav = styled.ul`
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: var(--brown);
  padding: 0;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;

  @media (min-width: 600px) {
    display: none;
  }
`;
