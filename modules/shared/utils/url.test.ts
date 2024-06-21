import { getUrl } from "./url";

describe("url", () => {
  describe("getUrl", () => {
    test("base", () => {
      expect(
        getUrl({
          url: "htttp://example.com",
          searchParams: {
            q: "1",
            a: "",
          },
        })
      ).toBe("htttp://example.com?q=1&a=");
    });

    test("preserve existing query", () => {
      expect(
        getUrl({
          url: "htttp://example.com?c=1",
          searchParams: {
            q: "1",
          },
        })
      ).toBe("htttp://example.com?c=1&q=1");
    });
  });
});
