import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Square from "./Square";

describe("Square is rendered", () => {
  test("renders with default square class", () => {
    const { container } = render(<Square />);
    expect(container.firstChild).toHaveClass("square");
  });
});

describe("When rendering Square with styling classes then styling classes should be added", () => {
  test("renders with start class", () => {
    const { container } = render(<Square isStart={true} />);
    expect(container.firstChild).toHaveClass("start");
  });

  test("renders with finish class", () => {
    const { container } = render(<Square isFinish={true} />);
    expect(container.firstChild).toHaveClass("finish");
  });

  test("renders with barrier class", () => {
    const { container } = render(<Square isBarrier={true} />);
    expect(container.firstChild).toHaveClass("barrier");
  });

  test("renders with search-area class", () => {
    const { container } = render(<Square isInSearchArea={true} />);
    expect(container.firstChild).toHaveClass("search-area");
  });

  test("renders with shortest-path class", () => {
    const { container } = render(<Square isOnShortestPath={true} />);
    expect(container.firstChild).toHaveClass("shortest-path");
  });
});

describe("When rendering Square without styling classes then no styling classes should be added", () => {
  test("renders with start class", () => {
    const { container } = render(<Square isStart={false} />);
    expect(container.firstChild).not.toHaveClass("start");
  });

  test("renders with finish class", () => {
    const { container } = render(<Square isFinish={false} />);
    expect(container.firstChild).not.toHaveClass("finish");
  });

  test("renders with barrier class", () => {
    const { container } = render(<Square isBarrier={false} />);
    expect(container.firstChild).not.toHaveClass("barrier");
  });

  test("renders with search-area class", () => {
    const { container } = render(<Square isInSearchArea={false} />);
    expect(container.firstChild).not.toHaveClass("search-area");
  });

  test("renders with shortest-path class", () => {
    const { container } = render(<Square isOnShortestPath={false} />);
    expect(container.firstChild).not.toHaveClass("shortest-path");
  });
});

describe("When rendering Square without main styling classes then other classes should be added", () => {
    test("should render with search-area class", () => {
      const { container } = render(<Square isBarrier={false} isInSearchArea={true} />);
      expect(container.firstChild).toHaveClass("search-area");
    });
  
    test("should render with shortest-path class", () => {
      const { container } = render(<Square isBarrier={false} isOnShortestPath={true} />);
      expect(container.firstChild).toHaveClass("shortest-path");
    });
  
  });

describe("When rendering Square with main styling classes then no other classes are added", () => {
  test("should not render with search-area class", () => {
    const { container } = render(<Square isBarrier={true} isInSearchArea={true} />);
    expect(container.firstChild).not.toHaveClass("search-area");
  });

  test("should not render with shortest-path class", () => {
    const { container } = render(<Square isBarrier={true} isOnShortestPath={true} />);
    expect(container.firstChild).not.toHaveClass("shortest-path");
  });

});
