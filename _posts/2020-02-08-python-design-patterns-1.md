---
title: Common Python Design Patterns Vol.1 
author: Michael Bassili
layout: post
tags: Programming
category: Blog
favourite: 'true'
permalink: /blog/python-design-patterns-1
---

I found these design patterns to be the most useful in my professional life. I hope someone stumbles upon this and finds it somewhat useful. 

## I: Singletons

Possibly the simplest design pattern, Singletons are quite versatile objects. You’ll often find situations where refusing to use a singleton object makes things much harder for you.

### I.I: Define Singleton Object

A singleton object is an object that returns a single instance of itself whenever called. A helpful analogy would be to imagine two people calling the police. Both people are independent, and they’re both calling about different things. But, regardless of who calls 911 (or your regional equivalent), you’ll always be put in contact with the same police precinct. Both people access the same instance of the police despite calling from different phones, being different people, and being located in different places within a city. <img class="leftJustifyFig" src="{{site.baseurl}}/assets/common-python-design-patterns-1/singleton.png"> Whenever a singleton object is called, the single instance of the singleton object is returned. New singleton instances aren’t returned when someone calls its initializer; there is only ever a single singleton instance, shared across the entire program. Quite predictably, this is fairly straightforward to implement. We simply need to override the `__init__` function of our singleton class and set it to return a single instance, rather than creating a whole new instance. This will ensure that those requesting a new singleton object are returned the shared instance instead of a whole new object.

```python
class Singleton:
    """Definition of a Singleton object."""
    
    singleton_instance = None
    
    def __init__(self):
        """
        Override the initialization 
        mechanism, returning only the single instance.
        """
        ...
        
    @staticmethod
    def get_singleton():
        """
        Method for fetching the Singleton instance.
        Is static so that it can be accessed everywhere.
        """
        ...
        
    @staticmethod
    def update_singleton(val):
        """
        Method for setting value of Singleton instance.
        Is static so that it can be accessed everywhere.
        """
        ...
```

The data stored in the singleton instance is arbitrary. What’s important is that regardless of data, caller, and scope, the singleton object returns the same instance. This makes singletons useful when implementing things like global settings or run configurations.

### I.II: Singleton Example

Use the code snippet below to play with an active singleton implementation. Try replacing the variable singleton_instance with a data structure (e.g. a dictionary) and see how the implementation of the getter and setter change. Try writing some functions that share the singleton instance.

```python
class Singleton:
  """Definition of a Singleton object."""

  # Maintain state of Singleton
  singleton_instance = None

  def __init__(self):
    """Override the initialization mechanism."""
    if Singleton.singleton_instance is None:
      Singleton.singleton_instance = self
    
  @staticmethod
  def get_singleton():
    """
    Method for fetching the Singleton instance.
    Is static so that it can be accessed everywhere.
    """
    if Singleton.singleton_instance is None:
      Singleton()  # Call __init__ to initialize instance
    return Singleton.singleton_instance

  @staticmethod
  def update_singleton(val):
    """
    Method for setting value of Singleton instance.
    Is static so that it can be accessed everywhere.
    """
    if Singleton.singleton_instance is None:
      Singleton()  # Call __init__ to initialize instance
    Singleton.singleton_instance = val

Singleton.update_singleton("Michael")
print("Value in Singleton instance is: " + Singleton.get_singleton())
Singleton()  # Try to create a new Singleton instance
print("Value in Singleton instance is STILL: " + Singleton.get_singleton())
```

## II: Decorators

Decorators are useful when you need to introduce additional functionality to an existing object without changing its structure.

### II.I: Define Decorators

Large projects may rely on the existing structure of object implementations to function. But, let’s say you are tasked with adding additional functionality to these objects without altering the rest of the project. In other words: how do you change something without breaking it? One possible solution is to use decorators. <img class="leftJustifyFig" src="{{site.baseurl}}/assets/common-python-design-patterns-1/decorator.png"> The decorator pattern is essentially the act of tethering additional functionalities to existing objects. The process involves creating a decorator class that will wrap around the original object’s class implementation, allowing additional functionality to be added without so much as touching the original object’s implementation. In terms of the execution process, the decorator will be accessed first, followed by the original function. A helpful way to think of it is to imagine that the decorator a middle-man. When you ask it to call your original object, it intercepts it, does some additional stuff to it, and then calls your original object. When the original object concludes its execution, it’s returned to the decorator that wraps things up before terminating itself.

