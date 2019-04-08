$( function () {
	var input = new OO.ui.TextInputWidget( {
			placeholder: 'Add a ToDo item'
		} ),
		list = new OO.ui.SelectWidget( {
			classes: [ 'todo-list' ]
		} ),
		info = new OO.ui.LabelWidget( {
			label: 'Information',
			classes: [ 'todo-info' ]
		} );

	// Respond to 'enter' keypress
	input.on( 'enter', function () {
		// Check for duplicates and prevent empty input
		if ( list.findItemFromData( input.getValue() ) ||
				input.getValue() === '' ) {
			input.$element.addClass( 'todo-error' );
			return;
		}
		input.$element.removeClass( 'todo-error' );

		// Add the item
		list.addItems( [
			new ToDoItemWidget( {
				data: input.getValue(),
				label: input.getValue(),
				creationTime: Date.now()
			} )
		] );

		input.setValue( '' );
	} );

	list.aggregate( {
		delete: 'itemDelete'
	} );

	list.on( 'choose', function ( item ) {
		info.setLabel( item.getData() + ' (' +
			item.getPrettyCreationTime() + ')' );
	} );

	list.on( 'itemDelete', function ( itemWidget ) {
		list.removeItems( [ itemWidget ] );
	} );

	// Append the app widgets
	$( '#ooui-container' ).append(
		input.$element,
		list.$element,
		info.$element
	);
} );
