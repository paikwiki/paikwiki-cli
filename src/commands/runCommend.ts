import type { ProgramCommand, CommandOption } from "../types";

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

export const runCommand: ProgramCommand = {
  commandName: "run",
  description: 'run "run" command(FOR TEST)',
  options: [greetingOption, doFunctionOption],
  action: commandAction,
};
