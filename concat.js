const concat = require('concat');
(async function build(){
    const files = [
        './dist/kendo-org-chart-test/runtime.js',
        './dist/kendo-org-chart-test/polyfills.js',
        './dist/kendo-org-chart-test/main.js',
        './dist/kendo-org-chart-test/scripts.js',
    ];
    await concat(files, "./dist/bow-tie-diagram.js");
})();