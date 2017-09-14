source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'rake'
gem 'jekyll'
gem 'nokogiri'
gem 'jekyll-feed'
gem 'github-pages'
gem 'html-proofer'
gem 'jekyll-seo-tag'
gem 'coveralls', require: false
gem 'kramdown', versions['kramdown']
gem 'jekyll-admin', group: :jekyll_plugins
