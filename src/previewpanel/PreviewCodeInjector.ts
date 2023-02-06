import * as vscode from "vscode";

type CodeInjectorType = "Svelte" | "SvelteKit";

export default class PreviewCodeInjector {
  type: CodeInjectorType;
  injected: boolean;

  constructor() {
    // Get the list of dependencies from the package.json
    const packageJson = vscode.workspace.getConfiguration("package.json");
    const dependencies = packageJson.get("dependencies") as { [key: string]: string };
    const devDependencies = packageJson.get("devDependencies") as { [key: string]: string };
    const allDependencies = { ...dependencies, ...devDependencies };

    // Check if the project is using SvelteKit or Svelte
    if (allDependencies["@sveltejs/kit"]) {
      this.type = "SvelteKit";
      // Check if preview code has already been injected
      // Check if the routes/svelte-companion folder exists
      // If it does, set injected to true
      try {
        vscode.workspace.fs.stat(vscode.Uri.file("routes/svelte-companion"));
        this.injected = true;
      } catch (error) {
        this.injected = false;
      }
    } else if (allDependencies["svelte"]) {
      this.type = "Svelte";
      // Check if preview code has already been injected
      // Check if the public/svelte-companion folder exists
      // If it does, set injected to true
      try {
        vscode.workspace.fs.stat(vscode.Uri.file("public/svelte-companion"));
        this.injected = true;
      } catch (error) {
        this.injected = false;
      }
    } else {
      throw new Error("This extension only works with Svelte or SvelteKit projects");
    }
  }

  public injectPreviewCode() {
    // If the project is using SvelteKit, create a new route in the routes folder
    if (this.type === "SvelteKit" && !this.injected) {
      // Get the path to the routes folder
      const routesFolder = vscode.workspace.getConfiguration("svelte-companion").get("routesFolder") as string;
      const routesFolderPath = vscode.Uri.file(routesFolder);

      // Create a new file in the routes folder
      vscode.workspace.fs.createDirectory(routesFolderPath);
      // vscode.workspace.fs.writeFile(routesFolderPath, "Hello World!");
    }
  }

  public disposePreviewCode() {
    // If the project is using SvelteKit, delete the route in the routes folder
    if (this.type === "SvelteKit" && this.injected) {
      // Get the path to the routes folder
      const routesFolder = vscode.workspace.getConfiguration("svelte-companion").get("routesFolder") as string;
      const routesFolderPath = vscode.Uri.file(routesFolder);

      // Delete the file in the routes folder
      vscode.workspace.fs.delete(routesFolderPath);
    }
  }
}
