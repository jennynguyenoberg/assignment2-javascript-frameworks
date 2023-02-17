import chalk from 'chalk';
import fs from 'fs/promises';
import { formatDistanceToNow, isAfter, isBefore, parse, format, isToday, set } from 'date-fns';
import { Command } from 'commander';
import getGitVersion from './src/getGitVersion.js';

const gitVersion = await getGitVersion()

// Declares and displays colored text in terminal
const firstName = 'Jenny';
const lastName = 'Nguyen Öberg';
const fullName = `${chalk.bgYellow(firstName)} ${chalk.bgBlue(lastName)}`;
console.log('full name:', fullName);

// Prints out version of npm and node
console.log(`npm & node: ${process.env.npm_config_user_agent}`);

// Declares and prints out days since course started
const startOfCourse = new Date(2023, 0, 31);
const daysFromCourseStart = formatDistanceToNow(startOfCourse);
console.log(`days since course started: ${formatDistanceToNow(startOfCourse)}`);

// Allows for sending in a date as an argument
const argumentParser = new Command();
argumentParser.option('--date');
argumentParser.parse();

// Checks if sent argument is before or after the date when you run the file
const dateStringSentAsArgument = argumentParser.args[0];
const dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date());
const currentDate = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
const formattedDate = format(currentDate, 'yyyy-MM-dd');

// Prints out if sent argument is before or after the date when you run the file
console.log('current day is:', (formattedDate));
console.log('isToday:', isToday(dateSentAsArgument));
console.log('isAfter:', isAfter(dateSentAsArgument, currentDate));
console.log('isBefore:', isBefore(dateSentAsArgument, currentDate));

// Function that creates md-file and saves content
const fileContent = `
full name: ${firstName} ${lastName}
npm & node: ${process.env.npm_config_user_agent}
git version: ${gitVersion}
days since course started: ${daysFromCourseStart}
current day is: ${currentDate}
sent date argument is: ${dateSentAsArgument}
`;
await fs.writeFile('index.md', fileContent);

// Function that creates an HTML-file and saves it to the browser
const htmlContent = `<!DOCTYPE html>
<html lang="en">

<head>
  <title>Assignment 2: Node + NPM</title> 
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <header>
  <h1>Assignment 2 - Node + NPM</h1>
  </header>
  <main>
    <div className='container'>
      <p>Full name: ${firstName} ${lastName}</p>
      <p>NPM & Node: ${process.env.npm_config_user_agent}</p>
      <p>Git version: ${gitVersion}</p>
      <p>Days since course started: ${daysFromCourseStart}</p>
      <p>Current day is: ${currentDate}</p>
      <p>Sent date argument is: ${dateSentAsArgument}</p>
    </div>
  </main>
</body>

</html>`;
await fs.writeFile('index.html', htmlContent);