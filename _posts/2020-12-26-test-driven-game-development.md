---
title: Test Driven Game Development
layout: post
tags: Programming
author: Michael Bassili
category: Blog
favourite: 'false'
permalink: /blog/test-driven-game-development
---

Writing clean and maintainable code often follows well-defined practices for structuring and testing software. In today's example, we're going to go cover testing and test-driven development, specifically in Godot. While the tools mentioned may be unique to Godot, the principles here can be applied to any non-trivial software project. After some deliberating, we've drilled down our development and testing pipeline to the following.
<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2020-08-10T18:41:12.751Z\&quot; agent=\&quot;5.0 (X11)\&quot; etag=\&quot;uQB9eeOuoBHH7tgTDqSJ\&quot; version=\&quot;13.6.2\&quot; type=\&quot;device\&quot;&gt;&lt;diagram id=\&quot;MMr3dsGSb6bk1OsKJQzN\&quot; name=\&quot;Page-1\&quot;&gt;7Vpbk5owFP41PtbhLj666rZ9aGdn3M7u9i1ClGyBOCGu2l/fBIISghUv4N7cmR3ykYTkO19Ozgl0zGG0/krAIviBfRh2DM1fd8xRxzD6rsH+c2CTAbbpZMCcID+D9B0wQX+hADWBLpEPE6kixTikaCGDHo5j6FEJA4TglVxthkP5qQswhwow8UCoog/Ip0GGura2w79BNA/yJ+uauBOBvLIAkgD4eFWAzHHHHBKMaXYVrYcw5NzlvGTtbvfc3Q6MwJjWafDwFG1GwWL0q3c7fg7vfj45z84Xw8q6eQHhUsxYjJZucgoIXsY+5L1oHfNmFSAKJwvg8bsrZnOGBTQKWUlnlz5IgrQuL8xQGA5xiEnakTlzPeh5DE8owX9g4c7UtS1bE83vAKWQxGkfhmYxVIwREgrXe2evbzllWoQ4gpRsWBXRwLKEGYQODUeUVwWrCigoGHQLAiGk+bbrHdfsQtB9BPV6q9Tb/K+Keif98RY4pgU8+zVpEvP1mUSxyMSDMWTQ4DzTlKzh29D1rSpruMbUTK1xAX6NMr9uPX6tpug19tJ78w7oNWvKtzF6VX+S0/v7HdBrXVu9jkJvt9tViGUTpjJ7MksxZhaRKRUQCNGce1hmM+ZrGcDpQywSGYgbEfJ9/phKc8kGvQT/Tol/U+XfqvLOTfHvKvxXeI0AR9NlcrykAXRnlZGJ47lwOrvQhucc9hhVlDYm6b5CacU+96YordrjWqU0z1sKnFZ43zfFaZXnbZdTNS5TKIWxP+DpHnegIUgS5MlMwjWij4XrJ+4pu7YojdbCcaaFTV6I2egfi4VCK17cNUtLebtscNBXMsuSBdgE8JJ48HBESgGZQ3poJasWLVjMrrBYjhEYAope5OFWmVE84Q4jNpGdYIw9W0XeRTZN0aqYopY7sl3ZQWqlsWQ8KB2lqtpO+wyhqRHq8UI7UTSnCPSCQjNqCs19H0LrlXbickrZtNDMDys0q6bQdK3zqbQLKM1WlPYwuGfAPUwoiueK7F5HAiOdZV0ipimfhRhqTFN51tRYTNM7ygMIiiVa9seJUGc5eq8qTuw7PRM4Re+hF72HfsB31PcDB9f3PoO1s76Vs7Fy8Fp3fTvagY6aXt9qWlxvJ0nYwOh/NxhFPFr6OzeYlgTXbjCt1dTmVaNpq7RjWPqJ0rRLe9g2rzsgTSYKsClUW/AKyf4B26UlYPalF1HsIuvxsrpXzy4+dX+u7q8a3L953eevGBvVfT63dnV/ooavnGq4n+6+DXffiuzVI8DvPMsAHkU4TpQl8AqzmPY+bbh2bmOopxvpm8iPbSYl5WjOTKy4+64oW4K7j7PM8T8=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://app.diagrams.net/js/viewer-static.min.js"></script>

