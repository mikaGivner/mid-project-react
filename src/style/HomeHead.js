import styled from "styled-components";
import "../components/style.css";
export const HomeHead = styled.div`
  width: 100vw;
  height: 50rem;
  z-index: 2;
  position: relative;
  color: #fff;
  font-size: 3rem;
  opacity: 1;
  background: url(https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg)
    no-repeat center center/cover;
  &:hover {
    opacity: 0.7;
  }
  &::before {
    content: "";
    width: 100vw;
    height: 50rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background: #00000062;
  }
  &::after {
    display: flex;
    align-items: center;
    justify-content: center;
    content: "What is your next adventure?";
    font-family: "Shantell Sans", cursive;
    color: #fff;
    width: 100vw;
    height: 50rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
  }
`;
