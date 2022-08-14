import type { ProgramCommand } from "../types";

type AddSuffixFunctionName = "default" | "questionMark" | "tilde";
type AddSuffix = (param: AddSuffixFunctionName) => string;

const ADD_SUFFIX_FUNCTION_NAMES: Readonly<
  Record<AddSuffixFunctionName, AddSuffixFunctionName>
> = {
  default: "default",
  questionMark: "questionMark",
  tilde: "tilde",
};

const getAddSuffixDescription = (functionNames: string[]) =>
  `available functions: ${functionNames.map((name) => `"${name}"`).join(", ")}`;

const action = (optionStrings: { [k: string]: string }) => {
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
      (optionStrings["addSuffix"] ??
        ADD_SUFFIX_FUNCTION_NAMES.default) as AddSuffixFunctionName // TODO: as 제거
    ];

  try {
    console.log(addSuffix(optionStrings.message as AddSuffixFunctionName)); // TODO: as 제거
  } catch (error) {
    console.log(`--addSuffix "${optionStrings["addSuffix"]}" is invalid`);
    process.exit(1);
  }
};

export const greetingCommand: ProgramCommand = {
  commandName: "greeting",
  description: "print greeting message(for test)",
  options: [
    {
      flag: "--message <greetingMessage>",
      description: "add custom greeting message",
      defaultValue: "Hi",
    },
    {
      flag: "--addSuffix <addSuffixFunctionName>",
      description: getAddSuffixDescription(
        Object.keys(ADD_SUFFIX_FUNCTION_NAMES)
      ),
      defaultValue: ADD_SUFFIX_FUNCTION_NAMES.default,
    },
  ],
  action,
};
