import React from 'react';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import { useStore } from '@context/StoreContext';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

function Blog() {
  const { t } = useStore();

  const posts = [
    {
      id: 1,
      title: 'Xu hướng thiết kế nội thất Marseille 2026: Tinh tế và Tối giản',
      excerpt: 'Khám phá sự kết hợp hoàn hảo giữa phong cách kiến trúc Địa Trung Hải thanh lịch và tư duy thiết kế hiện đại...',
      date: '08 Tháng 8, 2026',
      author: 'XStore Editorial',
      category: 'Kiến Trúc & Nội Thất',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Bí quyết chọn đèn trang trí tạo điểm nhấn sang trọng cho phòng khách',
      excerpt: 'Ánh sáng là linh hồn của ngôi nhà. Hướng dẫn chọn ánh sáng ấm áp và tinh tế nâng tầm không gian sống...',
      date: '02 Tháng 8, 2026',
      author: 'Marseille Studio',
      category: 'Trang Trí Nhà Cửa',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Nghệ thuật phối đồ Minimalism dành cho mùa thu đông',
      excerpt: 'Bộ sưu tập thời trang chất liệu hữu cơ cao cấp giúp bạn tự tin thể hiện phong cách tối giản cuốn hút...',
      date: '28 Tháng 7, 2026',
      author: 'Fashion Stylist',
      category: 'Thời Trang',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <>
      <Header />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 16px', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#1c1917', marginBottom: 12 }}>
            XStore Marseille Blog
          </h1>
          <p style={{ color: '#78716c', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>
            Tin tức thời trang, xu hướng nội thất và phong cách sống từ Marseille Collection
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32 }}>
          {posts.map((post) => (
            <article
              key={post.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid #e7e5e4',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <img
                src={post.image}
                alt={post.title}
                style={{ width: '100%', height: 220, objectFit: 'cover' }}
              />
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#a8a29e', marginBottom: 12 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar style={{ width: 14, height: 14 }} /> {post.date}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Tag style={{ width: 14, height: 14, color: '#d97706' }} /> {post.category}
                  </span>
                </div>

                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1c1917', lineHeight: 1.4, marginBottom: 12 }}>
                  {post.title}
                </h2>

                <p style={{ fontSize: 14, color: '#78716c', lineHeight: 1.6, marginBottom: 20 }}>
                  {post.excerpt}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f5f5f4', paddingTop: 16 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#57534e', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <User style={{ width: 14, height: 14 }} /> {post.author}
                  </span>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#d97706',
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    Đọc thêm <ArrowRight style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Blog;
