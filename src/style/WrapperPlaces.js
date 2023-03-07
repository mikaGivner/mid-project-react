import styled from "styled-components";

export const WrapperPlaces = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  // width: 100vw;
  // height: 35rem;
  // overflow: scroll;
  @media (min-width: 800px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
