# Portfolio & Blog

* [Setup Instructions](#setup-instructions)
  * [Installing Jekyll and Building Locally](#installing-jekyll-and-building-locally)

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
$ jekyll serve --watch --baseurl ""
```
This will build and run the site locally on port 4000 (i.e. `localhost:4000`). Visit said URL to view the site.
