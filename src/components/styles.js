import styled from "styled-components";

export const SelectField = styled.select`
  padding: 0.65em;
  outline: auto;
  border-radius: 5px;
  width: 250px;
  font-style: italic;
  font-weight: 600;
  font-family: monospace;
  font-size: 14px;
  margin: 1em;
`;

export const InputField = styled.input`
  padding: 0.65em;
  outline: auto;
  border-radius: 5px;
  width: 250px;
  font-style: italic;
  font-weight: 600;
  font-family: monospace;
  font-size: 14px;
  margin: 1em;
`;

export const Center = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SpaceTop = styled.h3`
  margin-top: 24px;
`;

export const SpaceBottom = styled.h3`
  margin-bottom: 24px;
`;

export const Input = styled.section`
  padding: 24px;
  max-width: 700px;
  outline: auto;
  border-radius: 5px;
  margin: 75px auto 0px;
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
  justify-content: space-around;

  @media (max-width: 700px) {
    max-width: 90%;
    flex-direction: column;
  }
`;

export const Output = styled.section`
  padding: 24px;
  max-width: 700px;
  outline: auto;
  border-radius: 5px;
  margin: 75px auto 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  @media (max-width: 700px) {
    max-width: 90%;
    flex-direction: column;
  }
`;
