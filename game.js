// ============================================
// SUPER NOE WORLD - Main Game File
// ============================================

// --- Global State ---
let isMobile = false;
let joystick = null;
let joystickData = { x: 0, y: 0 };

// ============================================
// TITLE SCENE
// ============================================
class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {
        // Load assets
        this.load.image('title_bg', 'assets/title_bg.jpg');
        this.load.image('bg_forest', 'assets/bg_forest.jpg');
        this.load.image('platform_tile', 'assets/platform_tile.png');
    }

    create() {
        const { width, height } = this.scale;
        isMobile = !this.sys.game.device.os.desktop;

        // Use the pixely forest background for title screen
        if (this.textures.exists('title_bg')) {
            const bg = this.add.image(width / 2, height / 2, 'title_bg');
            // Scale to cover the screen
            const scaleX = width / bg.width;
            const scaleY = height / bg.height;
            const scale = Math.max(scaleX, scaleY);
            bg.setScale(scale);
        } else {
            // Fallback gradient
            const bg = this.add.graphics();
            bg.fillGradientStyle(0x2d5a27, 0x2d5a27, 0x1a3d16, 0x1a3d16, 1);
            bg.fillRect(0, 0, width, height);
        }

        // Dark overlay for text readability
        const overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.4);
        overlay.fillRect(0, height * 0.15, width, height * 0.5);

        // Title text
        const titleStyle = {
            fontFamily: 'Outfit, sans-serif',
            fontSize: Math.min(width * 0.1, 64) + 'px',
            fontStyle: 'bold',
            color: '#ffd700',
            stroke: '#000000',
            strokeThickness: 8,
            shadow: { offsetX: 4, offsetY: 4, color: '#000000', blur: 8, fill: true }
        };

        this.add.text(width / 2, height * 0.32, 'Super Noe World', titleStyle).setOrigin(0.5);

        // Subtitle
        const subtitleStyle = {
            fontFamily: 'Outfit, sans-serif',
            fontSize: Math.min(width * 0.04, 26) + 'px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        };

        const promptText = isMobile ? 'Tap anywhere to start' : 'Press any key to start';
        this.promptText = this.add.text(width / 2, height * 0.5, promptText, subtitleStyle).setOrigin(0.5);

        this.tweens.add({
            targets: this.promptText,
            alpha: 0.4,
            duration: 700,
            yoyo: true,
            repeat: -1
        });

        this.input.keyboard.on('keydown', () => this.startGame());
        this.input.on('pointerdown', () => this.startGame());
        this.scale.on('resize', () => this.scene.restart());
    }

    startGame() {
        this.scene.start('GameScene');
    }
}

