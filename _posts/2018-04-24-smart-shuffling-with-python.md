---
title: Implementing Playlist Shuffle in Python
author: Michael Bassili
layout: post
tags: Programming
favourite: 'true'
category: Blog
permalink: /blog/smart-shuffling-with-python
---

**TL;DR** You can [click here to download the completed Python program]({{site.baseurl}}/assets/shuffle/shuffle.py). This is the result of many iterations, as listed below. Benchmarking data can also be found at the very end.

## Why Even Bother Doing This? Don't You Have a Life?

The car I drive has a shuffle feature for CDs. It must be re-toggled whenever the car power cycles, and routinely bugs out whenever I try to flip though my Evil Empire disk. Sometimes, the next “shuffled” track is simply the following track, defeating the purpose of shuffling a CD! This frustrates me to no end. When it happens, it derails my whole week. In contrast, Spotify’s shuffle has never let me down (this might be because of the sheer size of my Spotify playlists—roughly one thousand tracks per playlist), but I suspect that Spotify, iTunes, and various other shuffle-supporting platforms have figured out the ideal way to shuffle a playlist. For clarity, I’ll be referring to any list-based collection of music as a playlist (e.g. CDs, records, etc.). Let’s start from scratch…

If you are lazy (or keen), you can download the completed program, along with tests, by clicking [here]({{site.baseurl}}/assets/shuffle/shuffle.py).

## Shuffle v0: Preparing our Data

We need to create a data structure that can hold tracks as well as meta data. The easy solution would be to create a playlist data structure and populate every element in said data structure with its respective track’s information. But I’m lazy, so we won’t be doing that. Instead, we’ll be defining a dictionary of elements (tracks ), and we’ll populate each track with random bits to pretend they’re filled with music data.

```python
  evil_empire = {
      'People of the Sun': {}, 'Bulls on Parade': {}, 'Vietnow': {}, 'Revolver': {},
      'Snakecharmer': {}, 'Tire Me': {}, 'Down Rodeo': {}, 'Without a Face': {},
      'Wind Bellow': {}, 'Roll Right': {}, 'Year of tha Boomerang': {}
  }

  for track in evil_empire:
      evil_empire[track] = {'Song': [getrandbits(1000000)]}

  evil_empire['Meta Data'] = {
      'Contributing Artists': ['Zach de la Rocha', 'Tom Morello', 'Tim Commerford', 'Brad Wilk'],
      'Genres': ['Rap Metal', 'Nu Metal'],
      'Length': '11',
      'Current Position': '1'
  }
```

This is obviously gross to look at and not scalable, but the goal of this adventure is to build the best shuffle algorithm. I’m not convinced that implanting a simple data structure to help us is a productive use of my free time. Also, this is my blog, so…

## Shuffle v1: Literally Just Playing the Playlist

Take some playlist p and treat it like a list of dictionaries. Each dictionary contains a track’s data, including its title, contributing artists, and the song itself, encoded in some format. The dumbest way to “shuffle” a “playlist” would be to simply play the damn thing in-order. When the next track is requested, the user will be disappointed. Yeah it doesn’t really do what we want it to do yet, but I figure if Ford can’t get this right, then it wouldn’t hurt to start from square one.

```python
  def shuffle_v1(playlist):
      """
      Simply plays the following track in-order, essentially forgetting to "shuffle" anything.
      :param (dict) playlist: Dictionary of track information, including the track data.
      :return (int): Track number to shuffle to.
      """
      current_position = int(playlist['Meta Data']['Current Position'])
      playlist_length = int(playlist['Meta Data']['Length'])
      return (current_position + 1) % playlist_length
```

This initial implementation has *many* major faults, the primary being that it doesn’t shuffle the playlist. Tough. Well, we can do better…

## Shuffle v1.1: Randomizing the Indices

Count and store the length of the playlist. Then, with your pseudorandom number generator of choice, generate an integer between zero and the length of your playlist. Great! So now when the next track is requested, a random track in the playlist will play. If the index of the current track is chosen, reshuffle. Now we’re at a thousand-dollar implantation of the shuffle feature since this is what my car does. Obviously, this is crap, and to understand why, we need to put ourselves in a user’s shoes.

```python
  def shuffle_v1_1(playlist):
      """
      Generate an index within the playlist. When the current track is chosen, reshuffle.
      :param (dict) playlist: Dictionary of track information, including the track data.
      :return (int): Track number to shuffle to.
      """
      current_position = int(playlist['Meta Data']['Current Position'])
      playlist_length = int(playlist['Meta Data']['Length'])
      shuffle_position = current_position
      while shuffle_position == current_position:
          shuffle_position = randint(0, playlist_length - 1)
      return shuffle_position
```

