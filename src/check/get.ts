import { retry } from "@std/async";
import { join } from "@std/path";

const RETRY_AMOUNT = 3;

/**
 * Get registration status of domain
 *
 * - uses RDAP endpoint
 * - beware: only approximation!
 *
 * @param endpoint RDAP endpoint
 * @param domain domain
 * @returns `true` if registered, `false` if not
 */
export async function isRegistered(
  endpoint: string,
  domain: string,
): Promise<boolean> {
  const url = join(endpoint, domain);

  return await retry(async () => {
    const res = await fetch(url, { method: "HEAD" });

    if (res.status == 200) {
      return true;
    }

    if (res.status == 404) {
      return false;
    }

    throw new Error(`Got HTTP error: ${res.status} ${res.statusText}`);
  }, {
    maxAttempts: RETRY_AMOUNT,
    minTimeout: 250,
    maxTimeout: 1000,
  });
}
