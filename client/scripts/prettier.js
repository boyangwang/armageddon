/**
 * copy to https://github.com/facebook/react/blob/master/scripts/prettier/index.js
 * prettier api doc https://prettier.io/docs/en/api.html
 *----------*****--------------
 *  prettier all js and all ts.
 *----------*****--------------
 */

const glob = require('glob');
const prettier = require('prettier');
const fs = require('fs');

const prettierConfigPath = require.resolve('../.prettierrc');

let didError = false;

let files = glob.sync('./*.js*', { dot: true });
const jsFiles = glob.sync('./@(src|mock|config|tests|scripts)/**/*.js*');
files = files.concat(jsFiles);

if (!files.length) {
  return;
}

files.forEach((file) => {
  // eslint-disable-next-line no-console
  console.info(`WIP ${file}`);
  const options = prettier.resolveConfig.sync(file, {
    config: prettierConfigPath,
  });
  const fileInfo = prettier.getFileInfo.sync(file);
  if (fileInfo.ignored) {
    return;
  }
  try {
    const input = fs.readFileSync(file, 'utf8');
    const withParserOptions = {
      ...options,
      parser: fileInfo.inferredParser,
    };
    const output = prettier.format(input, withParserOptions);
    if (output !== input) {
      fs.writeFileSync(file, output, 'utf8');
      // eslint-disable-next-line no-console
      console.log(`\x1b[34m ${file} is prettier`);
    }
  } catch (e) {
    didError = true;
  }
});

if (didError) {
  process.exit(1);
}
// eslint-disable-next-line no-console
console.log('\x1b[32m prettier success!\x1b[0m');
