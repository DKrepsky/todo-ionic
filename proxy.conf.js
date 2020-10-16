const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'https://api-todo-hausenn.herokuapp.com/v1/todo',
    secure: false,
    pathRewrite: {'^/api': ''}
  }
];

module.exports = PROXY_CONFIG