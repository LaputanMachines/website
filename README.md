# Personal Website
The source code and documentation for my personal website and blog. Personal projects, blog posts, thoughts, etc are all aggregated here. See the [Wiki](https://github.com/FlatlanderWoman/portfolio/wiki) for more information.

## Table of Contents
* [Setup Instructions](#setup-instructions)
  * [Installing Jekyll and Building Locally](#installing-jekyll-and-building-locally)

## Setup Instructions
### Installing Jekyll and Building Locally
Run `setup.sh`. If Jekyll was successfully installed, a version number should've been printed out. Now that everything is correctly installed, you can run a local build of the site by executing the following into your BASH terminal:
```
$ ./build.sh
```
This will build and run the site locally on port 4000 (i.e. `localhost:4000`). Visit said URL to view the site. **Note:** `bundle install/exec` will fail/crash when trying to bundle on Windows because of the nokogiri gem. 

---

[![Code Climate](https://codeclimate.com/github/FlatlanderWoman/portfolio.svg)](https://codeclimate.com/github/FlatlanderWoman/portfolio) [![Build Status](https://travis-ci.org/FlatlanderWoman/personalWebsite.svg?branch=master)](https://travis-ci.org/FlatlanderWoman/personalWebsite) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
