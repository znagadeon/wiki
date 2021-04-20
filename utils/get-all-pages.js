const fs = require('fs');

const getAllPages = (path, excludes, base = '') => {
	const files = fs.readdirSync(path, { withFileTypes: true });
	return files.filter(dirent => {
		return excludes.indexOf(dirent.name) === -1;
	}).map(dirent => {
		if (dirent.isFile()) {
			return `${base}/${dirent.name.replace(/README\.md$/, '').replace(/\.md$/, '')}`;
		} else {
			return {
				title: dirent.name.toUpperCase().replace(/-/g, ' '),
				collapsable: true,
				children: getAllPages(`${path}/${dirent.name}`, excludes, `${base}/${dirent.name}`),
			};
		}
	});
};

module.exports = getAllPages;
