# [Personal Portfolio](http://bassi.li) 

## Project Overview
### Repository Contents
This is a repository which holds the code and assets for my personal website (more of a portfolio, really). 
Every front-facing project can seek refuge here; they are given their own dedicated page, thumbnail icon, 
and description paragraphs. Some even have live demos and links to play with. Others don't. 
### Project Motivations
I needed a place to hold all of my things. Anything from poetry to automated email checkers has a home here. 
It also helps document my personal developments (without this site, I would just have 'stuff' laying around).

## Setup Instructions
### Project Installation
I can't think of a good reason 'why' you'd want to clone and toy with my personal portfolio 
(I could make something up, but it would probably involve the Prime Minister and a ransom). You can clone the 
repository using this: `https://github.com/FlatlanderWoman/portfolio.git` Then, you could pick appart my code and 
call me out on all of my CSS issues.

## Contribution Instructions
### File Structure
```
|-- assets (images, icons, and thumbnails)
|   |-- projectImage-icon.png (landing page icon)
|   |-- projectImage-showcase.png (project page screenshot)
|   |-- projectImage-thumbnail.png (banner image)
|-- css (UI element styles)
|   |-- animate.css (fadeIn animation)
|   |-- footer.css
|   |-- general.css
|   |-- header.css
|   |-- modal.css (the image carousel)
|   |-- normalize.css 
|   |-- projects.css
|-- js (UI element scripts)
|   |-- moment-timezone.js (timezone library)
|   |-- moment.js (time format library)
|   |-- scripts.js
|   |-- wow.min.js
|-- README.md (this very file)
|-- index.html
|-- projectName.html (individual project page)
```
### Commit Scheme
I use Clubhouse to manage this project, so the commit messages are formatted in a neat way (I think it's neat, for what it's worth). Behold, an example:
```
$ [ch##] [d|k] Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```
The first `[ch##]` is the story ID (e.g. `[ch69]`). The second `[d|k]` is an optional label for dying or killed stories. Stories are "dying" when they were completed, but reopened temporarily. A story is "killed" when it, and its parent project, was killed.

## Miscellaneous Minutiae
### Why is this readme so unprofessional?
You gotta let your hair down once and a while, you know. Of all my projects that could use a readme, my portfolio 
might be the best place to have a little fun.
