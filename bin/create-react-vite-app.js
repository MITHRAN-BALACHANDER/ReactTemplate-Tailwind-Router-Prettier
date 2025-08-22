#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

const program = new Command();

program
  .version('1.0.0')
  .description('Create a new React app with Vite, React Router, Tailwind CSS, and Prettier')
  .argument('<project-name>', 'name of the project')
  .option('-t, --typescript', 'use TypeScript template')
  .action(async (projectName, options) => {
    try {
      console.log(chalk.blue(`Creating React app: ${projectName}`));
      
      const targetDir = path.join(process.cwd(), projectName);
      
      // Check if directory already exists
      if (await fs.pathExists(targetDir)) {
        console.log(chalk.red(`Directory ${projectName} already exists!`));
        process.exit(1);
      }
      
      // Create project directory
      await fs.ensureDir(targetDir);
      
      // Copy template files
      const templateDir = path.join(__dirname, '..', 'template');
      await fs.copy(templateDir, targetDir);
      
      // Update package.json with project name
      const packageJsonPath = path.join(targetDir, 'package.json');
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = projectName;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      
      console.log(chalk.green(`✅ Project ${projectName} created successfully!`));
      console.log(chalk.yellow('\nNext steps:'));
      console.log(chalk.cyan(`  cd ${projectName}`));
      console.log(chalk.cyan('  npm install'));
      console.log(chalk.cyan('  npm run dev'));
      console.log(chalk.yellow('\nAvailable scripts:'));
      console.log(chalk.cyan('  npm run format    # Format code with Prettier'));
      console.log(chalk.cyan('  npm run lint      # Check code with ESLint'));
      console.log(chalk.cyan('  npm run build     # Build for production'));
      
    } catch (error) {
      console.error(chalk.red('Error creating project:'), error.message);
      process.exit(1);
    }
  });

program.parse();
