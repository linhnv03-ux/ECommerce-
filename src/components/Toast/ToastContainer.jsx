import React from 'react';
import { useStore } from '@context/StoreContext';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import styles from './styles.module.scss';

function ToastContainer() {
  const { toasts, removeToast } = useStore();

  return (
    <div className={styles.toastBox}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className={styles.toastCard}
          >
            {toast.image ? (
              <img
                src={toast.image}
                alt={toast.title}
                className={styles.toastImg}
              />
            ) : (
              <div className={styles.toastIconBox}>
                {toast.type === 'warning' ? (
                  <AlertCircle className={`${styles.iconWarning}`} style={{ width: 20, height: 20 }} />
                ) : toast.type === 'info' ? (
                  <Info className={`${styles.iconInfo}`} style={{ width: 20, height: 20 }} />
                ) : (
                  <CheckCircle2 className={`${styles.iconSuccess}`} style={{ width: 20, height: 20 }} />
                )}
              </div>
            )}

            <div className={styles.toastContent}>
              <h4 className={styles.toastTitle}>
                {toast.title}
              </h4>
              {toast.description && (
                <p className={styles.toastDesc}>
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className={styles.closeToastBtn}
            >
              <X style={{ width: 16, height: 16 }} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ToastContainer;
