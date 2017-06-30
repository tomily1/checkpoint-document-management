import React, { PropTypes } from 'react';

 class Editor extends React.Component {
  //  location.reload();
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('An essay was submitted: ' + this.state.value);
  }
  render() {
    return (
      <form className="document-form" onSubmit={this.handleSubmit}>
        <textarea name="editor" cols="100" rows="6" defaultValue={this.props.value}></textarea>
      </form>
    );
  }
  componentDidMount() {
    $(document).ready(function() {
    $('select').material_select();
    });
    const configuration = {
      toolbar: "Standard"
    };
    CKEDITOR.replace("editor", configuration);
    CKEDITOR.instances.editor.on('change', function () {
      let data = CKEDITOR.instances.editor.getData();
      this.setState({ value: data });
      console.log(this);
    }.bind(this));
  }
}
export default Editor;

