import preact from 'preact';

class ToDoListWidget extends preact.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      hasError: false
    };
    this.state.items = [];
  }

}

export default ToDoListWidget;
