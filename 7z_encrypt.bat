@echo off
setlocal

:: 7-Zipの実行ファイルパス（インストール先に応じて調整してください）
set "SEVENZIP=C:\Program Files\7-Zip\7z.exe"

:: 設定：暗号化パスワード
set "PASSWORD=SecretPassword"

:: ドラッグ＆ドロップされた対象がない場合は終了
if "%~1"=="" (
    echo [エラー] ファイルまたはフォルダをこのバッチファイルにドラッグ＆ドロップしてください。
    pause
    exit /b
)

:loop
if "%~1"=="" goto end

:: 入力パスの情報を取得
set "TARGET_PATH=%~1"
set "TARGET_DIR=%~dp1"
set "TARGET_NAME=%~n1"

:: 出力する7zファイルのパス（元のファイル/フォルダと同じ場所）
set "OUTPUT_FILE=%TARGET_DIR%%TARGET_NAME%.7z"

echo 圧縮処理中: "%TARGET_NAME%" ...

:: 7-Zipで圧縮実行 (-mhe=on でファイル名も暗号化)
"%SEVENZIP%" a "%OUTPUT_FILE%" "%TARGET_PATH%" -p%PASSWORD% -mhe=on

shift
goto loop

:end
echo.
echo すべての処理が完了しました。
pause
