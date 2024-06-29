---
layout: page
title: Elements
permalink: /elements/
image:
---

A paragraph looks like this — Globally incubate standards compliant channels before scalable benefits. Quickly disseminate superior deliverables whereas web-enabled applications. Quickly drive clicks-and-mortar catalysts for change before vertical architectures. Credibly reintermediate backend ideas for cross-platform models. Continually reintermediate integrated processes through technically sound intellectual capital. Holistically foster superior methodologies.

***

## Headings by default:

# H1 Default styles for headings
## H2 Default styles for headings
### H3 Default styles for headings
#### H4 Default styles for headings
##### H5 Default styles for headings
###### H6 Default styles for headings

***

## Lists

### Ordered list example:

1. Morbi lectus risus iaculis vel suscipit turpis quis.
2. Curabitur sit amet mauris morbi in dui quis est pulvinar ullamcorper nulla facilisi.
3. Nullam mauris orci aliquet iaculis et neque viverra vitae ligula.
4. Proin quam etiam ultrices suspendisse in justo eu magna luctus lacinia suscipit.
5. Aenean lectus elit fermentum non convallis id sagittis at neque mauris orci.

***

### Unordered list example:

* Etiam ultrices. Suspendisse in justo massa fusce non.
* Sed non quam. In vel mi sit amet augue congue elementum.
* Suspendisse in justo eu magna luctus suscipit sed lectus.
* Quisque volutpat condimentum velit class aptent taciti sociosqu torquent.
* Aenean lectus elit fermentum non convallis id sagittis at neque.

***

## Table

<div class="table-container">
  <table>
    <tr><th>Header 1</th><th>Header 2</th><th>Header 3</th><th>Header 4</th><th>Header 5</th></tr>
    <tr><td>Row:1 Cell:1</td><td>Row:1 Cell:2</td><td>Row:1 Cell:3</td><td>Row:1 Cell:4</td><td>Row:1 Cell:5</td></tr>
    <tr><td>Row:2 Cell:1</td><td>Row:2 Cell:2</td><td>Row:2 Cell:3</td><td>Row:2 Cell:4</td><td>Row:2 Cell:5</td></tr>
    <tr><td>Row:3 Cell:1</td><td>Row:3 Cell:2</td><td>Row:3 Cell:3</td><td>Row:3 Cell:4</td><td>Row:3 Cell:5</td></tr>
    <tr><td>Row:4 Cell:1</td><td>Row:4 Cell:2</td><td>Row:4 Cell:3</td><td>Row:4 Cell:4</td><td>Row:4 Cell:5</td></tr>
    <tr><td>Row:5 Cell:1</td><td>Row:5 Cell:2</td><td>Row:5 Cell:3</td><td>Row:5 Cell:4</td><td>Row:5 Cell:5</td></tr>
    <tr><td>Row:6 Cell:1</td><td>Row:6 Cell:2</td><td>Row:6 Cell:3</td><td>Row:6 Cell:4</td><td>Row:6 Cell:5</td></tr>
  </table>
</div>

***

## Quotes

#### A quote looks like this:

> The longer I live, the more I realize that I am never wrong about anything, and that all the pains I have so humbly taken to verify my notions have only wasted my time!
>
> <cite>– George Bernard Shaw</cite>

***



## Syntax Highlighter

```css
body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #1c2021;
}

li {
  width: 200px;
  min-height: 250px;
  border: 1px solid #000;
  display: inline-block;
  vertical-align: top;
  margin: 5px;
}
```

```js
  $('.top').click(function () {
    $('html, body').stop().animate({ scrollTop: 0 }, 'slow', 'swing');
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > $(window).height()) {
      $('.top').addClass("top-active");
    } else {
      $('.top').removeClass("top-active");
    };
  });
```

***

## Images

![Shopping]({{site.baseurl}}/images/20.jpg#wide)
*Photo by [Tim Douglas](https://www.pexels.com/photo/happy-woman-jumping-with-shopping-bags-6567607/) on [Pexels](https://www.pexels.com)*

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/12.jpg" loading="lazy">
    <img src="/images/24.jpg" loading="lazy">
    <img src="/images/09.jpg" loading="lazy">
    <img src="/images/14.jpg" loading="lazy">
    <img src="/images/19-1.jpg" loading="lazy">
    <img src="/images/06-2.jpg" loading="lazy">
  </div>
  <em>Gallery / <a href="https://www.pexels.com" target="_blank">Pexels</a></em>
</div>

![Salad]({{site.baseurl}}/images/23.jpg)
*Photo by [Valeria Boltneva](https://www.pexels.com/photo/salmon-dish-with-vegetables-1516415/) on [Pexels](https://www.pexels.com)*

***

## Youtube Embed

<p><iframe src="https://www.youtube.com/embed/phiMxtqlFIY" loading="lazy" frameborder="0" allowfullscreen></iframe></p>

***

## Vimeo Embed

<p><iframe src="https://player.vimeo.com/video/148003889?h=d36b8b4cbb" loading="lazy" width="640" height="360" frameborder="0" allowfullscreen></iframe></p>