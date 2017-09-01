# Portfolio
The source code and documentation for my personal website and blog. Personal projects, blog posts, thoughts, etc are all aggregated here. See the [Wiki](https://github.com/FlatlanderWoman/portfolio/wiki) for more information.

## Table of Contents
* [Setup Instructions](#setup-instructions)
  * [Installing Jekyll and Building Locally](#installing-jekyll-and-building-locally)
* [Miscellaneous Minutiae](#miscellaneous-minutiae)
  * [Documentation and Commit Syntax](#documentation-and-commit-syntax)

## Setup Instructions
### Installing Jekyll and Building Locally
If Jekyll was successfully installed, a version number should've been printed out. Now that everything is correctly installed, you can run a local build of the site by executing the following into your BASH terminal:
```
$ bundle exec jekyll serve --watch --baseurl ""
```
This will build and run the site locally on port 4000 (i.e. `localhost:4000`). Visit said URL to view the site. **Note:** `bundle install/exec` will fail/crash when trying to bundle on Windows because of the nokogiri gem. 

## Miscellaneous Minutiae
### Documentation and Commit Syntax
Commits should begin with a capital letter and should never end with a period. A good example of a commit message would be `$ [ch##] [d|k] This is a commit message`. While periods at the ends of commit messages is _technically_ fine, it looks aesthetically displeasing in GitHub. Using a `[ch##]` labels the commit as a contribution to a ClubHouse ticket. Using a `[d|k]` indicates whether the contribution was towards a _dead_ ticket (i.e. one that was already resolved) or a _killed_ ticket (i.e. one that was already closed/archived).

---

[![Code Climate](https://codeclimate.com/github/FlatlanderWoman/portfolio.svg)](https://codeclimate.com/github/FlatlanderWoman/portfolio) [![Coverage Status](https://coveralls.io/repos/github/FlatlanderWoman/portfolio/badge.svg?branch=master)](https://coveralls.io/github/FlatlanderWoman/portfolio?branch=master) [![Build Status](https://travis-ci.org/FlatlanderWoman/portfolio.svg?branch=master)](https://travis-ci.org/FlatlanderWoman/portfolio) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.png?v=103)](https://opensource.org/licenses/mit-license.php)
