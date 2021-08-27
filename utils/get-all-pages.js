const fs = require('fs');

const getAllPages = (path, excludes, base = '') => {
	const files = fs.readdirSync(path, { withFileTypes: true });
	return files.filter(dirent => {
		return excludes.indexOf(dirent.name) === -1;
	}).map(dirent => {
		if (dirent.isFile()) {
			if (!/\.md$/.test(dirent.name)) return null;

			if (base !== '' && dirent.name === 'README.md') {
				return null;
			}
			return `${base}/${dirent.name.replace(/README\.md$/, '').replace(/\.md$/, '')}`;
		} else {
			const fullPath = `${path}/${dirent.name}`;
			const basePath = `${base}/${dirent.name}`;

			return {
				title: dirent.name.toUpperCase().replace(/-/g, ' '),
				collapsable: true,
				children: getAllPages(fullPath, excludes, basePath),
				...(fs.readdirSync(fullPath).indexOf('README.md') > -1 ? {
					path: `${basePath}/`,
				} : {}),
			};
		}
	}).filter(v => v);
};

module.exports = getAllPages;
