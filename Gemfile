source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'jekyll'
gem 'kramdown', versions['kramdown']
gem 'rake'
gem 'nokogiri'
gem 'html-proofer'
gem 'coveralls', require: false