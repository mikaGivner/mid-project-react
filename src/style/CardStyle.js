import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 20rem;
  margin: 1rem 0;
  background: ${(props) => `url(${props.background}) no-repeat top center`};
  z-index: 1;

  position: relative;
  @media (min-width: 700px) {
    width: 20rem;
    height: 20rem;
    margin: 1rem;
  }

  // &::before {
  //   content: "";
  //   z-index: 0;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 20rem;
  //   background: #00000062;
  // }
`;
