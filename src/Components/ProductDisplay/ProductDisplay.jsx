import { useEffect, useState } from 'react';
import { fetchData } from '../../Utils/API';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ProductCard from '../ProductCard/ProductCard';
import Paginate from '../Pagination/Pagination';
import FilterMenu from '../FiltersMenu/FilterMenu';
import Spinner from 'react-bootstrap/Spinner';
import './ProductDisplay.css';

const ProductDisplay = ({ query }) => {
  const [result, setResult] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [facets, setFacets] = useState(null);
  const [requestfacets, setRequestFacets] = useState({});
  const [sort, setSort] = useState({ value: 1, display: 'Recommened' });

  useEffect(() => {
    fetchData({
      setData: setResult,
      setFacets: setFacets,
      setTotalPages: setTotalPages,
      query: query,
      pageNumber: pageNumber,
      size: 0,
      sort: sort.value,
      facets: requestfacets,
    });
  }, [requestfacets, pageNumber, query, sort]);

  const sortBy = [
    { value: 1, display: 'Recommened' },
    { value: 2, display: 'Price Low to High' },
    { value: 3, display: 'Price High to Low' },
    { value: 4, display: 'Largest Discount' },
  ];

  const handleSetFilter = (sortItem) => {
    setSort(sortItem);
    setPageNumber(1);
  };

  if (!result) {
    return (
      <div className='productdisplay-spinner-container'>
        <Spinner animation='grow' variant='success' />
        <Spinner animation='grow' variant='success' />
        <Spinner animation='grow' variant='success' />
        <Spinner animation='grow' variant='success' />
      </div>
    );
  }

  return (
    <>
      <div className='productdisplay-sortfilter-container'>
        <FilterMenu
          facets={facets}
          requestFacets={requestfacets}
          setRequestFacets={setRequestFacets}
        />
        <DropdownButton
          className='productdisplay-sortfilter'
          id='dropdown-basic-button'
          title={sort.display}
        >
          {sortBy.map((sortItem, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => handleSetFilter(sortItem)}
            >
              {sortItem.display}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <div className='productdisplay-card-container'>
        {result.products.map((products, index) => (
          <ProductCard
            name={products.productName}
            img={products.image.url}
            price={products.price.priceIncTax}
            href={products.slug}
            key={index}
          />
        ))}
      </div>
      <Paginate
        currentPage={pageNumber}
        setCurrentPage={setPageNumber}
        totalPages={totalPages}
      />
    </>
  );
};

export default ProductDisplay;
