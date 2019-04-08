import preact from 'preact';

export default function ToDoItem( { item, onSelect, onDelete, isSelected }) {
  return (
    <div 
      onClick={ ( e ) => onSelect( item, e ) }
      key={ item.label } 
      className={ isSelected ? 
          "ToDo__item ToDo__item--selected" : "ToDo__item" 
      }
    >
      <span className="ToDo__item-label">{ item.label }</span>
      <button onClick={ ( e ) => onDelete( item, e ) } className="Button">Delete</button>
    </div>
  );
}
