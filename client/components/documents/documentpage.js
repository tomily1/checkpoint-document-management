import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';
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
    // console.log(document);
    document.title = event.target.value;
    this.setState({ document: document });
  }
  /**
   * 
   */
  onClickSave() {
    // console.log(documentActions.createDocuments(this.state.document));
    this.props.actions.createDocuments(this.state.document);
  }
  documentRow(document, index) {
    console.log(document.title);
    return <div key={index}>{document.title}</div>;
  }
  /**
   * 
   */
  render() {
    // console.log(this.props.dispatch);
    return (
      <div className="create-document">
        <h1>Documents</h1>
        {this.props.documents.map(this.documentRow)}
        <h2>Add Document</h2>
        <div className="document-title">
          <input
            type="text"
            placeholder="title"
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
// const connectStateAndProps = connect(mapStateToProps);
export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
