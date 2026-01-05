extends Node2D

# Game state
var score: int = 0
var lives: int = 3
var high_score: int = 0
var checkpoint_position: Vector2 = Vector2(100, 500)
var checkpoint_activated: bool = false
var level_complete: bool = false

# References
@onready var player = $Player
@onready var platforms_container = $Platforms
@onready var enemies_container = $Enemies
@onready var coins_container = $Coins
@onready var hazards_container = $Hazards
@onready var score_label = $UI/ScoreLabel
@onready var lives_label = $UI/LivesLabel
@onready var damage_flash = $UI/DamageFlash

# Preloads
var slime_scene = preload("res://scenes/slime.tscn")
var bee_scene = preload("res://scenes/bee.tscn")
var coin_scene = preload("res://scenes/coin.tscn")
var checkpoint_scene = preload("res://scenes/checkpoint.tscn")
var finish_scene = preload("res://scenes/finish_line.tscn")

func _ready():
	# Load high score
	high_score = 0  # Could load from file
	
	# Connect player signals
	player.player_hurt.connect(_on_player_hurt)
	player.player_died.connect(_on_player_died)
	player.enemy_stomped.connect(_on_enemy_stomped)
	player.add_to_group("player")
	
	# Generate level
	generate_platforms()
	generate_enemies()
	generate_coins()
	generate_hazards()
	generate_checkpoints()
	
	update_ui()

func _process(_delta):
	# Restart shortcut
	if Input.is_action_just_pressed("restart"):
		restart_game()
	
	# Fall death check
	if player.global_position.y > 800:
		_on_player_hurt()

func generate_platforms():
	var ground_y = 680
	var platform_width = 80
	
	# Lava pit positions (must create gaps)
	var lava_positions = [1.2, 2.0, 3.0]
	var screen_width = 1280
	
	# Ground platforms
	for x in range(-100, screen_width * 4, platform_width - 1):
		var is_in_lava = false
		for lava_x in lava_positions:
			if abs(x - lava_x * screen_width) < 60:
				is_in_lava = true
				break
		
		if not is_in_lava:
			create_platform(Vector2(x, ground_y), Vector2(platform_width, 40))
	
	# Floating platforms
	var floats = [
		Vector2(180, ground_y - 80),
		Vector2(320, ground_y - 160),
		Vector2(480, ground_y - 80),
		Vector2(650, ground_y - 100),
		Vector2(820, ground_y - 180),
		Vector2(1000, ground_y - 100),
		Vector2(1200, ground_y - 80),
		Vector2(1380, ground_y - 160),
		Vector2(1560, ground_y - 240),
		Vector2(1750, ground_y - 160),
		Vector2(1920, ground_y - 80),
	]
	
	for pos in floats:
		create_platform(pos, Vector2(80, 40))

func create_platform(pos: Vector2, size: Vector2):
	var platform = StaticBody2D.new()
	platform.position = pos
	platform.collision_layer = 2
	
	var shape = CollisionShape2D.new()
	var rect = RectangleShape2D.new()
	rect.size = size
	shape.shape = rect
	platform.add_child(shape)
	
	# Visual
	var sprite = ColorRect.new()
	sprite.size = size
	sprite.position = -size / 2
	sprite.color = Color(0.137, 0.545, 0.137)  # Green grass
	platform.add_child(sprite)
	
	# Dirt layer
	var dirt = ColorRect.new()
	dirt.size = Vector2(size.x, size.y * 0.6)
	dirt.position = Vector2(-size.x / 2, -size.y / 2 + size.y * 0.4)
	dirt.color = Color(0.545, 0.271, 0.075)  # Brown
	platform.add_child(dirt)
	
	platforms_container.add_child(platform)

func generate_enemies():
	var ground_y = 680
	
	# Slimes
	var slime_data = [
		{"x": 500, "y": ground_y - 30, "patrol": 80},
		{"x": 900, "y": ground_y - 30, "patrol": 100},
		{"x": 320, "y": ground_y - 190, "patrol": 60},
		{"x": 1380, "y": ground_y - 190, "patrol": 80},
	]
	
	for data in slime_data:
		var slime = slime_scene.instantiate()
		slime.position = Vector2(data.x, data.y)
		slime.patrol_distance = data.patrol
		slime.stomped.connect(func(): add_score(100))
		enemies_container.add_child(slime)
	
	# Bees
	var bee_data = [
		{"x": 1280 * 1.3, "y": 720 * 0.3, "range": 200},
		{"x": 1280 * 2.0, "y": 720 * 0.25, "range": 150},
	]
	
	for data in bee_data:
		var bee = bee_scene.instantiate()
		bee.position = Vector2(data.x, data.y)
		bee.horizontal_range = data.range
		enemies_container.add_child(bee)

