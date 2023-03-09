import styled from "styled-components";
export const WrapperLogInPage = styled.section`
  position: fixed;
  top: 10rem;
  left: 0;
  width: 100vw;
  height: 100%;
  // background: linear-gradient(
  //   125deg,
  //   var(--darkBlue),
  //   var(--lightDarkBlue),
  //   var(--lightBlue),
  //   var(--light)
  // );
  background: linear-gradient(145deg, #1d1716, #402a23, #dfd3c3, #f0ece2);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  margin-top: -10rem;
  z-index: 300;
  @media (min-width: 800px) {
    align-items: center;
  }
`;
