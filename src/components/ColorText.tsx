import * as React from "react";
import chalk from "chalk";
import { Text } from "ink";
import { useState, useEffect } from "react";

export function ColorText({
  str,
  colors,
  random,
  fps,
}: {
  str: string;
  colors: string[];
  random?: boolean;
  fps?: number;
}) {
  const refreshRate = 1000 / (fps ?? 10);
  random = random ?? true;
  let color = colors[colors.length - 1];
  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
  const sequentialColor = () => {
    let nextIndex = colors.indexOf(color) + 1;
    if (nextIndex > colors.length - 1) {
      nextIndex = 0;
    }

    color = colors[nextIndex];
    return color;
  };

  const colorFunction = random ? randomColor : sequentialColor;

  const applyColor = (str: string) => {
    return [...str]
      .map((char) => chalk[colorFunction() as "red"](char))
      .join("");
  };

  const [colorized, setColorized] = useState(applyColor(str));

  useEffect(() => {
    const timer = setInterval(() => {
      setColorized(applyColor(str));
    }, refreshRate);

    return () => clearInterval(timer);
  }, [str]);

  return <Text>{colorized}</Text>;
}
