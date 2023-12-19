import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { it, expect, describe, vi } from "vitest";
import LoginForm from "../LoginForm";
global.alert = function () {};

/**
 * @vitest-environment jsdom
 */

//unit click test
describe("Login form", () => {
it("Button click", () => {
  const setlogOrregisterMock = vi.fn();
  render(<LoginForm setlogOrregister={setlogOrregisterMock} />);
  const newUserButton = screen.getByRole("button", {
    name: "NEW USER",
  });
  fireEvent.click(newUserButton);
  expect(setlogOrregisterMock).toHaveBeenCalledTimes(1);
});

it("That LoginForm has a button", () => {
  render(<LoginForm />);
  const loginButton = screen.getAllByRole("button", {
    name: "LOGIN",
  });
  expect(loginButton).toBeTruthy();
});

});
