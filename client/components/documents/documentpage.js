import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';
import Editor from './documentEditor';
import update from 'react-addons-update';

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
      document: {
        title: '',
        access: '',
        content: ''
      }
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.handleEditorSubmit = this.handleEditorSubmit.bind(this);
  }
  /**
   * 
   */
  onTitleChange(event) {
    const document = this.state.document;
    document.title = event.target.value;
    this.setState({
      document: update(this.state.document, {title: {$set: event.target.value}})
    });
    console.log(this.state);
  }
  /**
   * 
   */
  handleEditorSubmit() {
    this.props.actions.createDocuments(this.state.document);
  }
  /**
   * 
   */
  render() {
    return (
      <div className="create-document">
        <h2>Add Document</h2>
        <div className="document-title">
          <input
            type="text"
            placeholder="Title"
            onChange={this.onTitleChange}
            value={this.state.document.title}
          />
          <div className="row">
            <label>Access Level</label>
            <select>
              <option value="" disabled>Access Level</option>
              <option value="1">Public</option>
              <option value="2">Private</option>
              <option value="3">Role</option>
            </select>
          </div>
        </div>
        <script src="//cdn.ckeditor.com/4.6.2/standard/ckeditor.js"></script>
        <Editor onSubmit={this.handleEditorSubmit}/>
        <button className="btn waves-effect waves-light waves-teal" type="submit">Send<i className="material-icons right">send</i></button>
      </div>
    );
  }
}
DocumentPage.PropTypes = {
  documents: PropTypes.array.isRequired,
  createDocuments: PropTypes.func.isRequired
};
/**
 * 
 */
 const  mapStateToProps = (state, ownProps) => {
  return {
    documents: state.documents // from the reducer.
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(documentActions, dispatch) // document => dispatch(documentActions.createDocuments(document))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
