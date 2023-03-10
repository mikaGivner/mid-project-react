import styled from "styled-components";
export const WrapperForm = styled.form`
  width: 100vmin;
  height: 100vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 2%;
  background: #0000002f;
  // background: rgba(218, 204, 186, 0.276);
  border-radius: 1rem;
  @media (min-width: 1000px) {
    width: 80vmin;
    height: 80vmin;
  }
`;
