const { writeFileSync, readFileSync } = require('fs');
const { promisify } = require('util');

const glob = promisify(require('glob'));

const CODE_TITLE = '## Codes';
const DEMO_PATH = 'demo/*';

(async () => {
  const matches = await glob(DEMO_PATH);
  console.log('matches',matches)

  matches.forEach(match => {
    const componentPath = `${match}/index.js`;
    const mdxPath = `${match}/index.mdx`;

    const componentStr = readFileSync(componentPath, { encoding: 'utf8' });
    let mdxStr = readFileSync(mdxPath, { encoding: 'utf8' });

    const start = mdxStr.search(CODE_TITLE);
    if (start === -1) {
      mdxStr += '\n'
      writeMdx(mdxPath, mdxStr, componentStr);
    } else {
      mdxStr = mdxStr.slice(0, start - 1);
      writeMdx(mdxPath, mdxStr, componentStr);
    }
  });
})();

function wrapWithTsx(str) {
  return `\`\`\`tsx
${str}
\`\`\`
`;
}

function writeMdx(mdxPath, mdxStr, componentStr) {
  return writeFileSync(
    mdxPath,
    `${mdxStr}
${CODE_TITLE}
${wrapWithTsx(componentStr)}
`,
  );
}
