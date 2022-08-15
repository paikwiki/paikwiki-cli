import fs from "fs";
import { optionNameToFlagConverter } from "./utils";
import type { CommandProps, ProgramCommand } from "../types";

type CommandOptionName = "filePath";
type CommandOption = "--filePath";

const COMMAND_PROPS: CommandProps<CommandOptionName> = {
  name: "cat",
  options: ["filePath"] as const,
} as const;

const optionFlags: Readonly<Record<CommandOptionName, CommandOption>> =
  optionNameToFlagConverter(COMMAND_PROPS.options);

export const catCommand: ProgramCommand = {
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
} as const;
