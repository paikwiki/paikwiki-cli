import { program } from "commander";
import type { Command as Program } from "commander";
import type { Command } from "./commands/command";

class App {
  private program: Program;

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
    commands: Command[],
  ) {
    this.program = program.name(name).description(description).version(version);
    this.initCommands(commands);
  }

  start() {
    this.program.parse();
  }

  private initCommands(commands: Command[]) {
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
