#!/bin/bash

# Loop through all files in the /api directory and its subdirectories
find ./src/api/endpoints -type f | while read -r file; do
    # Use a temporary file to prepend to each file
    {
        echo "/* eslint-disable @typescript-eslint/no-explicit-any */"
        cat "$file"
    } > "$file.tmp" && mv "$file.tmp" "$file"
done

echo "Prepended 'hello' to all files in /api and its subfolders."
