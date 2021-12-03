/**
 *  @category Libs
 *  @module downloads
 *  */

/**
 * Download content into a file
 * @param {string} content - Content for the file
 * @param {string} fileName - Name of the file to download
 */
export function downloadCSV(content, fileName) {
	let link = document.createElement('a');
	let url = URL.createObjectURL(new Blob(['\ufeff', content]));
	link.href = url;
	link.download = `${fileName}.csv`;
	link.click();
}

export default {
	downloadCSV
};
