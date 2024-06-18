// vetur.config.js
/** @type {import('vls').VeturConfig} */
odule.exports = {
    projects: [
      {
        root: './pychess-admin-ui',
        package: './package.json',
        tsconfig: './tsconfig.json',
      },
      {
        root: './pychess-main',
        package: './package.json',
        tsconfig: './tsconfig.json',
      },
    ]
}