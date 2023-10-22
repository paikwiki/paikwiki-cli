#!/usr/bin/env node

import App from "./app";
import { greetingCommand } from "./commands/greetingCommand";
import { catCommand } from "./commands/catCommand";

const version = process.env.npm_package_version;
if (!version) throw new Error(`version is not set on package.json`);

const app = new App(
  {
    name: "Paikwiki CLI",
    description: "CLI Tool created by paikwiki",
    version,
  },
  [greetingCommand, catCommand],
);

app.start();
