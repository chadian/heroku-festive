import * as React from "react";
import { Static, render, Text, Box, measureElement, useInput } from "ink";
import { useState, useEffect, useRef } from "react";

export function FlashyText({
  str,
  colors,
  fps,
  random,
}: {
  str: string;
  colors: string[];
  fps?: number;
  random?: boolean;
}) {
  random = random ?? true;
  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
  const [color, setColor] = useState(randomColor());

  const sequentialColor = () => {
    let nextIndex = colors.indexOf(color) + 1;
    if (nextIndex > colors.length - 1) {
      nextIndex = 0;
    }

    return colors[nextIndex];
  };

  const colorFunction = random ? randomColor : sequentialColor;

  const refreshRate = 1000 / (fps ?? 10);
  useEffect(() => {
    const timer = setInterval(() => setColor(colorFunction()), refreshRate);
    return () => clearInterval(timer);
  }, []);

  return <Text color={color}>{str}</Text>;
}
