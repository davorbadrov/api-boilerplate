/**
 * Handles file upload and serving, e.g. images and docs.
 */
const routes = [
  {
    method: 'GET',
    path: '/uploads/{param*}',
    handler: {
      directory: {
        path: './public/uploads',
        redirectToSlash: true
      }
    },
    config: {
      auth: false
    }
  }
]

module.exports = routes
