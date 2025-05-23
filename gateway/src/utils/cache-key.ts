import { createHash } from 'crypto';


/**
 * Creates a SHA-256 hash key from a given object.
 * Useful for caching based on complex request payloads.
 */
export function createCacheKey(prefix: string, data: any): string {
    const sorted = deepSortObject(data); // sort keys for consistency
    const raw = JSON.stringify(sorted);
    console.log(raw)
    const hash = createHash('sha256').update(raw).digest('hex');
    return `${prefix}:${hash}`;
}


function deepSortObject(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(deepSortObject);
    } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).sort().reduce((accSortedObj, key) => {
            accSortedObj[key] = deepSortObject(obj[key]);
            return accSortedObj;
        }, {} as any);
    }
    return obj;
}
