---
layout: post
title: "The Rise of Highly Personal Software"
tags: [AI, Programming, Development]
author: admin
---

I think there's a strong desire for uniquely personalized software permeating the market these days, spurred by the commodification of cheap large language models from Anthropic, OpenAI, and Google. We saw companies try their hand as enabling this kind of behaviour through MCP and other model-level integrations, but Muse and other forms of agentic helper tools have turned the tides again. My friend is using Muse to help him look for a new apartment. Unlike the APIs of yesteryear, foundation models are really good at distilling vague, nebulous requirements into tangible outcomes. 

>Power users who are familiar with how to build things with relatively inexpensive models might disappear as they discover that instead of submitting a feature request, they can just build it themselves. 

In a consumer-grade application (such as building a workflow to help find desirable apartment listings) this works really well. Muse can navigate Craigslist the same way a user would and surface listings that meet his needs without making API calls or using an MCP connector. It just browses the web and does things, in stark contrast to the ways in which we accomplished this in the past through ancient tools like Selenium. 

To my mind, there will always be a need for enterprise-level APIs because real organizations with nontrivial needs benefit from the kinds of structured resourcing that exposed interfaces provide; if you're building and selling an app that helps you buy a bike, you'd probably want some way to collect bike data, store it, and aggregate it so that you can surface it to your users. 

Serious companies still need serious structure, but if you're just some dude with a desired workflow, getting AI to build you a custom workflow makes a lot of sense. My friend doesn't necessary need another online tool for searching for apartments but he wants to automate the mechanical work of:

- Creating and adjusting Craigslist filters.
- Looking through listings.
- Flipping through pictures of apartments.
- Reading each posting to assess whether the description aligns with his needs.
- Opening up a map to estimate his daily commutes.
- And so on.

The need for this sort of highly-personal software has always been there, lying dormant, restricted by the work needed to spin up an application that would do this sort of thing (and held back by the understanding that eventually you'd also need to fix bugs or debug issues in your custom software). Frontier models kind of just...do this, without any real issue. 

>Smaller organizations that build consumer-centric software will need to innovate to handle the loss of technically-savy consumers who want to build their own tools. 

My prediction is that software will become more bifurcated. Enterprise software will become more powerful by leveraging broad-based integrations and tooling for uses cases that are large and complex. Meanwhile, smaller-scale commercial tooling will suffer because users with a $20/month Claude Pro subscription can simply build their own custom tooling that hyper-suits their needs. The result will be that large enterprise software might stop trying to sell directly to consumers in favour of selling to businesses instead. And, smaller organizations that build consumer-centric software will need to innovate to handle the loss of technically-savy consumers who want to build their own tools. 

I feel like there will always be the "casual" market for consumer-grade software. Some people simply don't want to think about building their own to-do list app, or whatever, so customers will always exist. But power users who are familiar with how to build things with relatively inexpensive models might disappear as they discover that instead of submitting a feature request, they can just build it themselves.
