import fs from "fs";
import { nameObjectConverter } from "./utils";
import { OPTION_PREFIX } from "./constants";
import type { ProgramCommand } from "../types";

type CatCommandOptionName = "filePath";
type CatCommandOption = "--filePath";

const CAT_COMMAND_OPTION_NAMES = ["filePath"];

// TODO: ~CommandOptions 보다 명시적인 이름으로 변경
const catCommandOptions: Readonly<
  Record<CatCommandOptionName, CatCommandOption>
> = nameObjectConverter(CAT_COMMAND_OPTION_NAMES, OPTION_PREFIX);

export const catCommand: ProgramCommand = {
  commandName: "cat",
  description: "cat file",
  options: [
    {
      flag: `${catCommandOptions.filePath} <filePath>`,
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
