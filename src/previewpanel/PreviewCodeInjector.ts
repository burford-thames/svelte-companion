import * as fs from "fs";
import * as vscode from "vscode";
import * as path from "path";
import { CodeInjectorType } from "../types/PreviewCodeInjectorType";
import { disposeSvelteKitPreview, injectSvelteKitPreview, refreshSvelteKitPreview } from "./functions/SvelteKitPreview";
import { disposeSveltePreview, injectSveltePreview, refreshSveltePreview } from "./functions/SveltePreview";

export default class PreviewCodeInjector {
  type: CodeInjectorType;
  injected: boolean;
  injectionFolder: vscode.Uri;
  statusBarItem: vscode.StatusBarItem;

  constructor(type: CodeInjectorType) {
    this.type = type;
    this.injectionFolder = this.getInjectionFolder();
    this.injected = this.getInjectionStatus();

    this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    this.updateStatusBar();
    this.statusBarItem.show();
  }

  public injectPreviewCode() {
    if (this.type === "SvelteKit") {
      injectSvelteKitPreview(this.injectionFolder);
    } else if (this.type === "Svelte") {
      injectSveltePreview(this.injectionFolder);
    }
    this.injected = true;
    this.updateStatusBar();
  }

  public disposePreviewCode() {
    if (this.type === "SvelteKit") {
      disposeSvelteKitPreview(this.injectionFolder);
    } else if (this.type === "Svelte") {
      disposeSveltePreview(this.injectionFolder);
    }
    this.injected = false;
    this.updateStatusBar();
  }

  public refreshPreviewCode() {
    if (!this.injected) {
      return;
    }

    if (this.type === "SvelteKit") {
      refreshSvelteKitPreview(this.injectionFolder);
    } else if (this.type === "Svelte") {
      refreshSveltePreview(this.injectionFolder);
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

  getInjectionFolder(): vscode.Uri {
    const workspacePath = vscode.workspace.workspaceFolders![0].uri.fsPath;
    let injectionPath: string;
    if (this.type === "SvelteKit") {
      injectionPath = path.join(workspacePath, "src", "routes", "svelte-companion");
    } else if (this.type === "Svelte") {
      injectionPath = path.join(workspacePath, "svelte-companion");
    } else {
      throw new Error("Invalid type");
    }
    return vscode.Uri.file(injectionPath);
  }

  getInjectionStatus(): boolean {
    try {
      // Check if injection folder exists
      fs.accessSync(this.injectionFolder.fsPath, fs.constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  }
}
