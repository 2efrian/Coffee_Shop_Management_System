#!/bin/bash

# Initialize a new Git repository
git init

# Add all files in the current directory to the repository
git add .

# Commit the changes with a meaningful commit message
git commit -m "Initial commit for Coffee Shop Management System"

# Add the remote repository URL
git remote add origin https://github.com/2efrian/Coffee_Shop_Management_System.git

# Push the changes to the remote repository and set the upstream tracking
git push -u origin master