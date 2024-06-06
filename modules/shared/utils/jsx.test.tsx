import { mergeClassAndStyleProps } from "./jsx";

describe("jsx", () => {
  test("mergeClassAndStyleProps", () => {
    expect(
      mergeClassAndStyleProps(
        {
          className: "p-4",
          style: {
            color: "red",
          },
        },
        <div
          className="m-4"
          style={{ background: "green", color: "green" }}
        ></div>
      ).props
    ).toEqual({
      className: "m-4 p-4",
      style: {
        background: "green",
        color: "red",
      },
    });
  });
});
