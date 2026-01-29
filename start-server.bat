@echo off
REM I8 Ultra Smartwatch Landing Page - Local Development Server
REM This script starts a local server for testing

echo.
echo ============================================================
echo      I8 ULTRA SMARTWATCH - LOCAL DEVELOPMENT SERVER
echo ============================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

echo Starting server...
echo.
echo ============================================================
echo   Server is running at: http://localhost:8000
echo   Press Ctrl+C to stop the server
echo ============================================================
echo.
echo Open your browser and visit: http://localhost:8000
echo.

python -m http.server 8000

pause
