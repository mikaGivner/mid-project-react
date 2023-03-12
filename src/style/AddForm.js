import styled from "styled-components";

export const AddForm = styled.div`
  margin: 1rem 3rem;
  min-height: 20vrem;
  background: linear-gradient(125deg, gray, darkgray);
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;

  @media (min-width: 700px) {
    padding: 2rem;
    flex-direction: column;
  }
`;
