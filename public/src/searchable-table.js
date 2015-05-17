var json = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

var TableContainer = React.createClass({
  render: function() {
    return (
      <div className="tableContainer">
        <h1>Table</h1>
        <TableContents data={this.props.data} />
      </div>
    );
  }
});

var TableContents = React.createClass({
  render: function() {
    var categories = [];
    var categoryContents = {};
    this.props.data.forEach(function (row) {
      if (categories.indexOf(row.category) === -1) {
        categories.push(row.category);
        categoryContents[row.category] = [<CategoryRow category={row.category} />, <ProductRow row={row} />];
      } else {
        categoryContents[row.category].push(<ProductRow row={row} />);
      }
      });
    
    var displayData = [];
    categories.forEach(function (category) {
      displayData = displayData.concat(categoryContents[category]);
    });

    return (
      <div className="tableContents">
        {displayData}
      </div>
    );
  }
});

var CategoryRow = React.createClass({
  render: function() {
    return (
      <div className="categoryRow">
        <h4 className="categoryHeader">
          {this.props.category}
        </h4>
      </div>
    );
  }
});

var ProductRow = React.createClass({
  render: function() {
    var row = this.props.row;
    return(
      <div className="productRow">
        <span className="productName" style={row.stocked ? {color: black} : {color: red}}>
          {row.name}
        </span>
        <span className="productPrice">
          {row.price}
        </span>
      </div>
    );
  }
});

React.render(
  <TableContainer data={json} />,
  document.getElementById('content')
);
