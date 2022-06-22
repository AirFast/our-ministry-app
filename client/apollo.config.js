module.exports = {
  client: {
    service: {
      name: 'our-ministry-app-server',
      url: 'http://localhost:4000/graphql',
    },
    includes: [
      'src/**/*.vue',
      'src/**/*.ts',
    ],
  },
}