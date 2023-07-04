import express from 'express';
import cors from 'cors';
import * as path from 'path';

const app = express();

const corsOptions = {
    origin: '*',
};

app.use(
    '/assets',
    express.static(path.join(__dirname, 'assets')),
);

app.options('/api', cors(corsOptions));
app.use(cors(corsOptions));

app.get('/api', cors(corsOptions), (req, res) => {
    res.setHeader(
        'Cache-Control',
        's-max-age=1, stale-while-revalidate',
    );
    res.setHeader('Content-Type', 'application/json');
    res.send({ message: 'Welcome to rae-chat-api!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

export default app;
