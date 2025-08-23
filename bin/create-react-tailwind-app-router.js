#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Dynamic import for CommonJS modules
const inquirer = (await import("inquirer")).default;
const prompt = inquirer.createPromptModule();


// Available templates
const templates = {
  'jsx-basic': {
    name: 'JavaScript (JSX) Basic',
    description: 'Basic React with JavaScript and JSX - minimal setup',
    folder: 'template-jsx-basic'
  },
  javascript: {
    name: 'JavaScript (JSX)',
    description: 'React with JavaScript, comprehensive UI components, and educational documentation',
    folder: 'template-jsx'
  },
  typescript: {
    name: 'TypeScript (TSX)',
    description: 'React with TypeScript, type safety, comprehensive UI components, and educational documentation',
    folder: 'template-tsx'
  }
};

const program = new Command();

program
  .version('3.0.0')
  .description('Create a new React app with Vite, React Router, Tailwind CSS, and Prettier')
  .argument('[project-name]', 'name of the project')
  .option('-t, --template <template>', 'template to use (jsx-basic, javascript, or typescript)')
  .option('--typescript', 'use TypeScript template (shorthand for -t typescript)')
  .option('--js', 'use JavaScript template (shorthand for -t javascript)')
  .option('--basic', 'use basic JavaScript template (shorthand for -t jsx-basic)')
  .option('-y, --yes', 'skip all prompts and use defaults')
  .option('--install', 'automatically install dependencies')
  .option('--git', 'initialize git repository')
  .action(async (projectName, options) => {
    try {
      // Step 1: Project name
      if (!projectName && !options.yes) {
        const answers = await prompt([{
          type: 'input',
          name: 'projectName',
          message: 'What is the name of your project?',
          validate: (input) => {
            const trimmed = input.trim();
            if (trimmed === '') return 'Project name cannot be empty';
            if (!/^[a-zA-Z0-9-_]+$/.test(trimmed)) return 'Project name can only contain letters, numbers, hyphens, and underscores';
            return true;
          }
        }]);
        projectName = answers.projectName;
      }

      projectName = projectName || 'my-app';

      if (!/^[a-zA-Z0-9-_]+$/.test(projectName)) {
        console.log(chalk.red(`❌ Invalid project name. Use only letters, numbers, hyphens, and underscores.`));
        process.exit(1);
      }

      // Step 2: Template selection
      let selectedTemplate = options.template;
      if (options.typescript) selectedTemplate = 'typescript';
      else if (options.js) selectedTemplate = 'javascript';
      else if (options.basic) selectedTemplate = 'jsx-basic';

      if ((!selectedTemplate || !templates[selectedTemplate]) && !options.yes) {
        const templateAnswer = await prompt([{
          type: 'list',
          name: 'template',
          message: 'Which template would you like to use?',
          choices: Object.entries(templates).map(([key, template]) => ({
            name: `${template.name} - ${template.description}`,
            value: key
          })),
          default: 'javascript'
        }]);
        selectedTemplate = templateAnswer.template;
      }

      selectedTemplate = selectedTemplate || 'javascript';
      const templateConfig = templates[selectedTemplate];

      const targetDir = path.join(process.cwd(), projectName);

      console.log(chalk.blue(`🚀 Creating React app: ${chalk.bold(projectName)}`));
      console.log(chalk.gray(`📋 Using template: ${templateConfig.name}`));

      // Step 3: Directory check
      if (await fs.pathExists(targetDir)) {
        console.log(chalk.red(`❌ Directory ${projectName} already exists!`));
        process.exit(1);
      }

      // Step 4: Copy template
      await fs.ensureDir(targetDir);
      const templateDir = path.resolve(__dirname, '../templates', templateConfig.folder);

      if (!(await fs.pathExists(templateDir))) {
        console.log(chalk.red(`❌ Template ${selectedTemplate} not found at ${templateDir}`));
        console.log(chalk.yellow(`💡 Available templates: ${Object.keys(templates).join(', ')}`));
        process.exit(1);
      }

      console.log(chalk.gray(`📁 Copying template files...`));
      await fs.copy(templateDir, targetDir, {
        filter: (src) => {
          const relativePath = path.relative(templateDir, src);
          return !relativePath.includes('node_modules') &&
                 !relativePath.includes('.git') &&
                 !relativePath.includes('dist');
        }
      });

      // Step 5: Update package.json
      const packageJsonPath = path.join(targetDir, 'package.json');
      if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);
        packageJson.name = projectName;
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
        console.log(chalk.gray(`📦 Updated package.json with project name`));
      }

      // Step 6: Auto-install
      if (options.install || (!options.yes && (await prompt([{
        type: 'confirm',
        name: 'install',
        message: 'Do you want to install dependencies now?',
        default: true
      }])).install)) {
        console.log(chalk.gray(`📥 Installing dependencies...`));
        execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
      }

      // Step 7: Git init
      if (options.git || (!options.yes && (await prompt([{
        type: 'confirm',
        name: 'git',
        message: 'Initialize a git repository?',
        default: true
      }])).git)) {
        console.log(chalk.gray(`📂 Initializing git repository...`));
        execSync('git init', { cwd: targetDir, stdio: 'inherit' });
        execSync('git add .', { cwd: targetDir, stdio: 'inherit' });
        execSync('git commit -m "Initial commit"', { cwd: targetDir, stdio: 'inherit' });
      }

      console.log(chalk.green(`✅ Project ${chalk.bold(projectName)} created successfully!`));
      console.log(chalk.yellow('\n📋 Next steps:'));
      console.log(chalk.cyan(`   cd ${projectName}`));
      if (!options.install) console.log(chalk.cyan('   npm install'));
      console.log(chalk.cyan('   npm run dev'));
    } catch (error) {
      console.error(chalk.red('❌ Error creating project:'), error);
      process.exit(1);
    }
  });

program.parse();
