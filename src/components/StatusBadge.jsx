import { memo } from 'react';
import PropTypes from 'prop-types';

const StatusBadge = memo(function StatusBadge({ label, variant = 'muted' }) {
  const variants = {
    saffron: 'bg-orange-50 text-saffron border border-orange-200',
    ashoka:  'bg-blue-50 text-ashoka border border-blue-200',
    success: 'bg-green-50 text-success border border-green-200',
    danger:  'bg-red-50 text-danger border border-red-200',
    warning: 'bg-amber-50 text-warning border border-amber-200',
    muted:   'bg-surface2 text-muted border border-surface3',
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide ${variants[variant] ?? variants.muted}`}>
      {label}
    </span>
  )
});

StatusBadge.propTypes = {
  label:   PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['saffron', 'ashoka', 'success', 'danger', 'muted', 'warning']),
};

export default StatusBadge;
