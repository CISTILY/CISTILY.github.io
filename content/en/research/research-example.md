---
title: "Hybrid Anomaly-Supervised Learning for Out-of-Distribution AI Code Detection"
summary: "Exploring the potential of anomaly-based detection for OOD AI Code Detection in SemEval-2026 Task 13, Subtask A"
published: true
sample: False
order: 2
tags: ["Research", "Machine Learning", "AI-generated code detection", "Out-of-distribution", "Generalisation", "Anomaly detection", "Stylometry", "Code forensics"]
---

## Research question

How effectively can lightweight models distinguish human-written from AI-generated source code when programming languages and application domains differ from those encountered during training?

This project investigates out-of-distribution (OOD) AI code detection for [SemEval-2026 Task 13, Subtask A](https://www.kaggle.com/competitions/sem-eval-2026-task-13-subtask-a/data). Existing detectors may rely on patterns specific to particular languages, generators or datasets, limiting their generalisation. We explore whether combining class-conditional anomaly detection with supervised learning improves detection across these shifts without fine-tuning large language models.

## Approach

We compare conventional supervised classification, dual one-class anomaly detection, and Hybrid Anomaly-Supervised Learning (HASL).

Each snippet is represented by up to 23 features: 20 stylometric statistics describing formatting, naming and structural complexity, alongside three Binoculars-derived perplexity signals. We evaluate 12 supervised classifiers and seven anomaly detectors across eight feature schemas.

The anomaly approach fits separate models to human-written and AI-generated code, then compares their normalised anomaly scores. HASL trains a supervised second-stage classifier on this score pair to learn an alternative to the fixed score-difference rule.

The dataset includes:
- Training: 500,000 algorithmic code samples in C++, Python and Java.
- Validation: 100,000 samples from the same distribution.
- Public development: 1,000 labelled samples used for feature selection, tuning and threshold selection.
- Final evaluation: 500,000 hidden-label samples covering seen and unseen languages and domains.
My role: Co-author of the paper. Specific individual responsibilities remain to be confirmed because the paper does not include a contribution statement.

## Results and limitations

The paper reports the following macro-F1 scores:
| Configuration | Public development | Hidden-label final test |
|---|---:|---:|
| Supervised Perceptron | 0.6730 | 0.6672 |
| Isolation Forest with score difference | 0.7244 | 0.6712 |
| Isolation Forest + Complement Naive Bayes | **0.7336** | **0.6857** |

The hybrid configuration achieves the highest reported final-test score among the evaluated systems. Anomaly detectors exhibit higher peak public-development performance but greater variability on the final test. Improvements from hybrid learning depend on the second-stage classifier.

Key limitations include:
- Development-set reuse: The public sample informs feature selection, tuning and thresholds; its scores are not independent held-out estimates.
- Batch-dependent normalisation: Anomaly scores depend on the evaluated batch, which can affect predictions.
- In-sample Stage 2 training: The hybrid classifier uses scores from samples used to fit Stage 1; cross-fitting remains untested.
- Limited evaluation detail: Hidden final labels and unavailable scoring masks prevent per-language and per-domain analysis.
- Uncertainty: Experiments use one random seed without repeated-run uncertainty estimates. Robustness under distribution shift is not guaranteed.
These findings were checked against the paper; the experiments were not independently rerun.

## Related resources

- Full paper: Link to be added when available.
- Github: https://github.com/Namronaldo08102004/ML_Code_Detector
- Presentation: Link to be added when available.