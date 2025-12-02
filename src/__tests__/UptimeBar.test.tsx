import { render, screen } from '@testing-library/react';
import { UptimeBar } from '@/components/status/UptimeBar';

describe('UptimeBar', () => {
  it('renders uptime percentage label', () => {
    render(<UptimeBar uptime={99.95} />);
    expect(screen.getByText('99.95%')).toBeInTheDocument();
  });

  it('has accessible progressbar role', () => {
    render(<UptimeBar uptime={99.95} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute('aria-valuenow', '99.95');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  });

  it('hides label when showLabel is false', () => {
    render(<UptimeBar uptime={99.95} showLabel={false} />);
    expect(screen.queryByText('99.95%')).not.toBeInTheDocument();
  });

  it('displays correct accessibility label', () => {
    render(<UptimeBar uptime={99.50} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-label', 'Uptime: 99.50%');
  });
});
