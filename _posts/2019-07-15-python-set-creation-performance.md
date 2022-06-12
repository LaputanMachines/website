---
title: Speed of Python's set() vs {*} 
author: Michael Bassili
layout: post
favourite: 'false'
tags: Programming
category: Blog
permalink: /blog/python-set-creation-performance
---

**TL;DR** First, a big THANKS to all those who emailed me about the inaccuracies of my original post. I appreciate those comments and I used them to fix the post, making the content more accurate.

## PyCharm Prefers Set Syntax To A Function Call 

 While porting my team’s code over to Python 3, I encountered a PyCharm warning I found interesting: “Function call can be replaced with set literal.” The snippet of code looked a little something like this... We were converting an existing collection into a set using the `set()` function.  

```python
list_to_convert_to_set = [1, 2, 3, 4, 5]  # Imagine this existed somewhere in memory
my_set = set(list_to_convert_to_set)      # PyCharm complained when I did this
```

So after some digging, I learned a little more about the way Python deals with function calls vs. how they deal with set syntax, in terms of performance. In summary: **using set syntax is faster because Python has less overhead involved compared to when it uses a function.** That's why PyCharm recommends set syntax over the `set()` function. So let’s dive in!

## Benchmarking Function Calls Vs. Literals

Try the following code in your terminal. It should print two lines, one for each function call and assignment. The first uses `set()` to convert an existing collection into a set, and the second uses set syntax (i.e. `{*}`) to perform the conversion. The `*` character unpacks the collection. As you can see, there is a non-zero performance increase for the literal.

```python
from timeit import timeit
print(timeit("my_set = set([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])"))
print(timeit("my_set = {*[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}"))
```

```bash
0.3326582070000086
0.28732166300000017 
```

You’ll probably see a negligible difference, but there *is* a difference! That's because Python is doing a lot more work for the function call then it is when it uses set syntax. Mainly, Python is storing the namespace and stack as it executes the function.

## What Python Is Actually Doing

So what is Python doing? Why are funciton calls taking longer? Imagine you're a Python interpreter that is told to execute a function. You can't just drop all that you're doing to execute the newly-provided function! You need to put away whatever you're doing first before doing something else. Otherwise, you won't be able to resume your work when you're done interpreting the function.

Here are a few things that Python needs to do with functions:

1. It needs to look up the function in memory so that it can use it
2. It needs to initialize and manage a frame for the function
3. It needs to store all local variables
4. It needs to store activation records (i.e. call frames) that are kept on the runtime stack
5. It needs to push the frame to the top of the stack when it's finally called

That's a lot of stuff Python needs to do in order to handle your `set()` call! In contrast, here's what Python needs to do when using set syntax:

1. It needs to load the constant (i.e. constant folding) for the operator

Python can do this pretty quickly, resulting in faster generation of sets when using set syntax than when using the `set()` function, which itself has to build the set from a generator. The result? Faster set conversion with the set syntax than with the function (for most cases I tested). _In reality, you might be able to achieve equivalent performance using `set()` when your data is already an iterable or a generator object._

## Summary Information

Now that we've gotten to the bottom of this, we can change that function call to set syntax in our project, thus shutting-up PyCharm! I hope this helps someone who's wondering why the heck their IDE is angry at them for using a convenient, built-in Python function. The solution: use an even-more convenient Python literal!

## FAQ The * Character

The `*` character unpacks a collection so that it can be converted into a set using set syntax. Try the following in your terminal... A `TypeError` will be raised when you try to convert `my_list` to a set. Python complains with the following: `TypeError: unhashable type: 'list'` To resolve, this, we need to unpack the collection with the `*` character.

```python
my_list = [1, 2, 3, 4, 5]
try: 
    my_set = {my_list}
except TypeError:
    print("See! I told you so!")
```

Now with the `*` character unpacking our collection, we get a proper set object!

```python
print(type({*[1, 2, 3, 4, 5]}))
```

```bash
<class 'set'>
```
When you do `{[1, 2, 3]}`, Python will try to make a set with one element. The `*` character uses list expansion to construct the set from the containing members, not the list object. Thanks to all the people who emailed me to share their knowledge! You all helped make this blog post more accurate and informative. 

### Further Reading Materials

Here are some articles and documentation that I found interesting:

1. [https://sites.cs.ucsb.edu/~pconrad/cs8/topics.beta/theStack/02/](https://sites.cs.ucsb.edu/~pconrad/cs8/topics.beta/theStack/02/)
2. [https://www.codementor.io/mjpieters/python-optimization-how-it-can-make-you-a-better-programmer-ajiiftqbo](https://www.codementor.io/mjpieters/python-optimization-how-it-can-make-you-a-better-programmer-ajiiftqbo)
3. [https://docs.python.org/dev/reference/expressions.html#set-displays](https://docs.python.org/dev/reference/expressions.html#set-displays)
4. [https://docs.python.org/dev/reference/expressions.html#grammar-token-starred-list](https://docs.python.org/dev/reference/expressions.html#grammar-token-starred-list)
