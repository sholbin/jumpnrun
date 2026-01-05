extends Area2D

var start_y: float
var time: float = 0.0

@onready var sprite = $Sprite
@onready var particles = $SparkleParticles

signal collected(amount)

func _ready():
	start_y = global_position.y
	
	# Set up collision shape
	var shape = CircleShape2D.new()
	shape.radius = 10
	$CollisionShape.shape = shape
	
	body_entered.connect(_on_body_entered)

func _process(delta):
	# Floating animation
	time += delta
	global_position.y = start_y + sin(time * 2) * 5

func _on_body_entered(body):
	if body.is_in_group("player"):
		collect()

func collect():
	emit_signal("collected", 10)
	
	# Disable collision
	set_deferred("monitoring", false)
	
	# Sparkle and scale up animation
	if particles:
		particles.emitting = true
	
	var tween = create_tween()
	tween.tween_property(sprite, "scale", Vector2(1.5, 1.5), 0.15)
	tween.parallel().tween_property(sprite, "modulate:a", 0.0, 0.15)
	tween.tween_callback(queue_free)
