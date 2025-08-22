#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Available templates
const templates = {
  javascript: {
    name: 'JavaScript (JSX)',
    description: 'React with JavaScript and JSX',
    folder: 'template'
  },
  typescript: {
    name: 'TypeScript (TSX)',
    description: 'React with TypeScript and TSX',
    folder: 'template-tsx'
  }
};

const program = new Command();

program
  .version('2.0.0')
  .description('Create a new React app with Vite, React Router, Tailwind CSS, and Prettier')
  .argument('[project-name]', 'name of the project')
  .option('-t, --template <template>', 'template to use (javascript or typescript)')
  .option('--typescript', 'use TypeScript template (shorthand for -t typescript)')
  .action(async (projectName, options) => {
    try {
      // Step 1: Ask for project name if missing
      if (!projectName) {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'projectName',
            message: 'What is the name of your project?',
            validate: input => input.trim() !== '' ? true : 'Project name cannot be empty'
          }
        ]);
        projectName = answers.projectName;
      }

      // Step 2: Determine template
      let selectedTemplate = options.template;

      // Legacy support for --typescript
      if (options.typescript) {
        selectedTemplate = 'typescript';
      }

      // If invalid or not provided, ask interactively
      if (!selectedTemplate || !templates[selectedTemplate]) {
        const templateAnswer = await inquirer.prompt([
          {
            type: 'list',
            name: 'template',
            message: 'Which template would you like to use?',
            choices: Object.entries(templates).map(([key, template]) => ({
              name: `${template.name} - ${template.description}`,
              value: key
            })),
            default: 'javascript'
          }
        ]);
        selectedTemplate = templateAnswer.template;
      }

      const templateConfig = templates[selectedTemplate];
      const targetDir = path.join(process.cwd(), projectName);

      console.log(chalk.blue(`🚀 Creating React app: ${chalk.bold(projectName)}`));
      console.log(chalk.gray(`📋 Using template: ${templateConfig.name}`));

      // Step 3: Check if directory exists
      if (await fs.pathExists(targetDir)) {
        console.log(chalk.red(`❌ Directory ${projectName} already exists!`));
        process.exit(1);
      }

      // Step 4: Create directory & copy template
      await fs.ensureDir(targetDir);
      const templateDir = path.join(__dirname, '..', templateConfig.folder);

      if (!(await fs.pathExists(templateDir))) {
        console.log(chalk.red(`❌ Template ${selectedTemplate} not found at ${templateDir}`));
        process.exit(1);
      }

      console.log(chalk.gray(`📁 Copying template files...`));
      await fs.copy(templateDir, targetDir);

      // Step 5: Update package.json
      const packageJsonPath = path.join(targetDir, 'package.json');
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = projectName;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

      // Step 6: Print success info
      console.log(chalk.green(`✅ Project ${chalk.bold(projectName)} created successfully!`));

      console.log(chalk.yellow('\n📋 Next steps:'));
      console.log(chalk.cyan(`   cd ${projectName}`));
      console.log(chalk.cyan('   npm install'));
      console.log(chalk.cyan('   npm run dev'));

      console.log(chalk.yellow('\n🛠️  Available scripts:'));
      console.log(chalk.cyan('   npm run dev       # Start development server'));
      console.log(chalk.cyan('   npm run build     # Build for production'));
      console.log(chalk.cyan('   npm run preview   # Preview production build'));
      console.log(chalk.cyan('   npm run lint      # Check code with ESLint'));
      console.log(chalk.cyan('   npm run format    # Format code with Prettier'));

      if (selectedTemplate === 'typescript') {
        console.log(chalk.yellow('\n🔷 TypeScript Features:'));
        console.log(chalk.cyan('   • Type safety and IntelliSense'));
        console.log(chalk.cyan('   • Enhanced development experience'));
        console.log(chalk.cyan('   • Better refactoring and error detection'));
      } else if (selectedTemplate === 'javascript') {
        console.log(chalk.yellow('\n🟨 JSX Features:'));
        console.log(chalk.cyan('   • Familiar JavaScript syntax'));
        console.log(chalk.cyan('   • Easy to learn for beginners'));
        console.log(chalk.cyan('   • Rapid prototyping with JSX'));
      }

      console.log(chalk.yellow('\n🌟 Features included:'));
      console.log(chalk.cyan('   • Dark/Light theme system'));
      console.log(chalk.cyan('   • Responsive navigation'));
      console.log(chalk.cyan('   • Pre-built components'));
      console.log(chalk.cyan('   • Comprehensive documentation'));
    } catch (error) {
      console.error(chalk.red('❌ Error creating project:'), error.message);
      process.exit(1);
    }
  });

program.parse();
