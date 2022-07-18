import useRequest from "../index";
describe("useRequest", () => {
    test("should auto run", async () => {
        const request = () => new Promise((resolve) => setTimeout(() => resolve("success"), 1000));
        const successCb = jest.fn();
        const errorCb = jest.fn();
        useRequest(request, {
            onSuccess: successCb,
            onError: errorCb,
        });
        expect(successCb).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=index.test.js.map