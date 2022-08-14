import type { ProgramCommand, CommandOption } from "../types";

const messageOption: CommandOption = {
  flag: "--message <greetingMessage>",
  description: "add custom greeting message",
  defaultValue: "Hi",
};

const addSuffixOption: CommandOption = {
  flag: "--addSuffix <addSuffixFunctionName>",
  description: 'available functions: "addQuestionMark", "addTilde"',
  defaultValue: "default",
};

const action = (optionStrings: { [k: string]: string }) => {
  const addSuffixes: { [functionName: string]: (param: string) => void } = {
    default: (greeting: string) => console.log(greeting),
    addQuestionMark: (greeting: string) => console.log(`${greeting}?`),
    addTilde: (greeting: string) => console.log(`${greeting}~`),
  };

  const addSuffix = optionStrings["addSuffix"]
    ? addSuffixes[optionStrings["addSuffix"]]
    : addSuffixes["default"];

  try {
    addSuffix(optionStrings.message);
  } catch (error) {
    console.log(`--addSuffix "${optionStrings["addSuffix"]}" is invalid`);
    process.exit(1);
  }
};

export const greetingCommand: ProgramCommand = {
  commandName: "greeting",
  description: "print greeting message(for test)",
  options: [messageOption, addSuffixOption],
  action,
};
