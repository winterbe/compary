import {compare} from "../src/index";

describe("compare", () => {

    it("should sort in natural order", () => {
        const naturalOrder = (a, b) => a < b ? -1 : a > b ? 1 : 0;
        const result = [1, 2, 3, 4, 5, 6]
            .sort(compare(naturalOrder));
        expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should accept nested comparators", () => {
        const naturalOrder = (a, b) => a < b ? -1 : a > b ? 1 : 0;
        const result = [1, 2, 3, 4, 5, 6]
            .sort(compare(compare(naturalOrder)));
        expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("reversed", () => {
        const naturalOrder = (a, b) => a < b ? -1 : a > b ? 1 : 0;
        const result = [1, 2, 3, 4, 5, 6]
            .sort(
                compare(naturalOrder)
                    .reversed()
            );
        expect(result).toEqual([6, 5, 4, 3, 2, 1]);
    });

    it("then", () => {
        const sortByX = (a, b) => a.x < b.x ? -1 : a.x > b.x ? 1 : 0;
        const sortByY = (a, b) => a.y < b.y ? -1 : a.y > b.y ? 1 : 0;
        const result = [{x: 2, y: 2}, {x: 1, y: 2}, {x: 1, y: 1}]
            .sort(
                compare(sortByX)
                    .then(sortByY)
            );
        expect(result[0]).toEqual({x: 1, y: 1});
        expect(result[1]).toEqual({x: 1, y: 2});
        expect(result[2]).toEqual({x: 2, y: 2});
    });

    it("thenDescending", () => {
        const byX = (a, b) => a.x < b.x ? -1 : a.x > b.x ? 1 : 0;
        const byY = (a, b) => a.y < b.y ? -1 : a.y > b.y ? 1 : 0;
        const result = [{x: 2, y: 2}, {x: 1, y: 2}, {x: 1, y: 1}]
            .sort(
                compare(byX)
                    .thenDescending(byY)
            );
        expect(result[0]).toEqual({x: 1, y: 2});
        expect(result[1]).toEqual({x: 1, y: 1});
        expect(result[2]).toEqual({x: 2, y: 2});
    });

    it("thenBy", () => {
        const sortByX = (a, b) => a.x < b.x ? -1 : a.x > b.x ? 1 : 0;
        const result = [{x: 2, y: 2}, {x: 1, y: 2}, {x: 1, y: 1}]
            .sort(
                compare(sortByX)
                    .thenBy(it => it.y)
            );
        expect(result[0]).toEqual({x: 1, y: 1});
        expect(result[1]).toEqual({x: 1, y: 2});
        expect(result[2]).toEqual({x: 2, y: 2});
    });

    it("thenByDescending", () => {
        const sortByX = (a, b) => a.x < b.x ? -1 : a.x > b.x ? 1 : 0;
        const result = [{x: 2, y: 2}, {x: 1, y: 2}, {x: 1, y: 1}]
            .sort(
                compare(sortByX)
                    .thenByDescending(it => it.y)
            );
        expect(result[0]).toEqual({x: 1, y: 2});
        expect(result[1]).toEqual({x: 1, y: 1});
        expect(result[2]).toEqual({x: 2, y: 2});
    });

});