# [Personal Portfolio](http://bassi.li) 

### What is this project?
This is a repository which holds the code and assets for my personal website (more of a portfolio, really). 
Every front-facing project can seek refuge here; they are given their own dedicated page, thumbnail icon, 
and description paragraphs. Some even have live demos and links to play with. Others don't. I needed a place to hold all of my things. Anything from poetry to automated email checkers has a home here. 
It also helps document my personal developments (without this site, I would just have 'stuff' laying around).

### Installation Instructions
I can't think of a good reason 'why' you'd want to clone and toy with my personal portfolio 
(I could make something up, but it would probably involve the Prime Minister and a ransom). You can clone the 
repository using this: `https://github.com/FlatlanderWoman/portfolio.git` Then, you could pick appart my code and 
call me out on all of my CSS issues.

### File Structure
```
|-- assets (images, icons, and thumbnails)
|   |-- deusEx-icon.png (landing page icon)
|   |-- deuxEx-showcase1.png
|   |-- deuxEx-showcase2.png
|   |-- deuxEx-thumbnail.png (project banner)
|   |-- europa-showcase1.png
|   |-- europa-showcase2.png
|   |-- europa-thumbnail.png (project banner)
|   |-- laputanMachines-icon.png (landing page icon)
|   |-- laputanMachines-showcase1.png
|   |-- laputanMachines-showcase2.png
|   |-- laputanMachines-thumbnail.png (project banner)
|   |-- windowsCleaner-icon.png (landing page icon)
|   |-- windowsCleaner-thumbnail.png (project banner)
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
|-- deusExTimeline.html
|-- europa.html
|-- index.html
|-- laputanMachines.html
|-- windowsCleaner.html
```

### Commit Scheme
I use Clubhouse to manage this project, so the commit messages are formatted in a neat way (I think it's neat, for what it's worth). Behold, an example:
```
$ [ch##] [d|k] Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```
The first `[ch##]` is the story ID (e.g. `[ch69]`). The second `[d|k]` is an optional label for dying or killed stories. Stories are "dying" when they were completed, but reopened temporarily. A story is "killed" when it, and its parent project, was killed.

### Why is this readme so unprofessional?
You gotta let your hair down once and a while, you know. Of all my projects that could use a readme, my portfolio 
might be the best place to have a little fun.
