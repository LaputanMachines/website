---
title: Visual Accessibility In Software 
author: Michael Bassili
layout: post
tags: Programming
category: Blog
favourite: 'false'
---

**TL;DR** *please design your software with the colour blind and visibly impaired in mind. A good tip is to design in grayscale and work upwards from there. That way, a partially-blind person with monochromacy can reasonably navigate your software.*

## I: Cities: Skylines Colour Issues

My grandest and most esoteric hobby is transit management in the game Cities: Skylines[^1]. I spend about five hours building and populating a large urban city center. Then, when traffic becomes a problem, I begin the process of introducing free and efficient public transit systems throughout. I find it cathartic watching my simulated civilians get to work using nothing but a bike, two legs, and a transit pass. Where my hobby encounters issues, however, is in the colour department. 

[^1]: I play so much CS that a large portion of my video game publication, [Mike's Gaming Trove](https://mikesgamingtrove.ca), comprises CS-related content. For examples of the work I've done with CS, check out [this image gallery from one of my more polished cities](https://mikesgamingtrove.ca/extras/2019/12/21/video-game-photography-1.html) on the MGT website.

<img id="aboutPhoto" src="{{site.baseurl}}/assets/accessibility-testing/cs-top-down-city.png" alt="Screenshot of a dense urban city rendered in-game from a top-down perspective.">
<figcaption>Fig.1 A sample of the kinds of cities I build for fun.</figcaption>

You have to zone land in Cities: Skylines in order for buildings to be constructed. You have a selection of various zones ranging from low-density residential, to offices, to high-density commercial, and everything in between. Each zone is assigned its very own colour. And, that right there is the problem.

<img id="aboutPhoto" src="{{site.baseurl}}/assets/accessibility-testing/cs-zoning-colours.jpg" alt="Screenshot from the game with a panel highlighting the various colours available for use in zoning.">
<figcaption>Fig.2 The various zone colours to choose from.</figcaption>

I am [red-green colour blind](https://en.wikipedia.org/wiki/Color_blindness#Red%E2%80%93green_color_blindness), so I struggle to make out the subtle differences in the residential zones. As this is my hobby, I found myself frustrated on the daily. I'd turn my back to find my carefully planned highrise district laden with suburban homes. A terrible shock! This got me thinking about visual accessibility in video games (and software in general). As a software developer myself, I thought it fun to share my insight and tips for making your software easy-to-use for the visually impaired[^2].

[^2]: I think it's a little much for me to brand myself as "visually impaired," but by definition, my vision _is_ impaired. In any case, we should aim to develop software that the blindest-of-the-blind can reasonably use.

## II: Tips For Visual Accessibility

I've compiled this list of tips and tricks for colour bling accessibility from various technical sources as well as my own persona &amp; professional experiences.

### II.I: Don't Rely Solely On Colour

The biggest mistake you can make when designing your software is to rely _solely_ on colour to differentiate items. If you make your background red and your foreground elements green, you have just inconvenienced about 8% of your male audience, 0.5% of your male audience[^3]. 

[^3]: These numbers were taken from the [Wikipedia article on colour blindness](https://en.wikipedia.org/wiki/Color_blindness). It notes that these percentages are of people from European descent. I had trouble finding concrete numbers around the world, so let's say you're a North American software developer who primarily markets their software to peoples in North America. 

I think there are two good solutions to this problem. The first is to design your applications in black-and-white. Ask yourself: "Can I use my software if I cannot see _any colour_?" If you're ore pro-active, you can implement colour-blind modes for your software. Video games sometimes include colour-blind modes, but it's dependent on the developer and their sensibilities. The _best_ solution is to do what Trello does: show shapes and patterns on coloured items. This is brilliant. If you aren't colour blind, you can use Trello like everybody else. If you _are_, you can use the shapes and patterns on the UI elements to differentiate them. 

### II.II: Reduce Visual Clutter

Another important factor many UI designers fumble with is information density. I play video games for fun. I also like spreadsheets. But, when playing a game, I hope to never interact with a user interface that borrows heavily from spreadsheet design. More UI elements means more colours for each element. More colours means more of a risk a colour-blind user will become inconvenienced. It's also a usability issue. Simpler UI designs are almost always easier to understand and navigate than more cluttered ones[^4]. 

[^4]: That doesn't mean sacrificing on complexity. You can make something feature-rich and complex look very simple. That's pretty much the art of UI design.

## III: Personal Preferences

Personally, I didn't even bother with colour when designing my site. I liked the way the black-and-white draft looked so much that it became the final colour scheme for my website. The only colours I rely on are _tags_, which are unimportant AND are written in pure English. If you can't tell the difference between the coloured tags, you can read off the name of the tag instead. My video game publication, [Mike's Gaming Trove](https://mikesgamingtrove.ca), uses colours more explicitly. I did my best to ensure that all coloured elements weren't critical. For example: links are coloured red, but they're also underlined. If you can' tell the difference between red and dark brown (like myself), you can rely on the underline. Simple decisions like these go a long way to making software accessible to all.

---

{% include footnotes-message.html %}