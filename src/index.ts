import { program } from "commander";
import { addCommands, getProgram } from "./program";
import { programInfo } from "./programInfo";
import { greetingCommand } from "./commands/greetingCommand";
import { catCommand } from "./commands/catCommand";

const programInstance = getProgram(program, programInfo);
const commands = [greetingCommand, catCommand];

addCommands(programInstance, commands);

programInstance.parse();
