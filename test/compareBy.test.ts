import {compareBy} from "../src/index";

describe("compareBy", () => {
    it("should compare by the given selector", () => {
        const result = [{x: 2}, {x: 1}, {x: 3}]
            .sort(compareBy(it => it.x));
        expect(result.length).toBe(3);
        expect(result[0]).toEqual({x: 1});
        expect(result[1]).toEqual({x: 2});
        expect(result[2]).toEqual({x: 3});
    });

    // it("should compare by the given selector then by another selector", () => {
    //     const result = [{x: 2, y: 2}, {x: 1, y: 2}, {x: 1, y: 1}]
    //         .sort(
    //             compareBy(it => it.x)
    //                 .thenBy(it => it.y)
    //         );
    //     expect(result[0]).toEqual({x: 1, y: 1});
    //     expect(result[1]).toEqual({x: 1, y: 2});
    //     expect(result[2]).toEqual({x: 2, y: 2});
    // });
});