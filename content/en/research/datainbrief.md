---
title: "PILL_B.LT26: Two-Sided Smartphone Pill Images for Fine-Grained Detection and Visual Categorization"
summary: "A two-sided smartphone image dataset of 10,548 pill images across 293 visual categories, with object-detection annotations, metadata, fixed splits, and detector benchmarks."
published: true
sample: False
order: 3
tags: ["PILL_B.LT26", "Pill identification", "Computer vision", "Object detection", "Pharmaceutical informatics", "Dataset", "Front-back domain shift"]
---

## Research question

How can computer-vision systems detect and distinguish visually similar solid oral dosage forms when appearance changes across pill faces, backgrounds, orientation, and lighting?

PILL_B.LT26 addresses this question with paired front- and back-view smartphone images and one object-detection annotation per image. It is designed for research in pill detection, closed-set visual categorization, and front/back domain shift.

**Common challenges include:**
- **Fine-grained similarity:** Different visual categories can share shape, color, coating, or size.
- **Face-dependent details:** Imprints may be shallow, small, or visible on only one side.
- **Capture variation:** Orientation, placement, background, device, and indoor illumination affect image appearance.
- **Annotation consistency:** Automated foreground segmentation can fragment a pill or include irrelevant components, so generated boxes need quality review.

We therefore describe a two-sided dataset and a reproducible detection pipeline that pair image-level metadata with a single canonical bounding box per image.

## Approach

The project combines controlled-but-variable image collection, automated annotation, fixed data splits, and baseline object-detector evaluation.

### Image collection and dataset design

The dataset contains 10,548 processed 640 × 640 RGB JPEG images across 293 visual categories. Each category represents one physical specimen and contributes 18 front-view (`MT`) and 18 back-view (`MS`) images. Captures were made in Ho Chi Minh City with iPhone 11 and iPhone XS Max smartphones, across six background surfaces, randomized in-plane orientations, and natural indoor illumination. Each image contains one pill.

Class-level metadata records visual category ID, dosage-form type, shape, color, and whether an imprint is present on each face. The metadata describe appearance; they do not identify a medicine's active ingredient, strength, manufacturer, or clinical status.

### Annotation and split construction

The annotation workflow uses U²-Net salient-object segmentation, connected-component analysis, and filename-derived category IDs to propose pill bounding boxes. Multi-component outliers are reviewed against their source images; nuisance components are removed, and fragmented pill regions are replaced by a single enclosing box when needed. The reviewed canonical boxes are synchronized into CSV, COCO-compatible JSON, and YOLO-style labels.

Fixed image-level manifests allocate 70% of images to training, 10% to validation, and 20% to testing. The split contains 7,383 training images, 1,055 validation images, and 2,110 test images. The validation partition covers 289 categories; training and test each cover all 293. Since images of the same physical specimen can occur in different partitions, these splits evaluate held-out views of known specimens rather than unseen specimens.

### Detector benchmarks

The repository includes YOLOv8n, YOLOv8s, Faster R-CNN, and RetinaNet baseline records. The documented benchmark setup uses 100 epochs, AdamW, a learning rate of 0.001, weight decay of 0.01, batch size 16, and 640-pixel inputs. Reported metrics include mAP@0.5, mAP@0.5:0.95, precision, recall, and F1.

The full-data benchmark table reports the following results:

| Model | mAP@0.5 | mAP@0.5:0.95 | Precision | Recall | F1 |
|---|---:|---:|---:|---:|---:|
| YOLOv8n | 0.833 | 0.824 | 0.723 | 0.804 | 0.762 |
| YOLOv8s | **0.912** | **0.904** | 0.828 | 0.861 | 0.845 |
| Faster R-CNN | 0.893 | 0.858 | **0.898** | **0.980** | **0.937** |
| RetinaNet | 0.894 | 0.883 | 0.897 | 0.968 | 0.931 |

These are repository benchmark records under the documented image-level protocol. They are baseline comparisons, not evidence of performance on unseen specimens or clinical medication verification.

## Results and limitations

The dataset offers balanced front/back views, repeated captures under varied backgrounds and orientations, and annotations in formats used by common detection frameworks. Baseline results show different trade-offs: YOLOv8s has the highest reported mAP values, while Faster R-CNN has the highest reported precision, recall, and F1 in the full-data table.

**Key limitations include:**
- **One specimen per category:** Repeated images represent views of the same physical pill, not independent specimens of the same marketed product.
- **Image-level split:** Views of a known specimen can appear across train, validation, and test, so test results do not establish generalization to unseen specimens.
- **Validation coverage:** The fixed validation partition contains 289 of the 293 visual categories.
- **Controlled scenes:** Images contain a single pill; performance in clutter, overlapping pills, blister packs, bottles, hands, or dispensing trays has not been established.
- **Visual labels only:** Category IDs and metadata do not supply verified drug identity, ingredients, dosage, authenticity, expiry, or patient-specific suitability.
- **Automated annotation:** Bounding boxes originate from a salient-object pipeline with review of flagged outliers and should be interpreted as research labels.
- **No clinical validation:** Benchmark results do not establish autonomous medication identification or safe clinical deployment.

## Acknowledgements
To be updated.

## Related resources
To be updated.