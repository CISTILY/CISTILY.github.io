---
title: "PILL_B.LT26: Ảnh viên thuốc hai mặt chụp bằng điện thoại phục vụ phát hiện chi tiết và phân loại hình ảnh"
summary: "Bộ dữ liệu ảnh viên thuốc chụp hai mặt bằng điện thoại gồm 10.548 ảnh thuộc 293 nhóm thị giác, kèm nhãn phát hiện đối tượng, siêu dữ liệu, phân hoạch cố định và các mô hình phát hiện đối chứng."
published: true
sample: false
order: 3
tags: ["PILL_B.LT26", "Nhận dạng viên thuốc", "Thị giác máy tính", "Phát hiện đối tượng", "Tin học dược phẩm", "Bộ dữ liệu", "Dịch chuyển miền mặt trước-mặt sau"]
---

## Câu hỏi nghiên cứu

Làm thế nào để hệ thống thị giác máy tính phát hiện và phân biệt các dạng thuốc rắn uống có hình ảnh tương tự, khi diện mạo thay đổi theo mặt viên thuốc, phông nền, hướng đặt và ánh sáng?

PILL_B.LT26 giải quyết câu hỏi này bằng ảnh ghép cặp mặt trước và mặt sau chụp bằng điện thoại, cùng một nhãn phát hiện đối tượng cho mỗi ảnh. Bộ dữ liệu phục vụ nghiên cứu phát hiện viên thuốc, phân loại hình ảnh trong tập lớp đóng và dịch chuyển miền giữa hai mặt.

**Các thách thức phổ biến gồm:**
- **Các lớp rất giống nhau:** Nhiều nhóm thị giác có thể tương đồng về hình dạng, màu sắc, lớp phủ hoặc kích thước.
- **Chi tiết phụ thuộc mặt:** Chữ khắc có thể nông, nhỏ hoặc chỉ nhìn thấy ở một mặt.
- **Biến thiên khi chụp:** Hướng, vị trí, phông nền, thiết bị và ánh sáng trong nhà làm thay đổi diện mạo ảnh.
- **Tính nhất quán của nhãn:** Phân đoạn tiền cảnh tự động có thể chia viên thuốc thành nhiều phần hoặc lấy cả thành phần không liên quan, nên hộp giới hạn được tạo cần được rà soát.

Vì vậy, chúng tôi mô tả bộ dữ liệu hai mặt và quy trình phát hiện có thể tái lập, kết hợp siêu dữ liệu cấp ảnh với một hộp giới hạn chuẩn cho mỗi ảnh.

## Phương pháp

Đề tài kết hợp thu thập ảnh có kiểm soát nhưng đa dạng, gán nhãn tự động, phân hoạch dữ liệu cố định và đánh giá các mô hình phát hiện đối tượng cơ sở.

### Thu thập ảnh và thiết kế bộ dữ liệu

Bộ dữ liệu gồm 10.548 ảnh JPEG RGB đã xử lý, kích thước 640 × 640, thuộc 293 nhóm thị giác. Mỗi nhóm đại diện cho một mẫu vật lý và có 18 ảnh mặt trước (`MT`) cùng 18 ảnh mặt sau (`MS`). Ảnh được chụp tại Thành phố Hồ Chí Minh bằng điện thoại iPhone 11 và iPhone XS Max, trên sáu bề mặt phông nền, với hướng xoay trong mặt phẳng được ngẫu nhiên hóa và ánh sáng tự nhiên trong nhà. Mỗi ảnh có một viên thuốc.

Siêu dữ liệu cấp lớp ghi nhận mã nhóm thị giác, dạng thuốc, hình dạng, màu sắc và việc mỗi mặt có chữ khắc hay không. Siêu dữ liệu mô tả diện mạo, không xác định hoạt chất, hàm lượng, nhà sản xuất hay tình trạng lâm sàng của thuốc.

### Gán nhãn và tạo phân hoạch

Quy trình gán nhãn dùng phân đoạn vật thể nổi bật U²-Net, phân tích thành phần liên thông và mã nhóm suy ra từ tên tệp để đề xuất hộp giới hạn viên thuốc. Các ngoại lệ có nhiều thành phần được rà soát dựa trên ảnh gốc; thành phần gây nhiễu được loại bỏ, còn vùng viên thuốc bị phân mảnh được thay bằng một hộp bao duy nhất khi cần. Các hộp chuẩn đã rà soát được đồng bộ thành CSV, JSON tương thích COCO và nhãn kiểu YOLO.

