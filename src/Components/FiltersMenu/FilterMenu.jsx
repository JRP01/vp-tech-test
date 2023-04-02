import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './FilterMenu.css';

const FilterMenu = ({ facets, apiFacets, setApiFacets }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(apiFacets);

  const handleChange = (
    facetIdentifier,
    optionIdentifier,
    optionValue,
    checked
  ) => {
    console.log(facetIdentifier);
    console.log(checked);
    if (checked) {
      addFacet(facetIdentifier, optionIdentifier, optionValue);
    } else {
      removeFacet(facetIdentifier, optionIdentifier);
    }
  };

  const addFacet = (facetIdentifier, optionIdentifier, optionValue) => {
    let test = { ...apiFacets };
    if (!(facetIdentifier in test)) {
      test[facetIdentifier] = [{ optionIdentifier, optionValue }];
    } else test[facetIdentifier].push({ optionIdentifier, optionValue });
    setApiFacets(test);
  };

  const removeFacet = (facetIdentifier, optionIdentifier) => {
    let test = { ...apiFacets };

    test[facetIdentifier] = test[facetIdentifier].filter((employee) => {
      return employee.optionIdentifier !== optionIdentifier;
    });
    if (test[facetIdentifier].length === 0) {
      console.log('hello');
      delete test[facetIdentifier];
    }
    setApiFacets(test);
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Filters
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            {facets.map((facet) => (
              <div className='filter-container' key={facet.identifier}>
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
