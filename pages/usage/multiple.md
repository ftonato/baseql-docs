import QueryPlayground from '../../components/query-playground';

# Multiple arguments

Combine multiple arguments in a single query:

<br />

<QueryPlayground disabled={true} query={`{
people(
  _filter: {vegan: {_eq: false}},
  _order_by: [{name: "desc"}],
  _page_size: 2,
  _page: 2
) {
  name
}\n}`}/>