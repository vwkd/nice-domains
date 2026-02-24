import { join } from "@std/path";
import { ADJECTIVES, NOUNS } from "./data.ts";
import type { Options } from "./types.ts";

const NAMES_FILENAME = "names.txt";

/**
 * Generate domain names
 *
 * - all combinations of adjectives and nouns
 * - adapted from Deno Deploy
 *
 * @param options options
 */
export async function generate(options: Options): Promise<void> {
  const outputDirectory = options.out;
  const nounsOnly = options.nouns;

  await Deno.mkdir(outputDirectory, { recursive: true });

  let names: string[];

  if (nounsOnly) {
    names = NOUNS.flatMap((
      noun,
    ) => NOUNS.filter((n) => n !== noun).map((n) => `${noun}${n}`));
  } else {
    names = ADJECTIVES.flatMap((adjective) =>
      NOUNS.map((noun) => `${adjective}${noun}`)
    );
  }

  const filepath = join(outputDirectory, NAMES_FILENAME);

  await Deno.writeTextFile(filepath, names.join("\n"));
}
