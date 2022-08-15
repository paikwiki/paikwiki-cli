export interface ProgramInfo {
  name: string;
  description: string;
  version: string;
}

export type ProgramCommand = Readonly<{
  commandName: string;
  description: string;
  options: Readonly<CommandOption[]>;
  action: (param: { [key: string]: string }) => void;
}>;

export interface CommandProps<T> {
  name: string;
  options: Readonly<T[]>;
}

export interface CommandOption {
  flag: string;
  description?: string;
  defaultValue?: string;
}
