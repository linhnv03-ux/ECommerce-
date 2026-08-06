import React, { useState } from 'react';
import { useStore } from '@context/StoreContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import styles from './styles.module.scss';

function ContactUs() {
  const { addToast } = useStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Gửi tin nhắn thành công!', 'Chúng tôi sẽ phản hồi trong 2 giờ.', 'success');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.aboutHeader} style={{ marginBottom: 32 }}>
        <h1 className={styles.aboutTitle} style={{ fontSize: 32 }}>
          Liên Hệ XStore Marseille04
        </h1>
        <p className={styles.aboutDesc} style={{ fontSize: 13 }}>
          Chúng tôi sẵn sàng lắng nghe mọi thắc mắc và đóng góp từ quý khách hàng 24/7.
        </p>
      </div>

      <div className={styles.contactGrid}>
        <div className={styles.infoCol}>
          <div>
            <h3 className={styles.infoTitle}>Showroom Marseille04</h3>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <MapPin className={styles.infoIcon} style={{ width: 20, height: 20 }} />
                <div>
                  <span className={styles.infoLabel}>Địa chỉ Showroom</span>
                  <span className={styles.infoVal}>123 Phố Marseille, Quận 1, TP. Hồ Chí Minh</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Phone className={styles.infoIcon} style={{ width: 20, height: 20 }} />
                <div>
                  <span className={styles.infoLabel}>Hotline tư vấn</span>
                  <span className={styles.infoVal}>+84 1900 6868 (Miễn phí)</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Mail className={styles.infoIcon} style={{ width: 20, height: 20 }} />
                <div>
                  <span className={styles.infoLabel}>Email</span>
                  <span className={styles.infoVal}>contact@xstore-marseille.com</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Clock className={styles.infoIcon} style={{ width: 20, height: 20 }} />
                <div>
                  <span className={styles.infoLabel}>Giờ mở cửa</span>
                  <span className={styles.infoVal}>Thứ 2 - Chủ Nhật: 08:00 - 21:30</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.infoBanner}>
            📍 Quý khách có thể đến trải nghiệm trực tiếp bộ sưu tập sản phẩm mới nhất tại showroom của chúng tôi!
          </div>
        </div>

        <div className={styles.formCol}>
          {submitted ? (
            <div style={{ padding: '48px 0', textAlign: 'center' }}>
              <CheckCircle2 style={{ width: 64, height: 64, color: '#10b981', margin: '0 auto 16px auto' }} />
              <h3 className={styles.formTitle}>
                Gửi tin nhắn thành công!
              </h3>
              <p style={{ fontSize: 12, color: '#78716c', maxWidth: 380, margin: '0 auto 16px auto' }}>
                Cảm ơn bạn đã liên hệ với XStore Marseille04. Chuyên viên tư vấn sẽ gọi lại cho bạn trong thời gian sớm nhất.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className={styles.submitBtn}
                style={{ width: 'auto', padding: '10px 24px', margin: '0 auto' }}
              >
                Gửi thêm tin nhắn
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className={styles.formTitle}>
                Gửi câu hỏi cho chúng tôi
              </h3>

              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label>
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className={styles.field}>
                  <label>
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label>
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label>
                    Nội dung *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
              >
                <Send style={{ width: 16, height: 16 }} />
                Gửi Yêu Cầu
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
