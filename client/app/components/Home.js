import React from 'react';

export class Home extends React.Component {
    render() {
        console.log(this.props);
        let content = "";
        let levels = "";
        if(true) {
            content = <span>Hello Andela</span>;
            levels = <span>You are in</span>
        }
        return (
            <div>
                <p>This is great</p><br/>
                {content} {this.props.name}
                <br/>
                {levels} {this.props.level}
            </div>
        )
    }
}