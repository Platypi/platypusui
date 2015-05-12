module.exports = function(config, grunt) {
	var mainFiles = {},
		examplesFiles = {};
	
	mainFiles[config.build.dest.css] = config.build.dest.less;
	examplesFiles[config.examples.css] = config.examples.less;
	
	return {
        options: {
            relativeUrls: true
        },
        main: {
            files: mainFiles
        },
        examples: {
            files: examplesFiles
        }
	};
};
