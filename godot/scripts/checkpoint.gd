extends Area2D

var activated: bool = false

@onready var flag = $Flag

signal checkpoint_activated(position)

func _ready():
	var shape = RectangleShape2D.new()
	shape.size = Vector2(30, 70)
	$CollisionShape.shape = shape
	
	body_entered.connect(_on_body_entered)

func _on_body_entered(body):
	if body.is_in_group("player") and not activated:
		activate()

func activate():
	activated = true
	emit_signal("checkpoint_activated", global_position)
	
	# Change flag color to green
	flag.color = Color(0, 1, 0)
	
	# Scale animation
	var tween = create_tween()
	tween.tween_property(self, "scale", Vector2(1.3, 1.3), 0.2)
	tween.tween_property(self, "scale", Vector2(1.0, 1.0), 0.2)
