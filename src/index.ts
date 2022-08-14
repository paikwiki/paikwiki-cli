import { program } from "commander";
import { commandOptionConverter } from "./utils";
import type { CommandOption } from "./types";

const greetingOption: CommandOption = {
  flag: "--greeting <greetingMessage>",
  description: "add custom greeting message",
  defaultValue: "Hi",
};

const doFunctionOption: CommandOption = {
  flag: "--do <doFunctionName>",
  description: 'available functions: "addQuestionMark", "addTilde"',
  defaultValue: "default",
};

const doFunctions: { [functionName: string]: (param: string) => void } = {
  default: (greeting: string) => console.log(greeting),
  addQuestionMark: (greeting: string) => console.log(`${greeting}?`),
  addTilde: (greeting: string) => console.log(`${greeting}~`),
};

const commandAction = (optionStrings: { [k: string]: string }) => {
  let doFunction = doFunctions["default"];
  if (optionStrings["do"]) doFunction = doFunctions[optionStrings["do"]];

  try {
    doFunction(optionStrings.greeting);
  } catch (error) {
    console.log(`--do "${optionStrings["do"]}" is invalid`);
    process.exit(1);
  }
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
    .option(...commandOptionConverter(doFunctionOption))
    .action(commandAction);

  program.parse();
})();
