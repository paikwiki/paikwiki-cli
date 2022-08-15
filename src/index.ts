import { program } from "commander";
import { addCommand, getProgram } from "./program";
import { programInfo } from "./programInfo";
import { greetingCommand } from "./commands/greetingCommand";
import { catCommand } from "./commands/catCommand";

const programInstance = getProgram(program, programInfo);
addCommand(programInstance, greetingCommand);
addCommand(programInstance, catCommand);

programInstance.parse();
