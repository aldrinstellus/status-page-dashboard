import { render, screen } from '@testing-library/react';
import { ServiceCard } from '@/components/status/ServiceCard';
import type { Service } from '@/types/status';

const mockService: Service = {
  id: 'api',
  name: 'API Gateway',
  description: 'Core API endpoints',
  status: 'operational',
  uptime: 99.98,
  lastChecked: new Date().toISOString(),
};

describe('ServiceCard', () => {
  it('renders service name correctly', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('API Gateway')).toBeInTheDocument();
  });

  it('renders service description correctly', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('Core API endpoints')).toBeInTheDocument();
  });

  it('displays status badge', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('Operational')).toBeInTheDocument();
  });

  it('shows uptime percentage', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('99.98%')).toBeInTheDocument();
  });

  it('has accessible article role', () => {
    render(<ServiceCard service={mockService} />);
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-label', 'API Gateway status');
  });
});
