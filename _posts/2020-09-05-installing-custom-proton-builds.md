---
layout: post
title:  Installing Custom Proton Builds
description: For avid gamers like me, Proton has been a game-changer in transitioning to Linux from Windows. While some games may not work initially, custom Proton builds on GitHub, such as GloriousEggroll's, offer solutions. This guide simplifies the process of installing these builds for both native and Flatpak Steam, enhancing game compatibility on Linux.
image: '/images/posts/2020-09-05-installing-custom-proton-builds/proton.png'
tags: [proton, emulation, steam, games]
featured: false
---

If you're like me, you play a lot of games. Proton has been a godsend for me. It pretty much made it possible for me to transition entirely over to Linux from Windows. Some games still don't work with Proton, but talented folks are constantly developing new builds. This doc will walk you through installing custom builds.

You can either make your own custom Proton builds by forking [the official Proton repository](https://github.com/ValveSoftware/Proton), or you can find open source ones on GitHub, like [this one by GloriousEggroll](https://github.com/GloriousEggroll/proton-ge-custom). These custom Proton builds may fix game-specific issues, or they may just include optimizations that have yet to be released. 

### Installation For Native Steam

1. Download the tarball of your custom Proton build onto your system
2. Run `sudo mkdir ~/.steam/root/compatibilitytools.d` to create a directory where your custom Proton builds will reside
3. Extract the contents of the tarball into `~/.steam/root/compatibilitytools.d/` 
4. Restart your Steam client
5. Right-click on a game and choose "Properties"
6. Under "Force the use of a specific Steam Play compatibility tool` and find the name of the custom build


### Installation For Flatpak Steam

1. Download the tarball of your custom Proton build onto your system
2. Run `sudo mkdir ~/.var/app/com.valvesoftware.Steam/data/Steam/compatibilitytools.d/` to create a directory where your custom Proton builds will reside
3. Extract the contents of the tarball into `~/.var/app/com.valvesoftware.Steam/data/Steam/compatibilitytools.d/`
4. Restart your Steam client
5. Right-click on a game and choose "Properties"
6. Under "Force the use of a specific Steam Play compatibility tool` and find the name of the custom build

Now your game will run using the custom Proton build you installed. You can add any custom Steam Play compatibility tools into the `compatibilitytools.d` directory and Steam will identify it and allow you to use it on your games. I hope this brief article helps someone out!