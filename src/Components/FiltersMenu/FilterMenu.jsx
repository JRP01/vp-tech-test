import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './FilterMenu.css';

const FilterMenu = ({ facets, requestFacets, setRequestFacets }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    let test = { ...requestFacets };
    if (!(facetIdentifier in test)) {
      test[facetIdentifier] = [{ identifier, value }];
    } else test[facetIdentifier].push({ identifier, value });
    setRequestFacets(test);
  };

  const removeFacet = (facetIdentifier, identifier) => {
    let test = { ...requestFacets };

    test[facetIdentifier] = test[facetIdentifier].filter((employee) => {
      return employee.identifier !== identifier;
    });
    if (test[facetIdentifier].length === 0) {
      delete test[facetIdentifier];
    }
    setRequestFacets(test);
  };

  return (
    <>
      <Button
        className='productdisplay-sortfilter'
        variant='primary'
        onClick={handleShow}
      >
        Filters
      </Button>

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

export default FilterMenu;
