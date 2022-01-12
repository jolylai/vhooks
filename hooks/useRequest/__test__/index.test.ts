import useRequest from "../index";

describe("useRequest", () => {
  test("should auto run", async () => {
    const fn = jest.fn();

    useRequest(async () => {
      fn();
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
