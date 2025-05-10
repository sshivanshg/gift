#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    
    # Install serve if not already installed
    if ! command -v serve &> /dev/null; then
        echo "Installing serve..."
        npm install -g serve
    fi
    
    # Serve the application
    echo "Starting server..."
    serve -s build
else
    echo "Build failed!"
    exit 1
fi 