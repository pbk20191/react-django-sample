import { ProxyOptions, defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const proxySetting: Record<string, string | ProxyOptions> = {
  '/api': {
    target: "http://localhost:8000",
    changeOrigin: true,
    secure: false,
    ws: true
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react",
  server: {
    proxy: process.env.NODE_ENV == "development" ? proxySetting : undefined
  }
})
