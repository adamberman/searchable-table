var TableContainer = React.createClass({displayName: "TableContainer",
  render: function() {
    return (
      React.createElement("div", {className: "tableContainer"}, 
        React.createElement("h1", null, "Table")
      )
    );
  }
});

React.render(
  React.createElement(TableContainer, null),
  document.getElementById('content')
);
