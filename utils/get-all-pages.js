const fs = require('fs');

const getAllPages = (path, excludes) => {
	const files = fs.readdirSync(path, { withFileTypes: true });
	return files.filter(dirent => {
		return excludes.indexOf(dirent.name) === -1;
	}).map(dirent => {
		if (dirent.isFile()) {
			return dirent.name.replace(/README\.md$/, '/').replace(/\.md$/, '');
		}
	});
};

module.exports = getAllPages;
