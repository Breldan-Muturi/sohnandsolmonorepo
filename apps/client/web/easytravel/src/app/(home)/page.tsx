import {
  DestinationEntity,
  PackageEntity,
  PaginateQueryDto,
} from '@sohnandsol/shared-modules';
import Hero from './components/hero';
import PageSection, { PageSectionProps } from './components/page-section';
import PackageCard from './components/package-card';
import DestinationCard from './components/destination-card';

async function getPackages({
  limit = 8,
  offset,
}: PaginateQueryDto): Promise<PackageEntity[]> {
  'use server';
  let url = 'http://localhost:3003/packages/paginated?';

  if (limit !== undefined) {
    url += `limit=${limit}`;
  }
  if (offset !== undefined) {
    if (limit !== undefined) {
      url += '&';
    }
    url += `offset=${offset}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const [packages] = await res.json();
  return packages;
}

async function getDestinations({
  limit = 6,
  offset,
}: PaginateQueryDto): Promise<DestinationEntity[]> {
  'use server';
  let url = 'http://localhost:3003/destinations?';

  if (limit !== undefined) {
    url += `limit=${limit}`;
  }
  if (offset !== undefined) {
    if (limit !== undefined) {
      url += '&';
    }
    url += `offset=${offset}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const [destinations] = await res.json();
  return destinations;
}

export default async function Index() {
  const packages = await getPackages({});
  const destinations = await getDestinations({});

  const pageSections: PageSectionProps[] = [
    {
      title: 'Travel Packages',
      href: '/allPackages',
      children: (
        <div className="grid grid-cols-4 gap-4">
          {packages.map((packageItem, i) => (
            <PackageCard key={packageItem.id} {...packageItem} />
          ))}
        </div>
      ),
    },
    {
      title: 'Popular Destinations',
      href: '/allPackages',
      children: (
        <div className="grid grid-cols-6 gap-4">
          {destinations.map((destination, i) => (
            <DestinationCard
              key={`${i}:${destination.id}`}
              className="col-span-1"
              destination={destination}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center h-screen overflow-y-auto">
      <Hero />
      {pageSections.map((pageSection, i) => {
        const { title, href, children, buttonLabel } = pageSection;
        const key = `${i}-${title}`;
        return (
          <PageSection
            key={key}
            title={title}
            href={href}
            buttonLabel={buttonLabel}
          >
            {children}
          </PageSection>
        );
      })}
    </div>
  );
}
