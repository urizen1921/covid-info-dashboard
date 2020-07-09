import React, { useState } from 'react';
import Navbar from './nav.jsx';
import { Button, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const SORTING = [
  {
    sortType: 'descending',
    sort: (a, b) => (a.data > b.data) ? -1 : 1
  },
  {
    sortType: 'ascending',
    sort: (a, b) => (a.data > b.data) ? 1 : -1
  }
]

function CountryList({ list, total, activeView, onSubmit, options, select }) {

  const [sorting, setSorting] = useState(0);
  const [input, setInput] = useState('');

  function handleChange(event) {
    event.preventDefault();
    setInput(event.target.value);
    onSubmit(event.target.value);
  }

  function changeSort() {
    sorting === 0 ? setSorting(1) : setSorting(0);
  }

  function formatNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }

  return (
    <div className="vh-100 d-flex flex-column">
      <div className="mt-3">
        <Navbar
          options={options}
          select={select}
        />
        <h2 style={{color: `${activeView.colorHex}`}} className="text-center py-5 mb-0 border-left border-right">
          {formatNumber(total)}
        </h2>
        <Button
          className="alert-info bg-info btn-sm btn-block"
          onClick={() => changeSort()}
          style={{color: 'white'}}
        >
          Sort: {sorting === 0 ? "DESC" : "ASC"}
        </Button>
        <input
          className="form-control"
          type="text"
          placeholder="Search country..."
          value={input}
          onChange={handleChange}
        />
      </div>
      <div className="overflow-auto">
        <ListGroup className="country-list">
          {list.sort(SORTING[sorting].sort).map(({ country, data, flag }) => (
            <ListGroupItem className="text-secondary text-decoration-none" key={country}>
              <Link to={`/country-detail/${country}`} params={country} key={country}>
                    <Badge pill color={activeView.color} className="float-right">{data}</Badge> {country}
                    <img width="32" className="mx-2" src={flag} alt={country}></img>
              </Link>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default CountryList;