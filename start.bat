@echo off
title NikahPlan Studio - Launcher
color 0A

:menu
cls
echo ======================================================================
echo                  NIKAHPLAN STUDIO - DEV LAUNCHER
echo ======================================================================
echo.
echo   Pilih opsi yang ingin dijalankan:
echo.
echo   [1] Jalankan Planner Studio Web   (apps/web   - http://localhost:3000)
echo   [2] Jalankan Undangan Digital     (apps/invite - http://localhost:3001)
echo   [3] Jalankan KEDUANYA Sekaligus   (Dual Window + Buka Browser Otomatis)
echo   [4] Jalankan Uji Type-Check       (Verifikasi TypeScript Seluruh Modul)
echo   [5] Generate Ulang Aset Gambar    (Avatar, Cover, QRIS, Logam Mulia)
echo   [6] Jalankan Ulang Setup / Install
echo   [0] Keluar
echo.
echo ======================================================================
set /p pilihan="Masukkan pilihan Anda [1-6/0]: "

if "%pilihan%"=="1" goto run_web
if "%pilihan%"=="2" goto run_invite
if "%pilihan%"=="3" goto run_all
if "%pilihan%"=="4" goto run_typecheck
if "%pilihan%"=="5" goto run_assets
if "%pilihan%"=="6" goto run_setup
if "%pilihan%"=="0" goto keluar

echo Pilihan tidak valid. Silakan coba lagi.
timeout /t 2 >nul
goto menu

:run_web
cls
echo Memulai NikahPlan Studio Web (Port 3000)...
start http://localhost:3000
call pnpm dev:web
goto menu

:run_invite
cls
echo Memulai Undangan Digital Tamu (Port 3001)...
start http://localhost:3001/v/arif-windi
call pnpm dev:invite
goto menu

:run_all
cls
echo Membuka Planner Studio di jendela baru...
start "NikahPlan - Planner Studio (Port 3000)" cmd /k "pnpm dev:web"
timeout /t 3 >nul

echo Membuka Undangan Digital di jendela baru...
start "NikahPlan - Undangan Digital (Port 3001)" cmd /k "pnpm dev:invite"
timeout /t 2 >nul

echo Membuka browser...
start http://localhost:3000
start http://localhost:3001/v/arif-windi

echo.
echo Kedua server sedang berjalan di jendela Command Prompt masing-masing!
echo Tekan sembarang tombol untuk kembali ke menu launcher.
pause >nul
goto menu

:run_typecheck
cls
echo Menjalankan Type-Check TypeScript di seluruh workspace...
call pnpm -r type-check
echo.
echo Selesai.
pause
goto menu

:run_assets
cls
echo Menghasilkan aset gambar SVG kustom ter-generate...
call node scripts/generate-assets.js
echo.
echo Aset berhasil diperbarui!
pause
goto menu

:run_setup
cls
call setup.bat
goto menu

:keluar
cls
echo Terima kasih telah menggunakan NikahPlan Studio!
timeout /t 2 >nul
exit /b 0

