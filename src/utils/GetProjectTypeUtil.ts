import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { CodeInjectorType } from '../types/PreviewCodeInjectorType';
import { pathExists } from './FileUtil';

// Find out whether the project is a SvelteKit project or a Svelte project
export function getProjectType(): CodeInjectorType | undefined {
  // Get the list of dependencies from the package.json file
  const packageJsonPath = path.join(vscode.workspace.workspaceFolders?.[0].uri.fsPath || '', 'package.json');
  const dependencies = getDepsInPackageJson(packageJsonPath);

  // Check if the project is using SvelteKit or Svelte
  if (dependencies.includes('@sveltejs/kit')) {
    return 'SvelteKit';
  } else if (dependencies.includes('svelte')) {
    return 'Svelte';
  } else {
    return undefined;
  }
}

function getDepsInPackageJson(packageJsonPath: string): string[] {
  if (pathExists(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    const dependencies = packageJson.dependencies;
    const devDependencies = packageJson.devDependencies;

    const allDependencies = { ...dependencies, ...devDependencies };

    return Object.keys(allDependencies);
  } else {
    return [];
  }
}