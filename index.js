const express = require('express');
const app = express();
const port = 3000;

const userRoutes = require('./routes/user.routes');

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