func generate_coins():
	var screen_width = 1280
	var screen_height = 720
	
	var coin_positions = [
		Vector2(screen_width * 0.4, screen_height * 0.53),
		Vector2(screen_width * 0.43, screen_height * 0.53),
		Vector2(screen_width * 0.75, screen_height * 0.43),
		Vector2(screen_width * 0.78, screen_height * 0.43),
		Vector2(screen_width * 0.15, screen_height * 0.31),
		Vector2(screen_width * 1.1, screen_height * 0.48),
		Vector2(screen_width * 1.5, screen_height * 0.33),
		Vector2(screen_width * 1.9, screen_height * 0.43),
		Vector2(screen_width * 2.3, screen_height * 0.35),
		Vector2(screen_width * 0.6, screen_height - 60),
		Vector2(screen_width * 0.8, screen_height - 60),
		Vector2(screen_width * 1.0, screen_height - 60),
	]
	
	for pos in coin_positions:
		var coin = coin_scene.instantiate()
		coin.position = pos
		coin.collected.connect(func(amount): add_score(amount); show_score_popup(pos, amount))
		coins_container.add_child(coin)

func generate_hazards():
	var ground_y = 680
	var screen_width = 1280
	
	# Spikes
	var spike_positions = [
		Vector2(screen_width * 0.8, ground_y - 16),
		Vector2(screen_width * 1.5, ground_y - 16),
		Vector2(screen_width * 2.5, ground_y - 16),
	]
	
	for pos in spike_positions:
		create_hazard(pos, Vector2(32, 32), Color(0.62, 0.62, 0.62))
	
	# Lava
	var lava_positions = [screen_width * 1.2, screen_width * 2.0, screen_width * 3.0]
	for lava_x in lava_positions:
		create_hazard(Vector2(lava_x, ground_y + 10), Vector2(120, 40), Color(1, 0.27, 0), true)

func create_hazard(pos: Vector2, size: Vector2, color: Color, is_lava: bool = false):
	var hazard = Area2D.new()
	hazard.position = pos
	hazard.collision_layer = 8
	hazard.collision_mask = 1
	
	var shape = CollisionShape2D.new()
	var rect = RectangleShape2D.new()
	rect.size = size
	shape.shape = rect
	hazard.add_child(shape)
	
	var sprite = ColorRect.new()
	sprite.size = size
	sprite.position = -size / 2
	sprite.color = color
	hazard.add_child(sprite)
	
	hazard.body_entered.connect(func(body):
		if body == player:
			if is_lava:
				lives = 0
			_on_player_hurt()
	)
	
	hazards_container.add_child(hazard)

func add_score(amount: int):
	score += amount
	if score > high_score:
		high_score = score
	update_ui()

func show_score_popup(pos: Vector2, amount: int):
	var popup = Label.new()
	popup.text = "+%d" % amount
	popup.position = pos - Vector2(20, 30)
	popup.add_theme_font_size_override("font_size", 18 if amount < 100 else 24)
	popup.add_theme_color_override("font_color", Color.WHITE if amount < 100 else Color.YELLOW)
	popup.add_theme_color_override("font_outline_color", Color.BLACK)
	popup.add_theme_constant_override("outline_size", 3)
	add_child(popup)
	
	var tween = create_tween()
	tween.tween_property(popup, "position:y", pos.y - 80, 0.8)
	tween.parallel().tween_property(popup, "modulate:a", 0.0, 0.8)
	tween.tween_callback(popup.queue_free)

func _on_player_hurt():
	lives -= 1
	update_ui()
	
	# Camera shake
	shake_camera()
	flash_screen()
	pulse_hearts()
	
	if lives <= 0:
		player.die()
		await get_tree().create_timer(1.5).timeout
		restart_game()
	else:
		player.take_damage()
		player.global_position = checkpoint_position

func _on_player_died():
	pass  # Handled in _on_player_hurt

func _on_enemy_stomped(points: int):
	add_score(points)

func shake_camera():
	var camera = player.get_node("Camera2D")
	if camera:
		var tween = create_tween()
		tween.tween_property(camera, "offset", Vector2(5, 0), 0.05)
		tween.tween_property(camera, "offset", Vector2(-5, 0), 0.05)
		tween.tween_property(camera, "offset", Vector2(0, 5), 0.05)
		tween.tween_property(camera, "offset", Vector2(0, 0), 0.05)

