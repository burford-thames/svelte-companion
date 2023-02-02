import * as vscode from 'vscode';
import { TreeItem } from '../layouttree/LayoutTreeTypes';

export default function deleteElement(item: TreeItem) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    editor.edit(editBuilder => {
        editBuilder.delete(selection);
    });
}