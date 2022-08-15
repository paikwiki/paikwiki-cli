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
  // TODO: action 함수 작성
  action: (optionStrings) =>
    console.log(`cat ${optionStrings.filePath}`),
} as const;
