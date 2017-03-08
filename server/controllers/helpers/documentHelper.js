import db from '../../models';

const Documents = db.documents;
/**
 * Helper class for document controller
 */
class DocumentHelper {

  /**
   * Checks the documents belonging to the user in the database
   * @param {String} title title of the document
   * @param {String} content content of the document
   * @param {Number} UserId the UserId as the OwnerId of the document
   * @return {Boolean} true or false
   */
  static checkUserDocuments(rtitle, rcontent, id) {
    let docs = [];
    Documents.findAll({
      where: {
        OwnerId: id,
        $and: {
          $or: [
            { title: rtitle },
            { content: rcontent }
          ]
        }
      }
    }).then((result) => {
      docs = result;
    }).then(() => {
      return docs;
    });
  }
  /**
   * Sanitizes search queries
   * @param {String} query to be sanitized.
   * @return {String} sanitized strings.
   */
  static sanitizeString(query) {
    const sanitizedQuery = query.replace(/[^a-zA-Z ]/g, '');
    return sanitizedQuery;
  }
  /**
   * @desc PaginateResult pagination information for database result
   * @param {Object} result object containing result from database
   * @param {Number} offset Number of result to skip
   * @param {Number} limit Number of result to return at a time
   * @returns {Object} the metadata of the result
   */
  static paginateResult(result, offset, limit) {
    const paginatedResult = {};

    paginatedResult.currentPage = Math.floor(offset / limit) + 1;
    paginatedResult.pageCount = Math.ceil(result.count / limit);
    paginatedResult.pageSize = Number(limit);
    paginatedResult.totalCount = result.count;

    return paginatedResult;
  }

}
export default DocumentHelper;
