import type { ProgramCommand, CommandOption } from "../types";

const greetingOption: CommandOption = {
  flag: "--message <greetingMessage>",
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
    doFunction(optionStrings.message);
  } catch (error) {
    console.log(`--do "${optionStrings["do"]}" is invalid`);
    process.exit(1);
  }
};

export const greetingCommand: ProgramCommand = {
  commandName: "greeting",
  description: 'print greeting message(for test)',
  options: [greetingOption, doFunctionOption],
  action: commandAction,
};
