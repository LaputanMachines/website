#!/bin/bash

sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get update && sudo apt-get install ruby2.3 ruby2.3-dev build-essential
sudo gem update
sudo gem install jekyll bundler
jekyll -v