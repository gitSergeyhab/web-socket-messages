import mongoose from "mongoose";

export const mongoConnect = () =>
  mongoose
    .connect(
      "mongodb+srv://blackmolochcc:R6x2viVVsCDZKtcV@nutri-ws.ag7xxcg.mongodb.net"
    )
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
