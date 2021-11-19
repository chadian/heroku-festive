import { Command } from "@oclif/command";
import * as terminalImage from "terminal-image";
import { resolve } from "path";

export default class Firelog extends Command {
  static description = "stay warm this winter"

  async run() {
    await this.log("Loading fire...")
    await terminalImage.gifFile(resolve(__dirname, "../fireplace-fire.gif"), {
      width: "50%",
      height: "50%",
    });
  }
}
