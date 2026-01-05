extends Area2D

var reached: bool = false

@onready var confetti = $ConfettiParticles

signal level_complete(score)

func _ready():
	var shape = RectangleShape2D.new()
	shape.size = Vector2(60, 120)
	$CollisionShape.shape = shape
	
	body_entered.connect(_on_body_entered)
	
	# Floating animation
	var tween = create_tween().set_loops()
	tween.tween_property(self, "position:y", position.y - 5, 1.5)
	tween.tween_property(self, "position:y", position.y, 1.5)

func _on_body_entered(body):
	if body.is_in_group("player") and not reached:
		complete()

func complete():
	reached = true
	
	# Emit confetti
	if confetti:
		confetti.emitting = true
	
	emit_signal("level_complete", 0)
