import fs from "fs";
import { optionObjectConverter } from "./utils";
import type { CommandProps, ProgramCommand } from "../types";

type CommandOptionName = "filePath";
type CommandOption = "--filePath";

const COMMAND_PROPS: CommandProps<CommandOptionName> = {
  name: "cat",
  options: ["filePath"] as const,
} as const;

// TODO: commandOptions 보다 명시적인 이름으로 변경
const commandOptions: Readonly<Record<CommandOptionName, CommandOption>> =
  optionObjectConverter(COMMAND_PROPS.options);

export const catCommand: ProgramCommand = {
  commandName: COMMAND_PROPS.name,
  description: "cat file",
  options: [
    {
      flag: `${commandOptions.filePath} <filePath>`,
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
