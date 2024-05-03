const orderModel = require("../models/order");

module.exports = function (io) {
  io.of("/orderStatus").on("connection", (socket) => {
    // console.log("New client connected: " + socket.id);

    socket.on("update-status-order", async (data) => {
      try {
        const { _id, status } = data;

        const response = await orderModel.findByIdAndUpdate(
          _id,
          {
            status,
          },
          { new: true }
        );

        if(response){
          io.of("/orderStatus").emit("updatedStatus",response);
        }
      } catch (err) {
        console.error("Error saving socket ID:", err);
      }
    });
  });
};
