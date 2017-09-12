interface Comparator<T> {
    (a: T, b: T): number;

    reversed(): Comparator<T>;

    then(compare: (a: T, b: T) => number): Comparator<T>;

    thenDescending(compare: (a: T, b: T) => number): Comparator<T>;

    thenBy(selector: (value: T) => any): Comparator<T>;

    thenByDescending(selector: (value: T) => any): Comparator<T>;
}

export default Comparator;

const naturalOrder = (a, b) => a < b ? -1 : a > b ? 1 : 0;

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
                (a: T, b: T) => naturalOrder(selector(a), selector(b))
            );
        },
        thenByDescending(selector: (value: T) => any): Comparator<T> {
            return this.then(
                compare((a: T, b: T) => naturalOrder(selector(a), selector(b)))
                    .reversed()
            );
        }
    });
}