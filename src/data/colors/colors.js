const express = require('express'),
    debug = require('debug')('api:colors'),
    router = express.Router();

const redis = require("redis"),
	redis_client = redis.createClient({host: process.env.REDIS_HOST})

var colors = {colors:['#ffffff', '#000000', '#ff0000', '#ffffff', '#000000', '#00ff00', '#000000', '#ffffff']};


function get_colors(fn) {
	 const keys = ['color0','color1','color2','color3','color4','color5','color6','color7'];

    redis_client.mget(keys,(errList, redis_colors) => {
		if (errList) {
		throw errList;
		}
		debug("Color", redis_colors);
		const colors = [];
		fn(redis_colors);
    });
}

router.get('/', (req, res) => {
	//Return all colors in a list

    const keys = ['color0','color1','color2','color3','color4','color5','color6','color7'];

    get_colors( (colors) => {
		return res.status(200).json({colors: colors});
    });
    //console.log("Get colors!");

});

router.post('/:id', (req, res) =>{
	//Set the color for one led

	redis_client.set('color'+req.params.id,req.body.color,(errList, redis_colors) => {
	    get_colors( (colors) => {
			return res.status(200).json({colors: colors});
	    });
	});
});

export default router;