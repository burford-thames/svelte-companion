import * as vscode from "vscode";
import { getProjectType } from "../utils/GetProjectTypeUtil";
import { disposeSvelteKitPreview, injectSvelteKitPreview } from "./functions/SvelteKitPreview";
import { disposeSveltePreview, injectSveltePreview } from "./functions/SveltePreview";
import { CodeInjectorType } from "../types/PreviewCodeInjectorType";

export default class PreviewCodeInjector {
  type: CodeInjectorType;

  constructor() {
    this.type = getProjectType();
  }

  public injectPreviewCode() {
    // If the project is using SvelteKit, create a new route in the routes folder
    if (this.type === "SvelteKit") {
      injectSvelteKitPreview();
    } else if (this.type === "Svelte") {
      injectSveltePreview();
    }
  }

  public disposePreviewCode() {
    // If the project is using SvelteKit, delete the route in the routes folder
    if (this.type === "SvelteKit") {
      disposeSvelteKitPreview();
    } else if (this.type === "Svelte") {
      disposeSveltePreview();
    }
  }
}
