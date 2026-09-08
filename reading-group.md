---
layout: layouts/index.html
title: Reading Group - PLUtah
templateEngineOverride: liquid
---

<h1>Reading Group</h1>

{% assign semesters = reading_group | sortSemestersDesc %}
{% for schedule in semesters %}
<h2>{{ schedule.semester }}</h2>

<table class="reading-group-schedule">
  <thead>
    <tr>
      <th>Date</th>
      <th>Paper</th>
      <th>Presenter</th>
    </tr>
  </thead>
  <tbody>
{% for meeting in schedule.meetings %}
    <tr>
      <td><time datetime="{{ meeting.date }}">{{ meeting.date | formatScheduleDate }}</time></td>
      <td>{% if meeting.link %}<a href="{{ meeting.link }}">{{ meeting.paper }}</a>{% else %}{{ meeting.paper }}{% endif %}</td>
      <td>{{ meeting.presenter }}</td>
    </tr>
{% endfor %}
  </tbody>
</table>
{% endfor %}
