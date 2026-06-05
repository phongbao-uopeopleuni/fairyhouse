# 📂 Cấu trúc Lưu trữ Hình ảnh - Fairy's House Hue (Image Folder Structure)

Tài liệu này hướng dẫn cách sắp xếp, phân loại và đặt tên hình ảnh trong thư mục `/assets/images` một cách khoa học, chuyên nghiệp. Cấu trúc này giúp tối ưu hóa hiệu suất tải trang, cải thiện thứ hạng SEO hình ảnh trên Google và dễ dàng quản lý khi số lượng phòng nghệ thuật hoặc bài viết cẩm nang tăng lên trong tương lai.

---

## 1. Sơ đồ Cấu trúc Thư mục Thông minh (Directory Hierarchy)

Dưới đây là sơ đồ tổ chức thư mục khuyến nghị để bạn sắp xếp các hình ảnh một cách ngăn nắp:

```text
/assets/images/
├── brand/                  # Nhận diện thương hiệu & Hạ tầng web (Brand Assets)
│   ├── logo-fairys-house.png
│   ├── pattern-bg.svg
│   ├── hero-home-banner.webp
│   └── icon-fairy.svg
│
├── rooms/                  # Hình ảnh chi tiết về các hạng phòng (Guest Rooms)
│   ├── doi-am-cung/        # Thư mục cho hạng phòng Đôi Ấm Cúng (Cosy Double Room)
│   │   ├── cover.webp      # Ảnh chính đại diện của phòng
│   │   ├── giuong.webp
│   │   └── chi-tiet-1.webp
│   ├── gia-dinh/           # Thư mục cho hạng phòng Gia Đình (Family Suite)
│   └── nhom-ban/           # Thư mục cho hạng phòng Nhóm Bạn (Friends Dorm/Triple)
│
├── homestay/               # Không gian vườn và thiết kế kiến trúc chung (Common Spaces & Exterior)
│   ├── san-vuon/           # Khu vực sân vườn xanh mướt, góc check-in ngoài trời
│   ├── bep-an/             # Góc bếp chung ấm áp, bàn ăn sáng ngọt ngào
│   ├── tiep-tan/           # Phòng sảnh tiếp đón nghệ thuật
│   └── ngoai-canh/         # Toàn cảnh mặt tiền, lối vào ban ngày và lung linh ban đêm
│
└── articles/               # Hình ảnh minh họa cho các bài viết, cẩm nang (Guides & Articles)
    ├── an-gi-o-hue/        # Loạt ảnh ẩm thực Huế (bún bò, bánh lọc, trà cung đình, chè hẻm)
    ├── dia-diem-gan/       # Địa điểm du lịch lân cận (Cung An Định, Sông Hương, Chùa Thiên Mụ)
    └── kinh-nghiem/        # Ảnh minh họa chia sẻ mẹo đặt homestay, lịch trình du hí cố đô
```

---

## 2. Quy tắc Đặt tên File thông minh (Smart File Naming Convention)

Độ đồng bộ và chuyên nghiệp bắt đầu từ tên tập tin. Để tránh các lỗi hiển thị trên môi trường Internet (như lỗi mã hóa khoảng trắng thành `%20`), đồng thời giúp tăng hạng tìm kiếm tự nhiên của hình ảnh trên Google:

1. **Chữ viết thường, không dấu, các từ cách nhau bằng dấu gạch ngang (`-`)**:
   - ❌ *Sai*: `Ảnh Góc Sân Vườn_01.JPG` (Chứa chữ hoa, dấu tiếng Việt, khoảng trắng)
   - ✅ *Đúng*: `goc-san-vuon-01.webp`
2. **Có tính mô tả ngắn gọn và gắn liền với ngữ cảnh**:
   - *Ví dụ*: `bun-bo-hue-khoi-nghi-ngut.webp` thay vì tên gốc từ máy ảnh như `DSC_0981.jpg`.
3. **Tránh tuyệt đối ký tự đặc biệt**: Không sử dụng các ký tự như `@`, `#`, `$`, `%`, `&`, `(`, `)` trong tên tập tin.

---

## 3. Quy chuẩn Tối ưu Hóa Dung lượng Ảnh (Image Optimization Guide)

**Cảnh cáo quan trọng:** Điện thoại và máy ảnh hiện đại chụp ảnh sắc nét có dung lượng từ **3MB đến 15MB/ảnh**. Nếu đăng trực tiếp các ảnh này lên website, trang của bạn sẽ trở nên cực kỳ nặng nề, khiến khách du lịch bỏ cuộc vì chờ tải quá lâu.

Hãy tuân thủ tỷ lệ tỉ mỉ sau trước khi tải lên:

| Loại hình ảnh | Kích thước lý tưởng (Chiều rộng - Width) | Định dạng tối ưu | Dung lượng tối đa cho phép |
| :--- | :--- | :--- | :--- |
| **Ảnh đại diện lớn (Hero Banner / Header)** | `1920px` đến `2560px` | `.webp` | `< 250 KB` |
| **Ảnh chi tiết phòng / Không gian** | `1200px` | `.webp` | `< 120 KB` |
| **Ảnh nội dung bài viết / Blog** | `800px` | `.webp` | `< 80 KB` |
| **Biểu tượng đồ họa / Logo** | Bản gốc phù hợp | `.svg` hoặc `.png` | `< 20 KB` |

### 💡 Tại sao nên chọn định dạng `.webp`?
Định dạng `.webp` là chuẩn nén tiên tiến nhất được giới thiệu bởi Google. Nó giúp giữ nguyên vẹn độ sắc nét của tác phẩm nội thất nhưng giảm dung lượng tập tin xuống **70% - 80%** so với định dạng `.jpg` hoặc `.png` truyền thống.

### 🛠️ Các công cụ nén ảnh chất lượng cao hoàn toàn miễn phí:
1. **[Squoosh.app](https://squoosh.app)** (Khuyên dùng nhất - Công cụ của Google giúp bạn kéo thả, xem trực tiếp so sánh chất lượng ảnh gốc và ảnh nén, hỗ trợ chuyển đổi sang `.webp` cực nhanh).
2. **[TinyPNG.com](https://tinypng.com)** (Giải pháp tuyệt vời để nén tự động hàng loạt tệp ảnh `.png` hoặc `.jpg` cùng một lúc).

---

# 📂 English Version of Folder Organization Manual

To support international workflows, here is the quick-reference guide in English.

### Directory Mapping
* `/assets/images/brand/` - Logos, brand marks, and system decorations.
* `/assets/images/rooms/` - Accommodation galleries subdivided into specific room styles (e.g. `doi-am-cung/`, `gia-dinh/`, `nhom-ban/`).
* `/assets/images/homestay/` - Spatial designs, botanical garden, workspace, and exterior.
* `/assets/images/articles/` - Editorial travel logs, local culinary tips, and regional guides.

### Naming Guide & Optimization
* All file names must be lower-case, with words separated strictly by hyphens, e.g., `cozy-room-bedside.webp`. Do not use spaces, accents, or special characters.
* Always compress and export to `.webp`. Keep hero banner images below `250KB` and standard gallery photographs below `120KB` using **Squoosh.app** or **TinyPNG.com** to maintain high-speed loading times for foreign travelers.
