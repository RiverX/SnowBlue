//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shipSize = 0.3;
        _this.spaceWidth = 16;
        _this.spaceHeight = 9;
        _this.hideShip = false;
        _this.allowShipCollision = true;
        _this.world = null;
        _this.shipReloadTime = 0.1;
        _this.shipTurnSpeed = 4;
        _this.bulletBodies = [];
        _this.bulletRadius = 0.03;
        _this.bulletLifeTime = 2;
        _this.asteroidShapes = [];
        _this.numAsteroidLevels = 4;
        _this.asteroidRadius = 0.9;
        _this.maxAsteroidSpeed = 2;
        _this.asteroids = [];
        _this.numAsteroidVerts = 10;
        _this.SHIP = Math.pow(2, 1);
        _this.BULLET = Math.pow(2, 2);
        _this.ASTEROID = Math.pow(2, 3);
        _this.initSpace = 0.9 * 2;
        _this.level = 1;
        _this.lives = 3;
        _this.lastShootTime = 0;
        _this.pos1 = new egret.Point();
        _this.pos2 = new egret.Point();
        _this.pos3 = new egret.Point();
        _this.vy = 20;
        _this.lastLogicTime = 0;
        _this.pastAllTime = 0;
        _this.lineDic = [];
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        console.log("runtime = " + egret.Capabilities.os.toString());
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        var gameStage = egret.MainContext.instance.stage;
        gameStage.addEventListener(egret.Event.RESIZE, this.setStageConfig, this);
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
        //this.p2Init();
        //thisl.animate();
        //this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt) => { this.handleKey(evt.keyCode, true) }, this);
        //this.world.on("impact", this.worldImpact, this);
    };
    Main.prototype.setStageConfig = function () {
        var stageWidth = window.innerWidth;
        var stageHeight = window.innerHeight;
        var width = Math.min(game.GameConfig.GameWidth, stageWidth);
        var height = Math.min(game.GameConfig.GameHeight, stageHeight);
        var scale = game.GameConfig.GameWidth / width;
        if (stageWidth > stageHeight) {
            width = game.GameConfig.GameWidth;
            height = game.GameConfig.GameHeight;
        }
        else {
            width = stageWidth;
            height = stageHeight;
        }
        var contentX = (width * scale) >> 0;
        var contentY = (height * scale) >> 0;
        this.stage.setContentSize(contentX, contentY);
        game.GameConfig.GameWidth = Math.min(this.stage.stageWidth, game.GameConfig.GameWidth);
        game.GameConfig.GameHeight = this.stage.stageHeight;
    };
    Main.prototype.p2Init = function () {
        // Init canvas
        this.stage.width = window.innerWidth;
        this.stage.height = window.innerHeight;
        this.w = this.stage.width;
        this.h = this.stage.height;
        this.zoom = this.h / this.spaceHeight;
        if (this.w / this.spaceWidth < this.zoom)
            this.zoom = this.w / this.spaceWidth;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.lineWidth = 1 / this.zoom; // Yields 1px lines for all zoom values
        this.ctx.strokeStyle = this.ctx.fillStyle = 'white';
        // Init p2.js
        this.world = new p2.World({
            gravity: [0, 0],
        });
        // Add ship physics
        this.shipShape = new p2.Circle({ radius: this.shipSize });
        this.shipBody = new p2.Body({ mass: 1, position: [0, 0], angularVelocity: 1 });
        this.turnOffDamping(this.shipBody);
        this.shipBody.addShape(this.shipShape);
        this.shipShape.collisionGroup = this.SHIP;
        this.shipShape.collisionMask = this.ASTEROID;
        this.world.addBody(this.shipBody);
        // Init asteroid shapes
        this.addAsteroids();
        // Update the text boxes
        this.updateLevel();
        this.updateLives();
    };
    // Animation loop
    Main.prototype.animate = function () {
        requestAnimationFrame(this.animate);
        this.updatePhysics();
        // Render scene
        this.render();
    };
    Main.prototype.updatePhysics = function () {
        this.allowShipCollision = true;
        // Set velocities
        if (this.keyLeft)
            this.shipBody.angularVelocity = this.shipTurnSpeed;
        else if (this.keyRight)
            this.shipBody.angularVelocity = -this.shipTurnSpeed;
        else
            this.shipBody.angularVelocity = 0;
        // Thrust: add some force in the ship direction
        if (this.keyUp) {
            this.shipBody.applyForceLocal([0, 2]);
        }
        // Shoot
        if (this.keyShoot && !this.hideShip && this.world.time - this.lastShootTime > this.shipReloadTime) {
            // Create a bullet body
            var bulletBody = new p2.Body({ mass: 0.05, position: this.shipBody.position });
            this.turnOffDamping(bulletBody);
            // Create bullet shape
            this.bulletShape = new p2.Circle({ radius: this.bulletRadius });
            this.bulletShape.collisionGroup = this.BULLET;
            this.bulletShape.collisionMask = this.ASTEROID;
            bulletBody.addShape(this.bulletShape);
            this.bulletBodies.push(bulletBody);
            var magnitude = 2, angle = this.shipBody.angle + Math.PI / 2;
            // Give it initial velocity in the ship direction
            bulletBody.velocity[0] += magnitude * Math.cos(angle) + this.shipBody.velocity[0];
            bulletBody.velocity[1] += magnitude * Math.sin(angle) + this.shipBody.velocity[1];
            bulletBody.position[0] = this.shipShape.radius * Math.cos(angle) + this.shipBody.position[0];
            bulletBody.position[1] = this.shipShape.radius * Math.sin(angle) + this.shipBody.position[1];
            this.world.addBody(bulletBody);
            // Keep track of the last time we shot
            this.lastShootTime = this.world.time;
            // Remember when we should delete this bullet
            //bulletBody.dieTime = this.world.time + this.bulletLifeTime;
        }
        for (var i = 0; i !== this.bulletBodies.length; i++) {
            var b = this.bulletBodies[i];
            // If the bullet is old, delete it
            if (b.dieTime <= this.world.time) {
                this.bulletBodies.splice(i, 1);
                this.world.removeBody(b);
                i--;
                continue;
            }
            // If any body is out of bounds, move it to the other end
            this.warp(b);
        }
        // Warp all asteroids
        for (var i = 0; i !== this.asteroids.length; i++) {
            var a = this.asteroids[i];
            this.warp(a);
        }
        // Warp the ship
        this.warp(this.shipBody);
        // Move physics bodies forward in time
        this.world.step(1 / 60);
    };
    Main.prototype.turnOffDamping = function (body) {
        body.damping = body.angularDamping = 0;
    };
    // If the body is out of space bounds, warp it to the other side
    Main.prototype.warp = function (body) {
        var p = body.position;
        if (p[0] > this.spaceWidth / 2)
            p[0] = -this.spaceWidth / 2;
        if (p[1] > this.spaceHeight / 2)
            p[1] = -this.spaceHeight / 2;
        if (p[0] < -this.spaceWidth / 2)
            p[0] = this.spaceWidth / 2;
        if (p[1] < -this.spaceHeight / 2)
            p[1] = this.spaceHeight / 2;
    };
    Main.prototype.render = function () {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.w, this.h);
        // Transform the canvas
        // Note that we need to flip the y axis since Canvas pixel coordinates
        // goes from top to bottom, while physics does the opposite.
        this.ctx.save();
        this.ctx.translate(this.w / 2, this.h / 2); // Translate to the center
        this.ctx.scale(this.zoom, -this.zoom); // Zoom in and flip y axis
        // Draw all things
        this.drawShip();
        this.drawBullets();
        this.drawBounds();
        this.drawAsteroids();
        // Restore transform
        this.ctx.restore();
    };
    Main.prototype.drawShip = function () {
        if (!this.hideShip) {
            var x = this.shipBody.position[0], y = this.shipBody.position[1], radius = this.shipShape.radius;
            this.ctx.save();
            this.ctx.translate(x, y); // Translate to the ship center
            this.ctx.rotate(this.shipBody.angle); // Rotate to ship orientation
            this.ctx.moveTo(-radius * 0.6, -radius);
            this.ctx.lineTo(0, radius);
            this.ctx.lineTo(radius * 0.6, -radius);
            this.ctx.moveTo(-radius * 0.5, -radius * 0.5);
            this.ctx.lineTo(radius * 0.5, -radius * 0.5);
            this.ctx.stroke();
            this.ctx.restore();
        }
    };
    Main.prototype.drawAsteroids = function () {
        for (var i = 0; i !== this.asteroids.length; i++) {
            var a = this.asteroids[i], x = a.position[0], y = a.position[1], radius = a.shapes[0].radius;
            this.ctx.save();
            this.ctx.translate(x, y); // Translate to the center
            this.ctx.rotate(a.angle);
            this.ctx.beginPath();
            for (var j = 0; j !== this.numAsteroidVerts; j++) {
                var xv = a.verts[j][0], yv = a.verts[j][1];
                if (j == 0)
                    this.ctx.moveTo(xv, yv);
                else
                    this.ctx.lineTo(xv, yv);
            }
            this.ctx.closePath();
            this.ctx.stroke();
            this.ctx.restore();
        }
    };
    Main.prototype.drawBullets = function () {
        for (var i = 0; i !== this.bulletBodies.length; i++) {
            var bulletBody = this.bulletBodies[i], x = bulletBody.position[0], y = bulletBody.position[1];
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.bulletRadius, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.closePath();
        }
    };
    Main.prototype.drawBounds = function () {
        this.ctx.moveTo(-this.spaceWidth / 2, -this.spaceHeight / 2);
        this.ctx.lineTo(-this.spaceWidth / 2, this.spaceHeight / 2);
        this.ctx.lineTo(this.spaceWidth / 2, this.spaceHeight / 2);
        this.ctx.lineTo(this.spaceWidth / 2, -this.spaceHeight / 2);
        this.ctx.lineTo(-this.spaceWidth / 2, -this.spaceHeight / 2);
        this.ctx.stroke();
    };
    Main.prototype.updateLevel = function () {
        var el = document.getElementById("level");
        el.innerHTML = "Level " + this.level;
    };
    Main.prototype.updateLives = function () {
        var el = document.getElementById("lives");
        el.innerHTML = "Lives " + this.lives;
    };
    // Returns a random number between -0.5 and 0.5
    Main.prototype.rand = function () {
        return Math.random() - 0.5;
    };
    // Adds some asteroids to the scene.
    Main.prototype.addAsteroids = function () {
        for (var i = 0; i < this.level; i++) {
            var x = this.rand() * this.spaceWidth, y = this.rand() * this.spaceHeight, vx = this.rand() * this.maxAsteroidSpeed, vy = this.rand() * this.maxAsteroidSpeed, va = this.rand() * this.maxAsteroidSpeed;
            // Aviod the ship!
            if (Math.abs(x - this.shipBody.position[0]) < this.initSpace) {
                if (y - this.shipBody.position[1] > 0) {
                    y += this.initSpace;
                }
                else {
                    y -= this.initSpace;
                }
            }
            // Create asteroid body
            var asteroidBody = new p2.Body({
                mass: 10,
                position: [x, y],
                velocity: [vx, vy],
                angularVelocity: va,
            });
            this.turnOffDamping(asteroidBody);
            asteroidBody.addShape(this.createAsteroidShape(0));
            this.asteroids.push(asteroidBody);
            this.world.addBody(asteroidBody);
            //asteroidBody.level = 1;
            this.addAsteroidVerts(asteroidBody);
        }
    };
    Main.prototype.createAsteroidShape = function (level) {
        var shape = new p2.Circle({ radius: this.asteroidRadius * (this.numAsteroidLevels - level) / this.numAsteroidLevels });
        shape.collisionGroup = this.ASTEROID;
        shape.collisionMask = this.BULLET | this.SHIP;
        return shape;
    };
    // Adds random .verts to an asteroid body
    Main.prototype.addAsteroidVerts = function (asteroidBody) {
        asteroidBody.verts = [];
        var radius = asteroidBody.shapes[0].radius;
        for (var j = 0; j !== this.numAsteroidVerts; j++) {
            var angle = j * 2 * Math.PI / this.numAsteroidVerts, xv = radius * Math.cos(angle) + this.rand() * radius * 0.4, yv = radius * Math.sin(angle) + this.rand() * radius * 0.4;
            asteroidBody.verts.push([xv, yv]);
        }
    };
    // Handle key up or down
    Main.prototype.handleKey = function (code, isDown) {
        switch (code) {
            case 32:
                this.keyShoot = isDown;
                break;
            case 37:
                this.keyLeft = isDown;
                break;
            case 38:
                this.keyUp = isDown;
                document.getElementById("instructions").classList.add("hidden");
                break;
            case 39:
                this.keyRight = isDown;
                break;
            case 40:
                this.keyDown = isDown;
                break;
        }
    };
    // Catch impacts in the world
    // Todo: check if several bullets hit the same asteroid in the same time step
    Main.prototype.worldImpact = function (evt) {
        var _this = this;
        var bodyA = evt.bodyA, bodyB = evt.bodyB;
        if (!this.hideShip && this.allowShipCollision && (bodyA.id == this.shipBody.id || bodyB.id == this.shipBody.id)) {
            // Ship collided with something
            this.allowShipCollision = false;
            var s = bodyA.shapes[0].collisionGroup == this.SHIP ? bodyA : bodyB, otherBody = bodyB == s ? bodyA : bodyB;
            if (otherBody.shapes[0].collisionGroup == this.ASTEROID) {
                this.lives--;
                this.updateLives();
                // Remove the ship body for a while
                this.world.removeBody(this.shipBody);
                this.hideShip = true;
                if (this.lives > 0) {
                    var interval = setInterval(function () {
                        // Check if the ship position is free from asteroids
                        var free = true;
                        for (var i = 0; i < _this.asteroids.length; i++) {
                            var a = _this.asteroids[i];
                            if (Math.pow(a.position[0] - _this.shipBody.position[0], 2) + Math.pow(a.position[1] - _this.shipBody.position[1], 2) < _this.initSpace) {
                                free = false;
                            }
                        }
                        if (free) {
                            // Add ship again
                            _this.shipBody.force[0] =
                                _this.shipBody.force[1] =
                                    _this.shipBody.velocity[0] =
                                        _this.shipBody.velocity[1] =
                                            _this.shipBody.angularVelocity =
                                                _this.shipBody.angle = 0;
                            _this.hideShip = false;
                            _this.world.addBody(_this.shipBody);
                            clearInterval(interval);
                        }
                    }, 100);
                }
                else {
                    document.getElementById('gameover').classList.remove('hidden');
                }
            }
        }
        else if (bodyA.shapes[0].collisionGroup == this.BULLET || bodyB.shapes[0].collisionGroup == this.BULLET) {
            // Bullet collided with something
            var bulletBody = bodyA.shapes[0].collisionGroup == this.BULLET ? bodyA : bodyB, otherBody = bodyB == bulletBody ? bodyA : bodyB;
            if (otherBody.shapes[0].collisionGroup == this.ASTEROID) {
                this.explode(otherBody, bulletBody);
            }
        }
    };
    Main.prototype.explode = function (asteroidBody, bulletBody) {
        var aidx = this.asteroids.indexOf(asteroidBody);
        var idx = this.bulletBodies.indexOf(bulletBody);
        if (aidx != -1 && idx != -1) {
            // Remove asteroid
            this.world.removeBody(asteroidBody);
            this.asteroids.splice(aidx, 1);
            // Remove bullet
            this.world.removeBody(bulletBody);
            this.bulletBodies.splice(idx, 1);
            // Add new sub-asteroids
            var x = asteroidBody.position[0], y = asteroidBody.position[1];
            if (asteroidBody.level < 4) {
                var angleDisturb = Math.PI / 2 * Math.random();
                for (var i = 0; i < 4; i++) {
                    var angle = Math.PI / 2 * i + angleDisturb;
                    var shape = this.createAsteroidShape(asteroidBody.level);
                    var r = asteroidBody.shapes[0].radius - shape.radius;
                    var subAsteroidBody = new p2.Body({
                        mass: 10,
                        position: [x + r * Math.cos(angle), y + r * Math.sin(angle)],
                        velocity: [this.rand(), this.rand()],
                    });
                    this.turnOffDamping(subAsteroidBody);
                    subAsteroidBody.addShape(shape);
                    //subAsteroidBody.level = asteroidBody.level + 1;
                    this.world.addBody(subAsteroidBody);
                    this.addAsteroidVerts(subAsteroidBody);
                    this.asteroids.push(subAsteroidBody);
                }
            }
        }
        if (this.asteroids.length == 0) {
            this.level++;
            this.updateLevel();
            this.addAsteroids();
        }
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /*await this.loadResource()
                    //this.createGameScene();
            
                    this.initGame();
            
                    const result = await RES.getResAsync("description_json")
                    this.startAnimation(result);
                    await platform.login();
                    const userInfo = await platform.getUserInfo();
                    console.log(userInfo);
                    */
                    return [4 /*yield*/, this.loadResource()];
                    case 1:
                        /*await this.loadResource()
                        //this.createGameScene();
                
                        this.initGame();
                
                        const result = await RES.getResAsync("description_json")
                        this.startAnimation(result);
                        await platform.login();
                        const userInfo = await platform.getUserInfo();
                        console.log(userInfo);
                        */
                        _a.sent();
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 3:
                        userInfo = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.initGame = function () {
        var sky = this.createBitmapByName("bg2_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        this.pastAllTime = 0;
        this.lastLogicTime = new Date().getTime();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onGameUpdate, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addLineOnStage, this);
        /* this.ball1 = this.addBall();
         this.ball2 = this.addBall();
         this.ball3 = this.addBall();*/
    };
    Main.prototype.addBall = function () {
        //this.lineDic.push(smoke);
        var ns = new egret.DisplayObjectContainer();
        this.addChild(ns);
        ns.x = this.stage.width - 100 - 100 * Math.random();
        ns.y = this.stage.height - 100 - 100 * Math.random();
        var smoke = this.createBitmapByName("smoke_png");
        //ns.addChild(smoke);
        //smoke.scaleX = smoke.scaleY = 0.5;
        return ns;
    };
    Main.prototype.onGameUpdate = function () {
        var elapsedTicks = new Date().getTime();
        if (this.lastLogicTime == elapsedTicks) {
            return false;
        }
        var pastTime = elapsedTicks - this.lastLogicTime;
        this.pastAllTime = this.pastAllTime + pastTime;
        this.lastLogicTime = elapsedTicks;
        this.onLogicUpdate(pastTime / 1000);
        return true;
    };
    Main.prototype.onLogicUpdate = function (pre) {
        //console.log("====" + pre);
        /*this.pos1.y = this.ball1.y
        this.pos1.y -= this.vy;
        this.ball1.y = this.pos1.y;*/
        /*let angle = 100;
        let temp = angle * (Math.PI / 180);
        let speed = this.vy;
        this.ball2.x -= speed * Math.cos(temp);
        this.ball2.y -= speed * Math.sin(temp);*/
    };
    Main.prototype.addLineOnStage = function (e) {
        var _this = this;
        this.ball1 = this.addBall();
        var p0 = new egret.Point(this.ball1.x, this.ball1.y);
        var p1 = new egret.Point(this.ball1.x - 40, this.ball1.y - 780);
        var p2 = new egret.Point(this.ball1.x - 565, this.ball1.y - 650);
        var arc = new ArcMotion(this.ball1, p0, p1, p2, 2000, true);
        arc.play();
        //battle_win
        ArcMotion.loadAndPlay("arrow_fly", 1, function (effect) {
            effect.x = _this.ball1.width / 2 - effect.width / 2;
            effect.y = _this.ball1.width / 2 - effect.height / 2;
            _this.ball1.addChild(effect);
        }, function (effect) {
            console.log("====" + "GameOver");
        }, ImageType.PNG, this, 18);
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /*try {
                    const loadingView = new LoadingUI();
                    this.stage.addChild(loadingView);
                    await RES.loadConfig("resource/default.res.json", "resource/");
                    await this.loadTheme();
                    await RES.loadGroup("preload", 0, loadingView);
                    this.stage.removeChild(loadingView);
                }
                catch (e) {
                    console.error(e);
                }*/
                try {
                    RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
                    RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadErr, this);
                    RES.loadConfig("resource/default.res.json", "resource/");
                }
                catch (e) {
                    console.error(e);
                }
                return [2 /*return*/];
            });
        });
    };
    Main.prototype.onConfigComplete = function () {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadErr, this);
        this.loadTheme();
    };
    Main.prototype.onConfigLoadErr = function () {
        console.log("onConfigLoadErr....");
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var theme = new eui.Theme('resource/default.thm.json', _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                _this.preload();
            }, _this);
        });
    };
    Main.prototype.preload = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreLoadResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
    * 资源组加载出错
    */
    Main.prototype.onResourceLoadError = function (event) {
        // Utils.debugLog("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        // this.onResourceLoadComplete(event);
    };
    Main.prototype.onItemLoadError = function (event) {
        // Utils.debugLog("Url:" + event.resItem.url + " has failed to load");
    };
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            // Utils.debugLog("itemsTotal:" + event.itemsLoaded + " NAME - " + event.resItem.url);
            // Utils.debugLog("itemsLoaded:" + event.itemsTotal);
            // let index = this.list.indexOf(event.resItem.url);
            // if(index > -1){
            //     this.list.splice(index, 1);
            // }
            // if(this.list.length < 5){
            //     Utils.debugLog(" list = " + this.list.toString());
            // }
        }
    };
    /**
    * 资源组加载完成
    */
    Main.prototype.onPreLoadResourceLoadComplete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreLoadResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                this.runScene();
                return [2 /*return*/];
            });
        });
    };
    Main.prototype.runScene = function () {
        game.GameConfig.stage = this;
        game.LayerManager.getInstance().init();
        MainSceneControler.getInstance().onLoad();
        //LayerManager.getInstance().layer_bg.addChild(MainSceneControler.getInstance());
        /*SceneManager.instance.init();
        SceneManager.instance.registerScene<MainSceneControler>(MainSceneControler);
        SceneManager.instance.runScene<MainSceneControler>(MainSceneControler);*/
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addLineOnStage, this);
        //this.initGame();
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        var sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
        var button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map