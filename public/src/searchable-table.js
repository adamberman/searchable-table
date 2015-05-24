var json = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

var TableContainer = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false
    }
  },

  render: function() {
    return (
      <div className="tableContainer">
        <h1>Search</h1>
        <SearchBox filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}/>
        <h1>Table</h1>
        <TableContents data={this.props.data} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}/>
      </div>
    );
  }
});

var TableContents = React.createClass({
  render: function() {
    var categories = [];
    var categoryContents = {};
    var data = this.props.data;
    var inStockOnly = this.props.inStockOnly;
    var filterText = this.props.filterText;

    data.forEach(function (row) {
      if ((filterText !== '' && row.name.indexOf(filterText) === -1) || (inStockOnly && !row.stocked)) {
        return;
      }
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
        <span className="productName" style={row.stocked ? {color: 'black'} : {color: 'red'}}>
          {row.name}
        </span>
        <span className="productPrice">
          {row.price}
        </span>
      </div>
    );
  }
});

var SearchBox = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.getDOMNode().value,
      this.refs.inStockOnlyInput.getDOMNode().checked
    );
  },

  render: function() {
    return(
      <form className="searchBox">
        <input 
          type="text" 
          value={this.props.filterText}
          placeholder="Search"
          ref="filterTextInput"
        />
        <p>
          <label for="inStockOnlyCheckbox">
            Check to only show items that are in stock
          </label>
          <input
            id="inStockOnlyCheckbox"
            type="checkbox"
            checked={this.props.inStockOnly}
            ref="inStockOnlyInput"
          />
        </p>
      </form>
    );
  }
});


React.render(
  <TableContainer data={json} />,
  document.getElementById('content')
);
