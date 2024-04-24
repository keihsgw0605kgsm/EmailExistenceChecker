const nodemailer = require('nodemailer');
const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('.'));

// YAMLファイルから設定を読み込み、それを返す関数
function loadConfig(path) {
  try {
    const fileContents = fs.readFileSync(path, 'utf8');
    const config = yaml.load(fileContents);
    return config;
  } catch (e) {
    console.error('Failed to load config file:', e);
    return null;  // エラーが発生した場合はnullを返す
  }
}
// 設定ファイルからSMTP設定を読み込む
const config = loadConfig('./config.yml');
if (!config) {
  console.error('Failed to load SMTP configuration');
  process.exit(1); // 設定が読み込めない場合はアプリケーションを終了
}

const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: 587,
    secure: false, // true の場合は、ポート465を使用
    auth: {
        user: config.smtp.auth.user,
        pass: config.smtp.auth.pass
    }
});

app.post('/verify_email', (req, res) => {
    const email = req.body.email;
    transporter.verify((error, success) => {
        if (error) {
            console.error('SMTP connection error:', error);
            res.status(500).send('SMTP server connection error.');
        } else {
            console.log('Connection to SMTP server established successfully.');
            // メールアドレスの存在確認
            transporter.sendMail({
                from: config.smtp.auth.user, // 送信者アドレス
                to: email, // 受信者アドレス
                subject: 'Hello', // 任意の件名
            }, (err, info) => {
                if (err) {
                    console.error('Email not accepted for delivery:', err);
                    res.status(400).send('Email address not valid.');
                } else {
                    console.log('Email accepted for delivery:', info);
                    res.send('Email address is valid.');
                }
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
