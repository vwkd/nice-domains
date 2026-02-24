import { Command } from "commander";
import { generate } from "./generate/main.ts";

const program = new Command();

program
  .name("domain-finder")
  .description("Find good domain names")
  .version("0.0.1");

program
  .command("generate")
  .description("Generate domain names")
  .requiredOption("-o --out <path>", "output directory")
  .action((options) => generate(options));

program.parse();
