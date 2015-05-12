module.exports = function(config, grunt) {
	var files = {};
   
   files[config.build.dest.min] = config.build.dest.js;
    
    return {
        less: {
            files: '**/*.less',
            tasks: ['lessCompile:examples']
        }
	};
};
