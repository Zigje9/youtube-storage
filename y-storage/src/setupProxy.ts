import { createProxyMiddleware } from 'http-proxy-middleware'

module.exports = function(app: any): void{
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.googleapis.com/youtube/v3',
      changeOrigin: true,
    })
  )
}
