// eslint-disable-next-line import/no-anonymous-default-export
export default {
  "*.{js,jsx,ts,tsx,mjs}": "xo",
  "*.{ts,tsx}": () => "tsc -p tsconfig.json --noEmit --skipLibCheck",
  "*.md": "prettier --write",
  "package.json": "prettier --write",
};
