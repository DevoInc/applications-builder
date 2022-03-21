/**
 * Retrive the user data from the session
 * @category Libs
 * @module user
 */
import dependencies from '../data/dependencies';
const userInfo = dependencies.require('userInfo');
const user = {};

/**
 * Get credentials object
 * @function getCredentials
 * @return {Object} Credentials object
 */
user.getCredentials = () => userInfo.credentials;

/**
 * Get user name
 * @function getName
 * @return {String} User name
 */
user.getName = () => userInfo.name;

/**
 * Get user email
 * @function getEmail
 * @return {String} User email
 */
user.getEmail = () => userInfo.email;

/**
 * Get user locale
 * @function getLocale
 * @return {String} User locale
 */
user.getLocale = () => userInfo.locale;

/**
 * Get user applications
 * @function getApplications
 * @return {Object} User applications
 */
user.getApplications = () => userInfo.applications;

/**
 * Get the user timezone
 * @function getTimezone
 * @return {String} Timezone string
 */
user.getTimezone = () => userInfo.timezone;

/**
 * Get the user domain
 * @function getDomain
 * @return {String} Domain string
 */
user.getDomain = () => userInfo.domain;

export default user;