A user doesn’t really want a perfectly random shuffle of their playlist, but rather a “random” song somewhere distant in their playlist. A good way to convince yourself of this principle is to imagine popping a new CD into your CD player. The first of twenty tracks play. You request the next track using the CD player. Now imagine: (1) the third song plays, or (2) the tenth song plays. The closer the randomly selected song is to your current position, the less likely the user is to feel that this permutation of tracks was properly shuffled. Our solution will be as follows…

## Shuffle v2: User Experience Tweaking

We count and store the length of the playlist. We randomly select an integer between zero and the length of the playlist. If the integer is within some tolerance—or distance, we reshuffle. For example, starting from track 1, an index of 3 might be too close. We reshuffle, and we get an index of 8. Better. We can introduce probabilities of reshuffling based on the distance between the two indices. Rolling a 3 when we’re currently at 1 yields a 50% chance of reshuffling; rolling a 2 when we’re currently at 1 yields a 100% chance of reshuffling. We can halve this probability every increment. We can add base cases for smaller playlists (<= 5 tracks). If we roll the same index as our current track, we’d re-shuffle with 100% probability.

```python
  def shuffle_v2(playlist):
      """
      Randomly selects an index, and reshuffles depending on the delta index.
      :param (dict) playlist: Dictionary of track information, including the track data.
      :return (int): Track number to shuffle to.
      """
      current_position = int(playlist['Meta Data']['Current Position'])
      playlist_length = int(playlist['Meta Data']['Length'])
      shuffle_position = current_position

      while shuffle_position == current_position:
          shuffle_position = randint(0, playlist_length - 1)
          delta_position = abs(shuffle_position - current_position)
          if playlist_length > 2 and delta_position == 1 and random() < 0.5:
              shuffle_position = randint(0, playlist_length - 1)
          elif playlist_length > 2 and delta_position == 2 and random() < 0.25:
              shuffle_position = randint(0, playlist_length - 1)
      return shuffle_position
```

This achieves two things: tracks begin to feel random (which is what we’re going for—it’s all about the user experience), and “random” quirks are still included (rolling a 3 when we’re on 1). But there’s another issue…

## Shuffle v2.1: The Algorithm I've Been Looking For

We got to go fast! We can’t do all this shuffling when the track is requested, because it would create disproportionate transition times between tracks, among other obvious problems. We remedy this by creating a permutation of tracks whenever the playlist is loaded up. Count the number of tracks, and shuffle once for every track, abiding by the rules set in v2, until we have a permutation of “random” tracks. The larger the playlist, the less likely we are to re-shuffle, and an average album is 15 tracks long.

```python
  def shuffle_v2_1(playlist):
      """
      Implements v2, but generates the entire permutation before playing anything. This reduces the
      disproportionate wait times between shuffles by offloading it to the initial playlist load.
      Users won't really care if it takes an extra second to load a CD, but they will care if there's
      a load time between tracks.
      :param (dict) playlist: Dictionary of track information, including the track data.
      :return (list): Permutation of tracks to shuffle through.
      """
      track_permutation = []

      current_position = int(playlist['Meta Data']['Current Position'])
      playlist_length = int(playlist['Meta Data']['Length'])

      if playlist_length in [0, 1]:
        return [0]  # An empty, or small playlist

      while len(track_permutation) < playlist_length:
          shuffle_position = randint(0, playlist_length - 1)
          delta_position = abs(shuffle_position - current_position)
          if shuffle_position not in track_permutation:
              if playlist_length > 2 and delta_position == 1 and random() < 0.5:
                  shuffle_position = randint(0, playlist_length - 1)
              elif playlist_length > 2 and delta_position == 2 and random() < 0.25:
                  shuffle_position = randint(0, playlist_length - 1)
              track_permutation.append(shuffle_position)

      return track_permutation
```

So, we’ll say that the average number of times we’d reshuffle is the number of indices we’d reshuffle times their probabilities. If we say that the neighboring 1st, 2nd, and 3rd index reshuffle with a probability of 100%, 50%, and 25%, respectively, we’d reshuffle about (1/15)(1) + (1/14)(0.5) + (1/13)(0.25) = 0.12 = 12% of the time. We’ll call that our benchmark. Let’s not do worse than a 12% re-shuffle rate.

## Shuffle v2.2: Final Implementation

We take v2.1 and generalize the probability of reshuffling for n tracks in playlist p. We say that the probability of reshuffling is 1 / delta_position, giving us a scalable probably set for all tracks in the playlist (instead of just the two neighboring indices).

