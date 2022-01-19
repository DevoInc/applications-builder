/**
 * Retrive the user data from the session
 * @module user
 */
const user = {};

/**
 * Get metadata object
 * @function getMetaData
 * @return {Object} Metadata object
 */

/**
 * Get user role
 * @function getRole
 * @return {Object} Role object
 */

/**
 * Get user name
 * @function getName
 * @return {String} User name
 */

/**
 * Get user email
 * @function getEmail
 * @return {String} User email
 */

/**
 * Get user ID
 * @function getId
 * @return {String} User ID
 */

/**
 * Get user applications
 * @function getApplications
 * @return {Object} User applications
 */

/**
 * Get user menu items
 * @function getMenuItems
 * @return {Object} User menu items
 */

/**
 * Get user widgets
 * @function getWidgets
 * @return {Object} User widgets
 */

/**
 * Get user email MD5
 * @function getEmailMd5
 * @return {String} User email MD5
 */

/**
 * Get the user timezone
 * @function getTimezone
 * @return {String} Timezone string
 */
user.getTimezone =
  typeof user.getTimezone === 'function' ? user.getTimezone : null ||
  function() {
    return 'utc';
  };

export default user;