```python
class decorator(object):
  """Defines a decorator for the original function."""
 
  def __init__(self, func):
    """Overrides the initializer, calls function."""
    ...
    
  def __call__(self):
    """Overrides the class call functionality."""
    ...
 
@decorator
def original_function():
  """Original function that performs an action."""
  ...
```

Decorators prove useful when trying to implement things like benchmarking functionality or timekeeping. Any additional functionality one wishes to attach to an existing object can be implemented cleanly using decorators.

### II.II: Decorator Example

Use the code snippet below to play with a decorator implementation (in this case, wrapping a function). Try creating your own decorator. What happens when you add multiple decorators to an object? Can you think of other ways to implement the same kind of mechanism?

```python
class decorator(object):
  """Defines a decorator for the original function."""

  def __init__(self, func):
    """Overrides the initializer, calls function."""
    print("Initializing the decorator...")
    func()  # Calls the original object
    
  def __call__(self):
    """Overrides the class call functionality."""
    print("Inside the decorator's call function...")

@decorator
def original_function():
  """Original function that prints a name."""
  print("My name is Michael!")
	
original_function()
```

## III: Facades

While potentially limiting, the facade pattern allows complex systems and subsystems to be abstracted for high-level use. Facades allow for unified, non-granular handling of unnecesarily complexities.

### III.I: Define Facades

Let’s say you’re working with another developer’s API or product and you wish to reduce their complexity down to something more manageable and high-level for your personal use. That’s where facades come in handy. <img class="leftJustifyFig" src="{{site.baseurl}}/assets/common-python-design-patterns-1/facade.png"> By wrapping subsystems in a facade, you can simplify your interactions with them in order to streamline your own development process. The easiest way to imagine facades is to think of a car. Turning on a car doesn’t just “turn it on.” The engine is enabled and fed some fuel, various fluids and inner mechanisms turn on, the lights flash, etc. But, all these subsystems are abstracted by the act of turning the key. In a similar vein, a developer can wrap API calls, error handling, and other smaller subsystems into one unified facade.

```python
class Facade:
    """Abstracts multiple subsystems for ease-of-use."""
 
    def __init__(self):
        """Initializes all subsystems."""
        ...
 
class SubsystemOne:
    """Defines all details of the first subsystem."""
    ...
 
class SubsystemTwo:
    """Defines all details of the second subsystem."""
    ...
```

When managing a team of developers, it might be useful to obscure complex and unnecessary subsystems in order to streamline their development pipeline. Facades are simply Python objects themselves, so these same developers can grow to modify them later on.

### III.II: Facade Example

Play with the code snippet below to get an intuitive understanding of how facades play into a program. Can you add a new subsystem into the initializer? Can you override some other dunders in the facade to expand the implementation?

```python
class Facade:
  """Facade implementation, wrapping other subsystems."""

  def __init__(self):
    """Initlizes all other subsystems."""
    SubsystemOne()  # Init the first system
    SubsystemTwo()  # Init the second system

class SubsystemOne:
  """First subsystem to abstract."""

  def __init__(self):
    """Initializes the first subsystem."""
    print("Initializing the first subsystem...")

class SubsystemTwo:
  """Second subsystem to abstract."""
  
  def __init__(self):
    """Initializes the second subsystem."""
    print("Initializing the second subsystem...")

Facade()
```

## IV: Prototypes

Prototype objects are general object implementations that can operate regardless of their type and value. They can be used to create various, similarly-structured objects using different types of data.

### IV.I: Define Prototypes

The backbone of prototypes is an object that’s prepared to accept and initialize according to any given data type. Essentially, we’re creating a template of an object. This object can be used to build a collection of similarly-built objects, all with their own types and uses. <img class="leftJustifyFig" src="{{site.baseurl}}/assets/common-python-design-patterns-1/prototype.png"> This becomes useful when you’re building multiple similar entities in your program. For example, you may be building a video game with Python. You can prototype a general Item object that can be used to create various different interactable items in the game. There will always be situations where prototyping objects will be useful, so it’s a helpful pattern to get the hang of. The beauty of prototypes is that the Python subsystem doesn’t concern itself with the type of the object. It simply accepts any assignment of data type and treks forward. Knowing this, we can create multiple identical prototyped objects, all with different types, and Python won’t complain.

```python
class Prototype:
    """Prototype object class."""
 
    def __init__(self):
        """Initializes object, general type and value."""
        ...
 
    def __call__(self):
        """Calls the object, does some general interaction."""
        ...
 
    def get_type(self):
        """Gets the type of the prototype object."""
        ...
 
class Object(Prototype):
    """Object inherits the prototype class directly."""
    ...
```

