import * as React from "react";
import { useState, useEffect } from "react";
import { useInput, Box, Text } from "ink";

export function KeyboardArrows() {
  const [keys, setKeys] = useState({ up: false, down: false });

  useEffect(() => {
    if (keys.up) {
      const timer = setTimeout(
        () => setKeys((keys) => ({ ...keys, up: false })),
        200
      );
      return () => clearTimeout(timer);
    }
  }, [keys]);

  useEffect(() => {
    const timer = setTimeout(
      () => setKeys((keys) => ({ ...keys, down: false })),
      200
    );
    return () => clearTimeout(timer);
  }, [keys]);

  useInput((_, key) => {
    if (key.upArrow) {
      setKeys((keys) => ({ ...keys, up: true }));
    }

    if (key.downArrow) {
      setKeys((keys) => ({ ...keys, down: true }));
    }
  });

  return (
    <Box flexDirection="column">
      <Box>
        <Text>Use up/down arrow keys to scroll contents</Text>
      </Box>
      <Box flexDirection="row">
        <Box>
          <Text color="red" inverse={keys.up}>
            [ UP ⬆︎ ]
          </Text>
        </Box>
        <Box>
          <Text color="white"> </Text>
        </Box>
        <Box>
          <Text color="red" inverse={keys.down}>
            [ DOWN ⬇︎ ]
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
