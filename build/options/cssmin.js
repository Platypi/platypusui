module.exports = function(config, grunt) {
	var files = {};
    
    files[config.build.dest.mincss] = config.build.dest.css;
    
    return {
        options: {
            keepSpecialComments: 0,
            restructuring: false,
        },
		packaging: {
            files: files
        }
	};
};
