import { useEffect, useState } from 'react';
import { fetchData } from '../../Utils/API';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ProductCard from '../ProductCard/ProductCard';
import Paginate from '../Pagination/Pagination'
import './ProductDisplay.css';
const ProductDisplay = ({ query }) => {
  const [result, setResult] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [facets, setFacets] = useState(null);
  const [requestfacets, setRequestFacets] = useState({});
  const [sort, setSort] = useState({ value: 1, display: 'Recommened' });
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(facets);

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

  const handleChange = (
    facetIdentifier,
    optionIdentifier,
    optionValue,
    checked
  ) => {
    if (checked) {
      addFacet(facetIdentifier, optionIdentifier, optionValue);
    } else {
      removeFacet(facetIdentifier, optionIdentifier);
    }
  };

  const addFacet = (facetIdentifier, identifier, value) => {
    let test = { ...requestfacets };
    if (!(facetIdentifier in test)) {
      test[facetIdentifier] = [{ identifier, value }];
    } else test[facetIdentifier].push({ identifier, value });
    setRequestFacets(test);
  };

  const removeFacet = (facetIdentifier, identifier) => {
    let test = { ...requestfacets };

    test[facetIdentifier] = test[facetIdentifier].filter((employee) => {
      return employee.identifier !== identifier;
    });
    if (test[facetIdentifier].length === 0) {
      console.log('hello');
      delete test[facetIdentifier];
    }
    setRequestFacets(test);
  };


  if (!result) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div className='productdisplay-sortfilter-container'>
        <Button variant='primary' onClick={handleShow}>
          Filters
        </Button>
        <DropdownButton id='dropdown-basic-button' title={sort.display}>
          {sortBy.map((sortItem, index) => (
            <Dropdown.Item onClick={() => setSort(sortItem)}>
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
          <Paginate currentPage={pageNumber} setCurrentPage={setPageNumber} totalPages={totalPages} />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            {facets.map((facet) => (
              <div
                className='productdisplay-filter-container'
                key={facet.identifier}
              >
                <h3>{facet.displayName}</h3>
                {facet.options.map((option) => (
                  <label key={option.identifier}>
                    <input
                      type='checkbox'
                      onChange={(e) =>
                        handleChange(
                          facet.identifier,
                          option.identifier,
                          option.value,
                          e.target.checked
                        )
                      }
                    />
                    {option.displayValue} ({option.productCount})
                  </label>
                ))}
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ProductDisplay;
