import Comparator from "./Comparator";

const naturalCompare = (a: any, b: any) => a < b ? -1 : a > b ? 1 : 0;

export function compare<T>(comparison: (a: T, b: T) => number): Comparator<T> {
    return Object.assign(comparison, {
        reversed(): Comparator<T> {
            return compare(
                (a: T, b: T) => comparison(a, b) * -1
            );
        },
        then(nextComparison: (a: T, b: T) => number): Comparator<T> {
            return compare(
                (a: T, b: T) => {
                    const result = comparison(a, b);
                    return result !== 0
                        ? result
                        : nextComparison(a, b);
                }
            );
        },
        thenDescending(nextComparison: (a: T, b: T) => number): Comparator<T> {
            return this.then(
                compare(nextComparison)
                    .reversed()
            );
        },
        thenBy(selector: (value: T) => any): Comparator<T> {
            return this.then(
                (a: T, b: T) => naturalCompare(selector(a), selector(b))
            );
        },
        thenByDescending(selector: (value: T) => any): Comparator<T> {
            return this.then(
                compare((a: T, b: T) => naturalCompare(selector(a), selector(b)))
                    .reversed()
            );
        }
    });
}

export function compareBy<T, S>(selector: (value: T) => S): Comparator<T> {
    return compare<T>(
        (a: T, b: T) => naturalCompare(selector(a), selector(b))
    );
}

export function naturalOrder<T>(): (a: T, b: T) => number {
    return naturalCompare;
}