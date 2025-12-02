import { render, screen } from '@testing-library/react';
import { StatusBadge } from '@/components/status/StatusBadge';

describe('StatusBadge', () => {
  it('renders operational status correctly', () => {
    render(<StatusBadge status="operational" />);
    expect(screen.getByText('Operational')).toBeInTheDocument();
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('renders degraded status correctly', () => {
    render(<StatusBadge status="degraded" />);
    expect(screen.getByText('Degraded Performance')).toBeInTheDocument();
    expect(screen.getByText('⚠')).toBeInTheDocument();
  });

  it('renders outage status correctly', () => {
    render(<StatusBadge status="outage" />);
    expect(screen.getByText('Major Outage')).toBeInTheDocument();
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('renders maintenance status correctly', () => {
    render(<StatusBadge status="maintenance" />);
    expect(screen.getByText('Under Maintenance')).toBeInTheDocument();
  });

  it('has accessible role and label', () => {
    render(<StatusBadge status="operational" />);
    const badge = screen.getByRole('status');
    expect(badge).toHaveAttribute('aria-label', 'Status: Operational');
  });

  it('hides icon when showIcon is false', () => {
    render(<StatusBadge status="operational" showIcon={false} />);
    expect(screen.queryByText('✓')).not.toBeInTheDocument();
    expect(screen.getByText('Operational')).toBeInTheDocument();
  });
});
