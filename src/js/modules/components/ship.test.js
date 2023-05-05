import Ship from "./ship";

describe("test Ship function factory", () => {
  const shipTest = Ship(4);
  console.log(shipTest);
  test("test length of ship", () => {
    expect(shipTest.getLength()).toBe(4);
  });

  test("test when ship hits", () => {
    shipTest.hit();
    expect(shipTest.getNumOfHits()).toBe(4);
    expect(shipTest.getSunk()).toBe(true);
  });
});
