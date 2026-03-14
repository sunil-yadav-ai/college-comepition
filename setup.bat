@echo off#!/bin/bash

































pauseecho.echo 🌐 Open browser at: http://localhost:3000echo.echo   npm run devecho   cd frontendecho Terminal 2 - Frontend:echo.echo   npm startecho   cd backendecho Terminal 1 - Backend:echo.echo 📝 To start the application:echo.echo ✅ Setup Complete!echo ==================================echo.call npm installcd ..\frontendecho Installing Frontend Dependencies...echo.call npm installcd backendecho Installing Backend Dependencies...echo.echo ==================================echo 🍔 FoodHub - Food Ordering SystemREM FoodHub - Quick Start Script for Windows
# FoodHub - Quick Start Script

echo "🍔 FoodHub - Food Ordering System"
echo "=================================="
echo ""

# Backend Setup
echo "Setting up Backend..."
cd backend
echo "Installing backend dependencies..."
npm install

# Frontend Setup
echo ""
echo "Setting up Frontend..."
cd ../frontend
echo "Installing frontend dependencies..."
npm install

echo ""
echo "=================================="
echo "✅ Setup Complete!"
echo ""
echo "📝 To start the application:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  npm start"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "🌐 Open browser at: http://localhost:3000"
echo ""
