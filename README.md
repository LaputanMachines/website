# Personal Website and Blog

Source code for my personal website and blog.
Contains blog posts and links to all my side projects. 
Built using Ruby, Jekyll, HTML and CSS. 
This site serves as my personal "homepage" with individual projects branching out from this main trunk.

## Local Development Setup

You'll need to install Ruby, Bundler, and Jekyll to work with this project.

```bash
sudo apt-get install ruby-full build-essential zlib1g-dev
gem install bundler
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
gem install jekyll bundler
```

## Running Website Locally

You'll use the Bundler to run the site locally. 
Make sure you have installed Ruby, Bundler, Jekyll, etc before proceeding. 

```bash
bundle exec jekyll serve
```
