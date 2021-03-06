import * as React from "react";
import { Command, flags } from "@oclif/command";
import { useState, useEffect } from "react";
import { render, Text, Box, useInput } from "ink";
import { spawn } from "child_process";
import logo from "../logo";
import { ColorText } from "../components/ColorText";
import { FlashyText } from "../components/FlashyText";
import { Marquee } from "../components/Marquee";
import { KeyboardArrows } from "../components/KeyboardArrows";
import { ScrollBar } from "../components/Scrollbar";
import chalk from "chalk";

const marquees = (colors?: string[]) => [
  "H A P P Y   H O L I D A Y S     ",
  "      S E A S O N S   G R E E T I N G S     ",
  "   H A P P Y   N E W   Y E A R     ",
  "      H A P P Y    F E S T I V U S     ",
  "    H A P P Y    S O L S T I C E     ",
].map((str, i) => {
  return (
    <Marquee
      key={i}
      colors={colors?.length ? colors : ["red", "green", "white", "blue"]}
      fps={10}
      direction={i % 2 === 0 ? "RIGHT" : "LEFT"}
      str={str}
      random={true}
    />
  );
});

export default class Holidays extends Command {
  static description =
    "make any heroku command more festive by replacing `heroku command` with `heroku festive commannd`";
  static strict = false;

  static flags = {
    color: flags.string({
      multiple: true,
      options: [
        "red",
        "green",
        "yellow",
        "blue",
        "magenta",
        "cyan",
        "white",
      ],
    }),
  };

  static examples = [
    `$ heroku festive apps
$ heroku festive apps:info --app my-heroku-app
$ heroku festive --color red --color green -- apps:info --app my-heroku-app
`,
  ];

  async run() {
    const { argv, flags } = this.parse(Holidays);
    const herokuLogo = logo();
    const colors = flags.color ?? [];

    const ContainerComponent = () => {
      const [result, setResult] = useState<string>("");
      const [error, setError] = useState<string>("");
      const [offset, setOffset] = useState(0);
      const [rows, setRows] = useState(process.stdout.rows!);
      const [columns, setColumns] = useState(process.stdout.columns!);

      useEffect(() => {
        const resizeHandler = () => {
          setRows(process.stdout.rows!);
          setColumns(process.stdout.columns!);
        };

        process.stdout.on("resize", resizeHandler);
        return () => {
          process.stdout.off("resize", resizeHandler);
        };
      }, []);

      useEffect(() => {
        const commandProcess = spawn("heroku", argv ?? ([] as string[]), {
          stdio: ["inherit", "pipe", "pipe"],
        });

        const onStdErr = (data: any) => {
          setError((prev) => prev + data);
        };

        const onStdOut = (data: any) => {
          setResult((prev) => prev + data);
        };

        commandProcess.stderr.on("data", onStdErr);
        commandProcess.stdout.on("data", onStdOut);

        return () => {
          commandProcess.kill();
          commandProcess.stderr.off("data", onStdErr);
          commandProcess.stdout.off("data", onStdOut);
        };
      }, []);

      const OUTPUT_HEIGHT = 20;

      const cappedResult = result
        .split("\n")
        .filter((_, i) => i >= offset && i < offset + OUTPUT_HEIGHT)
        .join("\n");

      const didCap =
        result && cappedResult.split("\n").length < result.split("\n").length;

      useInput((_, key) => {
        if (!didCap) return;

        const moveDown = () =>
          setOffset((offset) =>
            Math.min(offset + 1, result.split("\n").length - OUTPUT_HEIGHT)
          );

        const moveUp = () => setOffset((offset) => Math.max(offset - 1, 0));

        if (key.downArrow) {
          moveDown();
        }

        if (key.upArrow) {
          moveUp();
        }
      });

      const TERMINAL_WIDTH = 100;
      const TERMINAL_HEIGHT = 40;
      const underWidth = columns < TERMINAL_WIDTH;
      const underHeight = rows < TERMINAL_HEIGHT;
      const TERMINAL_PADDING = 1;
      const RESULTS_WIDTH = TERMINAL_WIDTH - 2 * TERMINAL_PADDING;

      const resultsWindowBorder = "-".repeat(RESULTS_WIDTH - 2);

      if (underWidth || underHeight) {
        return (
          <Box margin={1} alignItems="center" flexDirection="column">
            <Box>
              <Text>
                {chalk.yellow(
                  "?????? Festivities require space! Your terminal window is too small, please resize."
                )}
              </Text>
            </Box>
            <Text>
              {chalk.bold("Required")} width: {TERMINAL_WIDTH} height:{" "}
              {TERMINAL_HEIGHT}
            </Text>
            <Text>
              {chalk.bold("Currently")} width:{" "}
              {chalk[underWidth ? "red" : "green"](process.stdout.columns)}{" "}
              height:{" "}
              {chalk[underHeight ? "red" : "green"](process.stdout.rows)}
            </Text>
          </Box>
        );
      }

      return (
        <Box
          width={TERMINAL_WIDTH}
          flexDirection="column"
          padding={TERMINAL_PADDING}
        >
          <Box marginBottom={2}>
            <Box marginRight={2}>
              <FlashyText
                str={herokuLogo}
                colors={colors.length ? colors : ["red", "green", "white", "blue"]}
              />
            </Box>
            <Box flexDirection="column" flexGrow={1}>
              {[...marquees(colors)]}
            </Box>
          </Box>
          <Box>
            <Text color="redBright">{error}</Text>
          </Box>
          <Box flexDirection="column">
            <Box flexDirection="column">
              <Box flexDirection="column" justifyContent="space-between">
                <ColorText
                  random={true}
                  colors={colors.length ? colors : ["green", "red", "blue"]}
                  str={`===${
                    error || result ? "" : " Running"
                  } heroku ${argv.join(" ")} ===`}
                />
                {didCap ? (
                  <Box marginTop={1}>
                    <KeyboardArrows />
                  </Box>
                ) : null}
                <Box justifyContent="space-between" marginTop={1} flexGrow={1}>
                  <Box flexDirection="column" flexGrow={1}>
                    <Text>{resultsWindowBorder}</Text>
                    <ColorText
                      random={true}
                      colors={colors.length ? colors : ["green", "red"]}
                      str={
                        result
                          ? cappedResult
                          : "Awaiting communication from the north pole..."
                      }
                    />
                    <Text>{resultsWindowBorder}</Text>
                  </Box>
                  <Box flexShrink={1} marginLeft={2}>
                    {didCap ? (
                      <ScrollBar
                        height={OUTPUT_HEIGHT}
                        start={offset}
                        end={offset + OUTPUT_HEIGHT}
                        total={result.split("\n").length}
                      />
                    ) : null}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box marginTop={2}>
              <ColorText
                random={true}
                colors={colors.length ? colors : ["green", "red"]}
                str="Ctrl+C to stop the joy..."
              />
            </Box>
          </Box>
        </Box>
      );
    };

    render(<ContainerComponent />, { exitOnCtrlC: true });
  }
}
