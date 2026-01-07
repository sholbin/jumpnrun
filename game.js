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
        finish: { xMult: 3.5 },
        // Mystery blocks: x position, yOffset from ground, contents (mushroom/star/heart/coins)
        mysteryBlocks: [
            { x: 250, yOffset: 120, contents: 'mushroom' },
            { x: 600, yOffset: 140, contents: 'coins' },
            { x: 1100, yOffset: 100, contents: 'star' },
            { x: 1600, yOffset: 160, contents: 'heart' },
            { x: 2200, yOffset: 120, contents: 'mushroom' }
        ]
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
        finish: { xMult: 4.5 },
        mysteryBlocks: [
            { x: 300, yOffset: 130, contents: 'mushroom' },
            { x: 700, yOffset: 150, contents: 'coins' },
            { x: 1200, yOffset: 110, contents: 'star' },
            { x: 1800, yOffset: 140, contents: 'mushroom' },
            { x: 2400, yOffset: 160, contents: 'heart' },
            { x: 3000, yOffset: 130, contents: 'star' }
        ]
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
        finish: { xMult: 5.5 },
        mysteryBlocks: [
            { x: 200, yOffset: 140, contents: 'mushroom' },
            { x: 500, yOffset: 160, contents: 'star' },
            { x: 900, yOffset: 120, contents: 'coins' },
            { x: 1400, yOffset: 180, contents: 'heart' },
            { x: 1900, yOffset: 140, contents: 'mushroom' },
            { x: 2500, yOffset: 160, contents: 'star' },
            { x: 3100, yOffset: 130, contents: 'heart' },
            { x: 3700, yOffset: 150, contents: 'mushroom' }
        ]
    },
    // Level 4: SECRET DARK LEVEL - Accessed by ground pounding while falling in Level 3
    {
        name: "The Abyss",
        worldLength: 5,
        theme: 'dark', // Special dark night theme
        lavaPositions: [1.0, 1.6, 2.2, 2.8, 3.4, 4.0],
        platforms: [
            { x: 150, yOffset: 80 },
            { x: 350, yOffset: 150 },
            { x: 550, yOffset: 100 },
            { x: 750, yOffset: 180 },
            { x: 950, yOffset: 120 },
            { x: 1150, yOffset: 200 },
            { x: 1350, yOffset: 140 },
            { x: 1550, yOffset: 180 },
            { x: 1750, yOffset: 100 },
            { x: 1950, yOffset: 160 },
            { x: 2150, yOffset: 220 },
            { x: 2350, yOffset: 140 },
            { x: 2550, yOffset: 180 },
            { x: 2750, yOffset: 120 }
        ],
        enemies: [
            { x: 400, yOffset: 30, patrol: 90 },
            { x: 800, yOffset: 30, patrol: 110 },
            { x: 1200, yOffset: 30, patrol: 85 },
            { x: 1600, yOffset: 30, patrol: 100 },
            { x: 2000, yOffset: 30, patrol: 95 },
            { x: 350, yOffset: 180, patrol: 60 },
            { x: 1150, yOffset: 230, patrol: 70 },
            { x: 1950, yOffset: 190, patrol: 65 }
        ],
        flyingEnemies: [
            { xMult: 0.5, yMult: 0.2, range: 180 },
            { xMult: 1.0, yMult: 0.25, range: 200 },
            { xMult: 1.5, yMult: 0.2, range: 170 },
            { xMult: 2.0, yMult: 0.3, range: 190 },
            { xMult: 2.5, yMult: 0.25, range: 210 }
        ],
        coins: [
            { xMult: 0.3, yMult: 0.5 },
            { xMult: 0.5, yMult: 0.4 },
            { xMult: 0.8, yMult: 0.35 },
            { xMult: 1.1, yMult: 0.45 },
            { xMult: 1.4, yMult: 0.3 },
            { xMult: 1.7, yMult: 0.4 },
            { xMult: 2.0, yMult: 0.35 },
            { xMult: 2.3, yMult: 0.45 },
            { xMult: 2.6, yMult: 0.3 },
            { xMult: 0.6, ground: true },
            { xMult: 1.3, ground: true },
            { xMult: 2.1, ground: true }
        ],
        spikes: [0.7, 1.1, 1.5, 1.9, 2.4, 2.9, 3.3, 3.8],
        checkpoint: { xMult: 2.2 },
        finish: { xMult: 4.5 },
        mysteryBlocks: [
            { x: 250, yOffset: 130, contents: 'star' },
            { x: 700, yOffset: 150, contents: 'heart' },
            { x: 1100, yOffset: 140, contents: 'mushroom' },
            { x: 1600, yOffset: 160, contents: 'coins' },
            { x: 2100, yOffset: 130, contents: 'star' },
            { x: 2600, yOffset: 150, contents: 'heart' }
        ]
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
        // Leaderboard - stores top 10 scores with player names
        this.leaderboard = this.loadLeaderboard();
        this.playerName = localStorage.getItem('superNoePlayerName') || '';
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
        // Mario-style jump physics
        this.coyoteTime = 0; // Frames since leaving ground (allows late jumps)
        this.jumpBufferTime = 0; // Frames since jump was pressed (allows early jumps)
        this.isJumping = false; // Track if we're in a jump (for variable height)
        this.jumpReleased = true; // Track if jump button was released
        this.isGroundPounding = false; // Track ground pound state
        this.groundPoundTimer = 0; // Timer for ground pound duration
        // Ground stability - prevents physics jitter after landing
        this.groundedFrames = 0; // Frames since last confirmed ground contact
        // Timer system
        this.levelTime = 120; // 2 minutes in seconds
        this.timerText = null;
        this.timerWarning = false;
        // Powerup system
        this.isPoweredUp = false; // Mushroom state (big)
        this.isStarPowered = false; // Star invincibility
        this.starTimer = null;
        this.totalCoins = 0; // Track total coins for 100 = 1 life
        this.mysteryBlocks = null;
        this.powerups = null;
    }

    // Get current level data
    getLevelData() {
        return LEVELS[this.currentLevel] || LEVELS[0];
    }

    // Leaderboard functions
    loadLeaderboard() {
        try {
            const data = localStorage.getItem('superNoeLeaderboard');
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    saveLeaderboard() {
        localStorage.setItem('superNoeLeaderboard', JSON.stringify(this.leaderboard));
    }

    addToLeaderboard(name, score) {
        this.leaderboard.push({ name, score, date: new Date().toLocaleDateString() });
        this.leaderboard.sort((a, b) => b.score - a.score);
        this.leaderboard = this.leaderboard.slice(0, 3); // Keep top 3
        this.saveLeaderboard();
    }

    isHighScore(score) {
        if (this.leaderboard.length < 3) return true;
        return score > this.leaderboard[this.leaderboard.length - 1].score;
    }

    create() {
        const { width, height } = this.scale;

        // Stop any playing dark ambience from previous level
        this.stopDarkAmbience();

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
        this.generateMysteryBlockTexture();
        this.generateMushroomTexture();
        this.generateStarTexture();
        this.generateHeartTexture();

        this.createHazards(width, height);
        this.createFlyingEnemies(width, height);
        this.createMysteryBlocks(width, height);
        this.createPowerupGroup();
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
        this.lKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

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

    generateCapTexture() {
        const g = this.make.graphics();
        const w = 70, h = 35;

        // Baseball cap - socialist red
        // Main cap body
        g.fillStyle(0xc62828, 1);
        g.fillEllipse(30, 18, 50, 28);

        // Cap crown panels (darker seams)
        g.lineStyle(1, 0x8e0000, 0.5);
        g.lineBetween(20, 5, 25, 28);
        g.lineBetween(30, 3, 30, 28);
        g.lineBetween(40, 5, 35, 28);

        // Brim (curved, extends forward)
        g.fillStyle(0xb71c1c, 1);
        g.beginPath();
        g.moveTo(45, 22);
        g.lineTo(68, 28);
        g.lineTo(65, 34);
        g.lineTo(42, 30);
        g.closePath();
        g.fillPath();

        // Brim edge highlight
        g.lineStyle(2, 0x7f0000, 1);
        g.lineBetween(45, 22, 68, 28);

        // Top button
        g.fillStyle(0x7f0000, 1);
        g.fillCircle(30, 6, 4);

        // Shine/highlight
        g.fillStyle(0xe57373, 0.4);
        g.fillEllipse(25, 12, 16, 10);

        g.generateTexture('red_cap', w, h);
        g.destroy();
    }

    createBackground(width, height) {
        const level = this.getLevelData();
        const isDark = level.theme === 'dark';

        // Sky gradient - dark purple/black for night, blue for day
        const sky = this.add.graphics();
        if (isDark) {
            sky.fillGradientStyle(0x0a0a1a, 0x0a0a1a, 0x1a1a3a, 0x2a1a4a, 1);
        } else {
            sky.fillGradientStyle(0x87ceeb, 0x87ceeb, 0x98d1f0, 0xb8e0f7, 1);
        }
        sky.fillRect(0, 0, width * 4, height);
        sky.setScrollFactor(0);

        // Stars for dark theme
        if (isDark) {
            const stars = this.add.graphics();
            stars.fillStyle(0xffffff, 1);
            for (let i = 0; i < 100; i++) {
                const starSize = Math.random() * 2 + 0.5;
                const alpha = Math.random() * 0.5 + 0.3;
                stars.fillStyle(0xffffff, alpha);
                stars.fillCircle(Math.random() * width * 4, Math.random() * height * 0.6, starSize);
            }
            stars.setScrollFactor(0.02);

            // Eerie moon
            const moon = this.add.graphics();
            moon.fillStyle(0xccccaa, 0.8);
            moon.fillCircle(width * 0.8, 80, 40);
            moon.fillStyle(0x0a0a1a, 1);
            moon.fillCircle(width * 0.8 + 15, 75, 35); // Crescent shadow
            moon.setScrollFactor(0);
        }

        // Use forest background if available (darker for night)
        if (this.textures.exists('bg_forest')) {
            this.bgImage = this.add.tileSprite(width / 2, height * 0.6, width, height * 0.8, 'bg_forest');
            this.bgImage.setScrollFactor(0);
            this.bgImage.setAlpha(isDark ? 0.2 : 0.5);
            if (isDark) this.bgImage.setTint(0x3333aa);
        }

        // Clouds (dark clouds for night)
        this.cloudsLayer = this.add.graphics();
        this.cloudsLayer.fillStyle(isDark ? 0x222244 : 0xffffff, 1);
        for (let i = 0; i < 8; i++) {
            this.drawCloud(this.cloudsLayer, i * 350 + 100, 50 + Math.random() * 60, 0.7 + Math.random() * 0.5);
        }
        this.cloudsLayer.setScrollFactor(0.05);
        if (isDark) this.cloudsLayer.setAlpha(0.4);

        // Distant hills (dark silhouettes for night)
        const hills = this.add.graphics();
        hills.fillStyle(isDark ? 0x1a1a2a : 0x6b8e6b, 1);
        for (let i = 0; i < 15; i++) {
            hills.fillCircle(i * 200, height - 50, 100 + Math.random() * 50);
        }
        hills.setScrollFactor(0.2);

        // Trees - Draw from ground level (dark silhouettes for night)
        const groundY = height - 20;
        const trees = this.add.graphics();
        for (let i = 0; i < 20; i++) {
            this.drawTree(trees, i * 200 + 50, groundY, 80 + Math.random() * 60, isDark);
        }
        trees.setScrollFactor(1);

        // Start dark ambient music if dark theme
        if (isDark) {
            this.startDarkAmbience();
        }
    }

    drawCloud(g, x, y, scale) {
        const s = 30 * scale;
        g.fillCircle(x, y, s);
        g.fillCircle(x - s * 0.7, y + s * 0.3, s * 0.65);
        g.fillCircle(x + s * 0.7, y + s * 0.3, s * 0.65);
        g.fillCircle(x - s * 0.35, y - s * 0.2, s * 0.5);
        g.fillCircle(x + s * 0.35, y - s * 0.2, s * 0.5);
    }

    drawTree(g, x, baseY, h, isDark = false) {
        if (isDark) {
            // Dark silhouette tree
            g.fillStyle(0x0a0a15, 1);
            g.fillRect(x - 10, baseY - h * 0.4, 20, h * 0.4);
            g.fillCircle(x, baseY - h * 0.5, h * 0.35);
            g.fillCircle(x - h * 0.2, baseY - h * 0.4, h * 0.28);
            g.fillCircle(x + h * 0.2, baseY - h * 0.4, h * 0.28);
        } else {
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

        // Check if powered up - shrink instead of losing life
        if (this.shrinkPlayer()) {
            this.playSound('hurt');
            this.shakeCamera(0.01, 150);
            // Knockback
            const bounceDirection = (player.x < enemy.x) ? -300 : 300;
            player.setVelocityX(bounceDirection);
            player.setVelocityY(-300);
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
                // Respawn at checkpoint if activated, otherwise restart level
                if (this.checkpointActivated) {
                    // Keep checkpoint, respawn there
                    this.physics.resume();
                    player.clearTint();
                    player.setPosition(this.respawnX, this.respawnY);
                    player.setVelocity(0, 0);
                    this.isInvincible = true;
                    player.setAlpha(0.6);
                    this.time.delayedCall(1500, () => {
                        this.isInvincible = false;
                        player.setAlpha(1);
                    });
                    this.updateUI();
                } else {
                    // No checkpoint - game over, check for high score before restart
                    if (this.isHighScore(this.score)) {
                        this.promptForName(() => {
                            this.score = 0;
                            this.scene.restart();
                        });
                    } else {
                        this.score = 0;
                        this.scene.restart();
                    }
                }
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

        // Timer display (center top)
        this.timerText = this.add.text(width / 2, 20, 'TIME: 2:00', {
            ...textStyle,
            fontSize: '26px',
            fill: '#ffffff'
        }).setScrollFactor(0).setOrigin(0.5, 0);

        // Coin counter for 100 = 1 life
        this.coinCountText = this.add.text(width / 2, 50, `Coins: ${this.totalCoins}/100`, {
            ...textStyle,
            fontSize: '16px',
            fill: '#ffd700'
        }).setScrollFactor(0).setOrigin(0.5, 0);

        // Leaderboard button (top right, below level)
        const lbBtn = this.add.text(width - 20, 50, 'Leaderboard', {
            ...textStyle,
            fontSize: '16px',
            fill: '#ffd700'
        }).setScrollFactor(0).setOrigin(1, 0).setInteractive({ useHandCursor: true });
        lbBtn.on('pointerover', () => lbBtn.setStyle({ fill: '#ffeb3b' }));
        lbBtn.on('pointerout', () => lbBtn.setStyle({ fill: '#ffd700' }));
        lbBtn.on('pointerdown', () => this.showLeaderboard());

        // PC Hint
        if (!this.isMobile) {
            this.add.text(20, 80, '[R] Reset  [P] Pause  [L] Leaderboard', { ...textStyle, fontSize: '14px', fill: '#aaa' }).setScrollFactor(0);
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

        // Store all pause menu elements for cleanup (no container - fixes input issues)
        this.pauseMenuElements = [];

        // Dark overlay - covers entire viewport
        const overlay = this.add.rectangle(width / 2, height / 2, width * 3, height * 3, 0x000000, 0.8);
        overlay.setScrollFactor(0);
        overlay.setDepth(1999);
        this.pauseMenuElements.push(overlay);

        // Pause title
        const pauseTitle = this.add.text(width / 2, height / 2 - 100, 'PAUSED', {
            fontFamily: 'Outfit, sans-serif',
            fontSize: '48px',
            fill: '#ffffff',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5).setScrollFactor(0).setDepth(2000);
        this.pauseMenuElements.push(pauseTitle);

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
        const resumeBtn = this.add.text(width / 2, height / 2 - 20, '  Resume  ', buttonStyle)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(2000)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => resumeBtn.setStyle({ fill: '#88ff88' }))
            .on('pointerout', () => resumeBtn.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => this.resumeGame());
        this.pauseMenuElements.push(resumeBtn);

        // Restart Level button
        const restartBtn = this.add.text(width / 2, height / 2 + 40, 'Restart Level', buttonStyle)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(2000)
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
        this.pauseMenuElements.push(restartBtn);

        // Back to Title button
        const titleBtn = this.add.text(width / 2, height / 2 + 100, ' Main Menu ', buttonStyle)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(2000)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => titleBtn.setStyle({ fill: '#ff8888' }))
            .on('pointerout', () => titleBtn.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => {
                this.isPaused = false;
                this.scene.start('TitleScene');
            });
        this.pauseMenuElements.push(titleBtn);

        // Hint text
        const hintText = this.isMobile ? 'Tap Resume to continue' : 'Press P or ESC to resume';
        const hint = this.add.text(width / 2, height / 2 + 160, hintText, {
            fontFamily: 'Outfit, sans-serif',
            fontSize: '16px',
            fill: '#aaaaaa'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(2000);
        this.pauseMenuElements.push(hint);
    }

    resumeGame() {
        this.isPaused = false;
        this.physics.resume();

        // Clean up all pause menu elements
        if (this.pauseMenuElements) {
            this.pauseMenuElements.forEach(el => el.destroy());
            this.pauseMenuElements = null;
        }
    }

    showLeaderboard() {
        if (this.leaderboardElements) return; // Already showing

        this.isPaused = true;
        this.physics.pause();

        const { width, height } = this.scale;
        this.leaderboardElements = [];

        // Dark overlay
        const overlay = this.add.rectangle(width / 2, height / 2, width * 3, height * 3, 0x000000, 0.85);
        overlay.setScrollFactor(0).setDepth(2999);
        this.leaderboardElements.push(overlay);

        // Title
        const title = this.add.text(width / 2, 60, '🏆 LEADERBOARD 🏆', {
            fontFamily: 'Outfit, sans-serif',
            fontSize: '36px',
            fill: '#ffd700',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5).setScrollFactor(0).setDepth(3000);
        this.leaderboardElements.push(title);

        // Leaderboard entries
        const startY = 120;
        const lineHeight = 35;

        if (this.leaderboard.length === 0) {
            const noScores = this.add.text(width / 2, height / 2, 'No scores yet!\nBe the first!', {
                fontFamily: 'Outfit, sans-serif',
                fontSize: '24px',
                fill: '#aaa',
                align: 'center'
            }).setOrigin(0.5).setScrollFactor(0).setDepth(3000);
            this.leaderboardElements.push(noScores);
        } else {
            this.leaderboard.forEach((entry, i) => {
                const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
                const color = i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : '#ffffff';

                const row = this.add.text(width / 2, startY + i * lineHeight,
                    `${medal} ${entry.name.substring(0, 12).padEnd(12)} ${String(entry.score).padStart(6)}`, {
                    fontFamily: 'monospace',
                    fontSize: '22px',
                    fill: color,
                    stroke: '#000',
                    strokeThickness: 3
                }).setOrigin(0.5).setScrollFactor(0).setDepth(3000);
                this.leaderboardElements.push(row);
            });
        }

        // Close button
        const closeBtn = this.add.text(width / 2, height - 80, '[ Close ]', {
            fontFamily: 'Outfit, sans-serif',
            fontSize: '24px',
            fill: '#88ff88',
            stroke: '#000',
            strokeThickness: 4,
            backgroundColor: '#333',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setScrollFactor(0).setDepth(3000)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.hideLeaderboard());
        this.leaderboardElements.push(closeBtn);
    }

    hideLeaderboard() {
        if (this.leaderboardElements) {
            this.leaderboardElements.forEach(el => el.destroy());
            this.leaderboardElements = null;
        }
        // Only unpause if pause menu is not showing
        if (!this.pauseMenuElements) {
            this.isPaused = false;
            this.physics.resume();
        }
    }

    promptForName(callback) {
        const { width, height } = this.scale;
        this.nameEntryElements = [];

        // Overlay
        const overlay = this.add.rectangle(width / 2, height / 2, width * 3, height * 3, 0x000000, 0.9);
        overlay.setScrollFactor(0).setDepth(3999);
        this.nameEntryElements.push(overlay);

        // Title
        const title = this.add.text(width / 2, height / 2 - 100, '🎉 NEW HIGH SCORE! 🎉', {
            fontFamily: 'Outfit, sans-serif',
            fontSize: '32px',
            fill: '#ffd700',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5).setScrollFactor(0).setDepth(4000);
        this.nameEntryElements.push(title);

        const scoreText = this.add.text(width / 2, height / 2 - 50, `Score: ${this.score}`, {
            fontFamily: 'Outfit, sans-serif',
            fontSize: '28px',
            fill: '#ffffff',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0).setDepth(4000);
        this.nameEntryElements.push(scoreText);

        // Create HTML input for name entry
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter your name';
        input.maxLength = 12;
        input.value = this.playerName;
        input.style.cssText = `
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            padding: 10px 20px;
            border: 3px solid #ffd700;
            border-radius: 8px;
            background: #333;
            color: #fff;
            text-align: center;
            width: 200px;
            z-index: 9999;
        `;
        document.body.appendChild(input);
        input.focus();

        const submitBtn = this.add.text(width / 2, height / 2 + 80, '[ Submit Score ]', {
            fontFamily: 'Outfit, sans-serif',
            fontSize: '24px',
            fill: '#88ff88',
            stroke: '#000',
            strokeThickness: 4,
            backgroundColor: '#333',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setScrollFactor(0).setDepth(4000)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                const name = input.value.trim() || 'Player';
                this.playerName = name;
                localStorage.setItem('superNoePlayerName', name);
                this.addToLeaderboard(name, this.score);
                input.remove();
                this.nameEntryElements.forEach(el => el.destroy());
                this.nameEntryElements = null;
                callback();
            });
        this.nameEntryElements.push(submitBtn);

        // Also submit on Enter key
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                submitBtn.emit('pointerdown');
            }
        });
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

        // Track coins for 100 = 1 life
        this.totalCoins++;
        if (this.totalCoins >= 100) {
            this.totalCoins = 0;
            this.lives++;
            this.updateUI();
            this.showScorePopup(player.x, player.y - 50, '1-UP!');
            this.playSound('finish');
        }
        // Update coin counter display
        if (this.coinCountText) {
            this.coinCountText.setText(`Coins: ${this.totalCoins}/100`);
        }
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

    // Dark ambient music for the secret level
    startDarkAmbience() {
        try {
            if (!this.soundContext) {
                this.soundContext = new (window.AudioContext || window.webkitAudioContext)();
            }

            if (this.soundContext.state === 'suspended') {
                this.soundContext.resume();
            }

            const ctx = this.soundContext;

            // Create a dark, droning ambient sound
            this.darkAmbienceGain = ctx.createGain();
            this.darkAmbienceGain.connect(ctx.destination);
            this.darkAmbienceGain.gain.setValueAtTime(0, ctx.currentTime);
            this.darkAmbienceGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2);

            // Deep bass drone
            this.darkOsc1 = ctx.createOscillator();
            this.darkOsc1.type = 'sine';
            this.darkOsc1.frequency.setValueAtTime(40, ctx.currentTime);
            this.darkOsc1.connect(this.darkAmbienceGain);
            this.darkOsc1.start();

            // Eerie mid tone with slow wobble
            this.darkOsc2 = ctx.createOscillator();
            this.darkOsc2.type = 'triangle';
            this.darkOsc2.frequency.setValueAtTime(80, ctx.currentTime);

            // LFO for eerie wobble
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.frequency.setValueAtTime(0.3, ctx.currentTime);
            lfoGain.gain.setValueAtTime(5, ctx.currentTime);
            lfo.connect(lfoGain);
            lfoGain.connect(this.darkOsc2.frequency);
            lfo.start();

            this.darkOsc2.connect(this.darkAmbienceGain);
            this.darkOsc2.start();

            // High eerie whisper
            this.darkOsc3 = ctx.createOscillator();
            this.darkOsc3.type = 'sine';
            this.darkOsc3.frequency.setValueAtTime(220, ctx.currentTime);
            const highGain = ctx.createGain();
            highGain.gain.setValueAtTime(0.02, ctx.currentTime);
            this.darkOsc3.connect(highGain);
            highGain.connect(this.darkAmbienceGain);
            this.darkOsc3.start();

            // Store LFO for cleanup
            this.darkLfo = lfo;

        } catch (e) {
            console.warn("Dark ambience error:", e);
        }
    }

    stopDarkAmbience() {
        try {
            if (this.darkOsc1) { this.darkOsc1.stop(); this.darkOsc1 = null; }
            if (this.darkOsc2) { this.darkOsc2.stop(); this.darkOsc2 = null; }
            if (this.darkOsc3) { this.darkOsc3.stop(); this.darkOsc3 = null; }
            if (this.darkLfo) { this.darkLfo.stop(); this.darkLfo = null; }
        } catch (e) {
            // Ignore cleanup errors
        }
    }

    createAnimatedPlayer(width, height) {
        // Create player using atlas frame
        const groundY = height - 20;
        this.player = this.physics.add.sprite(100, groundY - 50, 'noe_atlas', 'idle');
        // Scale down ~240px tall sprite to ~48px (0.2 scale)
        this.player.setScale(0.2);
        this.player.setBounce(0); // No bounce - prevents double landing and ground instability
        this.player.setCollideWorldBounds(true);

        // Hitbox for scaled character
        // Body positioned so feet align with bottom of collision box
        this.player.body.setSize(80, 200);
        this.player.body.setOffset(25, 40); // Feet at ground level

        // Ensure gravity is applied
        this.player.body.setGravityY(200); // Additional gravity for snappier feel

        // Generate and add red baseball cap
        this.generateCapTexture();
        this.playerCap = this.add.image(0, 0, 'red_cap');
        this.playerCap.setScale(0.22);
        this.playerCap.setDepth(this.player.depth + 1);

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

        // World bounds based on level length (start at 0 to prevent falling off left side)
        // Bottom extends way below screen so player can fall into pits
        const level = this.getLevelData();
        this.physics.world.setBounds(0, 0, width * level.worldLength, height + 500);
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

    // Player squash effect on landing - visual only, doesn't affect physics
    // We use alpha flash instead of scale to avoid physics body size changes
    squashPlayer() {
        // Quick brightness flash instead of scale squash (scale affects physics body)
        this.tweens.add({
            targets: this.player,
            alpha: 0.7,
            duration: 50,
            yoyo: true,
            ease: 'Power2'
        });
    }

    // Player stretch effect during jump - disabled to prevent physics issues
    stretchPlayer() {
        // Disabled - scale changes affect physics body and cause ground clipping
    }

    // Reset player scale
    resetPlayerScale() {
        // Keep scale constant at 0.2 to prevent physics body size changes
        this.player.setScale(0.2);
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
        this.jumpButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.jumpReleased = true;
            // Variable jump height on mobile - cut velocity if released early
            if (this.isJumping && this.player.body.velocity.y < -200) {
                this.player.setVelocityY(this.player.body.velocity.y * 0.5);
                this.isJumping = false;
            }
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
        // Can jump if on ground OR within coyote time (just left ground)
        const canJump = this.player.body.touching.down || this.coyoteTime > 0;

        if (canJump && this.jumpReleased) {
            // Sprint jump: slightly higher but no horizontal boost (prevents flying)
            if (this.isSprinting) {
                this.player.setVelocityY(-600); // Slightly higher than normal
                // No horizontal boost - prevents the "flying" effect
            } else {
                this.player.setVelocityY(-580); // Normal jump - snappier
            }
            this.isJumping = true;
            this.jumpReleased = false;
            this.coyoteTime = 0; // Used up coyote time
            this.jumpBufferTime = 0;
            this.groundedFrames = 0; // Clear ground stability when jumping
            this.playSound('jump');
        }
    }

    update() {
        // ESC key - close leaderboard first, otherwise toggle pause
        if (this.escKey && Phaser.Input.Keyboard.JustDown(this.escKey)) {
            if (this.leaderboardElements) {
                this.hideLeaderboard();
            } else {
                this.togglePause();
            }
            return;
        }

        // P key - toggle pause
        if (this.pKey && Phaser.Input.Keyboard.JustDown(this.pKey)) {
            this.togglePause();
            return;
        }

        // Leaderboard toggle (L key)
        if (this.lKey && Phaser.Input.Keyboard.JustDown(this.lKey)) {
            if (this.leaderboardElements) {
                this.hideLeaderboard();
            } else {
                this.showLeaderboard();
            }
            return;
        }

        // Don't process game logic while paused
        if (this.isPaused) return;

        // Timer countdown
        if (!this.levelComplete) {
            this.levelTime -= this.game.loop.delta / 1000;

            if (this.levelTime <= 0) {
                // Time's up! Lose a life
                this.levelTime = 120; // Reset timer
                this.lives--;
                this.updateUI();
                this.playSound('hurt');

                if (this.lives <= 0) {
                    this.lives = 3;
                    if (this.checkpointActivated) {
                        this.player.setPosition(this.respawnX, this.respawnY);
                        this.player.setVelocity(0, 0);
                        this.updateUI();
                    } else {
                        // Game over - check for high score before restart
                        if (this.isHighScore(this.score)) {
                            this.promptForName(() => {
                                this.score = 0;
                                this.scene.restart();
                            });
                        } else {
                            this.score = 0;
                            this.scene.restart();
                        }
                        return;
                    }
                } else {
                    this.player.setPosition(this.respawnX, this.respawnY);
                    this.player.setVelocity(0, 0);
                }
            }

            // Update timer display
            const mins = Math.floor(this.levelTime / 60);
            const secs = Math.floor(this.levelTime % 60);
            const timeStr = `TIME: ${mins}:${secs.toString().padStart(2, '0')}`;

            if (this.timerText) {
                this.timerText.setText(timeStr);

                // Warning at 30 seconds
                if (this.levelTime <= 30 && !this.timerWarning) {
                    this.timerWarning = true;
                    this.timerText.setStyle({ fill: '#ff4444' });
                    // Flash effect
                    this.tweens.add({
                        targets: this.timerText,
                        alpha: 0.5,
                        duration: 300,
                        yoyo: true,
                        repeat: -1
                    });
                }
            }
        }

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

            // SECRET LEVEL TRIGGER: Ground pound while falling in Level 3!
            if (this.currentLevel === 2 && this.isGroundPounding && this.fallTimer > 500) {
                // Found the secret! Go to The Abyss (Level 4)
                this.fallTimer = 0;
                this.isGroundPounding = false;
                this.player.setRotation(0);
                this.player.setAlpha(1);

                // Dramatic transition effect
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => {
                    this.currentLevel = 3; // Secret level index
                    localStorage.setItem('superNoeCurrentLevel', '3');
                    this.scene.restart();
                });
                return;
            }

            if (this.fallTimer > 2000) { // 2 seconds
                this.fallTimer = 0;
                this.lives--;
                this.updateUI();
                this.playSound('hurt');

                if (this.lives <= 0) {
                    this.lives = 3;
                    if (this.checkpointActivated) {
                        // Respawn at checkpoint
                        this.player.setPosition(this.respawnX, this.respawnY);
                        this.player.setVelocity(0, 0);
                        this.isInvincible = true;
                        this.player.setAlpha(0.6);
                        this.time.delayedCall(1500, () => {
                            this.isInvincible = false;
                            this.player.setAlpha(1);
                        });
                        this.updateUI();
                    } else {
                        // No checkpoint - game over, check for high score before restart
                        if (this.isHighScore(this.score)) {
                            this.promptForName(() => {
                                this.score = 0;
                                this.scene.restart();
                            });
                        } else {
                            this.score = 0;
                            this.scene.restart();
                        }
                    }
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

            // PC jump with Mario physics
            if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
                this.jumpBufferTime = 6; // Buffer jump input for 6 frames
            }
            if (this.jumpBufferTime > 0 && (isOnGround || this.coyoteTime > 0) && this.jumpReleased) {
                // Sprint jump: slightly higher but no horizontal boost (prevents flying)
                if (this.isSprinting) {
                    this.player.setVelocityY(-600);
                    // No horizontal boost - prevents the "flying" effect
                } else {
                    this.player.setVelocityY(-580);
                }
                this.isJumping = true;
                this.jumpReleased = false;
                this.coyoteTime = 0;
                this.jumpBufferTime = 0;
                this.groundedFrames = 0; // Clear ground stability when jumping
                this.playSound('jump');
            }
        }

        // Mario physics: Track coyote time (can jump shortly after leaving platform)
        // Also track grounded frames for stability
        if (isOnGround) {
            this.coyoteTime = 8; // 8 frames of coyote time
            this.isJumping = false;
            this.groundedFrames = 10; // Stay "stable" for 10 frames after ground contact
        } else {
            this.coyoteTime = Math.max(0, this.coyoteTime - 1);
            this.groundedFrames = Math.max(0, this.groundedFrames - 1);
        }

        // Track jump button release
        if (!this.spaceKey.isDown && !this.isMobile) {
            this.jumpReleased = true;
        }

        // Decrement jump buffer
        this.jumpBufferTime = Math.max(0, this.jumpBufferTime - 1);

        // Mario physics: Variable jump height - cut velocity when releasing early
        if (this.isJumping && !this.spaceKey.isDown && this.player.body.velocity.y < -200) {
            this.player.setVelocityY(this.player.body.velocity.y * 0.5); // Cut upward velocity
            this.isJumping = false;
        }

        // Ground pound mechanic - press down while in air to slam down
        if (!isOnGround && this.cursors.down.isDown && !this.isGroundPounding && this.player.body.velocity.y > -100) {
            this.isGroundPounding = true;
            this.groundPoundTimer = 0;
            this.player.setVelocityY(600); // Fast downward slam
            this.player.setVelocityX(0); // Stop horizontal movement completely for maximum butt bomb
        }

        // Update ground pound timer and cancel after 1 second
        if (this.isGroundPounding) {
            this.groundPoundTimer += this.game.loop.delta;
            if (this.groundPoundTimer > 1000) {
                // Cancel ground pound after 1 second
                this.isGroundPounding = false;
                this.groundPoundTimer = 0;
                this.player.setRotation(0);
                this.player.setAlpha(1);
            }
        }

        // Reset ground pound when landing
        if (isOnGround && this.isGroundPounding) {
            this.isGroundPounding = false;
            this.groundPoundTimer = 0;
            // Reset rotation and alpha from ass bomb pose
            this.player.setRotation(0);
            // BIG landing impact effect
            this.shakeCamera(0.02, 200);
            if (this.dustEmitter) {
                // Lots of dust!
                this.dustEmitter.emitParticleAt(this.player.x - 20, this.player.y + 20, 8);
                this.dustEmitter.emitParticleAt(this.player.x, this.player.y + 20, 10);
                this.dustEmitter.emitParticleAt(this.player.x + 20, this.player.y + 20, 8);
            }
            // Flash on landing for comedic effect (no scaling - breaks physics!)
            this.player.setAlpha(1);
            this.tweens.add({
                targets: this.player,
                alpha: 0.5,
                duration: 80,
                yoyo: true,
                ease: 'Power2'
            });
            this.playSound('land');
        }

        // Mario physics: Faster falling - ONLY when truly in the air
        // Use groundedFrames to prevent jitter right after landing
        const isStableOnGround = isOnGround || this.groundedFrames > 0;
        if (!isStableOnGround) {
            const maxFallSpeed = 600;
            if (this.player.body.velocity.y > 0) {
                this.player.body.velocity.y += 8;
                if (this.player.body.velocity.y > maxFallSpeed) {
                    this.player.body.velocity.y = maxFallSpeed;
                }
            } else if (this.player.body.velocity.y < 0 && !this.spaceKey.isDown) {
                this.player.body.velocity.y += 5;
            }
        }

        // Flip sprite
        this.player.setFlipX(this.lastDirection === 'left');

        // Ground pound "ass bomb" pose - rotation only (scaling breaks physics!)
        if (this.isGroundPounding) {
            // Wobbling spin while falling butt-first - looks hilarious!
            const wobble = Math.sin(this.groundPoundTimer * 0.03) * 0.4;
            const spin = Math.sin(this.groundPoundTimer * 0.015) * 0.5;
            this.player.setRotation(Math.PI + wobble + spin); // Upside down with crazy wobble!
            // Flashing alpha for extra effect instead of scaling
            this.player.setAlpha(0.8 + Math.sin(this.groundPoundTimer * 0.05) * 0.2);
        }
        // Sprint leaning
        else if (isMoving && this.isSprinting && this.player.body.touching.down) {
            this.player.setRotation(this.lastDirection === 'left' ? -0.2 : 0.2);
        } else {
            this.player.setRotation(0);
        }

        // Animations
        if (this.isGroundPounding) {
            // Keep jump frame during ground pound
            this.player.anims.play('jump', true);
        } else if (!this.player.body.touching.down) {
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
        if (isOnGround && this.wasInAir && this.lastYVelocity > 100) {
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

        // Update cap position to follow player's head
        if (this.playerCap) {
            const capOffsetX = this.lastDirection === 'right' ? 2 : -2;
            this.playerCap.setPosition(this.player.x + capOffsetX, this.player.y - 18);
            this.playerCap.setFlipX(this.lastDirection === 'left');
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

    generateMysteryBlockTexture() {
        const g = this.make.graphics();
        const s = 40;

        // Block body (golden/orange)
        g.fillStyle(0xd4a017, 1);
        g.fillRect(0, 0, s, s);

        // Border
        g.lineStyle(3, 0x8b6914, 1);
        g.strokeRect(0, 0, s, s);

        // Question mark
        g.fillStyle(0xffffff, 1);
        // Top of ?
        g.fillRoundedRect(12, 8, 16, 6, 2);
        g.fillRect(22, 10, 6, 10);
        g.fillRoundedRect(12, 16, 16, 6, 2);
        g.fillRect(12, 18, 6, 6);
        // Dot
        g.fillRect(14, 28, 6, 6);

        // Shine
        g.fillStyle(0xffeb3b, 0.5);
        g.fillRect(4, 4, 8, 8);

        g.generateTexture('mystery_block', s, s);
        g.destroy();

        // Used block (grey)
        const g2 = this.make.graphics();
        g2.fillStyle(0x666666, 1);
        g2.fillRect(0, 0, s, s);
        g2.lineStyle(3, 0x444444, 1);
        g2.strokeRect(0, 0, s, s);
        g2.generateTexture('mystery_block_used', s, s);
        g2.destroy();
    }

    generateMushroomTexture() {
        const g = this.make.graphics();
        const w = 32, h = 32;

        // Stem
        g.fillStyle(0xf5f5dc, 1);
        g.fillRect(10, 18, 12, 14);

        // Cap
        g.fillStyle(0xff0000, 1);
        g.fillEllipse(16, 14, 28, 20);

        // White spots
        g.fillStyle(0xffffff, 1);
        g.fillCircle(8, 12, 4);
        g.fillCircle(16, 8, 5);
        g.fillCircle(24, 12, 4);

        // Eyes
        g.fillStyle(0x000000, 1);
        g.fillCircle(12, 16, 2);
        g.fillCircle(20, 16, 2);

        g.generateTexture('mushroom', w, h);
        g.destroy();
    }

    generateStarTexture() {
        const g = this.make.graphics();
        const s = 32;

        // Star shape (5-pointed)
        g.fillStyle(0xffd700, 1);
        g.beginPath();
        for (let i = 0; i < 5; i++) {
            const outerAngle = (i * 72 - 90) * Math.PI / 180;
            const innerAngle = ((i * 72) + 36 - 90) * Math.PI / 180;
            const outerX = 16 + Math.cos(outerAngle) * 14;
            const outerY = 16 + Math.sin(outerAngle) * 14;
            const innerX = 16 + Math.cos(innerAngle) * 6;
            const innerY = 16 + Math.sin(innerAngle) * 6;
            if (i === 0) g.moveTo(outerX, outerY);
            else g.lineTo(outerX, outerY);
            g.lineTo(innerX, innerY);
        }
        g.closePath();
        g.fillPath();

        // Inner glow
        g.fillStyle(0xffeb3b, 1);
        g.fillCircle(16, 16, 6);

        // Eyes
        g.fillStyle(0x000000, 1);
        g.fillCircle(13, 15, 2);
        g.fillCircle(19, 15, 2);

        g.generateTexture('star_powerup', s, s);
        g.destroy();
    }

    generateHeartTexture() {
        const g = this.make.graphics();
        const s = 28;

        // Heart shape (1-Up)
        g.fillStyle(0x00ff00, 1);
        g.fillCircle(9, 10, 8);
        g.fillCircle(19, 10, 8);
        g.beginPath();
        g.moveTo(1, 12);
        g.lineTo(14, 26);
        g.lineTo(27, 12);
        g.closePath();
        g.fillPath();

        // Shine
        g.fillStyle(0x80ff80, 1);
        g.fillCircle(8, 8, 3);

        // "1UP" text effect - small plus
        g.fillStyle(0xffffff, 1);
        g.fillRect(12, 10, 4, 10);
        g.fillRect(9, 13, 10, 4);

        g.generateTexture('heart_1up', s, s);
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

    createMysteryBlocks(width, height) {
        const level = this.getLevelData();
        const groundY = height - 20;

        this.mysteryBlocks = this.physics.add.staticGroup();

        if (level.mysteryBlocks) {
            level.mysteryBlocks.forEach(block => {
                const b = this.mysteryBlocks.create(block.x, groundY - block.yOffset, 'mystery_block');
                b.setData('contents', block.contents);
                b.setData('used', false);

                // Subtle floating animation
                this.tweens.add({
                    targets: b,
                    y: b.y - 3,
                    duration: 800,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            });
        }

        // Collision from below triggers the block
        this.physics.add.collider(this.player, this.mysteryBlocks, this.hitMysteryBlock, null, this);
    }

    createPowerupGroup() {
        this.powerups = this.physics.add.group();
        this.physics.add.collider(this.powerups, this.platforms);
        this.physics.add.overlap(this.player, this.powerups, this.collectPowerup, null, this);
    }

    hitMysteryBlock(player, block) {
        // Trigger if hitting from below OR ground pounding from above
        const hitFromBelow = player.body.touching.up && block.body.touching.down;
        const groundPoundFromAbove = player.body.touching.down && block.body.touching.up && this.isGroundPounding;

        if ((hitFromBelow || groundPoundFromAbove) && !block.getData('used')) {
            block.setData('used', true);
            block.setTexture('mystery_block_used');

            // Stop floating animation
            this.tweens.killTweensOf(block);

            // Different animation based on hit direction
            if (groundPoundFromAbove) {
                // Squash animation when stomped
                this.tweens.add({
                    targets: block,
                    y: block.y + 6,
                    duration: 80,
                    yoyo: true,
                    ease: 'Power2'
                });
                // Spawn contents below the block
                const contents = block.getData('contents');
                this.spawnPowerup(block.x, block.y + 40, contents, true); // true = drop down
            } else {
                // Bump animation when hit from below
                this.tweens.add({
                    targets: block,
                    y: block.y - 8,
                    duration: 80,
                    yoyo: true,
                    ease: 'Power2'
                });
                // Spawn contents above the block
                const contents = block.getData('contents');
                this.spawnPowerup(block.x, block.y - 30, contents, false);
            }
            this.playSound('coin');
        }
    }

    spawnPowerup(x, y, type, dropDown = false) {
        let powerup;

        if (type === 'coins') {
            // Spawn 5 coins
            for (let i = 0; i < 5; i++) {
                const coin = this.coins.create(x + (i - 2) * 20, y, 'coin');
                coin.setBounce(0.5);
                if (dropDown) {
                    // Coins fall down when block is stomped
                    coin.setVelocityY(100 + Math.random() * 100);
                } else {
                    // Coins pop up when block is hit from below
                    coin.setVelocityY(-200 - Math.random() * 100);
                }
                coin.setVelocityX((i - 2) * 40);
            }
            return;
        }

        const textureMap = {
            'mushroom': 'mushroom',
            'star': 'star_powerup',
            'heart': 'heart_1up'
        };

        powerup = this.powerups.create(x, y, textureMap[type]);
        powerup.setData('type', type);
        powerup.setBounce(0.4);

        if (dropDown) {
            // Items fall down when block is stomped
            powerup.setVelocityY(100);
        } else {
            // Items pop up when block is hit from below
            powerup.setVelocityY(-150);
        }

        // Mushroom and star move sideways
        if (type === 'mushroom' || type === 'star') {
            powerup.setVelocityX(80);
        }

        // Floating animation for heart
        if (type === 'heart') {
            powerup.body.setAllowGravity(false);
            this.tweens.add({
                targets: powerup,
                y: y + (dropDown ? 20 : -20),
                duration: 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }

    collectPowerup(player, powerup) {
        const type = powerup.getData('type');
        powerup.destroy();

        switch (type) {
            case 'mushroom':
                this.applyMushroom();
                break;
            case 'star':
                this.applyStar();
                break;
            case 'heart':
                this.applyHeart();
                break;
        }
    }

    applyMushroom() {
        if (this.isPoweredUp) {
            // Already big - give points instead
            this.updateScore(500);
            this.showScorePopup(this.player.x, this.player.y - 30, 500);
        } else {
            this.isPoweredUp = true;
            // Grow bigger
            this.tweens.add({
                targets: this.player,
                scaleX: 0.28,
                scaleY: 0.28,
                duration: 300,
                ease: 'Back.easeOut'
            });
            if (this.playerCap) {
                this.tweens.add({
                    targets: this.playerCap,
                    scaleX: 0.3,
                    scaleY: 0.3,
                    duration: 300,
                    ease: 'Back.easeOut'
                });
            }
            this.showScorePopup(this.player.x, this.player.y - 30, 'POWER UP!');
        }
        this.playSound('coin');
    }

    applyStar() {
        this.isStarPowered = true;
        this.isInvincible = true;

        // Rainbow flashing effect
        this.starTween = this.tweens.add({
            targets: this.player,
            tint: { from: 0xff0000, to: 0x00ff00 },
            duration: 100,
            yoyo: true,
            repeat: -1
        });

        // Clear after 8 seconds
        if (this.starTimer) this.starTimer.remove();
        this.starTimer = this.time.delayedCall(8000, () => {
            this.isStarPowered = false;
            this.isInvincible = false;
            if (this.starTween) this.starTween.stop();
            this.player.clearTint();
        });

        this.showScorePopup(this.player.x, this.player.y - 30, 'STAR POWER!');
        this.playSound('coin');
    }

    applyHeart() {
        this.lives++;
        this.updateUI();
        this.showScorePopup(this.player.x, this.player.y - 30, '1-UP!');
        this.playSound('finish');
    }

    // Called when player takes damage while powered up
    shrinkPlayer() {
        if (this.isPoweredUp) {
            this.isPoweredUp = false;
            this.tweens.add({
                targets: this.player,
                scaleX: 0.2,
                scaleY: 0.2,
                duration: 200,
                ease: 'Power2'
            });
            if (this.playerCap) {
                this.tweens.add({
                    targets: this.playerCap,
                    scaleX: 0.22,
                    scaleY: 0.22,
                    duration: 200,
                    ease: 'Power2'
                });
            }
            // Brief invincibility after shrinking
            this.isInvincible = true;
            this.player.setAlpha(0.6);
            this.time.delayedCall(1500, () => {
                this.isInvincible = false;
                this.player.setAlpha(1);
            });
            return true; // Damage absorbed
        }
        return false; // No protection
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
                    // Game complete - check for high score
                    if (this.isHighScore(this.score)) {
                        this.promptForName(() => {
                            this.currentLevel = 0;
                            this.score = 0;
                            localStorage.setItem('superNoeCurrentLevel', '0');
                            this.scene.restart();
                        });
                    } else {
                        this.currentLevel = 0;
                        this.score = 0;
                        localStorage.setItem('superNoeCurrentLevel', '0');
                        this.scene.restart();
                    }
                } else {
                    // Advance to next level (keep score!)
                    this.currentLevel++;
                    localStorage.setItem('superNoeCurrentLevel', this.currentLevel.toString());
                    this.scene.restart();
                }
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
