const socket = require('socket.io');

module.exports = {
    listen: function(server) {
        this.io = socket.listen(server, null);

        this.io.on('connection', (socket) => {
            console.log("user connect");
            socket.on("connectToBoard", (data) => {
                data.boardId;
            })
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
