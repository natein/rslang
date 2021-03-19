import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import LoaderPage from "./LoaderPage";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders loader page is true", () => {
  act(() => {
    render(<LoaderPage />, container);
  });
  expect(container).toBeTruthy();
});