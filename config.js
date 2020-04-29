const config = {
	"gatsby": {
		"pathPrefix": "/",
		"siteUrl": "https://github.com/",
		"gaTrackingId": null,
		"trailingSlash": false
	},
	"header": {
		"logo": "",
		"logoLink": "https://github.com/maxonrow/",
		"title": "Maxonrow",
		"githubUrl": "https://github.com/maxonrow/",
		"helpUrl": "",
		"tweetText": "",
		"links": [
			{ "text": "", "link": ""}
		],
		"search": {
			"enabled": false,
			"indexName": "",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/introduction", // add trailing slash if enabled above
			"/modules",
			"/interfaces",
			"/toolkits",
			"/faq",
			"/communitychannels"
		],
    	"collapsedNav": [
			"/modules",
			"/interfaces",
			"/toolkits",
			"/faq",
			"/communitychannels"
		],
		"links": [
			{ "text": "", "link": ""},
		],
		"frontline": false,
		"ignoreIndex": true,
	},
	"siteMetadata": {
		"title": "Maxonrow",
		"description": "Documentation built with mdx.",
		"ogImage": null,
		"docsLocation": "https://github.com/githubckgoh1439/gatsby-mdx-starter/tree/dev-01/content"
		//"favicon": ""
	},
	"pwa": {
		"enabled": false, // disabling this will also remove the existing service worker.
		"manifest": {
			"name": "Maxonrow",
			"short_name": "Maxonrow",
			"start_url": "/",
			"background_color": "#000056",
			"theme_color": "#000056",
			"display": "standalone",
			"crossOrigin": "use-credentials",
			icons: [
				{
					src: "src/pwa-512.png",
					sizes: `512x512`,
					type: `image/png`,
				},
			],
		},
	}
};

module.exports = config;
