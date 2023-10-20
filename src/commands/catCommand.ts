import fs from "fs";
import { optionNameToFlagConverter } from "./utils";
import { Command } from "./command";

const COMMAND_PROPS_OPTIONS = ["filePath"] as const;
const COMMAND_PROPS= {
  name: "cat",
  options: COMMAND_PROPS_OPTIONS,
} as const;

type CommandOption = "--filePath";
type CommandOptionName = typeof COMMAND_PROPS_OPTIONS[number]

const optionFlags: Readonly<Record<CommandOptionName, CommandOption>> =
  optionNameToFlagConverter(COMMAND_PROPS.options);

export const catCommand = new Command({
  commandName: COMMAND_PROPS.name,
  description: "cat file",
  options: [
    {
      flag: `${optionFlags.filePath} <filePath>`,
      description: "file path",
    },
  ],
  action: (optionStrings) => {
    if (!fs.existsSync(optionStrings.filePath))
      throw new Error(`file does not exist: ${optionStrings.filePath}`);

    const file = fs.readFileSync(optionStrings.filePath);
    console.log(file.toString());
  },
});