// ============================================
// GAME SCENE
// ============================================
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.platforms = null;
        this.cursors = null;
        this.jumpButton = null;
        this.sprintButton = null;
        this.bgImage = null;
        this.lastDirection = 'right';
        this.isSprinting = false;
        this.enemies = null;
    }

    create() {
        const { width, height } = this.scale;

        // Generate animated character spritesheet
        this.generateCharacterSpritesheet();

        // Generate platform texture
        this.generatePlatformTexture();

        // Create scrolling background
        this.createBackground(width, height);

        // Platforms
        this.platforms = this.physics.add.staticGroup();
        this.createPlatforms(width, height);

        // Enemies
        this.enemies = this.physics.add.group();
        this.generateSlimeTexture();
        this.createEnemies(width, height);

        // Player with animations
        this.createAnimatedPlayer(width, height);

        // Physics
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.player, this.enemies, this.hitEnemy, null, this);

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        if (isMobile) {
            this.setupMobileControls();
        }

        this.scale.on('resize', () => this.scene.restart());
    }

    generateCharacterSpritesheet() {
        // Create a proper spritesheet with 6 frames:
        // 0: idle, 1-2: run cycle, 3: jump, 4-5: run cycle (alt)
        const frameW = 48;
        const frameH = 64;
        const numFrames = 6;

        const g = this.make.graphics();

        for (let frame = 0; frame < numFrames; frame++) {
            const ox = frame * frameW;

            // Animation states
            const isIdle = frame === 0;
            const isRun1 = frame === 1 || frame === 4;
            const isRun2 = frame === 2 || frame === 5;
            const isJump = frame === 3;

            // Leg animation offsets
            let leftLegY = 0, rightLegY = 0;
            let leftLegX = 0, rightLegX = 0;

            if (isRun1) {
                leftLegX = -4; leftLegY = -2;
                rightLegX = 4; rightLegY = 2;
            } else if (isRun2) {
                leftLegX = 4; leftLegY = 2;
                rightLegX = -4; rightLegY = -2;
            } else if (isJump) {
                leftLegX = -2; leftLegY = 4;
                rightLegX = 2; rightLegY = 4;
            }

            // Body bob
            let bodyY = 0;
            if (isRun1 || isRun2) bodyY = -2;
            if (isJump) bodyY = -4;

            // Arm swing
            let leftArmY = 0, rightArmY = 0;
            if (isRun1) { leftArmY = 3; rightArmY = -3; }
            if (isRun2) { leftArmY = -3; rightArmY = 3; }
            if (isJump) { leftArmY = -5; rightArmY = -5; }

            // === DRAW CHARACTER ===

            // Shadow
            g.fillStyle(0x000000, 0.2);
            g.fillEllipse(ox + frameW / 2, frameH - 4, 24, 6);

            // Left boot
            g.fillStyle(0x5d4037, 1);
            g.fillRoundedRect(ox + 12 + leftLegX, frameH - 14 + leftLegY, 10, 14, 3);

            // Right boot
            g.fillRoundedRect(ox + 26 + rightLegX, frameH - 14 + rightLegY, 10, 14, 3);

            // Left leg (pants)
            g.fillStyle(0xd4a574, 1);
            g.fillRect(ox + 14 + leftLegX, frameH - 24 + leftLegY, 8, 12);

            // Right leg (pants)
            g.fillRect(ox + 26 + rightLegX, frameH - 24 + rightLegY, 8, 12);

            // Body (green tunic)
            g.fillStyle(0x4caf50, 1);
            g.fillRoundedRect(ox + 10, frameH - 40 + bodyY, 28, 20, 4);

            // Tunic detail (darker)
            g.fillStyle(0x388e3c, 1);
            g.fillRect(ox + 12, frameH - 26 + bodyY, 24, 4);

            // Belt
            g.fillStyle(0x795548, 1);
            g.fillRect(ox + 11, frameH - 28 + bodyY, 26, 4);
            g.fillStyle(0xffc107, 1);
            g.fillRect(ox + 21, frameH - 29 + bodyY, 6, 6); // Buckle

            // Red scarf
            g.fillStyle(0xff3d00, 1);
            g.fillRoundedRect(ox + 12, frameH - 46 + bodyY, 24, 8, 3);

            // Scarf tail (flowing when moving)
            if (!isIdle) {
                g.beginPath();
                g.moveTo(ox + 36, frameH - 42 + bodyY);
                g.lineTo(ox + 48, frameH - 36 + bodyY);
                g.lineTo(ox + 44, frameH - 32 + bodyY);
                g.lineTo(ox + 36, frameH - 38 + bodyY);
                g.closePath();
                g.fillPath();
            }

            // Left arm
            g.fillStyle(0xffcc99, 1);
            g.fillRoundedRect(ox + 4, frameH - 38 + bodyY + leftArmY, 8, 14, 3);

            // Right arm
            g.fillRoundedRect(ox + 36, frameH - 38 + bodyY + rightArmY, 8, 14, 3);

            // Head
            g.fillStyle(0xffcc99, 1);
            g.fillRoundedRect(ox + 12, frameH - 60 + bodyY, 24, 18, 6);

            // Hair flow physics (simulating wind/inertia)
            let hairFlow = 0;
            if (!isIdle) {
                hairFlow = -6; // Hair blows back to the left when moving
            }

            // Orange hair base
            g.fillStyle(0xff6600, 1);
            g.fillRoundedRect(ox + 10, frameH - 66 + bodyY, 28, 12, 5);

            // Hair spikes (with flow)
            g.fillTriangle(
                ox + 14, frameH - 66 + bodyY,
                ox + 18 + hairFlow, frameH - 76 + bodyY,
                ox + 22, frameH - 66 + bodyY
            );
            g.fillTriangle(
                ox + 20, frameH - 66 + bodyY,
                ox + 24 + hairFlow, frameH - 74 + bodyY,
                ox + 28, frameH - 66 + bodyY
            );
            g.fillTriangle(
                ox + 26, frameH - 66 + bodyY,
                ox + 30 + hairFlow, frameH - 72 + bodyY,
                ox + 34, frameH - 66 + bodyY
            );

            // Eyes
            g.fillStyle(0xffffff, 1);
            g.fillCircle(ox + 18, frameH - 52 + bodyY, 4);
            g.fillCircle(ox + 30, frameH - 52 + bodyY, 4);

            g.fillStyle(0x000000, 1);
            g.fillCircle(ox + 19, frameH - 51 + bodyY, 2);
            g.fillCircle(ox + 31, frameH - 51 + bodyY, 2);

            // Mouth
            if (isJump) {
                g.fillStyle(0x000000, 1);
                g.fillCircle(ox + 24, frameH - 44 + bodyY, 3);
            } else {
                g.lineStyle(2, 0x000000, 1);
                g.beginPath();
                g.arc(ox + 24, frameH - 46 + bodyY, 4, 0.2, Math.PI - 0.2, false);
                g.strokePath();
            }
        }

        g.generateTexture('noe_sheet_raw', frameW * numFrames, frameH);
        g.destroy();

        // Now add it as a proper spritesheet with frame data
        this.textures.addSpriteSheet('noe_spritesheet',
            this.textures.get('noe_sheet_raw').getSourceImage(),
            { frameWidth: frameW, frameHeight: frameH }
        );
    }

    generatePlatformTexture() {
        const g = this.make.graphics();
        const w = 80, h = 40;

        // Main earth/dirt block
        g.fillStyle(0x8b4513, 1);
        g.fillRoundedRect(0, 10, w, h - 10, 4);

        // Grass top
        g.fillStyle(0x228b22, 1);
        g.fillRoundedRect(0, 0, w, 16, { tl: 8, tr: 8, bl: 0, br: 0 });

        // Grass highlight
        g.fillStyle(0x32cd32, 1);
        g.fillRoundedRect(2, 2, w - 4, 6, 3);

        // Grass blades
        g.fillStyle(0x2e7d32, 1);
        for (let i = 4; i < w - 4; i += 8) {
            g.fillTriangle(i, 10, i + 4, 0, i + 8, 10);
        }

        // Dirt texture
        g.fillStyle(0x6d4c41, 1);
        g.fillCircle(15, 25, 6);
        g.fillCircle(45, 30, 8);
        g.fillCircle(65, 22, 5);

        // Stones
        g.fillStyle(0x9e9e9e, 1);
        g.fillCircle(25, 32, 4);
        g.fillCircle(55, 28, 3);

        g.generateTexture('grass_platform', w, h);
        g.destroy();
    }

    createBackground(width, height) {
        // Sky gradient
        const sky = this.add.graphics();
        sky.fillGradientStyle(0x87ceeb, 0x87ceeb, 0x98d1f0, 0xb8e0f7, 1);
        sky.fillRect(0, 0, width * 4, height);
        sky.setScrollFactor(0);

        // Use forest background if available
        if (this.textures.exists('bg_forest')) {
            this.bgImage = this.add.tileSprite(width / 2, height * 0.6, width, height * 0.8, 'bg_forest');
            this.bgImage.setScrollFactor(0);
            this.bgImage.setAlpha(0.5);
        }

        // Clouds
        this.cloudsLayer = this.add.graphics();
        this.cloudsLayer.fillStyle(0xffffff, 1);
        for (let i = 0; i < 8; i++) {
            this.drawCloud(this.cloudsLayer, i * 350 + 100, 50 + Math.random() * 60, 0.7 + Math.random() * 0.5);
        }
        this.cloudsLayer.setScrollFactor(0.05);

        // Distant hills
        const hills = this.add.graphics();
        hills.fillStyle(0x6b8e6b, 1);
        for (let i = 0; i < 15; i++) {
            hills.fillCircle(i * 200, height - 50, 100 + Math.random() * 50);
        }
        hills.setScrollFactor(0.2);

        // Trees
        const trees = this.add.graphics();
        for (let i = 0; i < 20; i++) {
            this.drawTree(trees, i * 200 + 50, height - 80, 80 + Math.random() * 60);
        }
        trees.setScrollFactor(0.4);
    }

    drawCloud(g, x, y, scale) {
        const s = 30 * scale;
        g.fillCircle(x, y, s);
        g.fillCircle(x - s * 0.7, y + s * 0.3, s * 0.65);
        g.fillCircle(x + s * 0.7, y + s * 0.3, s * 0.65);
        g.fillCircle(x - s * 0.35, y - s * 0.2, s * 0.5);
        g.fillCircle(x + s * 0.35, y - s * 0.2, s * 0.5);
    }

    drawTree(g, x, baseY, h) {
        // Trunk
        g.fillStyle(0x5d4037, 1);
        g.fillRect(x - 10, baseY - h * 0.4, 20, h * 0.4);

        // Foliage
        g.fillStyle(0x2e7d32, 1);
        g.fillCircle(x, baseY - h * 0.5, h * 0.35);
        g.fillCircle(x - h * 0.2, baseY - h * 0.4, h * 0.28);
        g.fillCircle(x + h * 0.2, baseY - h * 0.4, h * 0.28);

        // Highlight
        g.fillStyle(0x43a047, 1);
        g.fillCircle(x - 5, baseY - h * 0.55, h * 0.18);
    }

    createPlatforms(width, height) {
        // Always use the clean procedural platform
        const platformKey = 'grass_platform';
        const tileWidth = 80;

        // Ground - seamless tiling
        const groundY = height - 20;
        for (let x = -100; x < width * 4; x += tileWidth - 1) {
            this.platforms.create(x, groundY, platformKey);
        }

        // Floating platforms
        const floats = [
            { x: width * 0.4, y: height * 0.6 },
            { x: width * 0.75, y: height * 0.5 },
            { x: width * 0.15, y: height * 0.38 },
            { x: width * 1.1, y: height * 0.55 },
            { x: width * 1.5, y: height * 0.4 },
            { x: width * 1.9, y: height * 0.5 },
            { x: width * 2.3, y: height * 0.42 },
        ];

        floats.forEach(f => {
            this.platforms.create(f.x, f.y, platformKey);
        });
    }

    generateSlimeTexture() {
        const g = this.make.graphics();
        const w = 32, h = 24;

        // Green body
        g.fillStyle(0x76c900, 1);
        g.fillEllipse(16, 14, 28, 20);
        g.fillRect(2, 14, 28, 10);

        // Shine
        g.fillStyle(0xccff66, 0.8);
        g.fillEllipse(10, 8, 8, 6);

        // Eyes
        g.fillStyle(0x000000, 1);
        g.fillCircle(10, 12, 3);
        g.fillCircle(22, 12, 3);
        g.fillStyle(0xffffff, 1);
        g.fillCircle(11, 11, 1);
        g.fillCircle(23, 11, 1);

        g.generateTexture('slime', w, h);
        g.destroy();
    }

    createEnemies(width, height) {
        // Spawn slimes on platforms with simple patrol logic
        const enemyData = [
            { x: width * 0.75, y: height * 0.45, patrol: 100 },
            { x: width * 1.1, y: height * 0.5, patrol: 80 },
            { x: width * 1.5, y: height * 0.35, patrol: 90 },
            { x: width * 2.3, y: height * 0.35, patrol: 100 }
        ];

        enemyData.forEach(data => {
            const enemy = this.enemies.create(data.x, data.y, 'slime');
            enemy.setBounce(0);
            enemy.setCollideWorldBounds(false);
            enemy.setVelocityX(80);

            // Store patrol bounds
            enemy.setData('startX', data.x);
            enemy.setData('patrolDist', data.patrol);
        });
    }

    hitEnemy(player, enemy) {
        // Simple game over / restart logic
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('idle');

        // Restart scene after delay
        this.time.delayedCall(1000, () => {
            this.scene.restart();
        });
    }

    createAnimatedPlayer(width, height) {
        this.player = this.physics.add.sprite(100, height - 150, 'noe_spritesheet');
        this.player.setScale(1);
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);

        // Hitbox
        this.player.body.setSize(30, 55);
        this.player.body.setOffset(9, 9);

        // Create animations from spritesheet
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'noe_spritesheet', frame: 0 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'run',
            frames: [
                { key: 'noe_spritesheet', frame: 1 },
                { key: 'noe_spritesheet', frame: 2 },
                { key: 'noe_spritesheet', frame: 4 },
                { key: 'noe_spritesheet', frame: 5 }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: [{ key: 'noe_spritesheet', frame: 3 }],
            frameRate: 1
        });

        // Sprint animation (faster run)
        this.anims.create({
            key: 'sprint',
            frames: [
                { key: 'noe_spritesheet', frame: 1 },
                { key: 'noe_spritesheet', frame: 2 },
                { key: 'noe_spritesheet', frame: 4 },
                { key: 'noe_spritesheet', frame: 5 }
            ],
            frameRate: 18,
            repeat: -1
        });

        // Camera
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setDeadzone(120, 80);

        this.physics.world.setBounds(-200, 0, width * 4, height);
    }

    setupMobileControls() {
        const joystickContainer = document.createElement('div');
        joystickContainer.className = 'joystick-container';
        joystickContainer.id = 'joystick-zone';
        document.body.appendChild(joystickContainer);

        joystick = nipplejs.create({
            zone: joystickContainer,
            mode: 'static',
            position: { left: '80px', bottom: '80px' },
            color: 'rgba(255, 200, 100, 0.5)',
            size: 120
        });

        joystick.on('move', (evt, data) => {
            if (data.vector) {
                joystickData.x = data.vector.x;
                joystickData.y = data.vector.y;
            }
        });

        joystick.on('end', () => {
            joystickData.x = 0;
            joystickData.y = 0;
        });

        this.jumpButton = document.createElement('div');
        this.jumpButton.className = 'jump-button';
        this.jumpButton.innerHTML = 'JUMP';
        this.jumpButton.id = 'jump-btn';
        document.body.appendChild(this.jumpButton);

        this.jumpButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.doJump();
        });

        // Create sprint button
        this.sprintButton = document.createElement('div');
        this.sprintButton.className = 'sprint-button';
        this.sprintButton.innerHTML = 'RUN';
        this.sprintButton.id = 'sprint-btn';
        document.body.appendChild(this.sprintButton);

        this.sprintButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.isSprinting = true;
        });
        this.sprintButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.isSprinting = false;
        });
    }

    doJump() {
        if (this.player.body.touching.down) {
            this.player.setVelocityY(-520);
        }
    }

    update() {
        const normalSpeed = 220;
        const sprintSpeed = 400;
        let isMoving = false;

        // Check sprint state (PC: SHIFT key)
        if (!isMobile) {
            this.isSprinting = this.shiftKey.isDown;
        }

        const speed = this.isSprinting ? sprintSpeed : normalSpeed;

        // Parallax background
        if (this.bgImage) {
            this.bgImage.tilePositionX = this.cameras.main.scrollX * 0.2;
        }

        // Movement
        if (isMobile) {
            if (joystickData.x < -0.3) {
                this.player.setVelocityX(-speed);
                isMoving = true;
                this.lastDirection = 'left';
            } else if (joystickData.x > 0.3) {
                this.player.setVelocityX(speed);
                isMoving = true;
                this.lastDirection = 'right';
            } else {
                this.player.setVelocityX(0);
            }
        } else {
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-speed);
                isMoving = true;
                this.lastDirection = 'left';
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(speed);
                isMoving = true;
                this.lastDirection = 'right';
            } else {
                this.player.setVelocityX(0);
            }

            if (this.spaceKey.isDown && this.player.body.touching.down) {
                this.player.setVelocityY(-520);
            }
        }

        // Flip sprite
        this.player.setFlipX(this.lastDirection === 'left');

        // Sprint leaning
        if (isMoving && this.isSprinting && this.player.body.touching.down) {
            this.player.setRotation(this.lastDirection === 'left' ? -0.2 : 0.2);
        } else {
            this.player.setRotation(0);
        }

        // Animations
        if (!this.player.body.touching.down) {
            this.player.anims.play('jump', true);
        } else if (isMoving && this.isSprinting) {
            this.player.anims.play('sprint', true);
        } else if (isMoving) {
            this.player.anims.play('run', true);
        } else {
            this.player.anims.play('idle', true);
        }

        // Enemy Patrol Logic
        this.enemies.getChildren().forEach(enemy => {
            const startX = enemy.getData('startX');
            const dist = enemy.getData('patrolDist');

            if (enemy.x >= startX + dist) {
                enemy.setVelocityX(-80);
                enemy.setFlipX(true); // look left
            } else if (enemy.x <= startX - dist) {
                enemy.setVelocityX(80);
                enemy.setFlipX(false); // look right
            }
        });
    }

    shutdown() {
        const joystickZone = document.getElementById('joystick-zone');
        const jumpBtn = document.getElementById('jump-btn');
        if (joystickZone) joystickZone.remove();
        if (jumpBtn) jumpBtn.remove();
        if (joystick) {
            joystick.destroy();
            joystick = null;
        }
    }
}

// ============================================
// GAME INITIALIZATION
// ============================================
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'game-container',
        width: '100%',
        height: '100%',
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: [TitleScene, GameScene],
    backgroundColor: '#87ceeb'
};

const game = new Phaser.Game(config);
