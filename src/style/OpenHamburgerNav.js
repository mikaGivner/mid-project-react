import styled from "styled-components";

export const OpenHamburgerNav = styled.div`
  width: 100vw;
  height: 95vh;
  position: sticky;
  top: 3rem;
  background: rgb(217, 176, 127);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99;

  @media (min-width: 600px) {
    display: none;
  }
`;
