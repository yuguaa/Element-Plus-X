export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  // '*.vue': ['eslint --fix', 'prettier --write', 'stylelint --fix'],
  // '*.{scss,less,style,html}': ['stylelint --fix', 'prettier --write'],
  '*.vue': ['eslint --fix', 'prettier --write'],
  '*.{scss,less,style,html}': ['prettier --write'],
  '*.md': ['prettier --write'],
};
