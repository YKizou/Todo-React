import styled, { createGlobalStyle } from "styled-components";

export const colors = {
  yellow_todo: "#D9E577",
};

export const GlobalStyle = createGlobalStyle`
  body {
    background: #222;
    color: #fff;
    font-size: 20px;

  }

  body, input {
    font-family: 'Roboto', sans-serif;
  }
`;

export const TextButton = styled.button`
  background: none;
  border: none;
  color: #b8b8b8;
  font-size: 14px;
`;
