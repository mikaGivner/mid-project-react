import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 20rem;
  margin: 1rem 0;
  background: ${(props) =>
    `url(${props.background}) no-repeat center center/cover`};
  z-index: 1;
  position: relative;

  @media (min-width: 800px) {
    width: 20rem;
    height: 20rem;
    margin: 1rem;
  }
`;
