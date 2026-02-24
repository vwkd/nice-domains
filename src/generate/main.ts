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

  await Deno.mkdir(outputDirectory, { recursive: true });

  const names = ADJECTIVES.flatMap((adjective) =>
    NOUNS.map((noun) => `${adjective}${noun}`)
  );

  const filepath = join(outputDirectory, NAMES_FILENAME);

  await Deno.writeTextFile(filepath, names.join("\n"));
}
