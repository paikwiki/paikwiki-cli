interface CommandOption {
  flag: string;
  description?: string;
  defaultValue?: string;
}

interface CommandParams {
  commandName: string;
  description: string;
  options: CommandOption[];
  action: (param: { [key: string]: string }) => void;
}

export interface CommandProps<T> {
  name: string;
  options: Readonly<T[]>;
}

export class Command {
  commandName: string;
  description: string;
  options: CommandOption[];
  action: (param: { [key: string]: string }) => void;

  constructor(
    {
      commandName,
      description,
      options,
      action,
    }: CommandParams
  ) {
    this.commandName = commandName;
    this.description = description;
    this.options = options;
    this.action = action;
  }
}
