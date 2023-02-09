import * as vscode from "vscode";
import * as path from "path";

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

  const svelteFileContent = Buffer.from(
    `<script>
export let name;
</script>

<h1>Hello {name}!</h1>`,
    "utf-8"
  );
  vscode.workspace.fs.writeFile(svelteFile, svelteFileContent);
}

function injectMainJsFile(injectionFolder: vscode.Uri) {
  // Create a new file named main.js in the svelte-companion folder
  const mainJsFile = vscode.Uri.file(path.join(injectionFolder.fsPath, "main.js"));
  const mainJsFileContent = Buffer.from(
    `import App from "${getComponentFilePathToInject()}";

const app = new App({
  target: document.getElementById("svelte"),
  props: {
    name: "world",
  },
});

export default app;`,
    "utf-8"
  );
  vscode.workspace.fs.writeFile(mainJsFile, mainJsFileContent);
}

function updateMainJsFile(injectionFolder: vscode.Uri) {
  if (getComponentFilePathToInject() === "./App.svelte") {
    return;
  }

  injectMainJsFile(injectionFolder);
}

function getComponentFilePathToInject(): string {
  // Get the relative path of the active file
  if (!vscode.window.activeTextEditor) {
    return "./App.svelte";
  }

  let componentFilePath = vscode.workspace.asRelativePath(vscode.window.activeTextEditor.document.uri.fsPath, false);

  // If the active file is a .svelte file, import it
  if (!componentFilePath?.endsWith(".svelte")) {
    return "./App.svelte";
  }

  return "../" + componentFilePath;
}
