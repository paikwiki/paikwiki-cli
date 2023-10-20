interface CommandOption {
  flag: string;
  description?: string;
  defaultValue?: string;
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
    }: {
      commandName: string;
      description: string;
      options: CommandOption[];
      action: (param: { [key: string]: string }) => void;
    }
  ) {
    this.commandName = commandName;
    this.description = description;
    this.options = options;
    this.action = action;
  }
}
