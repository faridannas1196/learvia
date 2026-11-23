import { motion } from 'motion/react';
import { cx } from '../../lib/cx';

const tags = { section: motion.section, div: motion.div, article: motion.article, li: motion.li };

/**
 * Kartu bergaya modern mengikuti referensi SRMS:
 * - Sudut membulat lembut (rounded-2xl)
 * - Latar putih bersih (bg-white)
 * - Border ultra-halus (border-slate-100) dan bayangan lembut tanpa garis kasar
 */
export default function Card({ as = 'section', lift = false, delay = 0, className, children, ...props }) {
  const Tag = tags[as] ?? motion.section;
  return (
    <Tag
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={lift ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={cx(
        'rounded-2xl bg-white p-5 md:p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-200',
        lift && 'hover:shadow-md hover:border-slate-200/80',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
