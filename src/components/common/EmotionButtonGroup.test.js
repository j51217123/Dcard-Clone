import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import  EmotionButtonGroup  from "./EmotionButtonGroup";

describe("should show EmotionButtonGroup", () => {
  it("should show articleId", async () => {
    render(<EmotionButtonGroup />);
    const emotionLikeImg = screen.getByAltText("emotionLikeImg");
    expect(emotionLikeImg).toBeInTheDocument();
  });
});
