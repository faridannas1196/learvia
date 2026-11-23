import { cx } from '../../lib/cx';

const TONES = [
  'bg-tint-blue-bg text-tint-blue-fg',
  'bg-tint-green-bg text-tint-green-fg',
  'bg-tint-purple-bg text-tint-purple-fg',
  'bg-tint-orange-bg text-tint-orange-fg',
  'bg-tint-pink-bg text-tint-pink-fg',
  'bg-tint-cyan-bg text-tint-cyan-fg',
];

const hash = (text) => [...text].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);

/** Chip inisial. Dekoratif: nama selalu ditulis di sebelahnya. */
export default function Avatar({ name, square = false, size = 'md', toneIndex, className }) {
  const initials = name.split(/[\s-]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  const tone = TONES[(toneIndex ?? hash(name)) % TONES.length];
  const dims = size === 'sm' ? 'size-9 text-label' : 'size-12 text-body-l';
  return (
    <span aria-hidden="true" className={cx('grid shrink-0 place-items-center font-display font-bold', dims, square ? 'rounded-md' : 'rounded-full', tone, className)}>
      {initials}
    </span>
  );
}
