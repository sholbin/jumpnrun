// ============================================
// SUPER NOE WORLD - Main Game File
// ============================================

// --- Configuration Constants ---
const CONFIG = {
    player: {
        normalSpeed: 220,
        sprintSpeed: 400,
        jumpVelocity: -520,
        sprintJumpVelocity: -600,
        sprintJumpBoost: 80,
        airDrag: 0.92,
        airControl: 0.6,
        invincibilityDuration: 1500,
        fallDeathTime: 2000
    },
    physics: {
        gravity: 1000,
        bounce: 0.1
    },
    enemy: {
        slimeSpeed: 60,
        slimeReverseSpeed: 80
    },
    scoring: {
        coin: 10,
        enemyStomp: 100
    }
};

// --- Level Data ---
// All positions are multipliers of screen dimensions for responsive design
// groundY is calculated as height - 20 in the game
const LEVELS = [
    // Level 1: Introduction - Learn the basics
    {
        name: "Green Meadows",
        worldLength: 4, // multiplier of screen width
        lavaPositions: [1.2, 2.0, 3.0],
        // Floating platforms: x and y are offsets from groundY
        platforms: [
            { x: 180, yOffset: 80 },
            { x: 320, yOffset: 160 },
            { x: 480, yOffset: 80 },
            { x: 650, yOffset: 100 },
            { x: 820, yOffset: 180 },
            { x: 1000, yOffset: 100 },
            { x: 1200, yOffset: 80 },
            { x: 1380, yOffset: 160 },
            { x: 1560, yOffset: 240 },
            { x: 1750, yOffset: 160 },
            { x: 1920, yOffset: 80 }
        ],
        // Ground enemies with patrol ranges
        enemies: [
            { x: 500, yOffset: 30, patrol: 80 },
            { x: 900, yOffset: 30, patrol: 100 },
            { x: 320, yOffset: 190, patrol: 60 },
            { x: 1380, yOffset: 190, patrol: 80 }
        ],
        // Flying enemies
        flyingEnemies: [
            { xMult: 1.3, yMult: 0.3, range: 200 },
            { xMult: 2.0, yMult: 0.25, range: 150 }
        ],
        // Coins: x/y as multipliers of screen dimensions
        coins: [
            { xMult: 0.4, yMult: 0.53 },
            { xMult: 0.43, yMult: 0.53 },
            { xMult: 0.75, yMult: 0.43 },
            { xMult: 0.78, yMult: 0.43 },
            { xMult: 0.15, yMult: 0.31 },
            { xMult: 1.1, yMult: 0.48 },
            { xMult: 1.5, yMult: 0.33 },
            { xMult: 1.9, yMult: 0.43 },
            { xMult: 2.3, yMult: 0.35 },
            { xMult: 0.6, ground: true },
            { xMult: 0.8, ground: true },
            { xMult: 1.0, ground: true }
        ],
        // Spikes as multipliers of screen width
        spikes: [0.8, 1.5, 2.5],
        // Checkpoint and finish positions
        checkpoint: { xMult: 1.8 },
        finish: { xMult: 3.5 }
    },
    // Level 2: Rising Challenge
    {
        name: "Rocky Heights",
        worldLength: 5,
        lavaPositions: [1.0, 1.8, 2.6, 3.6],
        platforms: [
            { x: 200, yOffset: 80 },
            { x: 380, yOffset: 160 },
            { x: 560, yOffset: 100 },
            { x: 750, yOffset: 180 },
            { x: 950, yOffset: 120 },
            { x: 1150, yOffset: 200 },
            { x: 1350, yOffset: 140 },
            { x: 1550, yOffset: 220 },
            { x: 1750, yOffset: 160 },
            { x: 1950, yOffset: 100 },
            { x: 2150, yOffset: 180 },
            { x: 2350, yOffset: 120 },
            { x: 2550, yOffset: 200 }
        ],
        enemies: [
            { x: 400, yOffset: 30, patrol: 100 },
            { x: 800, yOffset: 30, patrol: 120 },
            { x: 1200, yOffset: 30, patrol: 80 },
            { x: 380, yOffset: 190, patrol: 70 },
            { x: 1150, yOffset: 230, patrol: 90 },
            { x: 1950, yOffset: 130, patrol: 60 }
        ],
        flyingEnemies: [
            { xMult: 0.9, yMult: 0.25, range: 180 },
            { xMult: 1.5, yMult: 0.3, range: 220 },
            { xMult: 2.2, yMult: 0.2, range: 160 }
        ],
        coins: [
            { xMult: 0.3, yMult: 0.5 },
            { xMult: 0.5, yMult: 0.4 },
            { xMult: 0.7, yMult: 0.35 },
            { xMult: 0.95, yMult: 0.45 },
            { xMult: 1.2, yMult: 0.3 },
            { xMult: 1.45, yMult: 0.4 },
            { xMult: 1.7, yMult: 0.35 },
            { xMult: 2.0, yMult: 0.45 },
            { xMult: 2.3, yMult: 0.3 },
            { xMult: 2.6, yMult: 0.4 },
            { xMult: 0.55, ground: true },
            { xMult: 1.35, ground: true },
            { xMult: 2.15, ground: true }
        ],
        spikes: [0.6, 1.1, 1.6, 2.1, 2.8],
        checkpoint: { xMult: 2.2 },
        finish: { xMult: 4.5 }
    },
    // Level 3: Expert Challenge
    {
        name: "Danger Peak",
        worldLength: 6,
        lavaPositions: [0.8, 1.4, 2.0, 2.8, 3.6, 4.4],
        platforms: [
            { x: 150, yOffset: 100 },
            { x: 300, yOffset: 180 },
            { x: 480, yOffset: 120 },
            { x: 650, yOffset: 200 },
            { x: 850, yOffset: 140 },
            { x: 1050, yOffset: 220 },
            { x: 1250, yOffset: 160 },
            { x: 1450, yOffset: 240 },
            { x: 1650, yOffset: 180 },
            { x: 1850, yOffset: 120 },
            { x: 2050, yOffset: 200 },
            { x: 2250, yOffset: 140 },
            { x: 2450, yOffset: 220 },
            { x: 2650, yOffset: 160 },
            { x: 2850, yOffset: 100 },
            { x: 3050, yOffset: 180 }
        ],
        enemies: [
            { x: 350, yOffset: 30, patrol: 80 },
            { x: 700, yOffset: 30, patrol: 100 },
            { x: 1100, yOffset: 30, patrol: 90 },
            { x: 1500, yOffset: 30, patrol: 110 },
            { x: 1900, yOffset: 30, patrol: 85 },
            { x: 2300, yOffset: 30, patrol: 95 },
            { x: 300, yOffset: 210, patrol: 50 },
            { x: 1050, yOffset: 250, patrol: 60 },
            { x: 1850, yOffset: 150, patrol: 55 },
            { x: 2650, yOffset: 190, patrol: 65 }
        ],
        flyingEnemies: [
            { xMult: 0.6, yMult: 0.2, range: 200 },
            { xMult: 1.1, yMult: 0.25, range: 180 },
            { xMult: 1.6, yMult: 0.2, range: 220 },
            { xMult: 2.2, yMult: 0.3, range: 190 },
            { xMult: 2.8, yMult: 0.25, range: 210 }
        ],
        coins: [
            { xMult: 0.25, yMult: 0.45 },
            { xMult: 0.45, yMult: 0.35 },
            { xMult: 0.65, yMult: 0.4 },
            { xMult: 0.85, yMult: 0.3 },
            { xMult: 1.05, yMult: 0.45 },
            { xMult: 1.25, yMult: 0.35 },
            { xMult: 1.5, yMult: 0.4 },
            { xMult: 1.75, yMult: 0.3 },
            { xMult: 2.0, yMult: 0.45 },
            { xMult: 2.25, yMult: 0.35 },
            { xMult: 2.5, yMult: 0.4 },
            { xMult: 2.75, yMult: 0.3 },
            { xMult: 3.0, yMult: 0.45 },
            { xMult: 0.5, ground: true },
            { xMult: 1.2, ground: true },
            { xMult: 2.4, ground: true },
            { xMult: 3.2, ground: true }
        ],
        spikes: [0.5, 0.9, 1.3, 1.7, 2.2, 2.6, 3.0, 3.4, 4.0],
        checkpoint: { xMult: 2.8 },
        finish: { xMult: 5.5 }
    }
];

