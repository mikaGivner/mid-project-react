import styled from "styled-components";
import "../components/style.css";
export const InsideLearn = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background: linear-gradient(125deg, var(--brown), rgb(218, 204, 186));
  padding: 2rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 90;

  @media (min-width: 850px) {
    align-items: center;
    justify-content: center;
    padding: 0 10rem;
  }
`;
