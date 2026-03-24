---
layout: layouts/index.html
title: PLUtah
---

The Programming Languages group at the [University of
Utah](https://www.utah.edu/) has a decades-long history of breakthroughs in
_pragmatic programming language research_.

{% include "news-list.liquid", limit: 3 %}
{% if news and news.size > 3 %}
[More…](news/)
{% endif %}

{% include "faculty-list.liquid" %}

{% include "postdocs-list.liquid" %}

{% include "phd-students-list.liquid" %}

{% include "masters-students-list.liquid" %}

{% include "undergrads-list.liquid" %}

{% include "alumni-list.liquid" %}

{% include "msc-bsc-alumni-list.liquid" %}