```python
  def shuffle_v2_2(playlist):
      """
      Implements v2.1 but generalizes the probability of reshuffling.
      :param (dict) playlist: Dictionary of track information, including the track data.
      :return (list): Permutation of tracks to shuffle through.
      """
      track_permutation = []

      current_position = int(playlist['Meta Data']['Current Position'])
      playlist_length = int(playlist['Meta Data']['Length'])

      if playlist_length in [0, 1]:
          return [0]  # An empty, or small playlist

      while len(track_permutation) < playlist_length:
          shuffle_position = randint(0, playlist_length - 1)
          delta_position = abs(shuffle_position - current_position)
          if shuffle_position not in track_permutation:
              if playlist_length > 2 and random() < float(1 / delta_position) :
                  shuffle_position = randint(0, playlist_length - 1)
              track_permutation.append(shuffle_position)

      return track_permutation
```

An added bonus is that, by default, the probability of reshuffling goes to zero as delta_position goes to n. All together, we get what I consider to be a rich, user-oriented implementation of the shuffle feature on music players. Take note, Ford.

## Performance of Our Playlist Permutations

Let’s try to generalize the performance of this shuffle algorithm. As the length of the playlist goes to infinity, the probability of reshuffling goes to zero. The average performance is O(n), where n is the length of the playlist since it must go through all the indices of the playlist to order them.

<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

$$
\begin{align*}
  \small \lim_{n\to\infty} \frac{1}{n}(100\%) + \frac{1}{n - 1}(50\%) + \frac{1}{n - 2}(25\%) + \ldots = \frac{1}{\infty}(1) + \frac{1}{\infty - 1}(0.5) + \frac{1}{\infty - 2}(0.25) + \ldots = 0
\end{align*}
$$

 For small playlists, performance is actually worse than O(n), as the probability of reshuffling is high. There are only two real playlist sizes to concern ourselves with: EPs (1-3 tracks) and Albums. For EPs, what will probably happen most of the time is that the first track will shuffle to the third track, finishing off with the second track. This "waterfalling" behavior can actually be observed with playlists of any length, since the probability of reshuffling gets smaller the farther away from the initial track you are.

## Appendix I: Testing the Implementations

We should probably test these! For the simpler methods, we’ll test using the first and last index of the playlist. For the more complex and feature-rich methods, we’ll test them recursively, passing in the previous shuffle’s index as the new current index. We expect the shuffles to “feel” random.

```text
  2018-04-24 16:18:35 : Testing Shuffle v1...
  2018-04-24 16:18:35 :   Starting from track 1, shuffled to track 2, a difference of 1 track(s).
  2018-04-24 16:18:35 :   Starting from track 5, shuffled to track 6, a difference of 1 track(s).
  2018-04-24 16:18:35 :   Starting from track 10, shuffled to track 0, a difference of 10 track(s).
  2018-04-24 16:18:35 : Ending test of Shuffle v1...
  2018-04-24 16:18:35 : Testing Shuffle v1.1...
  2018-04-24 16:18:35 :   Starting from track 10, shuffled to track 1, a difference of 9 track(s).
  2018-04-24 16:18:35 :   Starting from track 5, shuffled to track 4, a difference of 1 track(s).
  2018-04-24 16:18:35 :   Starting from track 10, shuffled to track 6, a difference of 4 track(s).
  2018-04-24 16:18:35 : Ending test of Shuffle v1.1...
  2018-04-24 16:18:35 : Testing Shuffle v2...
  2018-04-24 16:18:35 :   Starting from track 10, shuffled to track 4, a difference of 6 track(s).
  2018-04-24 16:18:35 :   Starting from track 5, shuffled to track 7, a difference of 2 track(s).
  2018-04-24 16:18:35 :   Starting from track 10, shuffled to track 7, a difference of 3 track(s).
  2018-04-24 16:18:35 : Ending test of Shuffle v2...
  2018-04-24 16:18:35 : Testing Shuffle v2.1...
  2018-04-24 16:18:35 :   Shuffle permutation is [7, 6, 1, 3, 9, 4, 5, 10, 0, 8, 2]
  2018-04-24 16:18:35 :   Shuffle permutation is [6, 9, 1, 7, 5, 8, 4, 6, 2, 0, 10]
  2018-04-24 16:18:35 :   Shuffle permutation is [2, 1, 4, 6, 5, 0, 10, 7, 3, 9, 8]
  2018-04-24 16:18:35 : Ending test of Shuffle v2.1...
```

## Appendix II: Personal Preference

I am fully aware that some people don’t care about this as much as I do, but I listen to a lot of music, and it frustrates me when I shuffle to the next track only to have the neighboring track play. If I wanted the next track in the album, I wouldn’t have enabled the damn shuffle feature, Ford. Moreover, it’s obvious at this point that I wrote this is a hate-fueled rage. I don’t want to listen to Vietnow, I want something else! On the plus side, I now have sample code to refer to when I come around to building my shuffle-oriented Spotify competitor!
