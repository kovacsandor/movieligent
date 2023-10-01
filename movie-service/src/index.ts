import { connect } from 'mongoose';
import { app } from './app';

const port = 8080;

app.listen(port, async () => {
  await connect(process.env.DATABASE_URL);
  console.log(`App is listening on port ${port}...`);
});
