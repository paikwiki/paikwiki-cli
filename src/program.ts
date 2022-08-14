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
  const pi = programInstance.command(commandName);
  pi.description(description);
  options.forEach((opt) => {
    pi.option(...commandOptionConverter(opt));
  });
  pi.action(action);

  return pi;
};
