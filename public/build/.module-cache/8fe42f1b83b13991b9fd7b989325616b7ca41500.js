var json = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

var TableContainer = React.createClass({displayName: "TableContainer",
  getInitialState: function() {
    return {
      filterText: 'b',
      inStockOnly: false
    }
  },

  render: function() {
    return (
      React.createElement("div", {className: "tableContainer"}, 
        React.createElement("h1", null, "Search"), 
        React.createElement(SearchBox, {filterText: this.state.filterText, inStockOnly: this.state.inStockOnly}), 
        React.createElement("h1", null, "Table"), 
        React.createElement(TableContents, {data: this.props.data, filterText: this.state.filterText, inStockOnly: this.state.inStockOnly})
      )
    );
  }
});

var TableContents = React.createClass({displayName: "TableContents",
  render: function() {
    var categories = [];
    var categoryContents = {};
    var data = this.props.data;
    var inStockOnly = this.props.inStockOnly;
    var filterText = this.props.filterText;
    if (inStockOnly) {
      data = data.filter(function (item) {
        item.stocked;
      });
    }
    if (filterText.length > 0) {
      data = data.filter(function (item) {
        item.name.indexOf(filterText) > -1
      });
    }

    data.forEach(function (row) {
      if (categories.indexOf(row.category) === -1) {
        categories.push(row.category);
        categoryContents[row.category] = [React.createElement(CategoryRow, {category: row.category}), React.createElement(ProductRow, {row: row})];
      } else {
        categoryContents[row.category].push(React.createElement(ProductRow, {row: row}));
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
        React.createElement("span", {className: "productName", style: row.stocked ? {color: 'black'} : {color: 'red'}}, 
          row.name
        ), 
        React.createElement("span", {className: "productPrice"}, 
          row.price
        )
      )
    );
  }
});

var SearchBox = React.createClass({displayName: "SearchBox",
  render: function() {
    return(
      React.createElement("form", {className: "searchBox"}, 
        React.createElement("input", {
          type: "text", 
          value: this.props.filterText, 
          placeholder: "Search", 
          ref: "filterTextInput"}
        ), 
        React.createElement("p", null, 
          React.createElement("label", {for: "inStockOnlyCheckbox"}, 
            "Check to only show items that are in stock"
          ), 
          React.createElement("input", {
            id: "inStockOnlyCheckbox", 
            type: "checkbox", 
            checked: this.props.inStockOnly, 
            ref: "inStockOnlyInput"}
          )
        )
      )
    );
  }
});


React.render(
  React.createElement(TableContainer, {data: json}),
  document.getElementById('content')
);
