import * as React from "react";
import { Static, render, Text, Box, measureElement, useInput } from "ink";

export function ScrollBar({ height: barHeight, start, end, total }: any) {
  const BAR = '▒';
  const BAR_BG = ' ';

  const startOnBar = Math.ceil(barHeight * (start / total));
  const endOnBar = Math.floor(barHeight * (end / total));

  const barSegments = Array(barHeight).fill('').map((_, i) => {
    return i > startOnBar && i < endOnBar ? BAR : BAR_BG;
  });

  return <Box><Text>{`-\n${barSegments.join('\n')}\n-`}</Text></Box>;
}
