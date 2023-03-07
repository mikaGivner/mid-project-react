import styled from "styled-components";

export const SearchMenu = styled.form`
  margin: 1rem;
  background: rgb(217, 176, 127);
  width: 90%;
  min-height: 6rem;
  display: flex;
  flex-direction: column;
  flex-wrapper: wrapper;
  border-radius: 1rem;
  align-items: center;
  justify-content: center;

  @media (min-width: 700px) {
    flex-direction: row;
  }
`;
