import { createHash } from 'crypto';

/**
 * Creates a SHA-256 hash key from a given object.
 * Useful for caching based on complex request payloads.
 */
export function createCacheKey(prefix: string, data: any): string {
    const raw = JSON.stringify(data, Object.keys(data).sort()); // sort keys for consistency
    const hash = createHash('sha256').update(raw).digest('hex');
    return `${prefix}:${hash}`;
}