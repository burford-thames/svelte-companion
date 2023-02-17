import { QuickPickItem } from "vscode";

export type AttributeValuesType = "single-select" | "multi-select" | "input" | "empty";

export type AttributeValues = {
  type: AttributeValuesType;
  values?: QuickPickItem[];
};