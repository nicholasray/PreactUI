import preact from 'preact';
import ToDoItem from './ToDoItem';

class ToDo extends preact.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      hasError: false,
      selected: undefined
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleItemSelect = this.handleItemSelect.bind(this);
  }

  isNewItemValid( newItem ) {
    if ( newItem.label === '' ) {
      return false;
    }

    return this.state.items.every ( item => {
      return newItem.label !== item.label
    } );
  }

  handleKeyPress( e ) {
    // we only care when the user presses enter
    if ( e.keyCode !== 13 ) {
      return;
    }

    const newItem = {
      label: e.target.value,
      creationTime: Date.now()
    }

    // perform validation
    if ( !this.isNewItemValid( newItem ) ) {
      this.setState( {
        hasError: true
      } );

      return;
    }

    this.setState( {
      hasError: false,
      items: this.state.items.concat( newItem )
    } );

    // reset input. Note: an alternative approach would be to make the input a
    // controlled component (https://reactjs.org/docs/forms.html)
    e.target.value = '';
  }

  handleItemSelect( item ) {
    this.setState( {
      selected: item
    } );
  }

  handleItemDelete( itemToDelete ) {
    this.setState( {
      items: this.state.items.filter( item => {
        return itemToDelete !== item;
      } )
    } );
  }

  convertToPrettyTime( creationTime ) {
    let 
      time = new Date( creationTime ),
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
  }

  render(props, state) {
    return (
      <div className="ToDo">
        <input 
          className={this.state.hasError ? 'Input Input--error' : 'Input' } 
          type="text" 
          placeholder="Add a ToDo item" 
          onKeyPress={this.handleKeyPress} 
        />
        <div className="ToDo__list">
          { 
            this.state.items.map(item => 
              <ToDoItem
                key={item.label}
                item={item}
                isSelected={this.state.selected === item}
                onSelect={this.handleItemSelect}
                onDelete={this.handleItemDelete}
              />
            ) 
          }
        </div>
        <div>
          <label>
          {
            this.state.selected ? 
              `${this.state.selected.label} (${this.convertToPrettyTime(this.state.selected.creationTime) })` 
              : 
              "Information"
          }
          </label>
        </div>
      </div>
    );
  }
}

// Render an instance of ToDoListWidget into preact-container
preact.render(<ToDo />, document.getElementById('preact-container'));
