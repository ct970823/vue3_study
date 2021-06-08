import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginImp from 'vite-plugin-imp'
// vite不需要配置组件的按需加载，因为Vant3 内部组件都是基于ESM编写的，但是样式需要配置按需加载
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginImp({
      libList: [
        {
          libName: 'vant',
          style(name) {
            if (/CompWithoutStyleFile/i.test(name)) {
              // This will not import any style file 
              return false
            }
            return `vant/es/${name}/index.css`
          }
        },
      ]
    }),
  ],
  server: {
    port: 3000,//启动端口
    open: true,
    proxy: {
      '/api': {
        target: 'https://api.tes.e-dewin.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
    cors: true
  }
})
