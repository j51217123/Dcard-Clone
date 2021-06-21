import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import PostPage from "./PostPage";

describe("should show PostPage", () => {
  it("should show articleId", async () => {
    render(<PostPage />);
    const FormTitleInput = screen.getByPlaceholderText("標題");
    userEvent.click(FormTitleInput);
    expect(FormTitleInput).toBeInTheDocument();
  });
});
