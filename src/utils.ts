import type { CommandOption } from "./types";

type CommandOptionConverter = (
  option: CommandOption
) => [string, string | undefined, string | undefined];
export const commandOptionConverter: CommandOptionConverter = (option) => [
  option.flag,
  option.description,
  option.defaultValue,
];
