interface Comparator<T> {
    (a: T, b: T): number;

    reversed(): Comparator<T>;

    then(compare: (a: T, b: T) => number): Comparator<T>;

    thenDescending(compare: (a: T, b: T) => number): Comparator<T>;

    thenBy(selector: (value: T) => any): Comparator<T>;

    thenByDescending(selector: (value: T) => any): Comparator<T>;
}

export default Comparator;