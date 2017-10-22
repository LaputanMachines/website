---
title: This Very Site
layout: post
category: project
excerpt: I had a website that looked very-okay. It was a static site meant to look
  fantastic for all the potential clientele who, at the time, funded my exploits as
  a stay-at-home video game player.
permalink: "/this-very-site/"
---

#### Motivations (i.e. Justifying Unnecessary Work)

I had a website that looked very-okay. It was a static site meant to look fantastic for all the potential clientele who, at the time, funded my exploits as a stay-at-home video game player. I also needed to buy things like shoes and low-calorie yoghurt. [You can still see the site]( https://flatlanderwoman.github.io/europa/), albeit without any of my personal branding plastered all over it. I converted it into a template site I can reuse in the future should I ever need to buy more low-calorie dairy.
 
My motivations have changed. Freelancing has become the lowest priority item I have; it shares a spot with the part of me wants to brush up on crocheting. Now I mainly document the minutiae of my life. Because that’s what people do, right? With this motivational shift, I’d need a platform with which to showcase my panoply of posts for posterity.

#### Preparations and Procedures

Besides alliterating unnecessarily in lengthy posts about my personal projects, I spent some time assessing my needs. I came up with a short list of requirements for this “new site:”

*	The site needs to be dynamic-ish, meaning I don’t need to fiddle with the site itself to post something
*	Every post needs to be either (1) automatically referenced or (2) manually permalinked based on my needs
*	Hosting needs to be dirt-cheap, or free, because there is no way a list of my dietary/programming accomplishments could generate enough revenue to pay for a pricey hosting service

With those points explicitly listed, I got to work. Point three prompted me to investigate [Jekyll]( https://jekyllrb.com/), a static site generator. It takes plain markup files and converts them into fully formatted posts. Then, there’s [Hugo](http://gohugo.io/), who claims to be the “world’s fastest framework for building websites.” It is also a static site generator. Finally, there’s [WordPress](https://en-ca.wordpress.org/), obviously. I wrote off WordPress because it would cost a non-zero amount of money to keep the thing afloat while static sites can be hosted on GitHub for free. That left Hugo and Jekyll (and if you looked at [this site’s GitHub repository](https://github.com/FlatlanderWoman/personalWebsite), you’d know which one I eventually settled on). Jekyll advertises free hosting with GitHub pages on their site—and both Hugo and Jekyll would’ve sufficed, so Jekyll was chosen as the underlying tech of this new website.

#### Installing Jekyll and Beginning Development

Development went smoothly: the [docs]( https://jekyllrb.com/docs/windows/) are incredibly straightforward, but I’ll summarize here. My Linux machine hasn’t been well taken care of, so the following procedures apply to you Windows users. You can follow a more detailed version of the following [here](https://github.com/FlatlanderWoman/jekyllTestSandbox/blob/master/README.md).

#### Installation and Project Creation

Ensure Ruby is installed, and update your gems. Afterwards, install the Jekyll-bundler gem. Once all that is done, you can call <code>Jekyll new personal_website</code> to initialize a Jekyll site. You then need to set up your <code>_config.yml</code> file with the following: the type of markdown you want to use, the <code>baseurl</code> you wish to use, and some optional paths you want to exclude. Again, a more detailed set of instructions can be found [here]( https://github.com/FlatlanderWoman/jekyllTestSandbox/blob/master/README.md).

Posts, written in markdown, are places in the <code>_posts</code> folder. Page layouts (markdown templates) care placed in the <code>_layouts</code> folder. Any code blocks you wish to modularize can be placed in the <code>_includes</code> folder, for future use. Once everything is done for, you can execute the following in your terminal to build your Jekyll site:

<code>$ bundle exec jekyll serve --watch</code>

If you’re running this locally, you can define the <code>--baseurl</code> flag in the Jekyll call. The command will generate a <code>.site</code> folder: your generated website.

#### Boring-Task Automation and CIs 

The final task was to get automated tests to run on a CI and automate any boring tasks. One such boring task was running the build script. So <code>build.sh</code> in the root directory was made to simplify my life while building the site locally. Remotely, however, was a different story. The site itself runs off GitHub pages, and the Travis CI executes <code>cibuild </code>, which has three lines.

The first line halts the script upon encountering an error. The second line is that build command I just mentioned. The <code>baseurl</code> is the url of my website. The reason it is defined here, and not in <code>_config.yml</code> is because I encountered an issue with the Jekyll RSS feed generator I’m using: Jekyll-Feed. URLs would look funny (e.g. https://bassi.li/https://bassi.li/my-super-cool-post). The final line is the command to run [HTMLproofer]( https://github.com/gjtorikian/html-proofer), a super useful tool for people who generate HTML files; it validates your HTML output.

#### Conclusion

This project took about four months in total, mainly because I rarely dedicated any time to work on it. It was only slightly higher on my priority list than freelancing. But it got done. I took time to document my procedures in the [repository Wiki](https://github.com/FlatlanderWoman/personalWebsite/wiki) as well as the [Jekyll Test Sandbox](https://github.com/FlatlanderWoman/jekyllTestSandbox) I made before touching my site’s codebase. 

Now that this site is done, I can return to replaying the Metal Gear games while eating yoghurt (I lied about the low-calorie part).