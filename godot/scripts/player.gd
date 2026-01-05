extends CharacterBody2D

# Movement constants
const NORMAL_SPEED = 220.0
const SPRINT_SPEED = 400.0
const JUMP_VELOCITY = -520.0
const SPRINT_JUMP_VELOCITY = -600.0
const GRAVITY = 1000.0
const AIR_CONTROL = 0.6
const AIR_DRAG = 0.92

# State
var is_sprinting = false
var last_direction = 1  # 1 = right, -1 = left
var was_in_air = false
var last_y_velocity = 0.0
var is_invincible = false

# Nodes
@onready var sprite = $Sprite
@onready var dust_particles = $DustParticles
@onready var camera = $Camera2D

# Signals
signal coin_collected(amount)
signal enemy_stomped(points)
signal player_hurt
signal player_died

func _ready():
	# Set up collision shape
	var shape = CapsuleShape2D.new()
	shape.radius = 10
	shape.height = 30
	$CollisionShape.shape = shape
	$CollisionShape.position.y = 5

func _physics_process(delta):
	# Gravity
	if not is_on_floor():
		velocity.y += GRAVITY * delta
	
	# Sprint check
	is_sprinting = Input.is_action_pressed("sprint")
	var speed = SPRINT_SPEED if is_sprinting else NORMAL_SPEED
	
	# Horizontal movement
	var direction = Input.get_axis("move_left", "move_right")
	
	if direction != 0:
		last_direction = sign(direction)
		if is_on_floor():
			velocity.x = direction * speed
		else:
			# Air control
			velocity.x += direction * speed * AIR_CONTROL * delta * 10
			velocity.x = clamp(velocity.x, -speed, speed)
	else:
		if is_on_floor():
			velocity.x = move_toward(velocity.x, 0, speed * 0.2)
		else:
			velocity.x *= AIR_DRAG
	
	# Jump
	if Input.is_action_just_pressed("jump") and is_on_floor():
		if is_sprinting:
			velocity.y = SPRINT_JUMP_VELOCITY
			velocity.x += last_direction * 80
		else:
			velocity.y = JUMP_VELOCITY
		play_sound("jump")
	
	# Store velocity before move for landing detection
	last_y_velocity = velocity.y
	
	move_and_slide()
	
	# Landing effects
	var is_grounded = is_on_floor()
	if is_grounded and was_in_air and last_y_velocity > 50:
		emit_dust()
		squash_player()
		play_sound("land")
	was_in_air = not is_grounded
	
	# Sprite direction
	sprite.flip_h = last_direction < 0
	
	# Sprint lean
	if direction != 0 and is_sprinting and is_grounded:
		sprite.rotation = last_direction * 0.2
	else:
		sprite.rotation = 0
	
	# Squash/stretch
	if not is_grounded and velocity.y < -100:
		stretch_player()
	elif is_grounded:
		reset_scale()
	
	# Sprint dust trail
	if is_grounded and is_sprinting and direction != 0:
		if randf() < 0.15:
			emit_dust(2)

func emit_dust(count: int = 6):
	if dust_particles:
		dust_particles.amount = count
		dust_particles.restart()
		dust_particles.emitting = true

func squash_player():
	var tween = create_tween()
	tween.tween_property(sprite, "scale", Vector2(0.25, 0.16), 0.08)
	tween.tween_property(sprite, "scale", Vector2(0.2, 0.2), 0.08)

func stretch_player():
	sprite.scale = Vector2(0.18, 0.23)

func reset_scale():
	sprite.scale = sprite.scale.lerp(Vector2(0.2, 0.2), 0.2)

func play_sound(type: String):
	# Sound will be handled by game manager
	pass

func take_damage():
	if is_invincible:
		return
	
	emit_signal("player_hurt")
	is_invincible = true
	
	# Flash effect
	var tween = create_tween()
	tween.tween_property(sprite, "modulate", Color(1, 0.8, 0.8, 0.6), 0.1)
	
	# Knockback
	velocity.y = -300
	
	# Reset invincibility after delay
	await get_tree().create_timer(1.5).timeout
	is_invincible = false
	sprite.modulate = Color.WHITE

func die():
	emit_signal("player_died")

func stomp_bounce():
	velocity.y = -400
	emit_signal("enemy_stomped", 100)
