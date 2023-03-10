import styled from "styled-components";

export const SignUpInput = styled.input`
  background: var(--light);
  width: 13rem;
  height: 1.5rem;
  border: none;
  outline: none;
  margin: 1rem 0;
  font-family: "Work Sans", sans-serif;
  color: var(--brown);

  @media (min-width: 650px) {
    width: 20rem;
    height: 2rem;
  }
`;
