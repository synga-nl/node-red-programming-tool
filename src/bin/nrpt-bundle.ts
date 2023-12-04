import { createMinifier } from 'dts-minify';
import * as ts from 'typescript';
import * as fs from 'fs';

const bundlePath = './Bundle.d.ts';
const collectionPath = './Collection.d.ts';
const intelliSensePath = 'src/Support/InstallIntelliSense.ts';

// Read the contents of the bundle file
let contents = fs.readFileSync(bundlePath).toString();

// Read the contents of the collection file and append it to the bundle contents
const collectionContents = fs.readFileSync(collectionPath).toString();
contents += '\n' + collectionContents + '\n' + `function collect<T>(collection?: T[] | Object): Collection<T>;\n`;

// Remove export declare and an import statement
contents = contents.replace(/export |declare |\nimport { Collection } from 'collect.js';\n/g, '');

// Remove 3 lines at the end
contents = contents.substring(0, contents.lastIndexOf('\n'));
contents = contents.substring(0, contents.lastIndexOf('\n'));
contents = contents.substring(0, contents.lastIndexOf('\n'));

// Add additional export contents
const exportContents = `
declare const Tools = {
    Tool,
    Enums: {
        Enum,
        Service: {
            Switch,
            Lights,
            MotionBlind,
        },
    },
    create,
    InstallIntelliSense,
    collect
}

// Node Red uses the package name as variable name by default.
declare const NodeRedProgrammingTools = Tools;
`;

// Write the modified bundle contents to the bundle file
fs.writeFileSync(bundlePath, [contents, exportContents].join('\n'));

// Read the contents of the InstallIntelliSense file
let installIntelliSenseContents = fs.readFileSync(intelliSensePath).toString();

// Minify the dts file
fs.writeFileSync(bundlePath, createMinifier(ts).minify(fs.readFileSync(bundlePath).toString()));

// Find the contents wrapped in backticks and replace it with the bundled declaration file contents
const match = installIntelliSenseContents.match(/`[\s\S]*?`/);
if (match) {
  const bundledContents = fs.readFileSync('bundle.d.ts').toString();
  installIntelliSenseContents = installIntelliSenseContents.replace(match[0], '`\n' + bundledContents + '\n`');
}

// Write the modified InstallIntelliSense contents back to the file
fs.writeFileSync(intelliSensePath, installIntelliSenseContents);
