// vite.config.js
import { defineConfig } from "file:///D:/project/final_project/admin/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "node:url";
import vue from "file:///D:/project/final_project/admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/project/final_project/admin/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/project/final_project/admin/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/project/final_project/admin/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_import_meta_url = "file:///D:/project/final_project/admin/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    // 此配置可自动导入vue中所含组件、API
    AutoImport({
      imports: ["vue"]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    port: 5173,
    open: true,
    //服务启动时自动在浏览器中打开应用
    // http://localhost:3030/api/user的请求都会变成 http://localhost:8080/user
    proxy: {
      "/LYapi": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/user/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXGZpbmFsX3Byb2plY3RcXFxcYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxcZmluYWxfcHJvamVjdFxcXFxhZG1pblxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcHJvamVjdC9maW5hbF9wcm9qZWN0L2FkbWluL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICAvLyBcdTZCNjRcdTkxNERcdTdGNkVcdTUzRUZcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjV2dWVcdTRFMkRcdTYyNDBcdTU0MkJcdTdFQzRcdTRFRjZcdTMwMDFBUElcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFsndnVlJ11cbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV1cbiAgICB9KVxuICBdLFxuXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDUxNzMsXG4gICAgb3BlbjogdHJ1ZSwgLy9cdTY3MERcdTUyQTFcdTU0MkZcdTUyQThcdTY1RjZcdTgxRUFcdTUyQThcdTU3MjhcdTZENEZcdTg5QzhcdTU2NjhcdTRFMkRcdTYyNTNcdTVGMDBcdTVFOTRcdTc1MjhcbiAgICAvLyBodHRwOi8vbG9jYWxob3N0OjMwMzAvYXBpL3VzZXJcdTc2ODRcdThCRjdcdTZDNDJcdTkwRkRcdTRGMUFcdTUzRDhcdTYyMTAgaHR0cDovL2xvY2FsaG9zdDo4MDgwL3VzZXJcbiAgICBwcm94eToge1xuICAgICAgJy9MWWFwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICAgICAgd3M6IHRydWUsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL15cXC91c2VyLywgJycpXG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1IsU0FBUyxvQkFBb0I7QUFDalQsU0FBUyxlQUFlLFdBQVc7QUFDbkMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBTHVJLElBQU0sMkNBQTJDO0FBTzVOLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQTtBQUFBLElBRUosV0FBVztBQUFBLE1BQ1QsU0FBUyxDQUFDLEtBQUs7QUFBQSxJQUNqQixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNuQyxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBO0FBQUEsSUFFTixPQUFPO0FBQUEsTUFDTCxVQUFVO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsUUFDSixjQUFjO0FBQUEsUUFDZCxTQUFTLFVBQVEsS0FBSyxRQUFRLFdBQVcsRUFBRTtBQUFBLE1BQzdDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
