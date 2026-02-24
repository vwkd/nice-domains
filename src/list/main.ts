import { join } from "@std/path";
import { loadResults } from "../utils.ts";
import type { Options } from "./types.ts";

const RESULTS_FILENAME = "results.tsv";

/**
 * Generate domain names
 *
 * @param options options
 */
export async function list(options: Options): Promise<void> {
  const outputDirectory = options.out;
  const all = options.all;

  await Deno.mkdir(outputDirectory, { recursive: true });

  const resultsFilepath = join(outputDirectory, RESULTS_FILENAME);
  const results = await loadResults(resultsFilepath);

  for (const [domain, isReg] of results.entries()) {
    if (all) {
      console.log(isReg ? "❌" : "✅", domain);
    } else {
      if (!isReg) {
        console.log(domain);
      }
    }
  }
}
