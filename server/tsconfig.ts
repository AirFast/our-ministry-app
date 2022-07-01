module.exports = {
  compilerOptions: {
    target: 'es2018',
    module: 'commonjs',
    jsx: 'preserve',
    strict: true,
    esModuleInterop: true,
    lib: ['es2018', 'esnext.asynciterable']
  },
  exclude: ['node_modules']
}