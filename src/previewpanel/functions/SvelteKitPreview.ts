import * as vscode from "vscode";
import * as path from "path";
import getComponentFilePath from "../../utils/GetComponentFilePath";

export function injectSvelteKitPreview(injectionFolder: vscode.Uri) {
  vscode.workspace.fs.createDirectory(injectionFolder);

  injectPageFile(injectionFolder);
  injectDefaultSvelteComponentFile(injectionFolder);
}

export function disposeSvelteKitPreview(injectionFolder: vscode.Uri) {
  // Delete the svelte-companion folder
  vscode.workspace.fs.delete(injectionFolder, { recursive: true, useTrash: true });
}

export function refreshSvelteKitPreview(injectionFolder: vscode.Uri) {
  const componentFilePath = getComponentFilePath();
  if (componentFilePath === "./App.svelte") {
    return;
  }

  injectPageFile(injectionFolder, componentFilePath);
}

function injectPageFile(injectionFolder: vscode.Uri, componentFilePath?: string) {
  // Create a new file named index.svelte in the svelte-companion folder
  const indexFile = vscode.Uri.file(path.join(injectionFolder.fsPath, "+page.svelte"));
  if (componentFilePath === undefined) {
    componentFilePath = getComponentFilePath();
  }

  const indexFileContent = Buffer.from(
    `<script>
  import App from "${componentFilePath}";
</script>

<App />`,
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
