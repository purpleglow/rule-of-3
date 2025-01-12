#!/bin/bash

# Create icons directory if it doesn't exist
mkdir -p icons

# Convert SVG to PNG first (using ImageMagick)
magick convert icon-1024.svg icon-1024.png

# Generate different sized icons from the base 1024x1024 icon
magick convert icon-1024.png -resize 180x180 icons/icon-180.png
magick convert icon-1024.png -resize 167x167 icons/icon-167.png
magick convert icon-1024.png -resize 152x152 icons/icon-152.png
magick convert icon-1024.png -resize 192x192 icons/icon-192.png
magick convert icon-1024.png -resize 512x512 icons/icon-512.png

# Clean up the temporary 1024px PNG
rm icon-1024.png 