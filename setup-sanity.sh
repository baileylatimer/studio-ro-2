#!/bin/bash

echo "Setting up Sanity Studio..."

# Navigate to sanity-studio directory
cd sanity-studio

# Install dependencies
echo "Installing Sanity dependencies..."
npm install

# Deploy Sanity Studio
echo "Deploying Sanity Studio..."
echo "You'll be prompted to choose a hostname for your studio (e.g., studio-ro)"
sanity deploy

echo "Setup complete!"
echo "Your Sanity Studio will be available at: https://[your-chosen-name].sanity.studio"
echo "You can also run it locally with: npm run sanity"
