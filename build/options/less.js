module.exports = function(config, grunt) {
	return {
		main: {
            license: config.license,
            version: config.version,
            src: config.folders.src + 'main.less',
            dest: [
                config.build.dest.less
            ],
            disableLint: true
        }
	};
};
