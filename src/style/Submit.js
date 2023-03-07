import styled from "styled-components";

export const Button = styled.button`
  width: 10rem;
  height: 2rem;
  color: var(--light);
  background: linear-gradient(125deg, darkgray, gray);
  margin: 0.5rem 2rem;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
