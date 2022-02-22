import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { CaluclatorProvider } from "./context/CalculatorProvider";

test("renders App UI correctly", () => {
  const { getByText } = render(
    <CaluclatorProvider>
      <App />
    </CaluclatorProvider>
  );
  const loaderElement = getByText(/LOADING DATA.../i);
  expect(loaderElement).toBeInTheDocument();
});
