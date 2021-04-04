import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ShowNotifications from "../components/ShowNotifications";

export const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <Link to="/create-game">
        <span role="img" aria-label="about us">
          &#x1f481;&#x1f3fb;&#x200d;&#x2642;&#xfe0f;
        </span>
        Luo peli
      </Link>
      <Link to="/login">
        <span role="img" aria-label="price">
          &#x1f4b8;
        </span>
        Kirjaudu
      </Link>
      <ShowNotifications>
        <span role="img" aria-label="contact">
          &#x1f4e9;
        </span>
        Contact
    </ShowNotifications>
    </StyledMenu>
  );
};

const StyledBurger = styled.button`
  position: fixed;
  top: 2.5rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: black;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: lightgrey;
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0%)" : "translateX(150%)")};
  width: 100vw;
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    width: 80%;
    transform: ${({ open }) => (open ? "translateX(30%)" : "translateX(150%)")};
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;
  }
`;
