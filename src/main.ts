import { Command } from "commander";
import { check } from "./check/main.ts";
import { generate } from "./generate/main.ts";
import { list } from "./list/main.ts";

const program = new Command();

program
  .name("domain-finder")
  .description("Find good domain names")
  .version("0.0.1");

program
  .command("list")
  .description("List unregistered domain names")
  .requiredOption("-o --out <path>", "output directory")
  .option("-a --all", "include registered domains")
  .action((options) => list(options));

program
  .command("check")
  .description("Check domain names")
  .requiredOption("-o --out <path>", "output directory")
  .requiredOption("-t --tld <string>", "TLD")
  .action((options) => check(options));

program
  .command("generate")
  .description("Generate domain names")
  .requiredOption("-o --out <path>", "output directory")
  .option("-n --nouns", "use nouns only")
  .action((options) => generate(options));

program.parse();
