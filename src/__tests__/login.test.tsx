import { render, screen } from "@testing-library/react";
import Login from "../app/page";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Login", () => {
  it("renders a login button", () => {
    render(<Login />);

    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });

    expect(loginButton).toBeInTheDocument();
  });
});
