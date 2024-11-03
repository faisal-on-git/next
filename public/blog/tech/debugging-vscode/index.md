---
title: "Debugging React Tests in VSCode"
date: '2024-11-03'
---

Debugging is straightforward when we open DevTools, navigate to the source folder, add breakpoints, and check values—often, with just a few iterations, we can pinpoint any issues. But have you ever wished life could be this easy when debugging tests?

It’s not as difficult as we might think. We can debug tests in a similar way within VS Code for our CRA (Create React App) application by following just three simple steps:

## Basic Setup

1. Open the debugger in VSCode (`Ctrl + Shift + D` or `Cmd + Shift + D` on Mac)
2. Create a `launch.json` file (VSCode will prompt you to select an environment - choose Node.js)
3. Replace the contents with this configuration:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug CRA Tests",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/react-scripts",
      "args": [
        "test",
        "--runInBand",
        "--no-cache",
        "--env=jsdom",
        "--watchAll=false"
      ],
      "cwd": "${workspaceRoot}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## Using React-Rewired

If your project uses `react-app-rewired` to customize the CRA configuration, use this alternative setup:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "name": "vscode-jest-tests",
      "request": "launch",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/react-app-rewired",
      "args": [
        "test",
        "--scripts-version",
        "react-scripts",
        "--env=jsdom",
        "--runInBand"
      ],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "protocol": "inspector",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## Debugging Specific Tests

To debug a specific test file, you can add the `--testPathPattern` argument to target individual test files:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "name": "vscode-jest-tests",
      "request": "launch",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/react-app-rewired",
      "args": [
        "test",
        "--scripts-version",
        "react-scripts",
        "--testPathPattern=app/javascript/__tests__/components/footer.js",
        "--env=jsdom",
        "--runInBand"
      ],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "protocol": "inspector",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## Using the Debugger

Once configured:
1. Set breakpoints in your test files by clicking on the line numbers
2. Start debugging by pressing F5 or clicking the green play button in the debug panel
3. The debugger will pause at your breakpoints, allowing you to:
   - Inspect variables
   - Step through code
   - Check the call stack
   - Evaluate expressions in the debug console

This setup makes debugging tests as convenient as debugging our application code in the browser!