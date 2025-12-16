const buckets = new Map();

export function rateLimit({ windowMs, max, key }) {
  const now = Date.now();
  const bucket = buckets.get(key) || { count: 0, start: now };

  // Reset window
  if (now - bucket.start > windowMs) {
    bucket.count = 0;
    bucket.start = now;
  }

  bucket.count += 1;
  buckets.set(key, bucket);

  const remaining = max - bucket.count;

  return {
    success: bucket.count <= max,
    remaining,
  };
}
