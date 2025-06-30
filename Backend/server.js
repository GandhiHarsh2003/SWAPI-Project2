import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 3000;
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/SWAPI/planets', async(req, res) => {
    res.json("It is working")
})