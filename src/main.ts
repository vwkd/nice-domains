import { Command } from "commander";
import { check } from "./check/main.ts";
import { generate } from "./generate/main.ts";

const program = new Command();

program
  .name("domain-finder")
  .description("Find good domain names")
  .version("0.0.1");

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
  .action((options) => generate(options));

program.parse();
