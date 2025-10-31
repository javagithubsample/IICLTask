import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import { setToken, getToken } from "../utils/auth";

jest.mock("../utils/auth", () => ({
  setToken: jest.fn(),
  getToken: jest.fn(() => null),
  isAuthenticated: jest.fn(() => false),
}));

describe("Login Component UI Test", () => {
  test("renders login form and submits successfully", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    
    expect(screen.getByText(/Admin Login/i)).toBeInTheDocument();


    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

  
    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });


    fireEvent.click(loginButton);

  
    expect(setToken).toHaveBeenCalled();
  });
});
