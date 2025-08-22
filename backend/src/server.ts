import { app } from './app.js';

const port = 8080;

app.listen(port, () => {
  console.info('server running on port', port);
});
