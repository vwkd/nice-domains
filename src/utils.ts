/**
 * Load names
 *
 * @param filepath path of `names.txt`
 * @returns names
 */
export async function loadNames(filepath: string): Promise<string[]> {
  const text = await Deno.readTextFile(filepath);
  const names = text.trim().split("\n");

  return names;
}

/**
 * Load results
 *
 * @param filepath path of `results.tsv`
 * @returns results
 */
export async function loadResults(
  filepath: string,
): Promise<Map<string, boolean>> {
  const results = new Map<string, boolean>();

  try {
    const text = await Deno.readTextFile(filepath);
    const previousResults = text.trim().split("\n");

    for (const previousResult of previousResults) {
      const [domain, isReg] = previousResult.trim().split("\t");

      if (isReg === "true") {
        results.set(domain, true);
      } else if (isReg === "false") {
        results.set(domain, false);
      } else {
        throw new Error(`Invalid result: ${previousResult}`);
      }
    }
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      // noop
    } else {
      throw err;
    }
  }

  return results;
}
