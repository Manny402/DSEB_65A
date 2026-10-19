# Quà 20/10 · DSEB 65A

Trang web vòng quay may mắn → hộp quà phát sáng → một trong sáu món trà ngẫu nhiên cùng lời chúc 20/10. Chạy trực tiếp bằng HTML, CSS và JavaScript, không cần cài thư viện hoặc build.

## Đưa lên GitHub Pages bằng trình duyệt

1. Đăng nhập GitHub và mở https://github.com/new.
2. Đặt tên repository là `dseb-65a-2010`, chọn **Public**, bật **Add README**, rồi bấm **Create repository**.
3. Trong repository, chọn **Add file → Upload files**. Nếu repository còn trống, dùng liên kết **uploading an existing file**.
4. Upload các tệp **nằm bên trong thư mục này** lên cấp gốc của repository:

   ```text
   index.html
   style.css
   app.js
   .nojekyll
   README.md
   ```

   Ba tệp `index.html`, `style.css`, `app.js` là bắt buộc. `.nojekyll` là tệp ẩn tùy chọn để bỏ qua xử lý Jekyll; nếu không thấy tệp này trong cửa sổ chọn tệp Windows, vẫn có thể upload ba tệp bắt buộc để chạy trang này. Không upload nguyên tệp ZIP hoặc đặt các tệp trong một thư mục con.

5. Bấm **Commit changes** để lưu lên nhánh `main`.
6. Mở **Settings → Pages**. Tại **Build and deployment**, chọn:

   - **Source:** `Deploy from a branch`
   - **Branch:** `main`
   - **Folder:** `/(root)`

7. Bấm **Save**. Chờ GitHub triển khai; có thể mất đến 10 phút. Trong cùng mục **Pages**, bấm **Visit site** khi đường dẫn xuất hiện.
8. Gửi đường dẫn đó cho các bạn nữ. Với tên repository ở trên, đường dẫn có dạng:

   ```text
   https://TEN-TAI-KHOAN-GITHUB.github.io/dseb-65a-2010/
   ```

   Thay `TEN-TAI-KHOAN-GITHUB` bằng tên đăng nhập GitHub của bạn. Đây là mẫu đường dẫn; website chỉ có thể truy cập sau khi GitHub triển khai thành công. Người nhận dùng cùng một đường dẫn, không cần đăng nhập; mỗi người có lượt quay ngẫu nhiên riêng trên trình duyệt của mình.

## Nếu trang chưa hiện

- Kiểm tra `index.html` nằm ngay ở cấp gốc và tên tệp viết thường.
- Kiểm tra đã upload cả `style.css` và `app.js` cùng cấp với `index.html`.
- Kiểm tra **Settings → Pages** đang chọn `main` và `/(root)`.
- Mở tab **Actions** để xem tiến trình `pages build and deployment` và lỗi nếu có.
- Sau khi triển khai xong, tải lại bằng `Ctrl + F5` nếu trình duyệt vẫn giữ bản cũ.

## Chỉnh sửa

- `index.html`: nội dung và lời chúc.
- `style.css`: màu sắc, bố cục và hiệu ứng.
- `app.js`: vòng quay, thời gian mở quà, đồ uống ngẫu nhiên và âm thanh tùy chọn.

Font chữ được tải từ Google Fonts khi có kết nối mạng; trang có font dự phòng. Hình minh họa nằm trong mã nguồn, không cần upload hình riêng.

Hướng dẫn chính thức: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
