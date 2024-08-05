export default {
  head: {
    title: 'todolist-ssr',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  css: ['~/assets/css/main.css'],

  serverMiddleware: [
    { path: '/api/todos', handler: '~/server/api/todos.js' }
  ],

  plugins: [],

  components: true,

  buildModules: [],

  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: 'http://localhost:3000',
  },

  build: {},
}
