import { lazy, ComponentType } from 'react';

/**
 * Drop-in replacement for React.lazy that survives deployments.
 *
 * Route chunks are content-hashed, so after a deploy the filenames a still-open
 * tab knows about no longer exist on the server. Navigating then rejects the
 * dynamic import with a "Failed to fetch dynamically imported module" /
 * ChunkLoadError, which the error boundary shows as "something went wrong" —
 * and a manual refresh fixes it because it pulls the current index.html.
 *
 * This does that refresh automatically: on a chunk-load failure it reloads the
 * page once. A sessionStorage flag prevents an infinite reload loop if the
 * failure is something other than a stale chunk (offline, real 500, etc.), in
 * which case the error is rethrown and the boundary handles it as before.
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
) {
  return lazy(async () => {
    const flagKey = 'chunk-reload-attempted';
    try {
      const mod = await factory();
      sessionStorage.removeItem(flagKey); // success — clear any prior attempt
      return mod;
    } catch (err) {
      const alreadyReloaded = sessionStorage.getItem(flagKey) === 'true';
      if (!alreadyReloaded && isChunkLoadError(err)) {
        sessionStorage.setItem(flagKey, 'true');
        window.location.reload();
        // Return a never-resolving promise so nothing renders before reload.
        return new Promise<{ default: T }>(() => {});
      }
      throw err;
    }
  });
}

function isChunkLoadError(err: unknown): boolean {
  const msg = err instanceof Error ? `${err.name} ${err.message}` : String(err);
  return (
    /ChunkLoadError/i.test(msg) ||
    /Loading chunk [\w-]+ failed/i.test(msg) ||
    /Failed to fetch dynamically imported module/i.test(msg) ||
    /error loading dynamically imported module/i.test(msg) ||
    /Importing a module script failed/i.test(msg)
  );
}
