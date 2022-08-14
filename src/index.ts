import { program } from "commander";
import { commandOptionConverter } from "./utils";
import type { CommandOption } from "./types";

const greetingOption: CommandOption = {
  flag: "--greeting <greetingMessage>",
  description: "add custom greeting message",
  defaultValue: "Hi",
};

const main = (() => {
  program
    .name("Paikwiki CLI")
    .description("CLI Tool created by paikwiki")
    .version("1.0.0");

  program
    .command("run")
    .description('run "run" command(FOR TEST)')
    .option(...commandOptionConverter(greetingOption))
    .action((str) => {
      const keys = Object.keys(str);
      keys.forEach((key) => console.log(key, str[key]));
    });

  program.parse();
})();
