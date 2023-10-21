#!/usr/bin/env node

import App from "./app";
import { greetingCommand } from "./commands/greetingCommand";
import { catCommand } from "./commands/catCommand";

const app = new App(
  {
    name: "Paikwiki CLI",
    description: "CLI Tool created by paikwiki",
    version: "1.0.3",
  },
  [greetingCommand, catCommand],
);

app.start();
