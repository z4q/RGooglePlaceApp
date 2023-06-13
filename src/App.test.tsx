import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Google Places", () => {
  render(<App />);
  const linkElement = screen.getByText(/oogle Places/i);
  expect(linkElement).toBeInTheDocument();
});
