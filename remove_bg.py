#!/usr/bin/env python3
"""
Remove background from spritesheet image, making it transparent.
Detects the background color from corners and makes matching pixels transparent.
"""

from PIL import Image
import sys

def get_dominant_corner_color(img):
    """Get the most common color from the corners of the image."""
    width, height = img.size
    corners = [
        img.getpixel((0, 0)),
        img.getpixel((width-1, 0)),
        img.getpixel((0, height-1)),
        img.getpixel((width-1, height-1)),
        img.getpixel((5, 5)),
        img.getpixel((width-6, 5)),
        img.getpixel((5, height-6)),
        img.getpixel((width-6, height-6)),
    ]
    # Return most common color
    from collections import Counter
    return Counter(corners).most_common(1)[0][0]

def remove_background(input_path, output_path, tolerance=30):
    """Remove background color and make it transparent."""
    img = Image.open(input_path).convert('RGBA')
    width, height = img.size
    
    # Get background color from corners
    bg_color = get_dominant_corner_color(img)
    print(f"Detected background color: {bg_color}")
    
    # Create new image with transparency
    pixels = img.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # Check if this pixel is close to the background color
            if len(bg_color) >= 3:
                br, bg_val, bb = bg_color[:3]
                if (abs(r - br) < tolerance and 
                    abs(g - bg_val) < tolerance and 
                    abs(b - bb) < tolerance):
                    # Make this pixel transparent
                    pixels[x, y] = (r, g, b, 0)
    
    img.save(output_path, 'PNG')
    print(f"Saved transparent image to: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) >= 3:
        input_file = sys.argv[1]
        output_file = sys.argv[2]
        tolerance = int(sys.argv[3]) if len(sys.argv) > 3 else 30
    else:
        # Default paths
        input_file = "/Users/melihdemir/.gemini/antigravity/brain/06efa912-cca2-4209-b036-13e174c3fb6c/noe_character_sprite_1767564143142.png"
        output_file = "/Users/melihdemir/Documents/Hackermackerordner/jumpnrun/assets/noe_spritesheet.png"
        tolerance = 30
    
    remove_background(input_file, output_file, tolerance)
