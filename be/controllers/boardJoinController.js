const boardService = require("../services/boardJoinService");
const ReverseMd5 = require('reverse-md5');

const reverseMd5 = ReverseMd5({
    lettersUpper: false,
    lettersLower: false,
    numbers: true,
    special: false,
    whitespace: false,
    maxLen: 5
});

exports.join = function(request, response) {
    const userId = request.decoded.id;
    const hashBoardId = request.params.str;
    const boardId = reverseMd5(hashBoardId).str;
    boardService.join(boardId, userId)
        .then(result => {
            response.status(200);
            response.send(boardId);
        })
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
        });
};
