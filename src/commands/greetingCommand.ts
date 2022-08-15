import { nameObjectConverter } from "./utils";
import { OPTION_PREFIX } from "./constants";
import type { ProgramCommand } from "../types";

type GreetingCommandOption = "--message" | "--addSuffix";
type GreetingCommandOptionName = "message" | "addSuffix";
type AddSuffixFunctionName = "default" | "questionMark" | "tilde";
type AddSuffix = (param: AddSuffixFunctionName) => string;

const GREETING_COMMAND_NAME = "greeting";
const GREETING_COMMAND_OPTION_NAMES: Readonly<GreetingCommandOptionName[]> = [
  "message",
  "addSuffix",
] as const;
const ADD_SUFFIX_FUNCTION_NAMES: Readonly<AddSuffixFunctionName[]> = [
  "default",
  "questionMark",
  "tilde",
] as const;

// TODO: ~CommandOptions 보다 명시적인 이름으로 변경
const greetingCommandOptions: Readonly<
  Record<GreetingCommandOptionName, GreetingCommandOption>
> = nameObjectConverter(GREETING_COMMAND_OPTION_NAMES, OPTION_PREFIX);

const addSuffixFunctionNames: Readonly<
  Record<AddSuffixFunctionName, AddSuffixFunctionName>
> = nameObjectConverter(ADD_SUFFIX_FUNCTION_NAMES);

const getAddSuffixDescription = (functionNames: string[]) =>
  `available functions: ${functionNames.map((name) => `"${name}"`).join(", ")}`;

const action = (optionStrings: { [k: string]: string }) => {
  const suffixes = {
    questionMark: "!",
    tilde: "~",
  };
  const greetingCommandOptionNames: Readonly<
    Record<GreetingCommandOptionName, GreetingCommandOptionName>
  > = nameObjectConverter(GREETING_COMMAND_OPTION_NAMES);
  const addSuffixes: Readonly<{
    [functionName in AddSuffixFunctionName]: AddSuffix;
  }> = {
    default: (greeting) => greetWithSuffix(greeting)(),
    questionMark: (greeting) =>
      greetWithSuffix(greeting)(suffixes.questionMark),
    tilde: (greeting) => greetWithSuffix(greeting)(suffixes.tilde),
  };

  const greetWithSuffix = (greeting: string) => (suffix?: string) =>
    suffix ? `${greeting}${suffix}` : greeting;
  const addSuffix =
    addSuffixes[
      (optionStrings[greetingCommandOptionNames.addSuffix] ??
        addSuffixFunctionNames.default) as AddSuffixFunctionName // TODO: as 제거
    ];

  try {
    console.log(addSuffix(optionStrings.message as AddSuffixFunctionName)); // TODO: as 제거
  } catch (error) {
    console.log(
      `${greetingCommandOptions.addSuffix} "${
        optionStrings[greetingCommandOptionNames.addSuffix]
      }" is invalid`
    );
    process.exit(1);
  }
};

export const greetingCommand: ProgramCommand = {
  commandName: GREETING_COMMAND_NAME,
  description: "print greeting message(for test)",
  options: [
    {
      flag: `${greetingCommandOptions.message} <greetingMessage>`,
      description: "add custom greeting message",
      defaultValue: "Hi",
    },
    {
      flag: `${greetingCommandOptions.addSuffix} <addSuffixFunctionName>`,
      description: getAddSuffixDescription(Object.keys(addSuffixFunctionNames)),
      defaultValue: addSuffixFunctionNames.default,
    },
  ],
  action,
} as const;
