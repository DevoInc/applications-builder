/**
 * @category Utils
 * @subcategory Global
 * @module Query Utils
 */

/**
 * Replaces "group by" for "group every $coarse_grain by"
 * @param query
 * @param coarse_grain coarse grain used
 * @returns {*}
 */
export function fixGroupBy(query, coarse_grain = '30m') {
  return query.replace(/group([.| \n\r]*?by)/gm,
    `group every ${coarse_grain}$1`);
}

/**
 * Replaces "group by" for "group every $coarse_grain by"
 * @param query
 * @param coarse_grain coarse grain used
 * @returns {*}
 */
export function fixMidnight(query) {
  return query.replace(/(group[.| \n\r]*?)|[.| \n\r]*?midnight\(.*\)/gm, '$1');
}

/**
 * Removes pragmas
 * @param query
 * @returns {*}
 */
export function removePragmas(query) {
  return query.replace(/^.*?pragma.*?$/gm, '');
}

/**
 * Translates lookups from the backend syntax to the loxcope one
 * @param query
 * @returns {*}
 */
export function fixLookups(query) {
  return query.replace(/lu\(\s*"\s*?(.*?)"\s*?,\s*"?(.*?)"\s*?,\s*"?(.*?)"\s*?,"?\s*(.*?)\s*"?\)/gm,
    '`lu/$2/$3`($4)');
}

/**
 * Translates int4, int8 to int
 * @param query
 * @returns {*}
 */
export function fixInts(query) {
  return query.replace(/(int4|int8)\((.*?)\)/gm, 'int($2)');
}

/**
 * Removes limit clauses that don't apply on loxcope
 * @param query
 * @returns {*}
 */
export function fixLimit(query) {
  return query.replace(/limit[.| \n\r]*?[0-9]+/gm, '');
}

/**
 * Removes the domain in a query to a lookup
 * @param query
 * @returns {*}
 */
export function fixLookupList(query) {
  return query.replace(/my.lookuplist\.(.*)\.(.*)/gm, 'my.lookuplist.$2');
}

/**
 * Removes select * clause in a query
 * @param query
 * @returns {*}
 */
export function fixSelectAll(query) {
  return query.replace(/select \*/gm, '');
}

/**
 * Adapts a query from the backend syntax to the loxcope one by making several
 * changes to it.
 * @param query
 * @param additionalFixes More custom fixes if needed
 * @returns {*}
 */
export function fixQueryForLoxcope(query, additionalFixes = []) {
  let fixes =
    [fixGroupBy, fixLookups, removePragmas, fixInts, fixMidnight, fixLimit ,
      fixLookupList, fixSelectAll];
  fixes = fixes.concat(additionalFixes);

  let fixed = query;

  for(let fix of fixes) {
    fixed = fix(fixed);
  }

  return fixed;
}
