var config = {
		//type: Phaser.CANVAS,
		type: Phaser.AUTO,
		width: 800,
		height: 480,
		physics: {
		default: 'arcade',
		arcade: {
		   // gravity: { y: 0 },
			debug: false
		}
	},
		scene: {
			preload: preload,
			create: create,
			update: update
		}
	};

	// ini variable //
	var game = new Phaser.Game(config);
	var wizard;
	var cursors ;
	var keys ;
	var bomb ;
	var bombs ;
	var fire = false;
	var enemies;
	var enemy;
	
	var text;
	var sprite;
	var style;
	var player_hp = 10;
	var text_hp;
	var game_state = "start_menu";
	var key_enter;
	var key_space;
	var this_create;
	var wall;
	var walls;
	//speed//
	var speedx = 0;
	var speedy = 0;
	var accel = 10;
	var top_speed = 180;

	var scale_sprite = 0.25;
	var player_scale_sprite = 0.35;

	//map
	var start_map = "town_ashton_1";
	var town_ashton_1;
	var town_ashton_2;
	var dungeon_1;
	var dungeon_2;

	//preload
	function preload ()
	{
		this.load.image('sky', 'assets/sky.png');
		this.load.image('town_ashton_2', 'assets/town_a1.png');
		this.load.image('bomb', 'assets/bomb.png');
		//this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
		//this.load.spritesheet('wizard', 'assets/hero_diam.png', { frameWidth: 18, frameHeight: 21 });
		this.load.spritesheet('wizard_side', 'assets/3_side.png', { frameWidth: 16, frameHeight: 22 });
		//this.load.spritesheet('wizard', 'assets/wizard-161x106.png', { frameWidth: 161, frameHeight: 106 });
		this.load.spritesheet('wizard', 'assets/wizard Pack/Run231x190.png', { frameWidth: 231, frameHeight: 190 });
		this.load.spritesheet('wizard_idle', 'assets/wizard Pack/Idle.png', { frameWidth: 231, frameHeight: 190 });
		this.load.spritesheet('m_boar', 'assets/m_boar-239x178.png', { frameWidth: 239, frameHeight: 178 });
		this.load.spritesheet('reptile', 'assets/monster/reptile/sprite-sheet- 248x151.png', { frameWidth: 248, frameHeight: 151 });
		this.load.image('wall', 'assets/platform.png');
	}

	function create()
	{
		if(this_create){

		}else{
			this_create = this;
		}
		
		// town_ashton_1 = this_create.add.image(400, 300, 'sky');
		// //town_ashton_2 = this.add.image(400, 300, 'town_ashton_2');
		// player = this_create.physics.add.sprite(200,300,'wizard');
		// player.setScale(0.25);
		//player.setCollideWorldBounds(true);
		cursors = this_create.input.keyboard.createCursorKeys();
		keys = this_create.input.keyboard.addKeys('Z');
		key_enter = this_create.input.keyboard.addKeys('ENTER');
		key_space = this_create.input.keyboard.addKeys('SPACE');
		
		// bombs = this_create.physics.add.group();
		// enemies = this_create.physics.add.group();
		// // style = { font: "12px Arial", fill: "#ff0044", wordWrap: true, align: "center", backgroundColor: "#ffff00" };
		// // text = this_create.add.text(player.x,player.y,map,style);
		// // text_hp = this_create.add.text(50,50,player_hp,style);

		// this_create.physics.add.overlap(bombs, enemies, BombHitEnemies, null, this_create);
		// this_create.physics.add.overlap(player, enemies, EnemiesHitPlayer, null, this_create);
		player_hp = 10;
		
	}
	
	var fire_time = 0;
	var facingUp = false;
	var facingDown = false;
	var facingLeft = false;
	var facingRight = false;
	var enemySpawn = 0;
	var map = "";
	var this_update;
	var player_state;
	var aplha_timer = 0;

	function start_menu(this_create){
		var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, align: "center", backgroundColor: "#ffff00" };
		this_create.add.text(game.config.width/4,game.config.height/2,"PRESS ENTER TO START",style);
		game_state = "";
		
	}

	function begining(this_create){
		

		//town_ashton_1 = this_create.add.image(400, 300, 'sky');
		//wall = this_create.physics.add.staticGroup();
		//town_ashton_2 = this.add.image(400, 300, 'town_ashton_2');
		//wall.create(300, 400, 'wall');
		walls = this_create.physics.add.staticGroup();
		//walls = this_create.physics.add.group();
		//walls.create(300,400,'wall');
		
		player = this_create.physics.add.sprite(200,300,'wizard_idle');
		player.setScale(player_scale_sprite);
		//player.flipX =true;
		//player.setCollideWorldBounds(true);
		bombs = this_create.physics.add.group();
		enemies = this_create.physics.add.group();
		enemies.enableBody = true;

		
		//walls.create(300,400,'wall');

		style = { font: "12px Arial", fill: "#ff0044", wordWrap: true, align: "center", backgroundColor: "#ffff00" };
		// text = this_create.add.text(player.x,player.y,map,style);
		text_hp = this_create.add.text(10,10,player_hp + " " + map ,style);

		//  Collide the player and the wall
		this_create.physics.add.collider(player, walls);
		this_create.physics.add.collider(enemies, walls);

		//this_create.physics.add.overlap(player, walls, PlayerHitWall, null, this_create);
		this_create.physics.add.overlap(bombs, enemies, BombHitEnemies, null, this_create);
		this_create.physics.add.overlap(player, enemies, EnemiesHitPlayer, null, this_create);
		this_create.physics.add.overlap(enemies, walls, EnemiesHitWalls, null, this_create);
		//town_ashton_1_create(this_create);

		game.anims.create
		(
			
			{
				key: 'play_hero_side',
				frames: game.anims.generateFrameNumbers('wizard', { start: 0, end: 8 }),
				frameRate: 10,
				repeat: 1
			}
			
			
		);

		game.anims.create({
			
				key: 'wizard_idle_play',
				frames: game.anims.generateFrameNumbers('wizard_idle', { start: 0, end: 6 }),
				frameRate: 10,
				repeat: 1
			
		});

		// game.anims.create
		// ({
		// 	key: 'play_hero_side_left',
		// 	frames: game.anims.generateFrameNumbers('wizard_side', { start: 0, end: 3 }),
		// 	frameRate: 10,
		// 	repeat: 1,
		// 	scaleX: -1
		// });
		
	}
	
	
	
	function town_ashton_3_create(this_create){
		//enemies = [];
	}
	
	function dungeon_1_create(this_create){
		//enemies = [];
		
	}
	function dungeon_2_create(this_create){
		//enemies = [];
		var enemy_reptile = enemies.create(500, 100, 'm_boar');
		create_walls();
		enemies.create(100,500,'m_boar');
		this_create.physics.add.collider(enemies, walls);
		game.anims.create
		({
			key: 'play_boar',
			frames: game.anims.generateFrameNumbers('m_boar', { start: 0, end: 34 }),
			frameRate: 10,
			repeat: -1
		});
	}

	function town_ashton_2_create(this_create){
		//enemies = [];
		var enemy_reptile = enemies.create(500, 100, 'reptile'); 
		enemies.create(500,300,'reptile');
		game.anims.create
		({
			key: 'play_reptile',
			frames: game.anims.generateFrameNumbers('reptile', { start: 0, end: 34 }),
			frameRate: 10,
			repeat: -1
		});
	
	}

	function town_ashton_1_create(this_create){
		//enemies = [];
		var enemy_boar = enemies.create(500, 100, 'm_boar');
		//create_walls();
		//enemies.create(100,500,'m_boar');
		//this_create.physics.add.collider(enemies, walls);
		
		game.anims.create
		({
			key: 'play_boar',
			frames: game.anims.generateFrameNumbers('m_boar', { start: 0, end: 34 }),
			frameRate: 10,
			repeat: -1
		});

		
	
	}

	function enemy_reptile_move(){
		enemies.children.iterate(function (child) {
			//  Give each star a slightly different bounce
			child.setScale(scale_sprite);
			child.anims.play('play_reptile', true);
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
			// jika player mendekat musuh mengejar//
			rangex = 100;
			//console.log(Math.abs(child.x - player.x))
			proxx = Math.abs(child.x - player.x)
			proxy = Math.abs(child.y - player.y)
			if(proxx < rangex && proxy < rangex){
				//kejar player//
				kejar_player(child);
			}
		});
	}

	function hero_side_move(){
		child.anims.play('wizard', true);
		// enemies.children.iterate(function (child) {
		// 	//  Give each star a slightly different bounce
		// 	//child.setScale(scale_sprite);
			
		// 	child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
		// 	// jika player mendekat musuh mengejar//
		// 	rangex = 100;
		// 	//console.log(Math.abs(child.x - player.x))
		// 	proxx = Math.abs(child.x - player.x)
		// 	proxy = Math.abs(child.y - player.y)
		// 	if(proxx < rangex && proxy < rangex){
		// 		//kejar player//
		// 		kejar_player(child);
		// 	}
		// });
	}

	function kejar_player(child){
		if(child.x < player.x){
			child.x += 1 ;
		}else if(child.x > player.x){
			child.x -= 1 ;
		}
		else{
			
		}

		if(child.y < player.y){
			child.y += 1 ;
		}else if(child.y > player.y){
			child.y -= 1;
		}
		else{
			//child.setVelocity(0,0);
		}
	}
	
	//buat tembok//
	function create_walls(){
		//walls.create(300,400,'wall');
	}

	function enemy_boar_move(){
		enemies.children.iterate(function (child) {
			//  Give each star a slightly different bounce
			child.setScale(scale_sprite);
			child.anims.play('play_boar', true);
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
			kejar_player(child);

		});
	}
	
	

	function update (){	
		///map change//
		if(this_update){

		}else{
			this_update = this;
		}
		
		if(game_state == "start_menu"){
			start_menu(this_create);
		}
		else if(game_state == "play"){
			
			text_hp.setText("HP : " + player_hp + " | map = " + map);

			if (player_state == "hit"){
				aplha_timer += 1;
				player.alpha = 0.1 * Phaser.Math.Between(1, 5);
				//player.setTint(0xff0000);
				//player.setScale(0.25 * Phaser.Math.Between(0, 2));
				if(aplha_timer > 100){
					player_state = "";
					player.alpha = 1;
					aplha_timer = 0;
					player.setScale(player_scale_sprite);
				}
				
				
			}
				//pindah map//
				//EnemiesHitWalls(this_create);
				if(map == "town_ashton_1")
				{
					
					// text = game.add.text(0, 0, "town ashton 1",style);
					// text.anchor.set(0.5);
					enemy_boar_move(this_create);
					if(!town_ashton_1){
						town_ashton_1 = this.add.image(400, 300, 'sky');
						town_ashton_1_create(this_create);
					}
					
					if(player.x > 800)
					{
						town_ashton_1.destroy();
						clearWalls();
						clearEnemies();
						player.x = 0;
						map = "town_ashton_2"
						town_ashton_2 = this.add.image(400, 300, 'town_ashton_2');
						town_ashton_2_create(this_create);
						
					}
					if(player.x < 1){
						player.x = 1;
					}
					if(player.y > game.config.height){
						player.y = game.config.height;
					}
					if(player.y < 1){
						player.y = 1;
					}
					//generate_enemie_lizard();
				}
				else if(map == "town_ashton_2")
				{
					if(!town_ashton_2){
						town_ashton_2 = this.add.image(400, 300, 'sky');
						town_ashton_2_create(this_create);
					}
					enemy_reptile_move(this_create);
					if(player.x < -1)
					{
						town_ashton_2.destroy();
						clearEnemies();
						player.x = 800;
						map = "town_ashton_1";
						town_ashton_1 = this.add.image(400, 300, 'sky');
						town_ashton_1_create(this_create);
					}
					if(player.y < -1)
					{
						town_ashton_2.destroy();
						clearEnemies();
						player.y = 480;
						map = "town_ashton_3";
						town_ashton_3 = this.add.image(400, 300, 'sky');
						town_ashton_3_create(this_create);
					}
					//dungeon_1//
					if(player.x > 800)
					{
						town_ashton_2.destroy();
						clearEnemies();
						player.x = 0;
						map = "dungeon_1";
						dungeon_1 = this.add.image(400, 300, 'sky');
						dungeon_1_create(this_create);
					}
					

					//generate_enemie_boar();
					
				}
				else if(map == "town_ashton_3")
				{
					if(player.y > 480)
					{
						town_ashton_3.destroy();
						clearEnemies();
						player.y = 0;
						map = "town_ashton_2";
						town_ashton_2 = this.add.image(400, 300, 'town_ashton_2');
						town_ashton_2_create(this_create);
					}
					//generate_enemie_boar();
					
				}else if(map == "dungeon_1"){
					
					if(!dungeon_1){
						dungeon_1 = this.add.image(400, 300, 'sky');
						dungeon_1_create(this_create);
					}
					if(player.x < -1)
					{
						dungeon_1 != null ? dungeon_1.destroy() : dungeon_1 = null;
						clearEnemies();
						player.x = 800;
						map = "town_ashton_2";
						town_ashton_2 = this.add.image(400, 300, 'town_ashton_2');
						town_ashton_2_create(this_create);
						dungeon_1.destroy();
					}
					if(player.x > 800)
					{
						dungeon_1 != null ? dungeon_1.destroy() : dungeon_1 = null;
						clearEnemies();
						player.x = 0;
						map = "dungeon_2";
						dungeon_2 = this.add.image(400, 300, 'sky');
						//dungeon_2_create(this_create);
						dungeon_1.destroy();
					}
				}else if(map == "dungeon_2"){
					if(!dungeon_2){
						dungeon_2 = this.add.image(400, 300, 'sky');
						dungeon_2_create(this_create);
					}
					//enemy_boar_move(this_create);
					if(player.x < -1)
					{
						dungeon_1 != null ? dungeon_1.destroy() : dungeon_1 = null;
						clearEnemies();
						player.x = 800;
						map = "dungeon_1";
						dungeon_1 = this.add.image(400, 300, 'sky');
						dungeon_1_create(this_create);
						dungeon_2.destroy();
					}
					generate_enemie_boar();
					generate_enemie_lizard();
				}else if(map == "game_over"){
					
					
				}else{

				}
				
				
			///player selalu nampak///	
			player.depth = 1;
			text_hp.depth = 1;
			
			if (cursors.left.isDown)
			{
				
				//console.log("accel = " + accel + " speedx = " + speedx + " speedy = " + speedy );
				if(speedx < top_speed){
					speedx += accel;
				}
				player.setVelocityX(speedx * -1);
				facingLeft = true;
				facingRight = false;
				facingUp = false;
				facingDown =false;
				//player.setScaleX = -1;
				player.anims.play('play_hero_side',true);
				//player.setScale(-1,1);
				player.setScale(player_scale_sprite);
				player.flipX =true;
			}
			else if (cursors.right.isDown)
			{
				//console.log("accel = " + accel + " speedx = " + speedx + " speedy = " + speedy );
				if(speedx < top_speed){
					speedx += accel;
				}
				player.setVelocityX(speedx);
				facingLeft = false;
				facingRight = true;
				facingUp = false;
				facingDown =false;
				player.anims.play('play_hero_side',true);
				//player.setScale(1,1);
				player.setScale(player_scale_sprite);
				player.flipX =false;
				

			}
			else if (cursors.up.isDown)
			{
				//console.log("accel = " + accel + " speedx = " + speedx + " speedy = " + speedy );
				if(speedy < top_speed){
					speedy += accel;
				}
				player.setVelocityY(speedy * -1);
				facingLeft = false;
				facingRight = false;
				facingUp = true;
				facingDown = false;
				player.anims.play('play_hero_side',true);
				player.setScale(player_scale_sprite);
				//player.flipX =true;
			}
			else if (cursors.down.isDown)
			{
				//console.log("accel = " + accel + " speedx = " + speedx + " speedy = " + speedy );
				if(speedy < top_speed){
					speedy += accel;
				}
				//player.y += speedy;
				player.setVelocityY(speedy);
				facingLeft = false;
				facingRight = false;
				facingUp = false;
				facingDown =true;
				player.anims.play('play_hero_side',true);
				player.setScale(player_scale_sprite);
				//player.flipX =true;
			}
			else
			{
				//reset speed//
				//reset_speed();
				player.setVelocityY(0);
				player.setVelocityX(0);
				player.anims.play('wizard_idle_play',true);
				speedy = 0;
				speedx = 0;
			}
			
			if(keys.Z.isDown)
			{
				fire_time++
				if(fire_time > 30)
				{
					fire = true;
					fire_time=0;
				}
			}
			
			if(fire == true)
			{
				if (facingUp == true)
				{
					bomb = bombs.create(player.x, player.y, 'bomb');
					bomb.setVelocity(0,-100);
				}
				if (facingDown == true)
				{
					bomb = bombs.create(player.x, player.y, 'bomb');
					bomb.setVelocity(0, 100);
				}
				if (facingLeft == true)
				{
					bomb = bombs.create(player.x, player.y, 'bomb');
					bomb.setVelocity(-100, 0);
				}
				if (facingRight == true)
				{
					bomb = bombs.create(player.x, player.y, 'bomb');
					bomb.setVelocity(100, 0);
				}
				
				fire = false;
			}
			
			
			bombs.children.iterate(function (child) 
			{

				if(child.y < 0)
				{
					child.disableBody(true, true);
				}

			});
			
			enemies.children.iterate(function (child) 
			{

				if(child.y > 480)
				{
					//child.disableBody(true, true);
					child.body.velocity.y *= -1;
				}
				

			});

		}else if(game_state == "pause"){
			if(key_space.SPACE.isDown)
			{
				this_update.children.removeAll();
				create();
				game_state = "start_menu";
			}

		}else if(game_state == "game_over"){
			clearEnemies();
			
			game_state = "pause";
		}else{
			if(key_enter.ENTER.isDown)
			{
				this_update.children.removeAll();
				begining(this_create);
				game_state = "play";
				//map = "town_ashton_1";
				map = start_map;
			}
		}
			
		
	}

	function clear_town_ashton_1(){

	}
	
	function BombHitEnemies(bomb,enemy)
	{
		bomb.disableBody(true, true);
		enemy.disableBody(true, true);
	}

	function PlayerHitWall(player,walls)
	{
		console.log("hit wall");
		player_hp = 99;
		
	}

	function clearWalls(){
		walls.children.iterate(function (child) 
		{

			child.disableBody(true, true);
		
		});
	}

	function EnemiesHitPlayer(player,enemy)
	{
		//player.disableBody(true, true);
		//jika hit reptile//
		if(enemy.anims.currentAnim.frames[0].textureKey == "reptile"){
			player_hp = player_hp - Phaser.Math.Between(1, 1);
		}
		//hit boar//
		if(enemy.anims.currentAnim.frames[0].textureKey == "m_boar"){
			player_hp = player_hp - Phaser.Math.Between(3, 3);
		}
		//player_hp = player_hp - Phaser.Math.Between(2, 3);
		player_state = "hit";
		enemy.disableBody(true, true);
		console.log("player_state = " + player_state);
		if(player_hp < 1){
			game_over();
		}
	}

	function EnemiesHitWalls(enemy,wall){
		console.log("enemy hit walls");
		enemy.setVelocity(0,0);
		// enemies.children.iterate(function (child) {
		// 	//console.log("enemix = " + child.x);
		// 	if(child.x == walls.x){
		// 		console.log(enemies.x);
		// 	}
			
		// });
	}

	function game_over(){
		game_state = 'game_over';
		this_update.children.removeAll();
		var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, align: "center", backgroundColor: "#ffff00" };
		// var text = this.add.text(400,200,"GAME OVER",style);
		this_update.add.text(400,200,"GAME OVER",style);
	}

	function generate_enemie_lizard(){
		//console.log("spawn lizard");
		enemySpawn = Phaser.Math.Between(0, 800);
		if(enemySpawn % 100 == 0)
		{
				var enemy = enemies.create(Phaser.Math.Between(0, 800), -10, 'reptile');
				enemy.setVelocity(Phaser.Math.Between(-200, 200),Phaser.Math.Between(50, 200));
				enemy.setScale(scale_sprite);
				game.anims.create
				({
					key: 'play_reptile',
					frames: game.anims.generateFrameNumbers('reptile', { start: 0, end: 34 }),
					frameRate: 10,
					repeat: -1
				});
				enemy.anims.play('play_reptile', true);
				
		}
	}

	function generate_enemie_boar(){
		//console.log("spawn boar");
		enemySpawn = Phaser.Math.Between(0, 800);
		if(enemySpawn % 100 == 0)
		{
				var enemy = enemies.create(Phaser.Math.Between(0, 800), -10, 'm_boar');
				enemy.setVelocity(Phaser.Math.Between(-200, 200),Phaser.Math.Between(50, 200));
				enemy.setScale(scale_sprite);
				game.anims.create
				({
					key: 'play_boar',
					frames: game.anims.generateFrameNumbers('m_boar', { start: 0, end: 34 }),
					frameRate: 10,
					repeat: -1
				});
				enemy.anims.play('play_boar', true);
				
		}
	}
	
	function clearEnemies()
	{
		enemies.children.iterate(function (child) 
		{

			child.disableBody(true, true);
		
		});
	
	}
	
	function reset_speed(){
		if(speedx < 0 && speedy < 0){
			console.log("spedd resett");
			speedx = 0;
			speedy = 0;
		}
	}
