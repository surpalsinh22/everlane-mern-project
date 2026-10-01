import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import seedAdmin from "./utils/seedAdmin.js";

// Connect Database then listen
connectDB().then(async () => {
  // Automatically create fixed admin if not exists
  await seedAdmin();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
});