import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Frontend-only Vite config for Vercel deployment
export default defineConfig(() => ({
  build: {
    outDir: "dist/spa",
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries for better caching
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui-vendor': ['lucide-react', 'clsx', 'tailwind-merge'],
          'apollo': ['@apollo/client', 'graphql'],
          'translations': ['/shared/translations'],
          'radix-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip'
          ],
          // Split by route/feature
          'admin': [/client\/pages\/admin/],
          'listing': [/client\/pages.*Detail/, /client\/pages.*Listing/],
          'auth': [/client\/pages.*Auth/, /client\/contexts.*Auth/]
        },
        // Optimize chunk size and enable compression
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        }
      }
    },
    chunkSizeWarningLimit: 400, // Lower warning limit to catch large chunks
    minify: 'esbuild', // Use esbuild for faster minification
    target: 'es2020', // Modern target for better tree-shaking
    cssCodeSplit: true, // Split CSS for better caching
    sourcemap: false // Disable source maps in production for size
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  // Ensure proper static asset handling
  publicDir: "public",
  base: "/",
}));