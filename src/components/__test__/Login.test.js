import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { validateEmail } from "../Login";

describe("Test the Login Component", () => {
  test("render the Login form with 2 button", async () => {
    render(<Login />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(2);
  });

  test("should failed on email validation", () => {
    const testEmail = "sameer.com";
    expect(validateEmail(testEmail)).not.toBe(true);
  });

  test("email input field should accept email", () => {
    render(<Login />);
    const email = screen.getByPlaceholderText("Enter email");
    userEvent.type(email, "sameer");
    expect(email.value).not.toMatch("sameer@gmail.com");
  });

  test("password field should have type password", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("Password");
    expect(password).toHaveAttribute("type", "password");
  });

  test("should be able to reset the form", () => {
    const { getByTestId } = render(<Login />);
    const restBtn = getByTestId("reset");
    const emailInputField = screen.getByPlaceholderText("Enter email");
    const passwordInputField = screen.getByPlaceholderText("Password");

    fireEvent.click(restBtn);
    expect(emailInputField.value).toMatch("");
    expect(passwordInputField.value).toMatch("");
  });

  test("should be able to submit the form", () => {
    render(<Login />);
    const submitBtn = screen.getByTestId("submit");
    const emailInputField = screen.getByPlaceholderText("Enter email");
    const passwordInputField = screen.getByPlaceholderText("Password");

    userEvent.type(emailInputField, "sameer@gmail.com");
    userEvent.type(passwordInputField, "123456789");

    userEvent.click(submitBtn);
    const userInfo = screen.getByText("sameer@gmail.com");
    expect(userInfo).toBeInTheDocument();
  });

  test("should display error  if incorrect email address", () => {
    render(<Login />);
    const submitBtn = screen.getByTestId("submit");
    const emailInputField = screen.getByPlaceholderText("Enter email");
    const passwordInputField = screen.getByPlaceholderText("Password");

    userEvent.type(emailInputField, "sameer");
    userEvent.type(passwordInputField, "123456789");

    userEvent.click(submitBtn);
    const errorMessage = screen.getByText("Email is not valid");
    expect(errorMessage).toBeInTheDocument();
  });
});
