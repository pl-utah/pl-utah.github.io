---
layout: layouts/index.html
title: PLUtah
---

The Programming Languages group at the [University of
Utah](https://www.utah.edu/) has a decades-long history of breakthroughs in
_pragmatic programming language research_. Members of our group take interest in
a wide variety of systems, from GPU programs, to gradual type systems, to the
LLVM compiler infrastructure, to floating-point routines, to web browsers. We
share one common goal: Enhance these systems with PL techniques!

{% include "news-list.liquid", limit: 3 %}
{% if news and news.size > 3 %}
[More…](news/)
{% endif %}

{% include "photo-list.liquid", title: "Faculty", people: faculty %}

{% include "photo-list.liquid", title: "Postdocs", people: postdocs %}

{% include "photo-list.liquid", title: "Ph.D. Students", people: phd_students %}

{% include "photo-list.liquid", title: "Masters Students", people: masters_students %}

{% include "photo-list.liquid", title: "Undergrads", people: undergrads %}

{% include "alumni-section.liquid", title: "Ph.D. Alumni", people: alumni, show_year: true %}

{% include "alumni-section.liquid", title: "M.Sc. and B.Sc. Alumni", people: msc_bsc_alumni %}
