import { program } from "commander";
import { addCommand, getProgram } from "./program";
import { programInfo } from "./programInfo";
import { greetingCommand } from "./commands/greetingCommand";

const programInstance = getProgram(program, programInfo);
addCommand(programInstance, greetingCommand);

programInstance.parse();
