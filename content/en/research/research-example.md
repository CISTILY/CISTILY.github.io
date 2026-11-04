---
title: "Hybrid Anomaly-Supervised Learning for Out-of-Distribution AI Code Detection"
summary: "Combines anomaly detection and supervised learning to identify AI-generated code, achieving 0.6857 macro-F1 on the SemEval-2026 Task 13 final test set."
published: true
sample: False
order: 1
tags: ["KSE 2026", "Machine Learning", "AI-generated code detection", "Out-of-distribution", "Generalisation", "Anomaly detection", "Stylometry", "Code forensics"]
---

## Research question

How can lightweight models reliably distinguish human-written from AI-generated source code when programming languages and application domains differ from those encountered during training?

This project addresses two challenges in [SemEval-2026 Task 13, Subtask A](https://www.kaggle.com/competitions/sem-eval-2026-task-13-subtask-a/overview): generalisation to unseen programming languages and transfer from algorithmic code to research and production code.

**Previous approaches face several limitations:**
- **Watermarking** requires access to the code-generation process, limiting its applicability to code produced by third-party models.
- **Fine-tuned neural detectors** can learn generator-specific or domain-specific shortcuts that transfer poorly to unfamiliar code.
- **Conventional supervised classifiers** learn decision boundaries that may become less effective as feature distributions and class proportions change.
- **Perplexity-based detectors** perform inconsistently across programming languages, making a single statistical signal insufficient for reliable detection.

We therefore investigate whether compact **stylometric features**, **class-conditional anomaly modelling and supervised fusion** can improve detection under distribution shift without fine-tuning large language models.

## Approach

We investigate three complementary approaches to understand their performance and generalisation trade-offs.

### Feature engineering and selection
We represent each snippet using 20 stylometric features describing formatting, naming and structural complexity, alongside three Binoculars-derived perplexity signals. Stylometric features offer interpretable descriptors computed without language-specific parsers, while perplexity signals provide complementary model-based information.

Because informative features in the training distribution may become unreliable under shift, we assess features using four criteria: individual discrimination, model-based importance, OOD stability and redundancy. This produces eight feature schemas for comparison.

### Supervised and dual one-class detection
We evaluate 12 supervised classifiers as baselines and seven anomaly detection algorithms. The anomaly approach fits separate models to human-written and AI-generated code, then compares their normalised anomaly scores.

We choose this formulation to investigate whether relative compatibility with the two classes provides a useful alternative to learning a single classification boundary. The score difference may cancel shared additive shifts, but this benefit is conditional and does not guarantee OOD robustness.

### Hybrid Anomaly-Supervised Learning
HASL trains a supervised second-stage classifier on the two anomaly scores. We choose this approach because a fixed score difference assigns equal, opposite weights to both scores. A learned classifier can use their contributions asymmetrically and, depending on the classifier, capture more flexible decision boundaries.

**The dataset includes:**
- **Training:** 500,000 algorithmic code samples in C++, Python and Java.
- **Validation:** 100,000 samples from the same distribution.
- **Public development:** 1,000 labelled samples used for feature selection, tuning and threshold selection.
- **Final evaluation:** 500,000 hidden-label samples covering seen and unseen languages and domains.

## Results and limitations

The main results are as follow:
| Configuration | Public development | Hidden-label final test |
|---|---:|---:|
| Supervised Perceptron | 0.6730 | 0.6672 |
| Isolation Forest with score difference | 0.7244 | 0.6712 |
| Isolation Forest + Complement Naive Bayes | **0.7336** | **0.6857** |

The hybrid configuration achieves the highest reported final-test score among the evaluated systems. Anomaly detectors exhibit higher peak public-development performance but greater variability on the final test. Improvements from hybrid learning depend on the second-stage classifier.

**Key limitations include:**
- **Development-set reuse:** The public sample informs feature selection, tuning and thresholds; its scores are not independent held-out estimates.
- **Batch-dependent normalisation:** Anomaly scores depend on the evaluated batch, which can affect predictions.
- **In-sample Stage 2 training:** The hybrid classifier uses scores from samples used to fit Stage 1; cross-fitting remains untested.
- **Limited evaluation detail:** Hidden final labels and unavailable scoring masks prevent per-language and per-domain analysis.
- **Uncertainty:** Experiments use one random seed without repeated-run uncertainty estimates. Robustness under distribution shift is not guaranteed.

## Acknowledgements
We would like to express our sincere gratitude to:

- **Dr. Tung Le and Dr. Duy Hoang Tran** for their invaluable guidance and expert insights throughout this research.
- **Faculty of Information Technology, University of Science, Ho Chi Minh City, Vietnam**, for providing the academic foundation and research funding.

## Related resources

- Full paper: Link to be added when available.
- Github: https://github.com/Namronaldo08102004/ML_Code_Detector
- Presentation: Link to be added when available.
- KSE 2026 conference program: https://kse2026.kse-conferences.org/program/