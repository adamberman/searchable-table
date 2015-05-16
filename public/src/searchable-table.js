var TableContainer = React.createClass({
  render: function() {
    return (
      <div className="tableContainer">
        <h1>Table</h1>
      </div>
    );
  }
});

React.render(
  <TableContainer />,
  document.getElementById('content')
);
