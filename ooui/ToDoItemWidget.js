var ToDoItemWidget = function ( config ) {
  config = config || {};
  ToDoItemWidget.parent.call( this, config );

  this.creationTime = config.creationTime;

  this.deleteButton = new OO.ui.ButtonWidget( {
    label: 'Delete'
  } );

  this.$element
    .addClass( 'todo-itemWidget' )
    .append( this.deleteButton.$element );

  this.deleteButton.connect( this, {
    click: 'onDeleteButtonClick'
  } );
};

OO.inheritClass( ToDoItemWidget, OO.ui.OptionWidget );

ToDoItemWidget.prototype.onDeleteButtonClick = function () {
  this.emit( 'delete' );
};

ToDoItemWidget.prototype.getPrettyCreationTime = function () {
  var 
    time = new Date( this.creationTime ),
    hour = time.getHours(),
    minute = time.getMinutes(),
    second = time.getSeconds(),
    temp = String( ( hour > 12 ) ? hour - 12 : hour ),
    monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

  if ( hour === 0 ) {
    temp = '12';
  }
  temp += ( ( minute < 10 ) ? ':0' : ':' ) + minute;
  temp += ( ( second < 10 ) ? ':0' : ':' ) + second;
  temp += ( hour >= 12 ) ? ' P.M.' : ' A.M.';

  return [
    time.getDate(),
    monthNames[ time.getMonth() ],
    time.getFullYear() + ', ',
    temp
  ].join( ' ' );
};
