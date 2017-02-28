import React, { PropTypes } from 'react';

 class Editor extends React.Component {
  //  location.reload();
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: content });
  }

  handleSubmit(event) {
    this.state.value = document.getElementById('editor1').value;
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form className="document-form" onSubmit={this.handleSubmit}>
        <textarea
          name="editor1"
          id="editor1"
          rows="10"
          cols="80"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <div className="buttonHolder">
          <input type="submit" className="button tick" />
          <a href="#" className="button cross"></a>
          <a href="#" className="button heart"></a>
          <a href="#" className="button flower"></a>
        </div>
      </form>
    );
  }
}
export default Editor;


          // <input type="submit" className="button tick" value="Submit" />