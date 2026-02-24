import { join } from "@std/path";
import process from "node:process";
import { isRegistered } from "./get.ts";
import { loadNames, loadResults } from "../utils.ts";
import type { Options } from "./types.ts";

const NAMES_FILENAME = "names.txt";
const RESULTS_FILENAME = "results.tsv";

/**
 * Check domain names
 *
 * - uses RDAP endpoint
 *
 * @param options options
 */
export async function check(options: Options): Promise<void> {
  const outputDirectory = options.out;
  const tld = options.tld;

  const RDAP_BASE = Deno.env.get("RDAP_BASE");

  if (!RDAP_BASE) {
    throw new Error("RDAP_BASE environment variable is not set.");
  }

  await Deno.mkdir(outputDirectory, { recursive: true });

  const namesFilepath = join(outputDirectory, NAMES_FILENAME);
  const names = await loadNames(namesFilepath);

  const resultsFilepath = join(outputDirectory, RESULTS_FILENAME);
  const results = await loadResults(resultsFilepath);

  for (const name of names) {
    const domain = `${name}.${tld}`;

    if (results.has(domain)) {
      continue;
    }

    // note: hack to print without trailing newline
    process.stdout.write(`Checking ${domain}...`);

    const isReg = await isRegistered(RDAP_BASE, domain);

    console.log(isReg ? "❌" : "✅");

    await Deno.writeTextFile(resultsFilepath, `${domain}\t${isReg}\n`, {
      append: true,
    });
  }
}
