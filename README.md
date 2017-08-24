# Portfolio

## Table of Contents
* [Setup Instructions](#setup-instructions)
  * [Installing Jekyll and Building Locally](#installing-jekyll-and-building-locally)
* [File Structure](#file-structure)
* [Miscellaneous Minutiae](#miscellaneous-minutiae)
  * [Documentation and Commit Syntax](#documentation-and-commit-syntax)

## Setup Instructions
### Installing Jekyll and Building Locally
Before continuing, you must ensure that Jekyll and Ruby are installed. Execute the following in your BASH terminal before attempting to run the site locally:
```
$ sudo apt-get update -y && sudo apt-get upgrade -y
$ sudo apt-get update -y && sudo apt-get upgrade -y
$ sudo apt-get update && sudo apt-get install ruby2.3 ruby2.3-dev build-essential
$ sudo gem update
$ sudo gem install jekyll bundler
$ jekyll -v
```
If Jekyll was successfully installed, a version number should've been printed out. Now that everything is correctly installed, you can run a local build of the site by executing the following into your BASH terminal:
```
$ bundle exec jekyll serve --watch --baseurl ""
```
This will build and run the site locally on port 4000 (i.e. `localhost:4000`). Visit said URL to view the site. **Note:** `bundle install/exec` will fail/crash when trying to bundle on Windows because of the nokogiri gem. 

## File Structure
Excluding miscellaneous documents (such as this one, the following tree outlines the project's file structure:
```
.
├── _includes                              # UI/element components (e.g. navigation)
|   └── ...                                # Header, footer, navigation bar, etc
├── _layouts                               # Defined template markup (e.g. main)
│   └──  main.html                         # Main markup for index/blog/projects pages
├── _posts                                 # Raw posts written in markdown (e.g. 2017-09-18-test-post.md)
│   └── ...                                # List of posts, written in markdown
├── _sites                                 # Compiled site, built with the above rules
│   └── ...                                # Final (i.e. compiled) site markup and styles
├── assets                                 # Images, icons, and the like (e.g. image-logo.png)
│   ├── image-logo.png                     # The site's logo image (i.e. favicon)
│   ├── image-site-banner.png              # The site's banner image (i.e. og-image)
│   └── ...                                # Any other project/showcase images
├── css                                    # Stylesheets for every UI element
|   ├── footer.css                         # The footer element
|   ├── header.css                         # The navigation bar/header element
|   ├── main.css                           # Overall/default stylesheet
│   ├── modal.css                          # Rules for the modal/image carousel element
│   └── normalize.css                      # A CSS normalizer
├── js                                     # Element-specific scripts
│   └── ...                                # Current year variable, modal functionality, etc
├── script                                 # Automated installation scripts
│   ├── cibuild                            # Travis CI build configuration 
│   └── setup.sh                           # Initial Jekyll setup script
├── test                                   # Integration, unit, and functional tests
│   └── test_helper.rb                     # Coveralls setup script
├── _config.yml                            # Jekyll's YAML configuration file
├── blog.html                              # Blog page's markup, using the blog layout
└── index.html                             # Landing/main page's markup
```

## Miscellaneous Minutiae
### Documentation and Commit Syntax
Commits should begin with a capital letter and should never end with a period. A good example of a commit message would be `$ [ch##] [d|k] This is a commit message`. While periods at the ends of commit messages is _technically_ fine, it looks aesthetically displeasing in GitHub. Using a `[ch##]` labels the commit as a contribution to a ClubHouse ticket. Using a `[d|k]` indicates whether the contribution was towards a _dead_ ticket (i.e. one that was already resolves) or a _killed_ ticket (i.e. one that was already closed/archived).

---

[![GitHub version](https://badge.fury.io/gh/flatlanderwoman%2Fportfolio.svg)](https://badge.fury.io/gh/flatlanderwoman%2Fportfolio) [![Coverage Status](https://coveralls.io/repos/github/FlatlanderWoman/portfolio/badge.svg?branch=master)](https://coveralls.io/github/FlatlanderWoman/portfolio?branch=master) [![Build Status](https://travis-ci.org/FlatlanderWoman/portfolio.svg?branch=master)](https://travis-ci.org/FlatlanderWoman/portfolio) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.png?v=103)](https://opensource.org/licenses/mit-license.php)
