import styled from "styled-components";

export const SearchNav = styled.div`
  margin: 1rem;
  background: linear-gradient(125deg, darkgray, gray);
  border-radius: 1rem;
  min-height: 15rem;
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  @media (min-width: 800px) {
    padding: 1rem 0;
  }
  &:hover {
    // cursor: pointer;
  }
`;
