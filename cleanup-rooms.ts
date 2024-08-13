const { Liveblocks } = require("@liveblocks/node")

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY
})

async function cleanupRooms() {
  try {
    // Get all rooms
    const { data: rooms } = await liveblocks.getRooms()

    for (const room of rooms) {
      // Get users in the room
      const { data } = await liveblocks.getActiveUsers(room.id)

      if (data.length === 0) {
        await liveblocks.deleteRoom(room.id)
      }
    }

    console.log("Cleanup completed successfully")
  } catch (error) {
    console.error("Error during cleanup:", error)
    process.exit(1)
  }
}

cleanupRooms()
