import * as fs from "fs";
import * as vscode from "vscode";
import { CodeInjectorType } from "../types/PreviewCodeInjectorType";
import { disposeSvelteKitPreview, injectSvelteKitPreview, refreshSvelteKitPreview } from "./functions/SvelteKitPreview";
import { disposeSveltePreview, injectSveltePreview, refreshSveltePreview } from "./functions/SveltePreview";

export default class PreviewCodeInjector {
  type: CodeInjectorType;
  injected: boolean;
  workspaceRoot: string;
  statusBarItem: vscode.StatusBarItem;

  constructor(type: CodeInjectorType) {
    this.type = type;
    this.workspaceRoot = vscode.workspace.workspaceFolders?.[0].uri.fsPath!;

    // Check if file index.html exists in the svelte-companion folder
    const svelteCompanionIndex = vscode.Uri.file(`${this.workspaceRoot}/svelte-companion/index.html`);
    try {
      this.injected = fs.statSync(svelteCompanionIndex.fsPath).isFile();
    } catch (error) {
      this.injected = false;
    }

    this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    this.updateStatusBar();
    this.statusBarItem.show();
  }

  public injectPreviewCode() {
    if (this.injected) {
      vscode.window.showInformationMessage("Svelte Companion preview code is already injected");
      return;
    }

    if (this.type === "SvelteKit") {
      injectSvelteKitPreview(this.workspaceRoot);
    } else if (this.type === "Svelte") {
      injectSveltePreview(this.workspaceRoot);
    }
    this.injected = true;
    this.updateStatusBar();
  }

  public disposePreviewCode() {
    if (!this.injected) {
      vscode.window.showInformationMessage("Svelte Companion preview code is not injected");
      return;
    }
    if (this.type === "SvelteKit") {
      disposeSvelteKitPreview(this.workspaceRoot);
    } else if (this.type === "Svelte") {
      disposeSveltePreview(this.workspaceRoot);
    }
    this.injected = false;
    this.updateStatusBar();
  }

  public refreshPreviewCode() {
    if (!this.injected) {
      return;
    }

    if (this.type === "SvelteKit") {
      refreshSvelteKitPreview(this.workspaceRoot);
    } else if (this.type === "Svelte") {
      refreshSveltePreview(this.workspaceRoot);
    }
  }

  updateStatusBar() {
    if (this.injected) {
      this.statusBarItem.text = "$(circle-slash) Dispose";
      this.statusBarItem.command = "svelte-companion.disposePreviewCode";
    } else {
      this.statusBarItem.text = "$(debug-disconnect) Inject";
      this.statusBarItem.command = "svelte-companion.injectPreviewCode";
    }
  }
}
