# Hướng dẫn setup Formspree cho trang Q&A

## Bước 1: Tạo tài khoản Formspree

1. Truy cập [https://formspree.io](https://formspree.io)
2. Đăng ký tài khoản miễn phí
3. Xác thực email

## Bước 2: Tạo form mới

1. Đăng nhập vào dashboard Formspree
2. Click "New Form"
3. Đặt tên form: "Q&A Contact Form"
4. Copy form endpoint URL (dạng: `https://formspree.io/f/xpwnqkqk`)

## Bước 3: Cập nhật form action

Trong file `_pages/qa.md`, thay thế URL trong form action:

```html
<form id="qaForm" action="YOUR_FORMSPREE_URL_HERE" method="POST">
```

## Bước 4: Cấu hình form fields

Formspree sẽ tự động nhận các field sau:
- `name`: Tên người gửi
- `email`: Email người gửi  
- `subject`: Chủ đề câu hỏi
- `question`: Nội dung câu hỏi
- `priority`: Mức độ ưu tiên
- `contact_method`: Phương thức liên hệ ưa thích

## Bước 5: Test form

1. Build và chạy Jekyll site
2. Truy cập trang Q&A
3. Điền và gửi form test
4. Kiểm tra email nhận được

## Bước 6: Cấu hình email template (tùy chọn)

1. Vào form settings trong Formspree
2. Cấu hình email template
3. Thêm auto-reply cho người gửi

## Lưu ý quan trọng

- Formspree miễn phí cho 50 submissions/tháng
- Có thể upgrade lên gói trả phí nếu cần nhiều hơn
- Form sẽ hoạt động ngay sau khi cập nhật URL
- Có thể thêm reCAPTCHA để tránh spam

## Troubleshooting

Nếu form không gửi được:
1. Kiểm tra URL form action
2. Kiểm tra console browser để xem lỗi
3. Kiểm tra email spam folder
4. Test với form đơn giản trước
