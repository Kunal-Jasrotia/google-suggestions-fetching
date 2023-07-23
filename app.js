const express = require('express');
const path = require('path');
const fetchData = require('./fetchData')
const app = express();
const fs = require('fs/promises')
app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/autosuggestions', async (req, res) => {
    let { keywords } = req.body
    keywords = keywords.split('\n')
    console.log(keywords);
    let allSuggestions = await fetchData(keywords)
    await fs.writeFile('output.json', JSON.stringify(allSuggestions))
    res.send('done')
})

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});

