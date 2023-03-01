import styled from "styled-components";

export const Submit = styled.button`
  width: 15rem;
  height: 2rem;
  color: var(--light);
  background: linear-gradient(125deg, var(--lightDarkBlue), var(--darkBlue));
  margin: 2rem;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;
