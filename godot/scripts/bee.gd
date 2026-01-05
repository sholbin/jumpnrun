extends Area2D

@export var horizontal_range: float = 200.0
@export var vertical_range: float = 40.0

var start_position: Vector2
var time: float = 0.0

@onready var sprite = $Sprite

func _ready():
	start_position = global_position
	
	# Set up collision shape
	var shape = CircleShape2D.new()
	shape.radius = 16
	$CollisionShape.shape = shape
	
	body_entered.connect(_on_body_entered)

func _process(delta):
	time += delta
	
	# Sine wave movement
	global_position.x = start_position.x + sin(time) * horizontal_range
	global_position.y = start_position.y + sin(time * 2) * vertical_range
	
	# Face movement direction
	sprite.flip_h = cos(time) < 0

func _on_body_entered(body):
	if body.has_method("take_damage"):
		body.take_damage()
