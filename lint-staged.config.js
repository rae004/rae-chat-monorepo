module.exports = {
  '{apps,libs,tools}/**/*.{ts,tsx}': files => {
    return `nx affected --target=typecheck --files=${files.join(',')}`;
  },
  '{apps,libs,tools}/**/*.{js,ts,jsx,tsx,json}': [
    files => `nx affected:lint --configuration=./.eslintrc.json --files=${files.join(',')}`,
    files => `nx affected:lint --fix --configuration=./.eslintrc.json --files=${files.join(',')}`,
  ],
};
