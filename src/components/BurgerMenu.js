import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import SignOutButton from "../components/SignOutButton";
import ShowNotifications from "../components/ShowNotifications";
import useCurrentUser from "../hooks/useCurrentUser";
import { AlertDialogButton } from "./FeedbackComponents";

export const Burger = ({ open, setOpen }) => {
  return (
    <BurgerContainer>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>

    </BurgerContainer>
  );
};

export const Menu = ({ open }) => {
  const currentUser = useCurrentUser();
  let history = useHistory();

  const loginCreateGame = () => {
    history.push("/login");
  };

  return (
    <StyledMenu open={open}>
      {currentUser ? (
        <Link to="/create-game">
          <MenuButton>Luo peli</MenuButton>
        </Link>
      ) : (
        <AlertDialogButton
          ButtonStyle={MenuButton}
          buttonText={"Luo peli"}
          title={"Kirjaudu sisään luodaksesi pelin"}
          content={""}
          callBack={loginCreateGame}
        />
      )}
      {currentUser ? (
        <SignOutButton ButtonStyle={MenuButton} />
      ) : (
        <Link to="/login">
          <MenuButton>Kirjaudu</MenuButton>
        </Link>
      )}
      {currentUser && <ShowNotifications ButtonStyle={MenuButton} />}
    </StyledMenu>
  );
};

const BurgerContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: transparent;
  z-index: 10;
  margin-top: 4.5rem;
  border-radius: 0.5rem;
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    background: #7FBEEB;
    position: absolute;
    margin-top: 0rem;
    width: 5rem;
    height: 5rem;
    top: 1rem;
    right: 1rem;
  }
`;

const StyledBurger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1.7rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s linear;
  transform: ${({ open }) => (open ? "translate(3px)" : "translate(0)")};
  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: black;
    border-radius: 5px;
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
  background: hsl(123, 80%, 82%);
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
    transform: ${({ open }) => (open ? "translateX(%)" : "translateX(150%)")};
  }

  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.desktopWidth}) {
    transform: ${({ open }) => (open ? "translateX(10%)" : "translateX(150%)")};
  }
`;

const MenuButton = styled.button`
  font-size: 2rem;
  text-transform: uppercase;
  padding: 2rem 0;
  font-weight: bold;
  letter-spacing: 0.5rem;
  color: black;
  text-decoration: none;
  padding: 0;
  border: none;
  background: none;
  margin-bottom: 2rem;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
