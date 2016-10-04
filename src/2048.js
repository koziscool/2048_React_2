
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var FOUR = 4;

var Board2048 = React.createClass({
  getInitialState: function() {
    return {
      current: 0,
      tiles: []
    };
  },

  updateTileState: function() {
    var row, col;
    for (var i = 0; i < Two048Model.numTiles; i++) {
      row = Math.floor( i / FOUR);
      col = i % FOUR;
      var value = Two048Model.getTile( row, col);
      this.state.tiles[i] = value;
    }    
  },

  componentWillMount: function() {
    Two048Model.init();
    this.updateTileState();
  },

  componentDidMount: function() {
    window.addEventListener('keydown', this.handleKey);
  },

  componentWillUnmount: function() {
  },

  handleKey: function(event){
    switch (event.keyCode) {
      case 37: // Left
        Two048Model.moveLeft();
        break;
      case 38: // Up
        Two048Model.moveUp();
        break;
      case 39: // Right
        Two048Model.moveRight();
        break;
      case 40: // Down
        Two048Model.moveDown();
        break;
    }
    // this.setState(  );
    this.updateTileState();
    // Two048Model.logTiles();
    this.forceUpdate(  );
  },

  render: function() {
    var children = [];
    var row = 0;
    var col = 0;
    for (var i = 0; i < Two048Model.numTiles; i++) {
      row = Math.floor( i / FOUR);
      col = i % FOUR;

      var value = Two048Model.getTile( row, col);
      if( value === 'blank') {
        value = "";
      }

      children.push(<Tile2048 key={i} index={i} value={value} className="animateItem"/>);
    }

    return (
      <CSSTransitionGroup
        className="animateExample"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
        transitionName="example" >
        {children}
      </CSSTransitionGroup>
    );
  }
});

var Tile2048 = React.createClass({
  render: function() {
    var colors = [ 'lightgray','orange', 'darkkhaki', 'firebrick', 'lightgreen', 'deepskyblue', 
        'goldenrod', 'red', 'gray', 
        'blue', 'purple', 'brown', 'black', 'darkyellow', 'lightblue', 'pink'];
    var row = Math.floor( this.props.index / FOUR);
    var col = this.props.index % FOUR;
    var colorIndex = Math.max( Math.floor(Math.log2( this.props.value )), 0 );
    var style = {
      left: col * 128,
      top: row * 128,
      background: colors[colorIndex],
    };
    return (
      <div className="animateItem" style={style}>{this.props.value}</div>
    );
  }
});


ReactDOM.render(
  <Board2048 />,
  document.getElementById('root')
);  

