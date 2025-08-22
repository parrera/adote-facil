import { defineConfig } from 'vite';

export default defineConfig(async () => {
  const react = await import('@vitejs/plugin-react').then(m => m.default);

  return {
    plugins: [react()],
    resolve: {
      alias: {
        // This tells Vite where to find components when imported
        '@/components': '/src/components',
      },
    },
  };
});