Các tệp kê khai cố định ở cấp ảnh phân bổ 70% ảnh cho huấn luyện, 10% cho thẩm định và 20% cho kiểm tra. Phân hoạch gồm 7.383 ảnh huấn luyện, 1.055 ảnh thẩm định và 2.110 ảnh kiểm tra. Tập thẩm định bao phủ 289 nhóm; tập huấn luyện và kiểm tra bao phủ đủ 293 nhóm. Vì ảnh của cùng mẫu vật lý có thể xuất hiện ở nhiều phân hoạch, các phân hoạch này đánh giá những góc chụp chưa thấy của mẫu đã biết, chứ không phải mẫu vật chưa từng thấy.

### Đối chuẩn mô hình phát hiện

Kho mã nguồn có các kết quả đối chuẩn cho YOLOv8n, YOLOv8s, Faster R-CNN và RetinaNet. Thiết lập được tài liệu hóa gồm 100 epoch, AdamW, tốc độ học 0,001, weight decay 0,01, batch size 16 và đầu vào 640 pixel. Các chỉ số được báo cáo gồm mAP@0.5, mAP@0.5:0.95, precision, recall và F1.

Bảng đối chuẩn trên toàn bộ dữ liệu ghi nhận:

| Mô hình | mAP@0.5 | mAP@0.5:0.95 | Precision | Recall | F1 |
|---|---:|---:|---:|---:|---:|
| YOLOv8n | 0.833 | 0.824 | 0.723 | 0.804 | 0.762 |
| YOLOv8s | **0.912** | **0.904** | 0.828 | 0.861 | 0.845 |
| Faster R-CNN | 0.893 | 0.858 | **0.898** | **0.980** | **0.937** |
| RetinaNet | 0.894 | 0.883 | 0.897 | 0.968 | 0.931 |

Đây là kết quả đối chuẩn trong kho mã nguồn theo quy trình phân hoạch cấp ảnh đã mô tả. Chúng là phép so sánh cơ sở, không chứng minh hiệu năng trên mẫu vật chưa thấy hoặc khả năng xác minh thuốc trong lâm sàng.

## Kết quả và giới hạn

Bộ dữ liệu cung cấp góc nhìn trước-sau cân bằng, ảnh chụp lặp lại với phông nền và hướng khác nhau, cùng nhãn theo các định dạng phổ biến của khung phát hiện. Kết quả cơ sở thể hiện các đánh đổi khác nhau: YOLOv8s có mAP được báo cáo cao nhất, còn Faster R-CNN có precision, recall và F1 cao nhất trong bảng toàn bộ dữ liệu.

**Các giới hạn chính:**
- **Một mẫu vật mỗi nhóm:** Ảnh lặp lại là các góc chụp của cùng một viên thuốc vật lý, không phải các mẫu độc lập của cùng sản phẩm thương mại.
- **Phân hoạch cấp ảnh:** Góc chụp của một mẫu vật có thể xuất hiện ở cả tập huấn luyện, thẩm định và kiểm tra; do đó kết quả kiểm tra không chứng minh khả năng khái quát sang mẫu vật chưa thấy.
- **Độ bao phủ tập thẩm định:** Phân hoạch thẩm định cố định có 289 trên 293 nhóm thị giác.
- **Bối cảnh chụp có kiểm soát:** Ảnh chỉ chứa một viên thuốc; hiệu năng trong cảnh lộn xộn, viên chồng lấp, vỉ thuốc, chai lọ, bàn tay hoặc khay cấp phát chưa được xác lập.
- **Nhãn chỉ mô tả hình ảnh:** Mã nhóm và siêu dữ liệu không xác nhận danh tính thuốc, thành phần, liều dùng, tính xác thực, hạn dùng hoặc mức phù hợp với từng bệnh nhân.
- **Gán nhãn tự động:** Hộp giới hạn bắt nguồn từ quy trình phân đoạn vật thể nổi bật, có rà soát ngoại lệ được gắn cờ và nên được xem là nhãn phục vụ nghiên cứu.
- **Chưa thẩm định lâm sàng:** Kết quả đối chuẩn không chứng minh khả năng tự động nhận dạng thuốc hoặc triển khai lâm sàng an toàn.

## Lời cảm ơn

Sẽ được cập nhật.

## Tài nguyên liên quan

Sẽ được cập nhật.
