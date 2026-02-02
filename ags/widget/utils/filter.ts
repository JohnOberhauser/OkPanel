export function uniqueBy<T, K>(arr: readonly T[], key: (item: T) => K): T[] {
    const seen = new Set<K>();

    return arr.filter(item => {
        const k = key(item);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
    });
}