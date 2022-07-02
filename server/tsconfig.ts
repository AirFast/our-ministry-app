module.exports = {
  compilerOptions: {
    baseUrl: '.',
    target: 'es2018',
    module: 'commonjs',
    jsx: 'preserve',
    strict: true,
    esModuleInterop: true,
    lib: ['es2018', 'esnext.asynciterable'],
    paths: {
      '~/*': ['./src/*'],
    },
  },
  exclude: ['node_modules'],
};
