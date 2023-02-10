import * as path from "path";
import * as vscode from "vscode";
import getComponentFilePath from "../../utils/GetComponentFilePath";
import { getComponentDefaultProps } from "../../utils/GetDefaultProps";

export function injectSveltePreview(injectionFolder: vscode.Uri) {
  vscode.workspace.fs.createDirectory(injectionFolder);

  injectHtmlFile(injectionFolder);
  injectDefaultSvelteComponentFile(injectionFolder);
  injectMainJsFile(injectionFolder);
}

export function refreshSveltePreview(injectionFolder: vscode.Uri) {
  updateMainJsFile(injectionFolder);
}

export function disposeSveltePreview(injectionFolder: vscode.Uri) {
  // Delete the svelte-companion folder
  vscode.workspace.fs.delete(injectionFolder, { recursive: true, useTrash: true });
}

function injectHtmlFile(injectionFolder: vscode.Uri) {
  // Create a new file named index.html in the svelte-companion folder
  const indexFile = vscode.Uri.file(path.join(injectionFolder.fsPath, "index.html"));
  const indexFileContent = Buffer.from(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Svelte Companion</title>
  </head>
<body>
  <div id="svelte"></div>
  <script src="main.js" type="module"></script>
</body>
</html>`,
    "utf-8"
  );
  vscode.workspace.fs.writeFile(indexFile, indexFileContent);
}

function injectDefaultSvelteComponentFile(injectionFolder: vscode.Uri) {
  // Create a new default App.svelte file in the svelte-companion folder
  const svelteFile = vscode.Uri.file(path.join(injectionFolder.fsPath, "App.svelte"));

  const svelteFileContent = Buffer.from(`<h1>Hello world!</h1>`, "utf-8");
  vscode.workspace.fs.writeFile(svelteFile, svelteFileContent);
}

function injectMainJsFile(injectionFolder: vscode.Uri, componentFilePath?: string) {
  // Create a new file named main.js in the svelte-companion folder
  const mainJsFile = vscode.Uri.file(path.join(injectionFolder.fsPath, "main.js"));
  if (!componentFilePath) {
    componentFilePath = getComponentFilePath();
  }

  const props: string = getComponentDefaultProps(componentFilePath);

  const mainJsFileContent = Buffer.from(
    `import App from "${componentFilePath}";

const app = new App({
  target: document.getElementById("svelte"),
  props: ${props},
});

export default app;`,
    "utf-8"
  );
  vscode.workspace.fs.writeFile(mainJsFile, mainJsFileContent);
}

function updateMainJsFile(injectionFolder: vscode.Uri) {
  const componentFilePath = getComponentFilePath();
  if (componentFilePath === "./App.svelte") {
    return;
  }

  injectMainJsFile(injectionFolder, componentFilePath);
}
