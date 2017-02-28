import React, { PropTypes } from 'react';
import Editor from './documentEditor';

/**
 * 
 */
class DocumentPage extends React.Component {
  /**
   * 
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      document: { title: '' }
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }
  /**
   * 
   */
  onTitleChange(event) {
    const document = this.state.document;
    console.log(document);
    document.title = event.target.value;
    this.setState({ document: document });
  }
  /**
   * 
   */
  onClickSave() {
    alert(`Saving ${this.state.document.title}`);
  }
  /**
   * 
   */
  render() {
    return (
      <div className="create-document">
        <h1>Documents</h1>
        <div className="document-title">
          <input
            type="text"
            placeholder="title"
            onChange={this.onTitleChange}
            value={this.state.document.title}
          />
          <div className="row">
            <label>Materialize Select</label>
            <select>
              <option value="">Access Level</option>
              <option value="1">Public</option>
              <option value="2">Private</option>
              <option value="3">Role</option>
            </select>
          </div>
        </div>
        <input
          type="submit"
          value="save"
          onClick={this.onClickSave}
        />
        <script src="//cdn.ckeditor.com/4.6.2/standard/ckeditor.js"></script>
        <Editor />
      </div>
    );
  }
}
export default DocumentPage;
