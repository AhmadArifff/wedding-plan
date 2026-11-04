@echo off
title NikahPlan Studio - Setup Monorepo
color 0B
cls

echo ======================================================================
echo           NIKAHPLAN STUDIO - SETUP MONOREPO & ASSET GENERATOR
echo ======================================================================
echo.

:: 1. Periksa Node.js
echo [1/4] Memeriksa instalasi Node.js...
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    color 0C
    echo [ERROR] Node.js tidak ditemukan di sistem!
    echo Silakan install Node.js versi 18 atau lebih baru dari https://nodejs.org
    echo.
    pause
    exit /b 1
)
node -v
echo [OK] Node.js terdeteksi.
echo.

:: 2. Periksa / Install pnpm
echo [2/4] Memeriksa package manager pnpm...
where pnpm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [INFO] pnpm belum terpasang secara global. Memasang pnpm via npm...
    call npm install -g pnpm
    if %ERRORLEVEL% neq 0 (
        color 0C
        echo [ERROR] Gagal memasang pnpm secara otomatis.
        pause
        exit /b 1
    )
)
call pnpm -v
echo [OK] pnpm siap digunakan.
echo.

:: 3. Install Dependensi Monorepo
echo [3/4] Menginstall seluruh dependensi Monorepo (apps/* dan packages/*)...
echo Proses ini membutuhkan koneksi internet. Mohon tunggu...
echo.
call pnpm install
if %ERRORLEVEL% neq 0 (
    color 0C
    echo [ERROR] Gagal menginstall dependensi pnpm.
    pause
    exit /b 1
)
echo [OK] Seluruh dependensi workspace terinstall dengan sukses!
echo.

:: 4. Generate Aset Kustom & Type-Check
echo [4/4] Menjalankan generator aset gambar kustom & verifikasi...
call node scripts/generate-assets.js
if %ERRORLEVEL% neq 0 (
    color 0E
    echo [WARN] Generator aset mengalami kendala, melanjutkan proses...
)

echo.
echo Menjalankan verifikasi tipe TypeScript...
call pnpm -r type-check
if %ERRORLEVEL% neq 0 (
    color 0E
    echo [WARN] Ada peringatan type-check.
) else (
    echo [OK] Seluruh packages dan apps lolos verifikasi 100 persen!
)

echo.
echo ======================================================================
echo                  SETUP SELESAI DENGAN SUKSES!
echo ======================================================================
echo.
echo Sekarang Anda dapat menjalankan aplikasi menggunakan:
echo   - Dobel klik "start.bat"       (Menu interaktif lengkap)
echo   - Dobel klik "start-all.bat"   (Jalankan Planner + Undangan bersamaan)
echo   - Dobel klik "start-web.bat"   (Jalankan Planner Studio di port 3000)
echo   - Dobel klik "start-invite.bat" (Jalankan Undangan Tamu di port 3001)
echo.
pause
