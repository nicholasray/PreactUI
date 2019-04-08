import preact from 'preact';

export default function ToDoItem( { item, onSelect, onDelete, isSelected }) {
  return (
    <div 
      key={ item.label } 
      className={ isSelected ? 
          "ToDoItem ToDoItem--selected" : "ToDoItem" 
      }
      onClick={ ( e ) => onSelect( item, e ) }
      role="option"
      aria-selected={ isSelected }
    >
      <span className="ToDoItem__label">{ item.label }</span>
      <button onClick={ ( e ) => onDelete( item, e ) } className="Button">Delete</button>
    </div>
  );
}
