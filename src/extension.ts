import * as vscode from "vscode";
import jumpToCode from "./modifycode/JumpToCode";
import TreeDataProvider from "./layouttree/TreeDataProvider";
import { TreeItem } from "./layouttree/LayoutTreeTypes";
import { addCode } from "./modifycode/AddCode";
import addElement from "./modifycode/AddElement";
import deleteElement from "./modifycode/DeleteElement";
import { create_ssr_component, validate_component } from "svelte/internal";
import { SvelteCustomTextEditorProvider } from "./previewpanel/SvelteCustomTextEditorProvider";

export function activate(context: vscode.ExtensionContext) {
  // Register the tree data provider
  let tree = new TreeDataProvider();
  let layoutTree = vscode.window.registerTreeDataProvider("svelteLayout", tree);

  let refreshCommand = vscode.commands.registerCommand("svelte-companion.refreshLayoutTree", () => {
    tree.refresh();
  });

  // Fire the refresh command when the active text editor changes
  const onDidChangeActiveTextEditor = vscode.window.onDidChangeActiveTextEditor(() => {
    vscode.commands.executeCommand("svelte-companion.refreshLayoutTree");
  });

  // Fire the refresh command when text changes
  const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument(() => {
    vscode.commands.executeCommand("svelte-companion.refreshLayoutTree");
  });

  // Register command that open preview panel to the side
  let openPreviewCommand = vscode.commands.registerCommand("svelte-companion.showPreview", () => {
    // Split and Open the preview panel to the side
    vscode.commands.executeCommand("vscode.openWith", vscode.window.activeTextEditor?.document.uri, "svelte-companion.previewPanel", { viewColumn: vscode.ViewColumn.Beside });
  });

  // Register command that will be called when the user clicks on the tree item
  let jumpToCodeCommand = vscode.commands.registerCommand("svelte-companion.jumpToCode", (item: TreeItem) => {
    jumpToCode(item);
  });

  let toggleSecondaryCommand = vscode.commands.registerCommand("svelte-companion.toggleSecondary", () => {
    tree.hideSecondaryNode = !tree.hideSecondaryNode;
    tree.refresh();
  });

  let addElementCommand = vscode.commands.registerCommand("svelte-companion.addElement", (item: TreeItem) => {
    addElement(item);
    tree.refreshElement(item);
  });

  let addElementPropertiesCommand = vscode.commands.registerCommand("svelte-companion.addElementProperties", (item: TreeItem) => {
    vscode.window.showInformationMessage("Add element properties");
  });

  let deleteElementCommand = vscode.commands.registerCommand("svelte-companion.deleteElement", (item: TreeItem) => {
    deleteElement(item);
  });

  // Register the preview panel
  context.subscriptions.push(SvelteCustomTextEditorProvider.register(context));

  context.subscriptions.push(layoutTree);
  context.subscriptions.push(refreshCommand);
  context.subscriptions.push(jumpToCodeCommand);
  context.subscriptions.push(addElementCommand);
  context.subscriptions.push(addElementPropertiesCommand);
  context.subscriptions.push(deleteElementCommand);
  context.subscriptions.push(toggleSecondaryCommand);
  context.subscriptions.push(onDidChangeActiveTextEditor);
  context.subscriptions.push(onDidChangeTextDocument);
  context.subscriptions.push(openPreviewCommand);

  // const css = {
  //   code: "p.svelte-urs9w7{color:purple;font-family:'Comic Sans MS', cursive;font-size:2em}",
  //   map: "{\"version\":3,\"file\":\"App.svelte\",\"sources\":[\"App.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport Nested from './Nested.svelte';\\n</script>\\n\\n<p>This is a paragraph.</p>\\n<Nested/>\\n\\n<style>\\n\\tp {\\n\\t\\tcolor: purple;\\n\\t\\tfont-family: 'Comic Sans MS', cursive;\\n\\t\\tfont-size: 2em;\\n\\t}\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAQC,CAAC,cAAC,CAAC,AACF,KAAK,CAAE,MAAM,CACb,WAAW,CAAE,eAAe,CAAC,CAAC,OAAO,CACrC,SAAS,CAAE,GAAG,AACf,CAAC\"}"
  // };

  // const app = create_ssr_component(($$result: any, $$props: any, $$bindings: any, slots: any) => {
  //   $$result.css.add(css);

  //   return `<p class="${"svelte-urs9w7"}">This is a paragraph.</p>
  // ${validate_component(nested, "Nested").$$render($$result, {}, {}, {})}`;
  // });

  // const nested = create_ssr_component(($$result: any, $$props: any, $$bindings: any, slots: any) => {
  //   return `<p>This is another paragraph.</p>`;
  // });

  // console.log(app.render({}));
}

// This method is called when your extension is deactivated
export function deactivate() {}
