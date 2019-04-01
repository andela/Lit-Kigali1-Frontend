const add = jest.fn((a, b) => a + b);

describe("sample-test", () => {
  test("configure travis test", () => {
    expect(true).toBeTruthy();
  });

  test("2 + 3 should return 5", () => {
    expect(add(2, 3)).toBe(5);
  });
});
