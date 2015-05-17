var json = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

var TableContainer = React.createClass({displayName: "TableContainer",
  render: function() {
    return (
      React.createElement("div", {className: "tableContainer"}, 
        React.createElement("h1", null, "Table"), 
        React.createElement(TableContents, {data: this.props.data})
      )
    );
  }
});

var TableContents = React.createClass({displayName: "TableContents",
  render: function() {
    var categories = [];
    var categoryContents = {};
    this.props.data.forEach(function (row) {
      if (categories.indexOf(row.category) === -1) {
        categories.push(row.category);
        categoryContents[row.category] = [React.createElement(CategoryRow, {category: row.category}), React.createElement(ProductRow, {data: row})];
      } else {
        categoryContents[row.category].push(React.createElement(ProductRow, {data: row}));
      }
      });
    
    var displayData = [];
    categories.forEach(function (category) {
      displayData = displayData.concat(categoryContents[category]);
    });

    return (
      React.createElement("div", {className: "tableContents"}, 
        displayData
      )
    );
  }
});

var CategoryRow = React.createClass({displayName: "CategoryRow",
  render: function() {
    return (
      React.createElement("div", {className: "categoryRow"}, 
        React.createElement("h4", {className: "categoryHeader"}, 
          this.props.category
        )
      )
    );
  }
});

var ProductRow = React.createClass({displayName: "ProductRow",
  render: function() {
    var row = this.props.row;
    return(
      React.createElement("div", {className: "productRow"}, 
        React.createElement("span", {className: "productName", style: row.stocked ? "color:black;" : "color:red;"}, 
          row.name
        ), 
        React.createElement("span", {className: "productPrice"}, 
          row.price
        )
      )
    );
  }
});

React.render(
  React.createElement(TableContainer, {data: json}),
  document.getElementById('content')
);
