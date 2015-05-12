module.exports = function(config, grunt) {
	var mainFiles = {},
		examplesFiles = {};
	
	mainFiles[config.build.dest.css] = config.build.dest.less;
	examplesFiles[config.examples.css] = config.examples.less;
	
	return {
        main: {
            options: {
                relativeUrls: true
            },
            files: mainFiles
        },
        examples: {
            files: examplesFiles
        }
	};
};
