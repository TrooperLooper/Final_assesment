import { createLogger, format, transports } from "winston";
connectDB().then(() => { // Connect to DB before starting
  app.listen(port, () => console.log(`Server on port ${port}`)); // Start server
});
