# EmailExistenceChecker

SMTPサーバーを用いて特定のEmailが存在するかチェックするWebアプリケーション

## Usage
1. `config.yaml`に下記を設定
    - SMTPのドメイン（host）
    - メールアドレス（user）
    - アプリパスワード（pass）
1. `Makefile`が存在するディレクトリで下記コマンドを入力
    ```
    make serve
    ```
1. ` http://localhost:3000`に接続
1. 入力ボックスにメールアドレスを入力
1. ボタンを押下

<font color=Red>⚠️注意: 入力したアドレス宛に、実際にメールが送信されます</font>