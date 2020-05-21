const socketIo = require('socket.io');
let listenedRoomsIds = [];

module.exports = {    
    listen: function(server) {
        this.io = socketIo.listen(server, null);

        this.io.on('connection', (socket) => {
            let previousId;
            const joinRoom = (currentId) => {
              socket.leave(previousId);
              socket.join(currentId);
              previousId = currentId;
            };
            console.log(socket);
            console.log("user connect");
            socket.on("connect to board", (data) => {
                console.log("connectToBoard accepted with id:" + data.boardId);
                data.boardId;
                listenedRoomsIds.push(data.boardId);
                joinRoom(data.boardId);
            });
            
            socket.on("board refresh", (data) => {
                this.io.to(data.boardId).emit("board changed", data);
                console.log("bord changed accepted with id:" + data.boardId);
                if (listenedRoomsIds.includes(data.boardId)){
                    socket.to(`boardRoom:${data.boardId}`).emit("board changed", data);
                } 
            });
            
        });

        return this.io;
    }
};
