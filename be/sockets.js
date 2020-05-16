const socket = require('socket.io');

module.exports = {
    listen: function(server) {
        this.io = socket.listen(server);

        this.io.on('connection', (socket) => {
            let groupId = socket.handshake.query.groupId;
            socket.join(groupId);
            socket.emit('connectionAck', 'zdarova ebat');

            socket.on('addColumn', data => {
                this.io.to(groupId).emit('addColumn', data);
            })
        });

        return this.io;
    }
};
