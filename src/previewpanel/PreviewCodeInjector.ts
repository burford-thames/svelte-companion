import * as vscode from "vscode";
import * as fs from "fs";
import { getProjectType } from "../utils/GetProjectTypeUtil";
import { disposeSvelteKitPreview, injectSvelteKitPreview, refreshSvelteKitPreview } from "./functions/SvelteKitPreview";
import { disposeSveltePreview, injectSveltePreview, refreshSveltePreview } from "./functions/SveltePreview";
import { CodeInjectorType } from "../types/PreviewCodeInjectorType";

export default class PreviewCodeInjector {
  type: CodeInjectorType;
  injected: boolean;
  workspaceRoot: string;

  constructor() {
    this.type = getProjectType();
    this.workspaceRoot = vscode.workspace.workspaceFolders?.[0].uri.fsPath!;
    
    // Check if file index.html exists in the svelte-companion folder
    const svelteCompanionIndex = vscode.Uri.file(`${this.workspaceRoot}/svelte-companion/index.html`);
    try {
      this.injected = fs.statSync(svelteCompanionIndex.fsPath).isFile();
    } catch (error) {
      this.injected = false;
    }
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
}
