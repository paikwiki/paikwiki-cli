import { Command, program } from "commander";

export type ProgramCommand = Readonly<{
  commandName: string;
  description: string;
  options: Readonly<
    {
      flag: string;
      description?: string;
      defaultValue?: string;
    }[]
  >;
  action: (param: { [key: string]: string }) => void;
}>;

class App {
  private program: Command;

  constructor(
    {
      name,
      description,
      version,
    }: {
      name: string;
      description: string;
      version: string;
    },
    commands: ProgramCommand[]
  ) {
    this.program = program.name(name).description(description).version(version);
    this.initCommands(commands);
  }

  start() {
    this.program.parse();
  }

  private initCommands(commands: ProgramCommand[]) {
    commands.forEach(({ commandName, description, options, action }) => {
      const pi = this.program.command(commandName);
      pi.description(description);
      options.forEach((opt) => {
        pi.option(opt.flag, opt.description, opt.defaultValue);
      });
      pi.action(action);
    });
  }
}

export default App;
