---
# Leave the homepage title empty to use the site title
title:
date: 2024-01-01
type: landing

sections:
  - block: hero
    content:
      title: |
        Technical Safety &
        Governance Lab
      image:
        filename: welcome.jpg
      text: |
        <br>

        **TSG Lab** · Department of Engineering Science & AI Governance Initiative, **University of Oxford**

        We study how frontier AI systems work internally, build tools for effective governance, and analyze their societal impact — from neural mechanisms to policy implementation to social outcomes.

        {{% cta cta_link="./people/" cta_text="Meet the team →" %}}

  - block: markdown
    content:
      title: Why TSG?
      subtitle: ''
      text: |
        As AI systems become more capable and agentic, surface-level evaluations, red-teaming, and informal checks will not be enough. We need tools that allow us to **inspect models before deployment**, **monitor them during deployment**, and **intervene when things go wrong**.

        TSG provides the empirical and policy expertise to deliver this capacity. We're building for both **scientific rigor** and **real-world impact**. You'll get strong technical mentorship, opportunities to publish at top venues, and pathways into academia, industry, policy, or safety institutes.

        We value good research and good people. We support researchers from underrepresented backgrounds. We care about the humans behind the papers.
    design:
      columns: '1'

  - block: collection
    content:
      title: Latest News
      subtitle:
      text:
      count: 5
      filters:
        author: ''
        category: ''
        exclude_featured: false
        publication_type: ''
        tag: ''
      offset: 0
      order: desc
      page_type: post
    design:
      view: card
      columns: '1'

  - block: collection
    content:
      title: Latest Publications
      text: ""
      count: 5
      filters:
        folders:
          - publication
        publication_type: 'article'
    design:
      view: citation
      columns: '1'

  - block: markdown
    content:
      title:
      subtitle:
      text: |
        {{% cta cta_link="./people/" cta_text="Meet the team →" %}}
    design:
      columns: '1'
---
