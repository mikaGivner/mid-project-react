import styled from "styled-components";
import "../components/style.css";
export const SelectStyle = styled.select`
  width: 15rem;
  height: 1.5rem;
  border: none;
  cursor: pointer;
  outline: none;
  font-family: "Work Sans", sans-serif;
  margin: 1rem;

  @media (min-width: 700px) {
    margin: 0 1rem;
    width: 10rem;
  }
`;
