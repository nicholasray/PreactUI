import preact from 'preact';

export default function ToDoItem( { item, onSelect, onDelete, isSelected }) {
  return (
    <div 
      onClick={ ( e ) => onSelect( item, e ) }
      key={ item.label } 
      className={ isSelected ? 
          "ToDoItem ToDoItem--selected" : "ToDoItem" 
      }
    >
      <span className="ToDoItem__label">{ item.label }</span>
      <button onClick={ ( e ) => onDelete( item, e ) } className="Button">Delete</button>
    </div>
  );
}
