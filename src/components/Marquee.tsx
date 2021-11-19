import * as React from "react";
import { Static, render, Text, Box, measureElement, useInput } from "ink";
import { useState, useEffect, useRef } from "react";
import { ColorText } from "./ColorText";

// slightly better handling of string length with emojis
function length(str: string): number {
  return [...str].length;
}

export function Marquee({
  str,
  direction,
  fps,
  colors,
  random,
}: {
  str: string;
  fps?: number;
  direction?: "RIGHT" | "LEFT";
  colors: string[];
  random?: boolean;
}) {
  random = random ?? true;
  const refreshRate = 1000 / (fps ?? 10);
  direction = direction ?? "RIGHT";
  const ref = useRef();
  const [stage, setStage] = useState({ position: 0, width: 0 });

  const createFrame = ({
    position,
    width,
  }: {
    position: number;
    width: number;
  }): string => {
    const frame = `${" ".repeat(position)}${str}`;

    if (length(frame) > width) {
      const head = frame.substr(width - 1);
      const tail = str.replace(new RegExp(`${head}$`), "");
      let spacer = width - length(head) - length(tail);
      spacer = spacer >= 0 ? spacer : 0;
      return `${head}${" ".repeat(spacer)}${tail}`;
    }

    return frame;
  };

  useEffect(() => {
    const { width } = measureElement(ref.current!);
    const timer = setInterval(() => {
      setStage(({ position }) => {
        if (direction === "RIGHT") {
          if (position + 1 > width - 2) {
            return { position: 0, width };
          }

          return { position: position + 1, width };
        } else {
          if (position - 1 < 0) {
            return { position: width - 2, width };
          }

          return { position: position - 1, width };
        }
      });
    }, refreshRate);

    return () => clearInterval(timer);
  });

  return (
    <Box flexGrow={1} ref={ref}>
      <ColorText
        fps={fps}
        random={random}
        colors={colors}
        str={createFrame(stage)}
      />
    </Box>
  );
}
