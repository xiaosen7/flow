import { render, screen } from "@testing-library/react";
import { CLinkable } from "./linkable";

describe("CLinkable", () => {
  describe("with href", () => {
    test("base", () => {
      render(<CLinkable href="/home">Home</CLinkable>);
      expect(screen.getByText("Home").tagName).toBe("A");
    });

    test("className and style", () => {
      const className = "text-red-500";
      const style = { color: "red" };
      render(
        <CLinkable href="/" className={className} style={style}>
          Home
        </CLinkable>
      );

      const el = screen.getByText("Home");
      expect(el.className).toBe(className);
      expect(el.style.color).toBe("red");
    });
  });

  describe("without href", () => {
    test("base", async () => {
      render(<CLinkable>Home</CLinkable>);
      expect(screen.getByText("Home").tagName).not.toBe("A");
    });

    test("className and style", () => {
      const className = "text-red-500";
      const style = { color: "red" };
      render(
        <CLinkable className={className} style={style}>
          <div>Home</div>
        </CLinkable>
      );

      const el = screen.getByText("Home");
      expect(el.className).toBe(className);
      expect(el.style.color).toBe("red");
    });
  });
});
