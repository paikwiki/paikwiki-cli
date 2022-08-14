import { commandOptionConverter } from "./utils";
import type { Command } from "commander";
import type { ProgramCommand, ProgramInfo } from "./types";

export const getProgram = (
  program: Command,
  { name, description, version }: ProgramInfo
) => program.name(name).description(description).version(version);

export const addCommand = (
  programInstance: Command,
  { commandName, description, options, action }: ProgramCommand
) => {
  programInstance.command(commandName).description(description).action(action);
  options.forEach((opt) =>
    programInstance.option(...commandOptionConverter(opt))
  );

  return programInstance;
};