func flash_screen():
	damage_flash.visible = true
	damage_flash.modulate.a = 0.6
	var tween = create_tween()
	tween.tween_property(damage_flash, "modulate:a", 0.0, 0.15)
	tween.tween_callback(func(): damage_flash.visible = false)

func pulse_hearts():
	var tween = create_tween()
	tween.tween_property(lives_label, "scale", Vector2(1.3, 1.3), 0.1)
	tween.tween_property(lives_label, "scale", Vector2(1.0, 1.0), 0.1)
	lives_label.add_theme_color_override("font_color", Color.RED)
	await get_tree().create_timer(0.3).timeout
	lives_label.add_theme_color_override("font_color", Color.WHITE)

func update_ui():
	score_label.text = "Score: %d" % score
	var hearts = ""
	for i in range(lives):
		hearts += "❤️"
	lives_label.text = "Lives: %s" % hearts

func restart_game():
	score = 0
	lives = 3
	checkpoint_activated = false
	checkpoint_position = Vector2(100, 500)
	get_tree().reload_current_scene()

func generate_checkpoints():
	var screen_width = 1280
	var ground_y = 680
	
	# Checkpoint at middle of level
	var checkpoint = checkpoint_scene.instantiate()
	checkpoint.position = Vector2(screen_width * 1.8, ground_y - 40)
	checkpoint.checkpoint_activated.connect(_on_checkpoint_activated)
	add_child(checkpoint)
	
	# Finish line near end
	var finish = finish_scene.instantiate()
	finish.position = Vector2(screen_width * 3.5, ground_y - 60)
	finish.level_complete.connect(_on_level_complete)
	add_child(finish)

func _on_checkpoint_activated(pos: Vector2):
	checkpoint_activated = true
	checkpoint_position = pos - Vector2(0, 40)
	
	# Show checkpoint text
	var text = Label.new()
	text.text = "✓ CHECKPOINT!"
	text.position = player.global_position - Vector2(80, 100)
	text.add_theme_font_size_override("font_size", 32)
	text.add_theme_color_override("font_color", Color.GREEN)
	text.add_theme_color_override("font_outline_color", Color.BLACK)
	text.add_theme_constant_override("outline_size", 6)
	add_child(text)
	
	var tween = create_tween()
	tween.tween_property(text, "position:y", text.position.y - 50, 1.5)
	tween.parallel().tween_property(text, "modulate:a", 0.0, 1.5)
	tween.tween_callback(text.queue_free)

func _on_level_complete(_score: int):
	if level_complete:
		return
	level_complete = true
	
	# Pause player
	player.set_physics_process(false)
	
	# Camera zoom
	var camera = player.get_node("Camera2D")
	if camera:
		var tween = create_tween()
		tween.tween_property(camera, "zoom", Vector2(1.2, 1.2), 0.8)
	
	# Show complete text
	var complete_text = Label.new()
	complete_text.text = "LEVEL COMPLETE!"
	complete_text.position = player.global_position - Vector2(180, 150)
	complete_text.add_theme_font_size_override("font_size", 40)
	complete_text.add_theme_color_override("font_color", Color.GOLD)
	complete_text.add_theme_color_override("font_outline_color", Color.BLACK)
	complete_text.add_theme_constant_override("outline_size", 8)
	add_child(complete_text)
	
	var score_text = Label.new()
	score_text.text = "Final Score: %d" % score
	score_text.position = player.global_position - Vector2(120, 80)
	score_text.add_theme_font_size_override("font_size", 28)
	score_text.add_theme_color_override("font_color", Color.WHITE)
	score_text.add_theme_color_override("font_outline_color", Color.BLACK)
	score_text.add_theme_constant_override("outline_size", 4)
	add_child(score_text)
	
	var restart_text = Label.new()
	restart_text.text = "Press R to play again"
	restart_text.position = player.global_position - Vector2(100, 20)
	restart_text.add_theme_font_size_override("font_size", 20)
	restart_text.add_theme_color_override("font_color", Color(0.67, 1, 0.67))
	restart_text.add_theme_color_override("font_outline_color", Color.BLACK)
	restart_text.add_theme_constant_override("outline_size", 3)
	add_child(restart_text)
	
	# Blink restart text
	var blink_tween = create_tween().set_loops()
	blink_tween.tween_property(restart_text, "modulate:a", 0.5, 0.7)
	blink_tween.tween_property(restart_text, "modulate:a", 1.0, 0.7)

