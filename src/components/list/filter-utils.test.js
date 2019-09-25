import { applyFilter } from './filter-utils';

const data = [
  {name: 'Sheep', location: 'Europe', country: {name: 'United Kingdom'}},
  {name: 'Tiger', location: 'Asia', country: {name: 'India'}},
  {name: 'Elephant', location: 'Africa', country: {name: 'Tanzania'}},
  {name: 'Lion', location: 'Africa', country: {name: 'South Africa'}},
  {name: 'Cat', location: 'Europe', country: {name: 'Germany'}},
  {name: 'Grizzly', location: 'America', country: {name: 'Canada'}},
  {name: 'Antelope', location: 'Africa', country: {name: 'Namibia'}}];



test('filter 1', () => {
  const filters = {name: 'el'};
  const fData = [
    {name: 'Elephant', location: 'Africa', country: {name: 'Tanzania'}},
    {name: 'Antelope', location: 'Africa', country: {name: 'Namibia'}}
  ];

  expect(applyFilter(data, filters)).toEqual(fData)
});

test('filter 2', () => {
  const filters = {name: 'el', 'country.name': 'an'};
  const fData = [
    {name: 'Elephant', location: 'Africa', country: {name: 'Tanzania'}}
  ];

  expect(applyFilter(data, filters)).toEqual(fData)
});