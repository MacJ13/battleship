import ComputerAI from "./computerAI";

describe("test ComputerAI factory function", () => {
  const testComp = ComputerAI("game-id", "computer");
  testComp.saveAllPositionBoard();
  //   console.log(testComp.getPlayerBoard());

  test("test simple", () => {
    expect(testComp.getGameId()).toEqual("game-id");
  });

  //   test("check length of position board", () => {
  //     testComp.saveAllPositionBoard();
  //     expect(testComp.getPositionBoard().length).toBe(100);
  //   });

  test("get position from board array", () => {
    const testPos = testComp.getPositionBoard(99);

    expect(testPos).toBe("99");

    expect(testComp.getPositionBoard(2)).toBe("00");
  });
});
