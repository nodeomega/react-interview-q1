function ListingTable(props) {
  const { itemListing } = props;

  /**
   * Generates the body of the for the ListingItems table.
   * 
   * @returns A set of rows displaying the listing items for the table.
   */
  const listItems = () => {
    const items = [];

    // Add the items to the list of rows.
    // Includes an index key to satisfy React's recommendations on unique keys for lists.
    for (const [idx, item] of itemListing.entries()) {
      items.push(
        <tr key={idx}>
          <td>{item.name}</td>
          <td>{item.location}</td>
        </tr>
      );
    }
    return items;
  }

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>{"Name"}</th>
          <th>{"Location"}</th>
        </tr>
      </thead>
      <tbody>
        {listItems()}
      </tbody>
    </table>
  )
}

export default ListingTable;
