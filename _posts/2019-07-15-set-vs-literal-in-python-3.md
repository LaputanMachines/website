---
title: Python 3 set() Vs. {*}
author: Michael Bassili
layout: post
tags: Programming
category: Blog
---

### PyCharm Prefers Literals To Function Calls 

While porting my team’s code over to Python 3, I encountered a PyCharm warning I found interesting: “Function call can be replaced with set literal.” The snippet of code looked a little something like this... We were converting a list of elements into a set using the `set()` function built into Python 3. 

```python
my_set = set([1, 2, 3, 4, 5])  # PyCharm doesn’t like when you do this
```

So after some digging, I learned a little more about the way Python deals with function calls vs. how they deal with literals, in terms of performance. In summary: **using literals is faster because Python has less overhead involved with literals.** That's why PyCharm recommends literals. So let’s dive in!

### Benchmarking Function Calls Vs. Literals

Try the following code in your terminal. It should print two lines, one for each function call and assignment. The first uses `set()` to convert a list to a set, and the second uses set literals (i.e. `{*}`) to perform the conversion. There is a non-zero performance increase for the literal.

```python
from timeit import timeit
print(timeit("my_set = set([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])"))
print(timeit("my_set = {*[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}"))
```

```bash
\$ 0.3326582070000086
\$ 0.28732166300000017 
```

You’ll probably see a negligible difference, but there *is* a difference! That's because Python is doing a lot more work for the function call then it is in the literal. Mainly, Python is storing the namespace and stack as it executes the function.

### What Python Is Actually Doing

So what is Python doing? Why are funciton calls taking longer? Imagine you're a Python interpreter that is told to execute a function. You can't just drop all that you're doing to execute the newly-provided function! You need to put away whatever you're doing first before doing something else. Otherwise, you won't be able to resume your work when you're done interpreting the function.

Here are a few things that Python needs to do with functions:

1. It needs to look up the function in memory so that it can use it
2. It needs to initialize and manage a frame for the function
3. It needs to store all local variables
4. It needs to store activation records (i.e. call frames) that are kept on the runtime stack
5. It needs to push the frame to the top of the stack when it's finally called

That's a lot of stuff Python needs to do in order to handle your `set()` call! In contrast, here's what Python needs to do with a set literal:

1. It needs to load the constant (i.e. constant folding) for the operator

Python can do this pretty quickly, resulting in faster generation of sets when using the set literal than when using the `set()` function, which itself has to build the set from a generator instead of using constant folding. The result? Faster set generation with the literals than with the function (for most cases I tested). _In reality, you might be able to achieve equivalent performance using `set()` when your data is already an iterable or a generator object._

### Summary Information

Now that we've gotten to the bottom of this, we can change that pesky function call to a set literal in our project, thus shutting-up PyCharm! I hope this helps someone who's wondering why the heck their IDE is angry at them for using a convenient, built-in Python function. The solution: use an even-more convenient Python literal!

#### Further Reading Materials

Here are some articles and documentation that I found interesting when researching this topic:

1. https://sites.cs.ucsb.edu/~pconrad/cs8/topics.beta/theStack/02/
2. https://www.codementor.io/mjpieters/python-optimization-how-it-can-make-you-a-better-programmer-ajiiftqbo
