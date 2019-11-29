---
title: Making Static Sites Dynamic With Jekyll, TravisCI, and Cron Jobs
author: Michael Bassili
layout: post
tags: Programming
category: Blog
favourite: 'true'
---

## I: Introduction, Motivation, Background

> “There is no dignity quite so impressive, and no independence quite so important, as living within your means.” &mdash;Calvin Coolidge

As a "starving-artist," I don't really like spending money unnecessarily. So, when it came time to create a [website to host my weekly ramblings](https://mikesgamingtrove.ca), I scoffed when faced with potential hosting costs. That's when I remembered that this is 2019, and there are an abundance of tech out there built with people like me in mind! (Not really, but I benefited from their existence anyways, so whatever.)

## II: The Problem Statement

> “I have learned to seek my happiness by limiting my desires, rather than in attempting to satisfy them.” &mdash;John Stuart Mill

The problem was as follows: **"I want a dynamic website, but I don't want to pay for hosting.** I want some dynamic elements, but I'm willing to compromise for the sake of frugality. My content will be written work published (roughly) once a week, and it will be categorized by various terms and dates. It should use HTTPS, for obvious reasons, and it shouldn't be hard to update. If I want to push some changes to the backend, I shouldn't have to struggle too much.

## III: Pretending To Be Dynamic

> "When I first got into technology I didn't really understand what open source was. Once I started writing software, I realized how important this would be." &mdash;Matt Mullenweg

There are seemingly limitless options out there for dynamic websites, but I had my eyes on a single, static-only site technology: [Jekyll](https://jekyllrb.com/docs/). The Jekyll backend has been [my personal website's go-to tech](https://github.com/FlatlanderWoman/personalWebsite) for years now, and I've been nothing but satisfied. But, Jekyll is a static site generator, and I crave dynamism in my newly-brainstormed side project! I really _really_ like Jekyll, but I refuse to sacrifice the benefits and possibilities offered up by having a dynamic website. That's when it hit me!

<img id="aboutPhoto" src="{{site.baseurl}}/assets/dynamic-site/product-pipeline.png" alt="Picture of the flow of the project I was developing using the Jekyll technology.">
<figcaption>Fig.1 Proposed product pipeline for my new side-project.</figcaption>

What if I could just rebuild the static website every so often? That would emulate the kind of dynamics I desire. GitHub already hosts static websites for free via [GitHub Pages](https://pages.github.com/), so all I'd need to do is schedule some sort of cron job every so often. The site would be rebuilt, and I could implement some pretend-dynamism into the site. Maybe in the form of a "Daily Random Post" button or something, inspired by Wikipedia's [Random Article](https://en.wikipedia.org/wiki/Special:Random) button/link. That would bring my hosting costs down to literally nothing. But, I'd need a CI environment that supports cron jobs, and I still refuse to pay for any sort of third-party hosting.

## IV: Perks Of Being Open Source

> "Certainly there's a phenomenon around open source. You know free software will be a vibrant area. There will be a lot of neat things that get done there." &mdash;Bill Gates

So, it turns our that the [TravisCI](https://travis-ci.org/) service has a free plan, but only for open source projects. I'm not selling a product, nor do I care whether people take and modify my _video game blog_, so I had no quarrels with going open source. That opened me up to free CIs and the world of cron jobs! Funny enough, GitHub Pages actually [allows CIs to push to a GitHub Pages website](https://docs.travis-ci.com/user/deployment/pages/) super easily, so I went ahead and deployed the static site through a CI. 

```html
<!-- Escape chars needed so that Jekyll doesn't try to execute this code snippet -->
{\% assign random = site.time | date: "%S%N" | modulo: site.categories.articles.size %\}
<div><a href="{{ site.categories.articles[random].url }}"><b>Daily Recommended Post</b></a></div>
```

The final step was the fake-dynamism. Let's say I choose a random Jekyll post. If I were deploying the site statically, that post would be the same until I pushed a change to production and regenerated the entire site. With cron jobs, however, I can regenerate the site every day! So, instead of having a "Random Post" button, I can add a "Random _Daily_ Post"" button! Close enough to my dreams without me having to spend a single penny on CI environments or hosting!

### IV.I: Securing My Pseudo-Dynamic Site

The easiest part of this whole debacle was securing the site with HTTPS. [Cloudflare](https://www.cloudflare.com/) has a free tier which allows you to access its security and analytics features. Simply [update some DNS records](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/) and you're done! The site's traffic is routed through Cloudflare, secured, and served back to the user. Easy, free HTTPS. The little lock icon in your address bar (both on this site and Mike's Gaming Trove's site) is free, and thanks to Cloudflare. 

Cloudflare also allows for things like minifying JS and CSS, and global analytic and visitor tracking, so it's also useful for user engagement polling. For a free service, Cloudflare really exceeded my expectations.

### IV.II: Domain Name Registration

GitHub Pages supports [custom domains](https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site) right out of the box. It was as simple as adding a `CNAME` file to the root directory. In terms of money spent, a CAD$20 domain was fine, as it's a yearly cost, and it's not very large. Monthly hosting charges were my main concern, so 10/12 = CAD$1.67 a month is more than satisfactory.

## V: Summary, Final Result

> "Finding creative ways to giftwrap inexpensively can be done, with a little thought and imagination. There are many materials in your own home right in front of your nose" &mdash;Abigail Beal

The site itself can be found here: [Mike's Gaming Trove](https://mikesgamingtrove.ca). It's built once a day and pushed to GitHub Pages. I pay for the domain, but that's it. The site it totally open source. There are some dynamic elements that I'm able to use now that the site is pseudo-dynamic. Unlike this very site, Mike's Gaming Trove is not static and still; there's some element of daily dynamism in there. So, while both this site and MGT are built with Jekyll, MGT is much more flexible in terms of content delivery than this site. (That's fine too, since this site sees far fewer updates than MGT, which tries to post weekly.) In summary:

- Built site with Jekyll, hosted built static site for free using GitHub pages
- Use TravisCI to build and deploy the static Jekyll site to GitHub Pages
- Set up a daily cron job that rebuild the entire site, allowing for vars that can change every day
- Secure the site through Cloudflare's free tier of protection, access to free analytics
- Obtain a domain and point it to the built GitHub Pages site

In all, I spend CAD$1.67 a month for a domain, and CAD$0 for hosting and continuous integration. A steal considering what's happening behind the scenes. A CI builds my site every day and deploys it to a service that serves it to users, through a middleman that secures the session and tracks all sorts of analytics. While this isn't my most technically impressive achievement, the fact that I can make pseudo-dynamic websites with Jekyll makes me really happy. Hopefully somebody will be inspired by this to further iterate on the idea.
