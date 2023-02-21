import { QuickPickItem } from "vscode";

export type ElementInsertPosition = "above" | "below" | "last-child" | "template";

export type ElementType = "normal" | "empty" | "raw";

export type ElementItem = {
  type?: ElementType;
  raw?: string;
} & QuickPickItem;