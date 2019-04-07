import preact from 'preact';

class Clock extends preact.Component {
    render() {
        let time = new Date().toLocaleTimeString();
        return <span>{ time }</span>;
    }
}

// render an instance of Clock into <body>:
preact.render(<Clock />, document.getElementById('preact-container'));
