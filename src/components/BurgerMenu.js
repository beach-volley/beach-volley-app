import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SignOutButton from "../components/SignOutButton";
import ShowNotifications from "../components/ShowNotifications";
import useCurrentUser from "../hooks/useCurrentUser";

export const Burger = ({ open, setOpen }) => {
  return (
    <BurgerContainer>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <p>MENU</p>
    </BurgerContainer>
  );
};

export const Menu = ({ open }) => {
  const currentUser = useCurrentUser();
  return (
    <StyledMenu open={open}>
      <Link to="/create-game">Luo peli</Link>
      {currentUser ? <SignOutButton /> : <Link to="/login">Kirjaudu</Link>}
      <ShowNotifications>Contact</ShowNotifications>
    </StyledMenu>
  );
};

const BurgerContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: transparent;
  z-index: 10;
  top: 2.5rem;
  right: 0.5rem;
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    background: lightgrey;
    width: 5rem;
    height: 7.5rem;
    top: 2rem;
    right: 3rem;
  }
`;

const StyledBurger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

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
    width: 40vw;
    transform: ${({ open }) => (open ? "translateX(40%)" : "translateX(150%)")};
  }

  a,
  button {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: black;
    text-decoration: none;
    transition: color 0.3s linear;
  }

  button {
    padding: 0;
    border: none;
    background: none;
    margin-bottom: 2rem;
    cursor: pointer;
  }
`;