If you document your prototype class well, the developer using it might not ever know how many structures and functions lie behind the scenes. Providing a good API for other developers is critical when working in a team, and prototyping is good practice for building intuitive APIs.

### IV.II: Prototype Example

Use the code snippet below to play with an implementation of a prototype. Can you think of some other use cases for prototypes? How would you use this in a banking system, for example? Can you modify it to print its type whenever we call type() manually? (Hint: think of overriding the `__class__` dunder in the prototype object.

```python
class Prototype:
    """General prototype object for overall use."""

    object_type = None
    object_value = None

    def __repr__(self):
        """The string representation of the prototype object."""
        print("Inside the __repr__ function body...")
        return str(self.object_type)  # Simply return the __repr__ of the type

class MyObject(Prototype):
    """An object based off a prototype."""

    def __init__(self, obj_type, obj_value):
        """Initializes based off the prototype."""
        self.object_type = obj_type
        self.object_value = obj_value
    
my_object = MyObject(str, "Michael")
print("The type of the object (__repr__) is: " + str(my_object))  # __repr__
print("The type of the object (direct call) is: " + str(my_object.object_type))
print("The value of the object is: " + my_object.object_value)
```

## V: Builders

Similar to prototyping, builders are essentially templates which rely on the caller to provide references to whatever builders (other subsystems) they want to be used in the creation of their object. This comes in handy when an object is so general and open-ended that it can be constructed from a variety of different subsystems.

### V.I: Define Builders

The backbone of builders is that they’re classes that contain empty functions. These empty functions are assigned an implementation based on the caller. What this amounts to is one class containing function signatures and (potentially) several other classes and functions containing implementations which have matching signatures to their builder definition. <img class="leftJustifyFig" src="{{site.baseurl}}/assets/common-python-design-patterns-1/builder.png"> A helpful analogy would be to imagine your builder class as a literal construction worker. You instruct the builder to build you a house. Your neighbour also hires the same builder to built their house. Both neighbours want a house, but they want it built differently. The first neighbour might tell the builder to use wood planks, while the second neighbour might want to use concrete. The builder can build a house using any material, so both neighbours will receive a valid house in the end. Similarly, a builder may be called by two different callers, both passing in different implementations for the builder’s subsystems. Both callers will get what they want regardless.

```python
class Manager:
    """Oversees all implementations in the builder."""
 
class Builder:
    """Generic builder implementation."""
    def my_subsystem(self): pass
    ...
 
class CustomBuilder:
    """More specific builder for a specific task."""
    
    def my_subsystem(self):
        """Implementation of subsystem."""
        ...
```

The builder relies on the caller for its subsystems’ implementations, so the output of the builder is coupled with the input of the caller. The construction worker can’t just build a house out of whatever they want; it’s up to whoever hired them to define how they want their house built.

### V.II: Builder Example

Use the code snippet below to play with a builder implementation. Can you write some new implementations for the subsystems in the builder? What situations might this pattern prove useful?

```python
class Manager:
  """Oversees all builder tasks."""
  builder_implementation = None

  def assign_builder(self, builder):
    """Assigns a builder to the manager."""
    self.builder_implementation = builder

  def get_contruction_output(self):
    """Prints the output of the construction."""
    self.builder_implementation.get_construction_material()
    self.builder_implementation.get_construction_tool()

class Builder:
  """General builder object."""
  def get_construction_material(self): pass
  def get_construction_tool(self): pass

class HouseBuilder(Builder):
  """More specific builder of houses."""
  
  def get_construction_material(self):
    """Prints the construction material for the house."""
    print("Building the house using wood...")

  def get_construction_tool(self):
    """Prints the construction tool for the house."""
    print("Building the house using a hammer...")

class ApartmentBuilder(Builder):
  """More specific builder of apartments."""
  
  def get_construction_material(self):
    """Prints the construction material for the apartment."""
    print("Building the apartment using steel...")

  def get_construction_tool(self):
    """Prints the construction tool for the apartment."""
    print("Building the apartment using a screwdriver...")

# Builder for houses
house_foreman = Manager()  
house_foreman.assign_builder(HouseBuilder())
house_foreman.get_contruction_output()

# Builder for apartments
house_foreman = Manager()  
house_foreman.assign_builder(ApartmentBuilder())
house_foreman.get_contruction_output()
```

## VI: Conclusion

I this reference helps someone with their technical interview, personal project, etc. These patterns can be found in any non-trivial software system (not just in Python), so it pays to be familiar with them. 
