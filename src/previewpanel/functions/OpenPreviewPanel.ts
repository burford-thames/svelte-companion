import * as vscode from "vscode";
import PreviewCodeInjector from "../PreviewCodeInjector";

export default function openPreviewPanel(previewCodeInjector: PreviewCodeInjector) {
  // Open simple vscode browser preview to the side
  if (previewCodeInjector.type === "Svelte") {
    // Open external browser
    vscode.env.openExternal(vscode.Uri.parse("http://localhost:5173/svelte-companion/index.html"));
  } else if (previewCodeInjector.type === "SvelteKit") {
    vscode.env.openExternal(vscode.Uri.parse("http://localhost:5173/svelte-companion"));
  }
}
