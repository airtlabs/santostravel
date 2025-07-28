#!/bin/bash

# Santos Travel Setup Script
echo "🏝️  Setting up Santos Travel project..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
    echo "❗️ Please edit .env.local and add your Supabase credentials"
else
    echo "✅ .env.local already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your Supabase credentials"
echo "2. Follow SUPABASE_SETUP.md to set up your database"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "🚀 Happy coding!"
