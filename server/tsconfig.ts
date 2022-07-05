module.exports = {
  compilerOptions: {
    baseUrl: '.',
    target: 'es2018',
    module: 'commonjs',
    jsx: 'preserve',
    strict: true,
    esModuleInterop: true,
    resolveJsonModule: true,
    skipLibCheck: true,
    lib: ['es2018', 'esnext.asynciterable'],
    paths: { '~/*': ['./src/*'] },
    types: [
      'node',
    ],
  },
  exclude: ['node_modules'],
};
