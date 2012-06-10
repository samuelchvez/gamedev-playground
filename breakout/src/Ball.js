var cocos = require('cocos2d'),
	geom = require('geometry'),
	util = require('util');

var Ball = cocos.nodes.Node.extend({
	velocity: null, 
	init: function(){
		
		var sprite = cocos.nodes.Sprite.create({
			file: '/resources/sprites.png',
			rect: new geom.Rect(64, 0, 16, 16)
		});
		sprite.set('anchorPoint', 0, 0);

		Ball.superclass.init.call(this);
		this.addChild({child: sprite});
		this.set('contentSize', sprite.get('contentSize'));

		this.set('velocity', new geom.Point(60, 120)); 

		this.scheduleUpdate();
	},
	update: function(dt){
		var curPos = util.copy(this.get('position')),
			curVel = util.copy(this.get('velocity'));
		curPos.x += dt * curVel.x;
		curPos.y += dt * curVel.y;
		this.set('position', curPos);
		this.testBatCollision();
		this.testEdgeCollision();
	},
	testEdgeCollision: function(){
		var curVel = util.copy(this.get('velocity')),
			ballBox = this.get('boundingBox'),
			winLimits = cocos.Director.get('sharedDirector').get('winSize');

		if(curVel.x < 0 && geom.rectGetMinX(ballBox) < 0 ||
			curVel.x > 0 && geom.rectGetMaxX(ballBox) > winLimits.width){
			curVel.x *= -1;
		}

		if(curVel.y < 0 && geom.rectGetMinY(ballBox) < 0){
			curVel.y *= -1;
		}

		this.set('velocity', curVel);
	},
	testBatCollision: function(){
		var curVel = util.copy(this.get('velocity'));

		if(curVel.y > 0){

			var ballBox = this.get('boundingBox'),
				batBox = this.get('parent').get('bat').get('boundingBox');

			if(geom.rectOverlapsRect(ballBox, batBox)){
				curVel.y *= -1;
				this.set('velocity', curVel);
			}
		}
	}
});

exports.Ball = Ball;