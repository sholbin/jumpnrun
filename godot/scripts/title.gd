extends Control

@onready var prompt_label = $PromptLabel
@onready var blink_timer = $BlinkTimer

var blink_visible = true

func _ready():
	blink_timer.timeout.connect(_on_blink_timer_timeout)

func _input(event):
	if event is InputEventKey and event.pressed:
		get_tree().change_scene_to_file("res://scenes/game.tscn")
	elif event is InputEventMouseButton and event.pressed:
		get_tree().change_scene_to_file("res://scenes/game.tscn")

func _on_blink_timer_timeout():
	blink_visible = !blink_visible
	prompt_label.modulate.a = 1.0 if blink_visible else 0.4
