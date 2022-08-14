import type { ProgramCommand } from "../types";

type GreetingCommandOption = "--message" | "--addSuffix";
type GreetingCommandOptionName = "message" | "addSuffix";
type AddSuffixFunctionName = "default" | "questionMark" | "tilde";
type AddSuffix = (param: AddSuffixFunctionName) => string;

const GREETING_COMMAND_NAME = "greeting";

const nameObjectConverter = <T extends string>(
  names: T[]
): Readonly<Record<T, T>> => {
  const nameObject: Partial<Record<T, T>> = {};
  names.forEach((name) => (nameObject[name] = name));

  return nameObject as Readonly<Record<T, T>>; // TODO: as 제거
};

const greetingCommandOptions: Readonly<
  Record<GreetingCommandOptionName, GreetingCommandOption>
> = {
  message: "--message",
  addSuffix: "--addSuffix",
};

const addSuffixFunctionNames: Readonly<
  Record<AddSuffixFunctionName, AddSuffixFunctionName>
> = nameObjectConverter(["default", "questionMark", "tilde"]);

const getAddSuffixDescription = (functionNames: string[]) =>
  `available functions: ${functionNames.map((name) => `"${name}"`).join(", ")}`;

const action = (optionStrings: { [k: string]: string }) => {
  const greetingCommandOptionNames: Readonly<
    Record<GreetingCommandOptionName, GreetingCommandOptionName>
  > = nameObjectConverter(["message", "addSuffix"]);

  const greetWithSuffix = (greeting: string) => (suffix?: string) =>
    suffix ? `${greeting}${suffix}` : greeting;

  const addSuffixes: Readonly<{
    [functionName in AddSuffixFunctionName]: AddSuffix;
  }> = {
    default: (greeting) => greetWithSuffix(greeting)(),
    questionMark: (greeting) => greetWithSuffix(greeting)("?"),
    tilde: (greeting) => greetWithSuffix(greeting)("~"),
  };

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
};
