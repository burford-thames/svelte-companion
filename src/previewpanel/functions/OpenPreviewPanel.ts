import * as vscode from "vscode";
import PreviewCodeInjector from "../PreviewCodeInjector";

export default function openPreviewPanel(previewCodeInjector: PreviewCodeInjector) {
  // Open simple vscode browser preview to the side
  vscode.commands.executeCommand("workbench.action.newGroupRight");
  if (previewCodeInjector.type === "Svelte") {
    vscode.commands.executeCommand("simpleBrowser.show", vscode.Uri.parse("http://localhost:5173/svelte-companion/index.html"));
  } else if (previewCodeInjector.type === "SvelteKit") {
    vscode.commands.executeCommand("simpleBrowser.show", vscode.Uri.parse("http://localhost:5173/svelte-companion"));
  }
}
