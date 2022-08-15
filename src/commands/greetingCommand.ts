import { nameObjectConverter, optionObjectConverter } from "./utils";
import type { CommandProps, ProgramCommand } from "../types";

type CommandOptionName = "message" | "addSuffix";
type CommandOption = "--message" | "--addSuffix";
type AddSuffixFunctionName = "default" | "questionMark" | "tilde";
type AddSuffix = (param: AddSuffixFunctionName) => string;

const COMMAND_PROPS: CommandProps<CommandOptionName> = {
  name: "greeting",
  options: ["message", "addSuffix"] as const,
} as const;

const ADD_SUFFIX_FUNCTION_NAMES: Readonly<AddSuffixFunctionName[]> = [
  "default",
  "questionMark",
  "tilde",
] as const;

// TODO: commandOptions 보다 명시적인 이름으로 변경
const commandOptions: Readonly<Record<CommandOptionName, CommandOption>> =
  optionObjectConverter(COMMAND_PROPS.options);

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
  const commandOptionNames: Readonly<
    Record<CommandOptionName, CommandOptionName>
  > = nameObjectConverter(COMMAND_PROPS.options);
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
      (optionStrings[commandOptionNames.addSuffix] ??
        addSuffixFunctionNames.default) as AddSuffixFunctionName // TODO: as 제거
    ];

  try {
    console.log(addSuffix(optionStrings.message as AddSuffixFunctionName)); // TODO: as 제거
  } catch (error) {
    console.log(
      `${commandOptions.addSuffix} "${
        optionStrings[commandOptionNames.addSuffix]
      }" is invalid`
    );
    process.exit(1);
  }
};

export const greetingCommand: ProgramCommand = {
  commandName: COMMAND_PROPS.name,
  description: "print greeting message(for test)",
  options: [
    {
      flag: `${commandOptions.message} <greetingMessage>`,
      description: "add custom greeting message",
      defaultValue: "Hi",
    },
    {
      flag: `${commandOptions.addSuffix} <addSuffixFunctionName>`,
      description: getAddSuffixDescription(Object.keys(addSuffixFunctionNames)),
      defaultValue: addSuffixFunctionNames.default,
    },
  ],
  action,
} as const;
