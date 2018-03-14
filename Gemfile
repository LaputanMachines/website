source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'rake'
gem 'jekyll'
gem 'jekyll-feed'
gem 'jekyll-sitemap'
gem 'jekyll-paginate'
gem 'coveralls', require: false
gem 'kramdown', versions['kramdown']
