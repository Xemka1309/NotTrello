const socketIo = require('socket.io');
let listenedRoomsIds = [];

module.exports = {    
    listen: function(server) {
        this.io = socketIo.listen(server, null);

        this.io.on('connection', (socket) => {
            socket.join("hueputalo");
            console.log(socket);
            console.log("user connect");
            socket.on("connect to board", (data) => {
                console.log("connectToBoard accepted with id:" + data.boardId);
                data.boardId;
                listenedRoomsIds.push(data.boardId);
            });
            
            socket.on("board refresh", (data) => {
                socket.emit("board changed", data);
                socket.emit("board changed", data);
                console.log("bord changed accepted with id:" + data.boardId);
                if (listenedRoomsIds.includes(data.boardId)){
                    socket.to(`boardRoom:${data.boardId}`).emit("board changed", data);
                }
            });
            //socket.to()
            //socket.on("bordRoom", (data) => {
            //    socket.to("Board")
            //});
            //socket.join(groupId);
            //socket.emit('connectionAck', 'zdarova ebat');

            //socket.on('addColumn', data => {
            //    this.io.to(groupId).emit('addColumn', data);
            //})
            //socket.on('getBoard', data => {
            //    this.io.to()
            //})
        });

        return this.io;
    }
};
