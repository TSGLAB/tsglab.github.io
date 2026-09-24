---
title: Research
date: 2024-01-01
type: landing

sections:
  - block: markdown
    content:
      title: Research
      subtitle: ''
      text: |
        Our understanding of advanced AI systems, and even our ability to measure what they can do, is still at an early stage. We often study a model after training is complete, but that misses part of the story: how did it come to learn a particular behaviour in the first place? In Don't Just "Fix it in Post" (Biderman et al., ICML 2026), we argue that a science of AI needs to study training as it happens, not only inspect the finished model. Although these two approaches can be complementary.

        Our work covers mechanistic interpretability, AI safety and alignment, technical AI governance, and AI's effects on society. If we cannot understand or reliably test a system, it becomes much harder for anyone outside its developer to assess claims about its safety or to govern it meaningfully. Members of the Lab have published at NeurIPS, ICML, ICLR, ACL, EMNLP, FAccT, and other peer-reviewed venues.

        ## Mechanistic Interpretability
        We want to know how a neural network produces a particular behaviour. Which features and circuits etc matter for that behaviour? If we change one of them, do other behaviours also change? Query Circuits (Wu and Barez, ICML 2026) takes up this question for individual user questions.

        Finding a circuit is only part of the problem. We also have to decide what counts as a useful explanation. Too much detail tells us very little; too little can give us a neat story that the evidence does not support. We think explanations should also be judged by whether they help someone make (better and faster) decisions or allow them to intervene in a model's behaviour (Orgad, Barez et al., ICML 2026).

        ## AI Safety and Alignment
        We are interested in the gap between passing a safety test and being safe in use. Models can find unintended ways to attain a high reward value (Denison et al., 2024), models may do well on safety benchmarks yet giving confidently wrong answers (Simhi et al., EMNLP 2025), relearn something that had apparently been removed (Lo et al., ACL 2024), or develop unexpected or hard-to-detect biases from seemingly benign training data (Schrodi et al., ICLR 2026).

        We also study how to monitor models while they are being used (Oldfield et al., ICLR 2026). When an intervention appears to work, we want to know whether it is robust to changes in the model and the environment.

        ## Technical AI Governance
        Suppose a developer says a model is safe to deploy. Who can check that claim, and what would they need access to? We work on evaluations, audits, safety cases, and benchmarks with that question in mind. Zhu et al. (NeurIPS 2025), for instance, examine what it takes to build a rigorous benchmark for AI agents. Our research agenda on interpretability-driven auditing and control (Barez, 2026) sets out how evidence from inside a model might also help assess and correct its behaviour.

        Technical evidence has to be usable by the people making decisions about deployment. We study how independent scrutiny could work in practice, including where international cooperation may be possible even between countries that disagree on other political matters (Bucknall et al., FAccT 2025).

        ## AI and Society
        People and institutions may hand decisions to AI gradually, without ever making one clear choice to give up control. We want to know where this is happening, who gains power as a result, and who can intervene when a system gets something wrong.

        Our work includes AI's possible effects on the economy (Irwin, Wu and Barez, ICML 2026) and its potential to strengthen authoritarian control (Barez et al., 2025). We want to understand how people can question and contest consequential decisions made with AI. If they lose that ability, we risk weakening the democratic institutions and freedoms those decisions should serve.
    design:
      columns: '1'
---
