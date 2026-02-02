export type StringObject = Record<string, string>;

export type FuzzyResult = { key: string; value: string };

export type TieredQueries = {
    primary: readonly string[];   // high weight (client name)
    secondary?: readonly string[]; // low weight (description/hints)
};

function toTokens(parts: readonly string[]): string[] {
    return parts
        .flatMap(s => s.toLowerCase().split(/[-_\s]+/))
        .filter(Boolean);
}

function scoreExactTokenHits(keyTokens: readonly string[], queryTokens: readonly string[]): number {
    // Count matches; duplicates in query count multiple times (fine for weighting)
    let hits = 0;
    for (const t of queryTokens) {
        if (keyTokens.includes(t)) hits++;
    }
    return hits;
}

function lengthBonus(key: string): number {
    // Tune divisor to control how strong this effect is
    return Math.max(0, 20 - key.length) * 0.1;
}

function iconSetRank(key: string): number {
    const parts = key.toLowerCase().split("-");
    if (parts.length < 2) return 99;

    switch (parts[1]) {
        case "md":  return 0; // best
        case "fa":  return 1;
        case "dev": return 2;
        default:    return 3;
    }
}

export function fuzzyQuery(
    obj: StringObject,
    queries: TieredQueries,
): FuzzyResult[] {
    const scored: Array<FuzzyResult & { _score: number }> = [];

    const primaryTokens = toTokens(queries.primary);
    const secondaryTokens = toTokens(queries.secondary ?? []);

    const PRIMARY_WEIGHT = 10;
    const SECONDARY_WEIGHT = 2;

    for (const [key, value] of Object.entries(obj)) {
        const keyTokens = key.toLowerCase().split(/[-_\s]+/).filter(Boolean);

        const primaryHits = scoreExactTokenHits(keyTokens, primaryTokens);
        const secondaryHits = scoreExactTokenHits(keyTokens, secondaryTokens);

        if (primaryHits === 0 && secondaryHits === 0) continue;

        let score =
            primaryHits * PRIMARY_WEIGHT +
            secondaryHits * SECONDARY_WEIGHT;

        // 👇 simple, generic tie-breaker
        score += lengthBonus(key);

        scored.push({ key, value, _score: score });
    }

    scored.sort((a, b) => {
        // 1️⃣ relevance score
        if (b._score !== a._score) {
            return b._score - a._score;
        }

        // 2️⃣ icon set preference (tie-breaker only)
        const setDiff = iconSetRank(a.key) - iconSetRank(b.key);
        if (setDiff !== 0) return setDiff;

        // 3️⃣ shorter key wins (final tie-break)
        return a.key.length - b.key.length;
    });
    return scored.map(({ _score, ...rest }) => rest);
}

