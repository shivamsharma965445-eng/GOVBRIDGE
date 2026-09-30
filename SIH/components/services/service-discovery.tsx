'use client';

import Link from 'next/link';
import * as React from 'react';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  availabilityOptions,
  categoryOptions,
  departmentOptions,
  popularityOptions,
  serviceCatalog,
  type ServiceRecord,
} from '@/lib/services-data';

const toAvailabilityStatus = (availability: ServiceRecord['availability']) => {
  if (availability === 'Available') return 'active';
  if (availability === 'Limited') return 'pending';
  return 'inactive';
};

export function ServiceDiscovery() {
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState('All');
  const [department, setDepartment] = React.useState('All');
  const [availability, setAvailability] = React.useState('All');
  const [popularity, setPopularity] = React.useState('All');
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
      if (query.trim().toLowerCase() === 'error') {
        setError('Service discovery is temporarily unavailable. Please try another search.');
      } else {
        setError(null);
      }
    }, 250);

    return () => window.clearTimeout(timer);
  }, [query]);

  const filteredServices = React.useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return serviceCatalog.filter((service) => {
      const matchesQuery =
        !searchTerm ||
        [service.name, service.description, service.category, service.department]
          .join(' ')
          .toLowerCase()
          .includes(searchTerm);

      const matchesCategory = category === 'All' || service.category === category;
      const matchesDepartment = department === 'All' || service.department === department;
      const matchesAvailability = availability === 'All' || service.availability === availability;
      const matchesPopularity =
        popularity === 'All' ||
        (popularity === 'High' && service.popularity >= 80) ||
        (popularity === 'Medium' && service.popularity >= 60 && service.popularity < 80) ||
        (popularity === 'Low' && service.popularity < 60);

      return matchesQuery && matchesCategory && matchesDepartment && matchesAvailability && matchesPopularity;
    });
  }, [availability, category, department, popularity, query]);

  const resultSummary = isLoading
    ? 'Loading services...'
    : error
      ? error
      : `${filteredServices.length} service${filteredServices.length === 1 ? '' : 's'} available`;

  const clearFilters = () => {
    setQuery('');
    setCategory('All');
    setDepartment('All');
    setAvailability('All');
    setPopularity('All');
  };

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-border bg-card p-4 shadow-soft sm:p-6">
        <form
          className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr_0.7fr]"
          aria-label="Service discovery filters"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="lg:col-span-2">
            <label htmlFor="service-search" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Search services
            </label>
            <input
              id="service-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search services, schemes, certificates..."
              aria-label="Search for services"
              className="min-h-[48px] w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/80 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
            />
          </div>

          <div>
            <label htmlFor="filter-category" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Category
            </label>
            <select
              id="filter-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter by category"
              className="min-h-[48px] w-full rounded-md border border-border bg-background px-3 py-3 text-base text-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-department" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Department
            </label>
            <select
              id="filter-department"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              aria-label="Filter by department"
              className="min-h-[48px] w-full rounded-md border border-border bg-background px-3 py-3 text-base text-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
            >
              {departmentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-availability" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Availability
            </label>
            <select
              id="filter-availability"
              value={availability}
              onChange={(event) => setAvailability(event.target.value)}
              aria-label="Filter by availability"
              className="min-h-[48px] w-full rounded-md border border-border bg-background px-3 py-3 text-base text-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
            >
              {availabilityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-popularity" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Popularity
            </label>
            <select
              id="filter-popularity"
              value={popularity}
              onChange={(event) => setPopularity(event.target.value)}
              aria-label="Filter by popularity"
              className="min-h-[48px] w-full rounded-md border border-border bg-background px-3 py-3 text-base text-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
            >
              {popularityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2 lg:col-span-5"
          >
            Clear filters
          </button>
        </form>
      </section>

      <div className="flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {resultSummary}
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground" aria-live="polite">
          Loading government services…
        </div>
      ) : error ? (
        <div className="rounded-xl border border-border bg-card p-6 text-left" role="alert">
          <p className="text-base font-medium text-foreground">Unable to load services</p>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
          <p className="text-xl text-foreground">No matching services found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting the search or filters to discover another public service pathway.
          </p>
        </div>
      ) : (
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Service list">
          {filteredServices.map((service) => (
            <li key={service.id} className="list-none">
              <Card className="group h-full border border-border bg-card p-5 transition-colors duration-150 ease-out hover:border-accent/50 focus-within:border-accent/60">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {service.category}
                    </p>
                    <h3 className="mt-3 text-2xl text-foreground">{service.name}</h3>
                  </div>
                  <StatusBadge status={toAvailabilityStatus(service.availability)}>{service.availability}</StatusBadge>
                </div>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">{service.description}</p>

                <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="font-medium uppercase tracking-[0.14em] text-muted-foreground">Department</dt>
                    <dd className="text-right text-foreground">{service.department}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="font-medium uppercase tracking-[0.14em] text-muted-foreground">Complexity</dt>
                    <dd className="text-right text-foreground">{service.complexity}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="font-medium uppercase tracking-[0.14em] text-muted-foreground">Demand</dt>
                    <dd className="text-right text-foreground">{service.popularity}%</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex min-h-[44px] items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                  >
                    View service
                  </Link>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
