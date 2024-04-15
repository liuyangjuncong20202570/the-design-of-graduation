import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    // 此配置可自动导入vue中所含组件、API
    AutoImport({
      imports: ['vue']
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5174,
    open: true, //服务启动时自动在浏览器中打开应用
    // http://localhost:3030/api/user的请求都会变成 http://localhost:8080/user
    proxy: {
      '/LYapi': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/user/, '')
      }
    }
  }
});
