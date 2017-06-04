const config = require('../../config');
const excludePath = require('./excludePath');

const buildPaths = {}

/* site root */
const siteRoot = config.src;
buildPaths['root'] = siteRoot;
const partialPath = [
  `${siteRoot}/**/_*`,
  `${siteRoot}/**/_*/`,
  `${siteRoot}/**/_*/**/*`
]


/* dest path */
buildPaths['dest'] = config.dest;

/* html task path */
const htmlPath = [`${siteRoot}/**/*.html`];
// const partialHtmlPath = [
//   `${siteRoot}/**/_*.html`,
//   `${siteRoot}/**/_*/**/*.html`
// ]
buildPaths['html'] = htmlPath.concat(excludePath(partialPath));

/* scss task path */
const sassPath = [`${siteRoot}/scss/**/*.scss`];
const sassDest = `${buildPaths.dest}/css`;
buildPaths['sass'] = sassPath;
buildPaths['sassDest'] = sassDest;

/* js task path */
const jsPath = [`${siteRoot}/**/*.js`]
buildPaths['js'] = jsPath.concat(excludePath(partialPath));

/* copy task path */
const copyPath = [`${siteRoot}/**/*`];
buildPaths['copy'] = copyPath.concat(excludePath(partialPath))
                             .concat(excludePath(htmlPath))
                             .concat(excludePath([`${siteRoot}/scss/`]))
                             .concat(excludePath(sassPath))
                             .concat(excludePath(jsPath));

/* data task path */
const dataPath = `${siteRoot}/_data`;
buildPaths['data'] = dataPath;

module.exports = buildPaths;
