import cv2
import argparse
from recognition import recognize

parser = argparse.ArgumentParser()
parser.add_argument(
	"-i", "--image", 
	required = True,
	help = "path to the input image"
)

args = vars(parser.parse_args())

image = cv2.imread(args["image"])
student, answers = recognize(image)

print(student)
print(answers)