// Note: isMobile is stored in game registry for cross-scene access
// joystick and joystickData are now GameScene properties

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
        // Load character sprite sheet with proper transparency
        this.load.atlas('noe_atlas', 'assets/noe_spritesheet.png', 'assets/noe_spritesheet.json');
    }

    create() {
        const { width, height } = this.scale;
        // Store isMobile in registry for cross-scene access
        this.registry.set('isMobile', !this.sys.game.device.os.desktop);

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

        const isMobile = this.registry.get('isMobile');
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
        this.flyingEnemies = null;
        this.spikes = null;
        this.lava = null;
        this.lives = 3;
        this.score = 0;
        this.livesText = null;
        this.scoreText = null;
        this.levelText = null;
        this.coins = null;
        this.soundContext = null;
        this.isInvincible = false;
        this.fallTimer = 0;
        this.highScore = parseInt(localStorage.getItem('superNoeHighScore') || '0');
        // Level tracking
        this.currentLevel = parseInt(localStorage.getItem('superNoeCurrentLevel') || '0');
        // Checkpoint and finish line
        this.checkpoint = null;
        this.finishLine = null;
        this.checkpointActivated = false;
        this.respawnX = 100;
        this.respawnY = 100;
        this.levelComplete = false;
        // Pause state
        this.isPaused = false;
        this.pauseMenu = null;
        // Mobile state
        this.isMobile = false;
        this.joystick = null;
        this.joystickData = { x: 0, y: 0 };
        // Polish: state tracking
        this.wasInAir = false;
        this.landSquashTween = null;
        this.lastYVelocity = 0;
    }

    // Get current level data
    getLevelData() {
        return LEVELS[this.currentLevel] || LEVELS[0];
    }

    create() {
        const { width, height } = this.scale;

        // Get mobile state from registry
        this.isMobile = this.registry.get('isMobile') || false;

        // Character spritesheet is loaded from assets/noe_spritesheet.png in preload

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

        // Coins
        this.coins = this.physics.add.group();
        this.generateCoinTexture();
        this.createCoins(width, height);

        // Hazards & Extra Enemies
        this.spikes = this.physics.add.staticGroup();
        this.lava = this.physics.add.staticGroup();
        this.flyingEnemies = this.physics.add.group();

        this.generateSpikeTexture();
        this.generateLavaTexture();
        this.generateBeeTexture();
        this.generateCheckpointTexture();
        this.generateFinishLineTexture();

        this.createHazards(width, height);
        this.createFlyingEnemies(width, height);
        this.createCheckpointAndFinish(width, height);

        // Physics
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.physics.add.collider(this.player, this.spikes, this.hitHazard, null, this);
        this.physics.add.overlap(this.player, this.lava, this.hitLava, null, this);
        this.physics.add.overlap(this.player, this.flyingEnemies, this.hitEnemy, null, this);

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // UI
        this.createUI();

        if (this.isMobile) {
            this.setupMobileControls();
        }

        // Setup particle emitters for polish effects
        this.setupParticles();

        // Create damage flash overlay
        this.damageFlash = this.add.rectangle(
            this.scale.width / 2, this.scale.height / 2,
            this.scale.width * 2, this.scale.height * 2,
            0xffffff
        ).setScrollFactor(0).setAlpha(0).setDepth(1000);

        // Handle resize by saving state and restoring after restart
        this.scale.on('resize', () => {
            this.saveGameState();
            this.scene.restart();
        });

        // Restore state if we have saved data from a resize
        this.restoreGameState();
    }

    saveGameState() {
        this.registry.set('savedState', {
            score: this.score,
            lives: this.lives,
            currentLevel: this.currentLevel,
            checkpointActivated: this.checkpointActivated,
            respawnX: this.respawnX,
            respawnY: this.respawnY,
            playerX: this.player ? this.player.x : 100,
            playerY: this.player ? this.player.y : 100
        });
    }

    restoreGameState() {
        const saved = this.registry.get('savedState');
        if (saved) {
            this.score = saved.score;
            this.lives = saved.lives;
            this.currentLevel = saved.currentLevel;
            this.checkpointActivated = saved.checkpointActivated;
            this.respawnX = saved.respawnX;
            this.respawnY = saved.respawnY;
            // Move player to saved position after a short delay to ensure physics is ready
            this.time.delayedCall(50, () => {
                if (this.player) {
                    this.player.setPosition(saved.playerX, saved.playerY);
                }
                this.updateUI();
                // Update checkpoint visual if it was activated
                if (this.checkpointActivated && this.checkpoint) {
                    this.checkpoint.setTexture('checkpoint_active');
                }
            });
            // Clear saved state after restoring
            this.registry.remove('savedState');
        }
    }

    // Programmatic sprite generation removed - using asset/noe_spritesheet.png


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

        // Trees - Draw from ground level (same scroll rate as platforms so they look grounded)
        const groundY = height - 20;
        const trees = this.add.graphics();
        for (let i = 0; i < 20; i++) {
            this.drawTree(trees, i * 200 + 50, groundY, 80 + Math.random() * 60);
        }
        trees.setScrollFactor(1); // Same as platforms so they look grounded
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
        const level = this.getLevelData();
        const platformKey = 'grass_platform';
        const tileWidth = 80;
        const groundY = height - 20;

        // Ground - seamless tiling with lava pits (using level data)
        const lavaX = level.lavaPositions.map(mult => width * mult);
        const worldEnd = width * level.worldLength;

        for (let x = -100; x < worldEnd; x += tileWidth - 1) {
            const isInLava = lavaX.some(lx => Math.abs(x - lx) < 60);
            if (!isInLava) {
                this.platforms.create(x, groundY, platformKey);
            }
        }

        // Floating platforms from level data
        level.platforms.forEach(p => {
            this.platforms.create(p.x, groundY - p.yOffset, platformKey);
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
        const level = this.getLevelData();
        const groundY = height - 20;

        // Spawn enemies from level data
        level.enemies.forEach(data => {
            const enemy = this.enemies.create(data.x, groundY - data.yOffset, 'slime');
            enemy.setBounce(0);
            enemy.setCollideWorldBounds(false);
            enemy.setVelocityX(CONFIG.enemy.slimeSpeed);
            enemy.setData('startX', data.x);
            enemy.setData('patrolDist', data.patrol);
        });
    }

    hitEnemy(player, enemy) {
        if (this.isInvincible) return;

        // Classic Mario-style stomp: player is falling AND player center is above enemy center
        if (player.body.velocity.y > 0 && player.y < enemy.y) {
            // Stomp pop effect
            this.emitStompPop(enemy.x, enemy.y);

            // Animated enemy destruction
            this.tweens.add({
                targets: enemy,
                scaleX: 1.5,
                scaleY: 0.3,
                alpha: 0,
                duration: 150,
                onComplete: () => enemy.destroy()
            });

            player.setVelocityY(-400); // Bounce up
            this.updateScore(100);
            this.showScorePopup(enemy.x, enemy.y - 20, 100);
            this.playSound('stomp');
            return;
        }

        // Damage player
        this.lives--;
        this.updateUI();
        this.playSound('hurt');

        // Polish: damage effects
        this.shakeCamera(0.01, 150);
        this.flashScreen();
        this.emitDamageParticles();
        this.pulseHearts();

        if (this.lives <= 0) {
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('idle');

            this.time.delayedCall(1500, () => {
                this.lives = 3;
                this.score = 0;
                this.scene.restart();
            });
        } else {
            // Temporary invincibility
            this.isInvincible = true;
            player.setTint(0xffcccc);
            player.setAlpha(0.6);

            this.time.delayedCall(1500, () => {
                this.isInvincible = false;
                player.clearTint();
                player.setAlpha(1);
            });

            // Knockback logic
            const bounceDirection = (player.x < enemy.x) ? -300 : 300;
            player.setVelocityX(bounceDirection);
            player.setVelocityY(-300);
        }
    }

    createUI() {
        const level = this.getLevelData();
        const textStyle = {
            fontFamily: 'Outfit, sans-serif',
            fontSize: '24px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4
        };

        this.scoreText = this.add.text(20, 20, 'Score: 0', textStyle).setScrollFactor(0);
        this.livesText = this.add.text(20, 50, 'Lives: ❤️❤️❤️', textStyle).setScrollFactor(0);

        // Level indicator (top right)
        const { width } = this.scale;
        this.levelText = this.add.text(width - 20, 20, `Level ${this.currentLevel + 1}: ${level.name}`, {
            ...textStyle,
            fontSize: '20px',
            fill: '#88ff88'
        }).setScrollFactor(0).setOrigin(1, 0);

        this.highScoreText = this.add.text(20, 110, `High: ${this.highScore}`, { ...textStyle, fontSize: '18px', fill: '#ffd700' }).setScrollFactor(0);

        // PC Hint
        if (!this.isMobile) {
            this.add.text(20, 80, '[R] Reset  [P] Pause', { ...textStyle, fontSize: '14px', fill: '#aaa' }).setScrollFactor(0);
        }

        this.updateUI();
    }

    updateUI() {
        if (this.scoreText) this.scoreText.setText(`Score: ${this.score}`);
        if (this.livesText) {
            let hearts = '';
            for (let i = 0; i < this.lives; i++) hearts += '❤️';
            this.livesText.setText(`Lives: ${hearts}`);
        }
        if (this.levelText) {
            const level = this.getLevelData();
            this.levelText.setText(`Level ${this.currentLevel + 1}: ${level.name}`);
        }
    }

    updateScore(amount) {
        this.score += amount;
        // Update highscore if needed
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('superNoeHighScore', this.highScore.toString());
        }
        this.updateUI();
    }

    // ============================================
    // PAUSE MENU
    // ============================================
    togglePause() {
        if (this.levelComplete) return; // Don't pause during level complete

        if (this.isPaused) {
            this.resumeGame();
        } else {
            this.pauseGame();
        }
    }

    pauseGame() {
        this.isPaused = true;
        this.physics.pause();

        const { width, height } = this.scale;
        const centerX = this.cameras.main.scrollX + width / 2;
        const centerY = this.cameras.main.scrollY + height / 2;

        // Create pause menu container
        this.pauseMenu = this.add.container(centerX, centerY);

        // Dark overlay
        const overlay = this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.7);
        overlay.setScrollFactor(0);
        this.pauseMenu.add(overlay);

        // Pause title
        const pauseTitle = this.add.text(0, -100, 'PAUSED', {
            fontFamily: 'Outfit, sans-serif',
            fontSize: '48px',
            fill: '#ffffff',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5);
        this.pauseMenu.add(pauseTitle);

        // Menu buttons
        const buttonStyle = {
            fontFamily: 'Outfit, sans-serif',
            fontSize: '28px',
            fill: '#ffffff',
            stroke: '#000',
            strokeThickness: 4,
            backgroundColor: '#444444',
            padding: { x: 20, y: 10 }
        };

        // Resume button
        const resumeBtn = this.add.text(0, -20, '  Resume  ', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => resumeBtn.setStyle({ fill: '#88ff88' }))
            .on('pointerout', () => resumeBtn.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => this.resumeGame());
        this.pauseMenu.add(resumeBtn);

        // Restart Level button
        const restartBtn = this.add.text(0, 40, 'Restart Level', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => restartBtn.setStyle({ fill: '#ffff88' }))
            .on('pointerout', () => restartBtn.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => {
                this.isPaused = false;
                this.checkpointActivated = false;
                this.respawnX = 100;
                this.respawnY = 100;
                this.scene.restart();
            });
        this.pauseMenu.add(restartBtn);

        // Back to Title button
        const titleBtn = this.add.text(0, 100, ' Main Menu ', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => titleBtn.setStyle({ fill: '#ff8888' }))
            .on('pointerout', () => titleBtn.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => {
                this.isPaused = false;
                this.scene.start('TitleScene');
            });
        this.pauseMenu.add(titleBtn);

        // Hint text
        const hintText = this.isMobile ? 'Tap Resume to continue' : 'Press P or ESC to resume';
        const hint = this.add.text(0, 160, hintText, {
            fontFamily: 'Outfit, sans-serif',
            fontSize: '16px',
            fill: '#aaaaaa'
        }).setOrigin(0.5);
        this.pauseMenu.add(hint);

        this.pauseMenu.setDepth(2000);
        this.pauseMenu.setScrollFactor(0);
    }

    resumeGame() {
        this.isPaused = false;
        this.physics.resume();

        if (this.pauseMenu) {
            this.pauseMenu.destroy();
            this.pauseMenu = null;
        }
    }

    generateCoinTexture() {
        const g = this.make.graphics();
        const size = 20;

        // Golden body
        g.fillStyle(0xffd700, 1);
        g.fillCircle(size / 2, size / 2, size / 2);

        // Inner detail
        g.lineStyle(2, 0xdaa520, 1);
        g.strokeCircle(size / 2, size / 2, size / 2 - 3);

        // Shine
        g.fillStyle(0xffffff, 0.6);
        g.fillCircle(size / 3, size / 3, 3);

        g.generateTexture('coin', size, size);
        g.destroy();
    }

    createCoins(width, height) {
        const level = this.getLevelData();

        // Create coins from level data
        level.coins.forEach(coinData => {
            const x = width * coinData.xMult;
            const y = coinData.ground ? height - 60 : height * coinData.yMult;

            const coin = this.coins.create(x, y, 'coin');
            coin.body.setAllowGravity(false);

            // Add floating animation
            this.tweens.add({
                targets: coin,
                y: y - 10,
                duration: 1000 + Math.random() * 500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }

    collectCoin(player, coin) {
        // Animated coin collection
        this.emitSparkles(coin.x, coin.y);
        this.showScorePopup(coin.x, coin.y - 10, 10);

        // Scale up and fade out
        this.tweens.add({
            targets: coin,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 0,
            duration: 150,
            onComplete: () => coin.disableBody(true, true)
        });

        this.updateScore(10);
        this.playSound('coin');
    }

    playSound(type) {
        try {
            if (!this.soundContext) {
                this.soundContext = new (window.AudioContext || window.webkitAudioContext)();
            }

            // Resume context if suspended (browser security)
            if (this.soundContext.state === 'suspended') {
                this.soundContext.resume();
            }

            const ctx = this.soundContext;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            const now = ctx.currentTime;

            switch (type) {
                case 'jump':
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(150, now);
                    osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
                    gain.gain.setValueAtTime(0.05, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                    osc.start(now);
                    osc.stop(now + 0.1);
                    break;
                case 'coin':
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(800, now);
                    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
                    gain.gain.setValueAtTime(0.05, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                    osc.start(now);
                    osc.stop(now + 0.2);
                    break;
                case 'stomp':
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(200, now);
                    osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
                    gain.gain.setValueAtTime(0.05, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                    osc.start(now);
                    osc.stop(now + 0.1);
                    break;
                case 'hurt':
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(100, now);
                    osc.frequency.linearRampToValueAtTime(40, now + 0.3);
                    gain.gain.setValueAtTime(0.1, now);
                    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
                    osc.start(now);
                    osc.stop(now + 0.3);
                    break;
                case 'land':
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(80, now);
                    osc.frequency.exponentialRampToValueAtTime(40, now + 0.05);
                    gain.gain.setValueAtTime(0.03, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                    osc.start(now);
                    osc.stop(now + 0.05);
                    break;
                case 'checkpoint':
                    // Ascending arpeggio C-E-G
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(523, now); // C5
                    osc.frequency.setValueAtTime(659, now + 0.1); // E5
                    osc.frequency.setValueAtTime(784, now + 0.2); // G5
                    gain.gain.setValueAtTime(0.08, now);
                    gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
                    osc.start(now);
                    osc.stop(now + 0.4);
                    break;
                case 'finish':
                    // Victory fanfare - two-tone celebration
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(523, now);
                    osc.frequency.setValueAtTime(659, now + 0.15);
                    osc.frequency.setValueAtTime(784, now + 0.3);
                    osc.frequency.setValueAtTime(1047, now + 0.45);
                    gain.gain.setValueAtTime(0.06, now);
                    gain.gain.linearRampToValueAtTime(0.01, now + 0.6);
                    osc.start(now);
                    osc.stop(now + 0.6);
                    break;
            }
        } catch (e) {
            console.warn("Sound error:", e);
        }
    }

    createAnimatedPlayer(width, height) {
        // Create player using atlas frame
        this.player = this.physics.add.sprite(100, height - 150, 'noe_atlas', 'idle');
        // Scale down ~240px tall sprite to ~48px (0.2 scale)
        this.player.setScale(0.2);
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);

        // Hitbox for scaled character - adjusted to align feet with ground
        this.player.body.setSize(100, 170);
        this.player.body.setOffset(16, 50);

        // Create animations from atlas frames
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'noe_atlas', frame: 'idle' }],
            frameRate: 1
        });

        this.anims.create({
            key: 'run',
            frames: [
                { key: 'noe_atlas', frame: 'run1' },
                { key: 'noe_atlas', frame: 'run2' },
                { key: 'noe_atlas', frame: 'run3' },
                { key: 'noe_atlas', frame: 'run4' }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: [{ key: 'noe_atlas', frame: 'jump' }],
            frameRate: 1
        });

        // Sprint animation (faster run)
        this.anims.create({
            key: 'sprint',
            frames: [
                { key: 'noe_atlas', frame: 'run1' },
                { key: 'noe_atlas', frame: 'run2' },
                { key: 'noe_atlas', frame: 'run3' },
                { key: 'noe_atlas', frame: 'run4' }
            ],
            frameRate: 18,
            repeat: -1
        });

        // Camera
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setDeadzone(120, 80);

        // World bounds based on level length
        const level = this.getLevelData();
        this.physics.world.setBounds(-200, 0, width * level.worldLength, height);
    }

    // ============================================
    // POLISH: PARTICLE SYSTEMS
    // ============================================
    setupParticles() {
        // Create particle textures
        this.createParticleTextures();

        // Dust particle emitter (for landing and running)
        this.dustEmitter = this.add.particles(0, 0, 'dust_particle', {
            speed: { min: 20, max: 60 },
            angle: { min: 230, max: 310 },
            scale: { start: 0.8, end: 0 },
            lifespan: 400,
            gravityY: 100,
            alpha: { start: 0.7, end: 0 },
            emitting: false
        });

        // Coin sparkle emitter
        this.sparkleEmitter = this.add.particles(0, 0, 'sparkle_particle', {
            speed: { min: 80, max: 150 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.6, end: 0 },
            lifespan: 500,
            alpha: { start: 1, end: 0 },
            emitting: false
        });

        // Stomp pop emitter
        this.stompEmitter = this.add.particles(0, 0, 'stomp_particle', {
            speed: { min: 100, max: 200 },
            angle: { min: 200, max: 340 },
            scale: { start: 0.5, end: 0 },
            lifespan: 350,
            gravityY: 300,
            alpha: { start: 1, end: 0 },
            emitting: false
        });

        // Damage flash particles
        this.damageEmitter = this.add.particles(0, 0, 'damage_particle', {
            speed: { min: 50, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.4, end: 0 },
            lifespan: 300,
            alpha: { start: 0.8, end: 0 },
            emitting: false
        });

        // Confetti emitter for finish
        this.confettiEmitter = this.add.particles(0, 0, 'confetti_particle', {
            speed: { min: 100, max: 300 },
            angle: { min: 250, max: 290 },
            scale: { start: 0.6, end: 0.3 },
            lifespan: 2000,
            gravityY: 150,
            alpha: { start: 1, end: 0.5 },
            rotate: { min: 0, max: 360 },
            emitting: false
        });
    }

    createParticleTextures() {
        // Dust particle (brown circle)
        const dust = this.make.graphics();
        dust.fillStyle(0x8b7355, 1);
        dust.fillCircle(8, 8, 8);
        dust.generateTexture('dust_particle', 16, 16);
        dust.destroy();

        // Sparkle particle (golden star-like)
        const sparkle = this.make.graphics();
        sparkle.fillStyle(0xffd700, 1);
        sparkle.fillCircle(6, 6, 6);
        sparkle.fillStyle(0xffff00, 1);
        sparkle.fillCircle(6, 6, 3);
        sparkle.generateTexture('sparkle_particle', 12, 12);
        sparkle.destroy();

        // Stomp particle (green for slime)
        const stomp = this.make.graphics();
        stomp.fillStyle(0x76c900, 1);
        stomp.fillCircle(6, 6, 6);
        stomp.generateTexture('stomp_particle', 12, 12);
        stomp.destroy();

        // Damage particle (red)
        const damage = this.make.graphics();
        damage.fillStyle(0xff4444, 1);
        damage.fillCircle(5, 5, 5);
        damage.generateTexture('damage_particle', 10, 10);
        damage.destroy();

        // Confetti particles (multiple colors)
        const confetti = this.make.graphics();
        confetti.fillStyle(0xff6b6b, 1);
        confetti.fillRect(0, 0, 8, 12);
        confetti.fillStyle(0x4ecdc4, 1);
        confetti.fillRect(10, 0, 8, 12);
        confetti.fillStyle(0xffe66d, 1);
        confetti.fillRect(20, 0, 8, 12);
        confetti.generateTexture('confetti_particle', 8, 12);
        confetti.destroy();
    }

    // Score popup floating text
    showScorePopup(x, y, amount) {
        const color = amount >= 100 ? '#ffff00' : '#ffffff';
        const size = amount >= 100 ? '24px' : '18px';

        const popup = this.add.text(x, y, `+${amount}`, {
            fontFamily: 'Outfit, sans-serif',
            fontSize: size,
            fill: color,
            stroke: '#000',
            strokeThickness: 3
        }).setOrigin(0.5);

        this.tweens.add({
            targets: popup,
            y: y - 50,
            alpha: 0,
            duration: 800,
            ease: 'Power2',
            onComplete: () => popup.destroy()
        });
    }

    // Emit dust particles at position
    emitDust(x, y, count = 5) {
        if (this.dustEmitter) {
            this.dustEmitter.emitParticleAt(x, y, count);
        }
    }

    // Emit sparkles at position
    emitSparkles(x, y, count = 8) {
        if (this.sparkleEmitter) {
            this.sparkleEmitter.emitParticleAt(x, y, count);
        }
    }

    // Emit stomp particles
    emitStompPop(x, y, count = 10) {
        if (this.stompEmitter) {
            this.stompEmitter.emitParticleAt(x, y, count);
        }
    }

    // Emit damage particles around player
    emitDamageParticles() {
        if (this.damageEmitter && this.player) {
            this.damageEmitter.emitParticleAt(this.player.x, this.player.y, 12);
        }
    }

    // Camera shake effect
    shakeCamera(intensity = 0.01, duration = 100) {
        this.cameras.main.shake(duration, intensity);
    }

    // White flash effect
    flashScreen() {
        if (this.damageFlash) {
            this.tweens.add({
                targets: this.damageFlash,
                alpha: { from: 0.6, to: 0 },
                duration: 150,
                ease: 'Power2'
            });
        }
    }

    // Player squash effect on landing
    squashPlayer() {
        if (this.landSquashTween) {
            this.landSquashTween.stop();
        }

        this.landSquashTween = this.tweens.add({
            targets: this.player,
            scaleX: 0.25,
            scaleY: 0.16,
            duration: 80,
            yoyo: true,
            ease: 'Power2'
        });
    }

    // Player stretch effect during jump
    stretchPlayer() {
        this.player.setScale(0.18, 0.23);
    }

    // Reset player scale
    resetPlayerScale() {
        if (!this.landSquashTween || !this.landSquashTween.isPlaying()) {
            this.player.setScale(0.2);
        }
    }

    // Pulse hearts animation on damage
    pulseHearts() {
        if (this.livesText) {
            this.tweens.add({
                targets: this.livesText,
                scaleX: 1.3,
                scaleY: 1.3,
                duration: 100,
                yoyo: true,
                repeat: 2,
                ease: 'Power2'
            });

            // Red flash on text
            this.livesText.setTint(0xff0000);
            this.time.delayedCall(300, () => {
                if (this.livesText) this.livesText.clearTint();
            });
        }
    }

    // Emit confetti for finish
    emitConfetti() {
        if (this.confettiEmitter) {
            const { width } = this.scale;
            const scrollX = this.cameras.main.scrollX;

            // Emit from multiple points across screen
            for (let i = 0; i < 5; i++) {
                this.time.delayedCall(i * 100, () => {
                    this.confettiEmitter.emitParticleAt(
                        scrollX + (width * 0.2) + (i * width * 0.15),
                        0,
                        15
                    );
                });
            }
        }
    }

    setupMobileControls() {
        const joystickContainer = document.createElement('div');
        joystickContainer.className = 'joystick-container';
        joystickContainer.id = 'joystick-zone';
        document.body.appendChild(joystickContainer);

        this.joystick = nipplejs.create({
            zone: joystickContainer,
            mode: 'static',
            position: { left: '80px', bottom: '80px' },
            color: 'rgba(255, 200, 100, 0.5)',
            size: 120
        });

        this.joystick.on('move', (evt, data) => {
            if (data.vector) {
                this.joystickData.x = data.vector.x;
                this.joystickData.y = data.vector.y;
            }
        });

        this.joystick.on('end', () => {
            this.joystickData.x = 0;
            this.joystickData.y = 0;
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
            this.sprintButton.classList.add('active');
        });
        this.sprintButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.isSprinting = false;
            this.sprintButton.classList.remove('active');
        });

        // Create pause button (top right)
        this.pauseButton = document.createElement('div');
        this.pauseButton.className = 'pause-button';
        this.pauseButton.innerHTML = '⏸';
        this.pauseButton.id = 'pause-btn';
        document.body.appendChild(this.pauseButton);

        this.pauseButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.togglePause();
        });
    }

    doJump() {
        if (this.player.body.touching.down) {
            // Sprint jump: higher and more horizontal momentum
            if (this.isSprinting) {
                this.player.setVelocityY(-600); // Higher jump
                // Boost horizontal velocity in sprint direction
                const boostDir = this.lastDirection === 'right' ? 1 : -1;
                this.player.setVelocityX(this.player.body.velocity.x + boostDir * 80);
            } else {
                this.player.setVelocityY(-520); // Normal jump
            }
            this.playSound('jump');
        }
    }

    update() {
        // Pause toggle (P or ESC key)
        if ((this.pKey && Phaser.Input.Keyboard.JustDown(this.pKey)) ||
            (this.escKey && Phaser.Input.Keyboard.JustDown(this.escKey))) {
            this.togglePause();
            return;
        }

        // Don't process game logic while paused
        if (this.isPaused) return;

        // Restart shortcut (PC) - Check this first to ensure responsiveness
        if (this.rKey && Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.lives = 3;
            this.score = 0;
            this.scene.restart();
            return;
        }

        // Fall death check (2 seconds of free-falling)
        if (!this.player.body.touching.down && this.player.body.velocity.y > 100) {
            this.fallTimer += this.game.loop.delta;
            if (this.fallTimer > 2000) { // 2 seconds
                this.fallTimer = 0;
                this.lives--;
                this.updateUI();
                this.playSound('hurt');
                if (this.lives <= 0) {
                    this.scene.restart();
                } else {
                    // Respawn at checkpoint or start
                    this.player.setPosition(this.respawnX, this.respawnY);
                    this.player.setVelocity(0, 0);
                }
            }
        } else {
            this.fallTimer = 0;
        }

        const normalSpeed = 220;
        const sprintSpeed = 400;
        let isMoving = false;

        // Check sprint state (PC: SHIFT key)
        if (!this.isMobile) {
            this.isSprinting = this.shiftKey.isDown;
        }

        const speed = this.isSprinting ? sprintSpeed : normalSpeed;

        // Parallax background
        if (this.bgImage) {
            this.bgImage.tilePositionX = this.cameras.main.scrollX * 0.2;
        }

        // Movement with air momentum
        const isOnGround = this.player.body.touching.down;
        const airDrag = 0.92; // How much velocity is retained each frame in air (lower = slows faster)
        const airControl = 0.6; // Control while in air (higher = easier to change direction)

        if (this.isMobile) {
            if (this.joystickData.x < -0.3) {
                if (isOnGround) {
                    this.player.setVelocityX(-speed);
                } else {
                    // Air control - add force but don't override momentum
                    this.player.setVelocityX(this.player.body.velocity.x - speed * airControl * 0.1);
                }
                isMoving = true;
                this.lastDirection = 'left';
            } else if (this.joystickData.x > 0.3) {
                if (isOnGround) {
                    this.player.setVelocityX(speed);
                } else {
                    this.player.setVelocityX(this.player.body.velocity.x + speed * airControl * 0.1);
                }
                isMoving = true;
                this.lastDirection = 'right';
            } else {
                // No input - apply drag on ground, momentum in air
                if (isOnGround) {
                    this.player.setVelocityX(0);
                } else {
                    // Gradually slow down in air
                    this.player.setVelocityX(this.player.body.velocity.x * airDrag);
                }
            }
        } else {
            if (this.cursors.left.isDown) {
                if (isOnGround) {
                    this.player.setVelocityX(-speed);
                } else {
                    // Air control with velocity cap
                    const newVel = this.player.body.velocity.x - speed * airControl * 0.1;
                    this.player.setVelocityX(Math.max(newVel, -speed)); // Cap at max speed
                }
                isMoving = true;
                this.lastDirection = 'left';
            } else if (this.cursors.right.isDown) {
                if (isOnGround) {
                    this.player.setVelocityX(speed);
                } else {
                    // Air control with velocity cap
                    const newVel = this.player.body.velocity.x + speed * airControl * 0.1;
                    this.player.setVelocityX(Math.min(newVel, speed)); // Cap at max speed
                }
                isMoving = true;
                this.lastDirection = 'right';
            } else {
                // No input - apply drag on ground, momentum in air
                if (isOnGround) {
                    this.player.setVelocityX(0);
                } else {
                    // Gradually slow down in air
                    this.player.setVelocityX(this.player.body.velocity.x * airDrag);
                }
            }

            if (this.spaceKey.isDown && isOnGround) {
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
            // Stretch player during jump ascent
            if (this.player.body.velocity.y < -100) {
                this.stretchPlayer();
            }
        } else if (isMoving && this.isSprinting) {
            this.player.anims.play('sprint', true);
            this.resetPlayerScale();
        } else if (isMoving) {
            this.player.anims.play('run', true);
            this.resetPlayerScale();
        } else {
            this.player.anims.play('idle', true);
            this.resetPlayerScale();
        }

        // Polish: Landing detection - only trigger when actually landing from a fall/jump
        // wasInAir must be true AND we must have had significant downward velocity
        if (isOnGround && this.wasInAir && this.lastYVelocity > 50) {
            // Just landed from a real jump/fall!
            this.emitDust(this.player.x, this.player.y + 15, 6);
            this.squashPlayer();
            this.playSound('land');
        }
        this.wasInAir = !isOnGround;
        this.lastYVelocity = this.player.body.velocity.y;

        // Polish: Sprint dust trail
        if (isOnGround && this.isSprinting && isMoving) {
            // Emit occasional dust while sprinting
            if (Math.random() < 0.15) {
                const dustX = this.lastDirection === 'right'
                    ? this.player.x - 15
                    : this.player.x + 15;
                this.emitDust(dustX, this.player.y + 15, 2);
            }
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

        // Flying Enemy Logic
        this.updateFlyingEnemies(this.time.now);
    }

    shutdown() {
        const joystickZone = document.getElementById('joystick-zone');
        const jumpBtn = document.getElementById('jump-btn');
        const sprintBtn = document.getElementById('sprint-btn');
        const pauseBtn = document.getElementById('pause-btn');
        if (joystickZone) joystickZone.remove();
        if (jumpBtn) jumpBtn.remove();
        if (sprintBtn) sprintBtn.remove();
        if (pauseBtn) pauseBtn.remove();
        if (this.joystick) {
            this.joystick.destroy();
            this.joystick = null;
        }
    }

    generateSpikeTexture() {
        const g = this.make.graphics();
        const size = 32;
        g.fillStyle(0x9e9e9e, 1);
        g.beginPath();
        g.moveTo(0, size);
        g.lineTo(size / 2, 0);
        g.lineTo(size, size);
        g.closePath();
        g.fillPath();
        g.generateTexture('spike', size, size);
        g.destroy();
    }

    generateLavaTexture() {
        const g = this.make.graphics();
        const w = 80, h = 40;
        g.fillStyle(0xff4500, 1);
        g.fillRect(0, 0, w, h);
        g.fillStyle(0xff8c00, 1);
        for (let i = 0; i < 3; i++) {
            g.fillCircle(Math.random() * w, Math.random() * h, 8);
        }
        g.generateTexture('lava', w, h);
        g.destroy();
    }

    generateBeeTexture() {
        const g = this.make.graphics();
        const w = 40, h = 32;
        // Body
        g.fillStyle(0xffd700, 1);
        g.fillEllipse(w / 2, h / 2, 30, 20);
        // Stripes
        g.fillStyle(0x000000, 1);
        g.fillRect(15, 8, 4, 16);
        g.fillRect(23, 8, 4, 16);
        // Wings
        g.fillStyle(0xffffff, 0.7);
        g.fillEllipse(15, 12, 12, 8);
        g.fillEllipse(25, 12, 12, 8);
        // Eye
        g.fillStyle(0x000000, 1);
        g.fillCircle(30, 14, 2);

        g.generateTexture('bee', w, h);
        g.destroy();
    }

    generateCheckpointTexture() {
        const g = this.make.graphics();
        const w = 40, h = 80;

        // Pole
        g.fillStyle(0x8b4513, 1);
        g.fillRect(18, 10, 6, 70);

        // Flag (inactive - grey)
        g.fillStyle(0x888888, 1);
        g.beginPath();
        g.moveTo(24, 10);
        g.lineTo(40, 25);
        g.lineTo(24, 40);
        g.closePath();
        g.fillPath();

        // Base
        g.fillStyle(0x555555, 1);
        g.fillRect(10, 70, 22, 10);

        g.generateTexture('checkpoint_inactive', w, h);
        g.destroy();

        // Active checkpoint (green flag)
        const g2 = this.make.graphics();

        g2.fillStyle(0x8b4513, 1);
        g2.fillRect(18, 10, 6, 70);

        g2.fillStyle(0x00ff00, 1);
        g2.beginPath();
        g2.moveTo(24, 10);
        g2.lineTo(40, 25);
        g2.lineTo(24, 40);
        g2.closePath();
        g2.fillPath();

        g2.fillStyle(0x80ff80, 1);
        g2.beginPath();
        g2.moveTo(24, 12);
        g2.lineTo(34, 22);
        g2.lineTo(24, 32);
        g2.closePath();
        g2.fillPath();

        g2.fillStyle(0x555555, 1);
        g2.fillRect(10, 70, 22, 10);

        g2.generateTexture('checkpoint_active', w, h);
        g2.destroy();
    }

    generateFinishLineTexture() {
        const g = this.make.graphics();
        const w = 60, h = 120;

        // Left pole
        g.fillStyle(0xffd700, 1);
        g.fillRect(0, 0, 8, h);

        // Right pole
        g.fillRect(w - 8, 0, 8, h);

        // Banner at top
        g.fillStyle(0xff0000, 1);
        g.fillRect(8, 10, w - 16, 30);

        // Checkered pattern
        g.fillStyle(0xffffff, 1);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if ((i + j) % 2 === 0) {
                    g.fillRect(8 + i * 11, 10 + j * 10, 11, 10);
                }
            }
        }

        // Star at top
        g.fillStyle(0xffd700, 1);
        g.fillCircle(w / 2, 25, 8);
        g.fillStyle(0xffea00, 1);
        g.fillCircle(w / 2, 25, 5);

        g.generateTexture('finish_line', w, h);
        g.destroy();
    }

    createCheckpointAndFinish(width, height) {
        const level = this.getLevelData();
        const groundY = height - 20;

        // Checkpoint from level data
        this.checkpoint = this.physics.add.sprite(width * level.checkpoint.xMult, groundY - 50, 'checkpoint_inactive');
        this.checkpoint.body.setAllowGravity(false);
        this.checkpoint.body.setImmovable(true);
        this.checkpoint.setOrigin(0.5, 1);

        // Finish line from level data
        this.finishLine = this.physics.add.sprite(width * level.finish.xMult, groundY - 70, 'finish_line');
        this.finishLine.body.setAllowGravity(false);
        this.finishLine.body.setImmovable(true);
        this.finishLine.setOrigin(0.5, 1);

        // Floating animation
        this.tweens.add({
            targets: this.finishLine,
            y: groundY - 75,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Collision detection
        this.physics.add.overlap(this.player, this.checkpoint, this.activateCheckpoint, null, this);
        this.physics.add.overlap(this.player, this.finishLine, this.reachFinish, null, this);
    }

    activateCheckpoint(player, checkpoint) {
        if (this.checkpointActivated) return;

        this.checkpointActivated = true;
        this.respawnX = checkpoint.x;
        this.respawnY = checkpoint.y - 40;

        checkpoint.setTexture('checkpoint_active');

        this.tweens.add({
            targets: checkpoint,
            scaleX: 1.3,
            scaleY: 1.3,
            duration: 200,
            yoyo: true
        });

        this.playSound('checkpoint');
        this.emitSparkles(checkpoint.x, checkpoint.y - 40, 12);

        const { width, height } = this.scale;
        const text = this.add.text(
            this.cameras.main.scrollX + width / 2,
            this.cameras.main.scrollY + height / 3,
            '✓ CHECKPOINT!',
            {
                fontFamily: 'Outfit, sans-serif',
                fontSize: '32px',
                fill: '#00ff00',
                stroke: '#000',
                strokeThickness: 6
            }
        ).setOrigin(0.5);

        this.tweens.add({
            targets: text,
            alpha: 0,
            y: text.y - 50,
            duration: 1500,
            onComplete: () => text.destroy()
        });
    }

    reachFinish(player, finishLine) {
        if (this.levelComplete) return;
        this.levelComplete = true;

        this.physics.pause();
        player.anims.play('idle');

        this.tweens.add({
            targets: player,
            y: player.y - 50,
            duration: 500,
            yoyo: true,
            repeat: 2
        });

        // Victory effects
        this.playSound('finish');
        this.emitConfetti();

        // Camera zoom effect
        this.tweens.add({
            targets: this.cameras.main,
            zoom: 1.2,
            duration: 800,
            ease: 'Power2'
        });

        const { width, height } = this.scale;
        const isLastLevel = this.currentLevel >= LEVELS.length - 1;

        // Title text
        const titleText = isLastLevel ? 'YOU WIN!' : 'LEVEL COMPLETE!';
        this.add.text(
            this.cameras.main.scrollX + width / 2,
            this.cameras.main.scrollY + height / 2.5,
            titleText,
            {
                fontFamily: 'Outfit, sans-serif',
                fontSize: '40px',
                fill: '#ffd700',
                stroke: '#000',
                strokeThickness: 8
            }
        ).setOrigin(0.5);

        // Score display
        const scoreMessage = isLastLevel ? `Final Score: ${this.score}` : `Score: ${this.score}`;
        this.add.text(
            this.cameras.main.scrollX + width / 2,
            this.cameras.main.scrollY + height / 2,
            scoreMessage,
            {
                fontFamily: 'Outfit, sans-serif',
                fontSize: '28px',
                fill: '#ffffff',
                stroke: '#000',
                strokeThickness: 4
            }
        ).setOrigin(0.5);

        // Next level or restart prompt
        let promptMessage;
        if (isLastLevel) {
            promptMessage = this.isMobile ? 'Tap to play again' : 'Press any key to play again';
        } else {
            const nextLevel = LEVELS[this.currentLevel + 1];
            promptMessage = this.isMobile ? `Tap for Level ${this.currentLevel + 2}: ${nextLevel.name}` : `Press any key for Level ${this.currentLevel + 2}`;
        }

        const restartText = this.add.text(
            this.cameras.main.scrollX + width / 2,
            this.cameras.main.scrollY + height / 1.6,
            promptMessage,
            {
                fontFamily: 'Outfit, sans-serif',
                fontSize: '20px',
                fill: '#aaffaa',
                stroke: '#000',
                strokeThickness: 3
            }
        ).setOrigin(0.5);

        this.tweens.add({
            targets: restartText,
            alpha: 0.5,
            duration: 700,
            yoyo: true,
            repeat: -1
        });

        this.time.delayedCall(1000, () => {
            // Use once() to prevent listener accumulation
            const advanceLevel = () => {
                this.levelComplete = false;
                this.checkpointActivated = false;
                this.respawnX = 100;
                this.respawnY = 100;

                if (isLastLevel) {
                    // Game complete - reset to level 0
                    this.currentLevel = 0;
                    this.score = 0;
                    localStorage.setItem('superNoeCurrentLevel', '0');
                } else {
                    // Advance to next level (keep score!)
                    this.currentLevel++;
                    localStorage.setItem('superNoeCurrentLevel', this.currentLevel.toString());
                }

                this.scene.restart();
            };

            this.input.once('pointerdown', advanceLevel);
            this.input.keyboard.once('keydown', advanceLevel);
        });
    }

    createHazards(width, height) {
        const level = this.getLevelData();

        // Add spikes from level data
        level.spikes.forEach(mult => {
            this.spikes.create(width * mult, height - 36, 'spike');
        });

        // Add lava pits from level data
        level.lavaPositions.forEach(mult => {
            this.lava.create(width * mult, height - 10, 'lava').setScale(2, 1);
        });
    }

    createFlyingEnemies(width, height) {
        const level = this.getLevelData();

        level.flyingEnemies.forEach(data => {
            const x = width * data.xMult;
            const y = height * data.yMult;
            const bee = this.flyingEnemies.create(x, y, 'bee');
            bee.body.setAllowGravity(false);
            bee.setData('startX', x);
            bee.setData('startY', y);
            bee.setData('range', data.range);
        });
    }

    hitHazard(player, spike) {
        this.hitEnemy(player, spike);
    }

    hitLava(player, lava) {
        this.lives = 0;
        this.hitEnemy(player, lava);
    }

    updateFlyingEnemies(time) {
        this.flyingEnemies.getChildren().forEach(bee => {
            const startX = bee.getData('startX');
            const range = bee.getData('range');
            bee.x = startX + Math.sin(time / 1000) * range;
            bee.y = bee.getData('startY') + Math.sin(time / 500) * 40;

            // Flip based on direction (face left when moving left)
            bee.setFlipX(Math.cos(time / 1000) < 0);
        });
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