### Strategies for Test Driven Game Development

- Modularizing components for ease of testing and refactoring
- Write tests for each complete scene to maximize test coverage
- Understandable logging and error reporting for interactions between components

### Modularizing Components

Clear separations of scenes in Godot is key to ensuring your project can be unit tested. There are also numerous other benefits to keeping your project well-organized, modular, and atomic. But for now, let's stay within the scope of testing. When scenes are kept atomic, they can be built within a smaller scope. A scope that is, hopefully, easier to test against when compared to the project as a whole. Atomic components can be tested with the knowledge that they maintain a set of valid inputs and outputs. It's tricky (but not impossible) to test a component without pre-defined I/O but keeping scenes modular can help reduce the overall number of "tricky" tests needed. Modular scenes can have their components tested individually without having to worry about secondary interactions between other components. Our tests could furthermore serve as documentation; expected states in tests can serve as a sort of API interface for your components. You should also write documentation, of course, but having working examples of test cases on a given scene can facilitate future development. The crux here is that if your one component takes a set of inputs X and returns a set of outputs Y, then your confidence of the entire system increases. If a scene passes its unit tests, then you can run with the assumption that it will work when other components are supplying the inputs.

### Write Tests for Every Scene 

Every scene needs tests. This serves two purposes: it forces developers to truly understand the results and consequences of their scene, and it gets developers in the habit of writing tests as they develop. Too often, new scenes are built without tests. These scenes are added to larger scenes and cause problems. Once a scene is being used by another, it becomes much harder to nail down where things went wrong. Godot's scene architecture makes this easier some other engines out there, but pernicious problems can still cause amok. Testing your scenes atomically before they're added to a parent scene helps ensure predictability in your larger applications. It reduces the number of trivial issues in your scenes while exposing non-trivial issues during interactions. Signals are especially annoying; sending a signal from one scene and handling it elsewhere often requires a developer hooking up the signal to a function in your scene. These interactions are fairly loose (if you consider nested scenes to be "tight," for example) and as a result, they should be tested thoroughly. Ensure that signals are being handled properly before hooking them up to your levels. 

### Interaction Logging 

Finally, consider logging all important actions. Add a DEBUG flag and flip it when building from your development environment. When in DEBUG mode, log everything to `/var/log/GAMENAME.log` or some other file. Printing works well enough but as a game grows in complexity, you may find it helpful to refer to previous logs. If you print your log messages to console, they may be overwritten the next time your project is built or executed. Logging helps developers and QA debug their backend quietly. A helpful rule we try to follow is that every interaction should be logged. Period. This mimics DB logging; every database interaction is usually logged (maybe using ARIES) so that upon a crash, it can have its transactions redone or undone. Similarly, anytime your project interacts with another component, log it. When something goes wrong between two scenes, your logs can help identify which components caused the issue and why. While game development isn't as complex as say, kernel development, a lot of the same concessions and tips made building kernels are helpful for non-trivial game development. Single-report debugging is impressive and all, but tracing complex interactions manually after-the-fact is a lot more realistic. Spend time ensuring logging is present to assure yourselves that problems you missed in unit testing can be caught. If you're properly unit testing, the issues you'll be debugging will be interaction-based problems. What goes wrong when two scenes talk to one another. Use logging in tandem with unit testing to round out your QA pipeline. 

### Godot-Specific Testing Tools

The following tools and frameworks can help you structure and write excellent tests:

- [GUT Godot Unit Test](https://github.com/bitwes/Gut), unit testing tool for the Godot engine
- [WAT Automated Testing](https://github.com/CodeDarigan/WAT), automated testing plugin for the Godot engine

We did not go over specifics in this article because the GUT and WAT docs are quite extensive.
Please refer to them for specific examples and quick-start guides.
