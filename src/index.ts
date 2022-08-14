import { program } from "commander";
import { addCommand, getProgram } from "./program";
import { programInfo } from "./programInfo";
import { runCommand } from "./commands/runCommend";

const programInstance = getProgram(program, programInfo);
addCommand(programInstance, runCommand);

programInstance.parse();
