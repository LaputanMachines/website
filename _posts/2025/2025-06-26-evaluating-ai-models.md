---
layout: post
title: "Evaluating AI Systems: From Criteria to Pipelines"
description: "A detailed breakdown of how to evaluate AI systems effectively. Covers evaluation criteria, model selection, instruction-following, safety, latency, cost, and building robust pipelines to guide model quality."
tags: [AI, Evaluation, Benchmarks, LLM, Model Selection, Development]
author: admin
---

I am reading the book [AI Engineering by Chip Huyen](https://www.oreilly.com/library/view/ai-engineering/9781098166298/) for an AI book club at work. 
These notes have been distilled and sanitized for public consumption from Chapter 4 of the book.  AI evaluation is a critical component of AI engineering. 
This chapter mainly covers evaluating AI systems. There are three main components:

- **Evaluation criteria**
- **Model selection**
- **Building out your evaluation pipelines**

All three actions are needed to confidently build scalable and resilient AI systems.

# Evaluation Criteria
Evaluation-driven development is the process of understanding how an application will be evaluated before investing time, money, and resources building something with it.

>Evaluation is the biggest bottleneck to AI adoption.

Companies need to start with a set of criteria that is specific to the kind of applications they are trying to develop. An organization might want to choose *different* models for different services/components depending on the kinds of things that AI will be doing in production. For example, you may want one model that specializes in providing summarization while another separate model classifies customer responses. 

Multiple-choice question scoring is a common way to evaluate models, but performance can vary with small changes in the way questions are posed, leading to fragile evaluations. In Chapter 5, there's a deeper discussion on prompt sensitivity. MCQSs also fall short when evaluating generation, such as summarization, translation, and essay writing.

## Generation Capacity

OG metrics for models included **fluency** (eg. grammar, feel) and **coherence** (eg. logical structure of response). But these two metrics have become insufficient for more modern models, requiring AI engineers to think harder about the ways in which they work with these LLMs. **Natural language generation (NLG)** metrics have been repurposed to meet the needs of foundation models; nowadays, generated LLM responses are indistinguishable from real human replies which means that fluency & coherence have become less important overall.

Factual Consistency: how the model fairs against context. A response is considered "correct" if the response is supported by the provided context. Local factual consistency specifically evaluates provided context, while global factual consistency evaluates broad knowledge (eg. the sky is blue, not green). Verifying "facts" is the hardest part of factual consistency checking because there is a lot of subjectivity and false information embedded inside training data. Consider what response a foundation model should provide if a user asks "what is the most important meal of the day?" Or, "what is the best way to make a new friend?" There are infinite valid answers to these sorts of questions. Wan et. al. 2024 found that existing models ignore things like references or neutral tone when deciding what kind of training data is accurate, so newer foundation models have gotten better at discerning what's "fact" and what's "fiction" or "opinion."

>When validating hallucinations, focus on checking for hallucinated niche knowledge, and queries about things that don't exist.

More sophisticated LLM-as-a-judges use techniques such as self-verification and knowledge-augmented verification to determine the quality and accuracy of an AI response.

Search-augmented factuality evaluators can be used to break an output into individual facts and then use a search engine to verify said facts. Textual entailment is then used to determine the relationship between two segments (entailment-hypothesis can be inferred from the premise; contradiction-hypothesis contradicts the premise; neutral-premise neither entails or contradicts the hypothesis). Instead of leveraging more general-purpose AI judges, you can train scorer models to specifically identify factual consistency by leveraging a premises-hypothesis pair as inputs and a predefined entailment as output. DeBERTa-v3-mnli-fever-anli is a 184 million parameter model that can be used for such a task.

## Safety Of Foundation Models

Companies building customer-facing products must also keep safety at the forefront of their evaluations. Responses containing inappropriate language, harmful recommendations, hate speech, violence, or stereotypes are detrimental to the overall user experience and open organizations up to liability inquiries. Safety evaluations should be ongoing and aligned with customer-specific content guidelines.

## Instruction Following Capability

Some models follow instructions better than others and that dramatically affects the quality of outputs for your application. Poor instruction following can directly degrade customer satisfaction and performance metrics. 

>If the model is bad at following instructions, it doesn't matter how good your instructions are, the outputs will be bad.

Benchmarks such as INFOBench evaluates a model's ability to follow content constraints, such as discussion restrictions. However, the verification of expanded instruction types, such as linguistic guidelines and style cannot be easily automated (currently). If you instruct a model to use "language appropriate for a young audience," how do you automatically verify that the output is indeed appropriate? What does "young" even mean? Introducing ambiguity into your requests is a sure-fire way to inject variance in your outputs. 

INFOBench found that GPT-4 is a reasonably reliably and cost-effective evaluator. 

>GPT-4 isn't as accurate as human experts, but it's more accurate than annotators recruited through Amazon Mechanical Turk.

Roleplaying capability evaluation is also tricky to automate. RoleLLM evaluates a model's ability to emulate a persona using pre-defined similarity scores and AI judges. This might be something worth investigating. In general though, one should evaluate your roleplaying AI based on style and knowledge, the two key characteristics of these sorts of bots.

## Cost & Latency Considerations

AI engineering is a careful balance between model **quality**, **latency**, and **cost**. Most companies will opt for lower quality models that are faster and cheaper. At scale, even minor latency regressions can degrade customer experience. Pareto optimization of foundation models can be done using public model benchmarks and internal evaluation tools, such as LangSmith. Price can be applied to each benchmark to provide a more holistic view of the opportunity costs associated with using one model over another. 

Latency metrics for models include time-to-first-token, time per token, time between tokens, time per query, and more. Essentially, measuring the deltas of tokens and queries provide AI engineers with a latency benchmark that can be extrapolated across larger requests and multiple turns.

# Model Selection

The model selection process can become quite nuanced if you decide to optimize for speed and cost at a per-service basis. When comparing different models, you need to differentiate between **hard attributes** (what is impossible/impractical for you to change) and **soft attributes** (what are you able to change). Typically, hard attributes are business requirements while soft attributes comprise metrics like accuracy, toxicity, and factual consistency, i.e. things that can be massaged through prompt engineering. 

A high-level evaluation workflow looks like this:

- Filter out models whose hard attributes conflict with your desired application.
- Use benchmarks to narrow down a model based on accuracy, cost, and latency.
	- There are also considerations surrounding things like data security and open-access.
- Run experiments using your own internal evals to confirm shortlist any viable models.
- Once selected, continually monitor your selected model with evals and human verification.
	- You can compare internal evals to customer CSAT scores to validate production models.

## Model Build Versus Model Buy

There will always be a performance and accuracy gap between commercial models and open-source models because there aren't enough financial incentives to release highly-performant models for free. In the real world, organizations typically *open-source their weaker models and sell their stronger models.* This creates a gap in the ecosystem of available models; open-source models may be perfectly performant for certain applications, but in general, commercially available models have continued to out-pace what's available for free.

There's a cost-benefit analysis that needs to happen when commercial model usage grows. There is substantial effort and capital needed to build, maintain, and serve your own internal models which means the typical cost needed to invest in internal models is quite high. One benefit to maintaining your own models is that your business has full control over the model's training data (potentially leading to more niche models for highly specialized fields) and the outputs (allowing organizations to micro-manage the kinds of outputs their models produce).

## Functionality Of Internal Models

One major benefit to building your own models is specializing the model to your niche requests. An organization can fine-tune scalability, function use, structured outputs, and guardrails to meet their personalized needs. While this may be overkill for most organizations, it's important to understand the trade-offs between model control and external provider dependency. If a third-party removes key functionality, customers must react, whereas those sorts of pivots aren’t a concern with in-house models.

## Benchmarks & Data Contamination

One concern that has cropped up recently is _the saturation of publicly available benchmarks_, so much so that providers like Hugging Face have had to update their benchmarks with fresh examples & evals, and more complex asks. This isn't the first time that they've done this, and they're set to do it again once the current generation of foundation models saturate the leaderboards with near-identical results. Essentially, public benchmarks need to remain nimble and agile to ensure that their data remains coherent and accurate. The older a leaderboard is, the less valuable its results are in evaluating present-day models.

**Data contamination** typically happens indirectly in public benchmarks. One example would be using math textbooks to train your model while someone else uses that same textbook to create evals. The benchmark result for this hypothetical model would be inaccurate because we'd be inadvertently using the same training data to evaluate the model. A few ways to deal with data contamination include n-gram overlapping (filtering out sequences of matching tokens in an evaluation sample if it matches what was seen in the training data) and perplexity (low perplexity scores mean that the model has likely seen the data before). Note that n-gram overlapping is more accurate but it quite time-consuming and expensive since you're comparing n-token string subsets between a large training set and a (potentially large) example evaluation set. 

# Designing An Evaluation Pipeline

There are three main steps outlined for designing an evaluation pipeline:

**Evaluate all components in your desired system** to determine the necessary attributes of your AI models. Whether your evaluation is per-task, per-turn or per-intermediate-output, you need to identify the evaluation framework that you'll use beforehand.

**Create evaluation guidelines.** This is the most important step in the pipeline. You must define both what the application *should do* and what the application *shouldn't do*. The more explicit your guidelines, the more accurate your evaluation will be. There is high variability when guidelines are vague or subjective, so be crystal clear when you build up your evals. Try to tie evaluation metrics to your business metrics. Moreover, try to include examples wherever possible to allow the LLM-as-a-judge to leverage baseline behaviour.

**Define evaluation methods and data.** When selecting an evaluation method, try and tie specialized judges to matching functionality, like using a toxicity classifier to evaluate a bot whose purpose is to deal with hostile customers. When logprobs are available, use them as they are a great metric for determining a model's confidence towards a generated token.
Like a snake eating its own tail, you should also strive to evaluate your own eval pipelines. Ask yourself "is our eval pipeline getting the right signals," "how reliable is my pipeline overall," or "how correlated are my metrics" to form a more all-encompassing understanding of your pipeline. You should strive to regularly revisit and iterate on your evals; evals are active components of the product and should be treated as such.

# Final Thoughts on AI Evaluation

Evaluating AI systems isn’t just about metrics — it's about aligning models with business goals, ensuring user safety, and iterating constantly. Whether you're using off-the-shelf models or building your own, a strong evaluation pipeline is the backbone of reliable AI systems. This book has been eye-opening and I strongly encourage you, dear reader, to read through it if you build software using AI models.
