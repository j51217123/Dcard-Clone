import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event"; 

import DropDownMenu from "./DropDownMenu";

describe("should show EmotionButtonGroup", () => {
  it("should show articleId", async () => {
    render(<DropDownMenu />);
    const button = screen.getByLabelText("button");
    userEvent.click(button); // 模擬使用者的點擊行為
    expect(button).toBeInTheDocument();
  });
});
