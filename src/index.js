const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is happily running at http://localhost:${PORT}`);
});

const url = './src/public';
server.use(express.static(url));
