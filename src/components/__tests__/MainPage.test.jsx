import { render, screen } from "@testing-library/react";
import React from "react";
import { it, expect, describe } from "vitest";
import MainPage from "../MainPage";
global.alert = function () {};

/**
 * @vitest-environment jsdom
 */

//simple unit tests
describe("Main Page", () => {
  it("That click button exists", () => {
    render(<MainPage />);
    const linkElement = screen.getByText(/create/i);
    expect(linkElement).to.exist;
  });

  it("calls the onClick function when the button is clicked", () => {
    render(<MainPage />);
    const browseButton = screen.getAllByRole("button", {
      name: "Browse All Recipes",
    });
    expect(browseButton).to.exist;
  });
});
