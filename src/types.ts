export interface CommandOption {
  flag: string;
  description?: string;
  defaultValue?: string;
}

export interface ProgramInfo {
  name: string;
  description: string;
  version: string;
}

export interface ProgramCommand {
  commandName: string;
  description: string;
  options: CommandOption[];
  action: (param: { [key: string]: string }) => void;
}
