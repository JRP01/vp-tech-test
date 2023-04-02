export const fetchData = async ({
  setData,
  query,
  pageNumber,
  size,
  sort,
  facets,
  setFacets,
  setTotalPages,
}) => {
  const response = await fetch(
    'https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        pageNumber: pageNumber,
        size: 30,
        additionalPages: 0,
        sort: sort,
        facets: facets,
      }),
    }
  );
  const data = await response.json();
  setData(data);
  setTotalPages(Math.ceil(data.pagination.total / data.pagination.size));

  setFacets(data.facets);
};
