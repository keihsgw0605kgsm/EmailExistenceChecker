const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('.')); // HTMLファイルをサーブするため

app.post('/verify-email', (req, res) => {
    const email = req.body.email;
    console.log('Verifying email:', email);
    // ここでメールの検証ロジックを追加
    res.json({ message: 'Verification sent to ' + email });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
