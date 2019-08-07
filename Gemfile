source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'rake'
gem 'jekyll-feed'
gem 'http_parser'
gem 'eventmachine'
gem 'github-pages'
gem 'jekyll-watch'
gem 'json', :git => 'https://github.com/flori/json.git'
gem 'jekyll-sitemap'
gem 'coveralls', require: false
gem 'kramdown', versions['kramdown']