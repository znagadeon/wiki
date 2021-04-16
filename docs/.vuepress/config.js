const getAllPages = require('../../utils/get-all-pages');

module.exports = {
	port: 1337,
	title: '지나가던 개발자',

	themeConfig: {
		nav: [
			{ text: 'Blog', link: 'https://znagadeon.dev' },
		],

		sidebar: getAllPages('./docs', ['.vuepress']),
	},
}
