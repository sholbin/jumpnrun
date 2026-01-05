extends CharacterBody2D

@export var patrol_distance: float = 80.0
@export var speed: float = 60.0

var start_x: float
var direction: int = 1

@onready var sprite = $Sprite
@onready var stomp_area = $StompArea

signal stomped

func _ready():
	start_x = global_position.x
	
	# Set up collision shapes
	var body_shape = CapsuleShape2D.new()
	body_shape.radius = 14
	body_shape.height = 20
	$CollisionShape.shape = body_shape
	$CollisionShape.position.y = 2
	$CollisionShape.rotation = PI / 2
	
	var stomp_shape = RectangleShape2D.new()
	stomp_shape.size = Vector2(28, 8)
	$StompArea/StompShape.shape = stomp_shape
	
	stomp_area.body_entered.connect(_on_stomp)

func _physics_process(delta):
	# Apply gravity
	if not is_on_floor():
		velocity.y += 1000 * delta
	
	# Patrol movement
	velocity.x = direction * speed
	
	move_and_slide()
	
	# Reverse at patrol bounds
	if global_position.x >= start_x + patrol_distance:
		direction = -1
		sprite.flip_h = true
	elif global_position.x <= start_x - patrol_distance:
		direction = 1
		sprite.flip_h = false

func _on_stomp(body):
	if body.has_method("stomp_bounce"):
		# Only count as stomp if player is falling
		if body.velocity.y > 0 and body.global_position.y < global_position.y:
			body.stomp_bounce()
			die()

func die():
	emit_signal("stomped")
	# Pop animation
	var tween = create_tween()
	tween.tween_property(sprite, "scale", Vector2(2.0, 0.3), 0.15)
	tween.parallel().tween_property(sprite, "modulate:a", 0.0, 0.15)
	tween.tween_callback(queue_free)

func hit_player(body):
	if body.has_method("take_damage"):
		body.take_damage()
