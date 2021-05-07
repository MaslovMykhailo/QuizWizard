from imutils.perspective import four_point_transform
from imutils import contours
import numpy as np
from math import isclose 
import imutils
import cv2

# constants
SHEET_RATIO = 0.7
ANSWERS_SECTION_RATIO = 1
STUDENT_SECTION_RATIO = 1.45
ANSWERS_SIZE_TO_CIRCLE = 17.5
STUDENT_SIZE_TO_CIRCLE = 8.5

# helpers
def show(image_name, image):
	cv2.imshow(image_name, image)
	k = cv2.waitKey(0)
	if k == ord('s'):
		cv2.imwrite(image_name, image)
	cv2.destroyAllWindows()

def split_horizontal(image):
	height, width = image.shape[:2]	
	width_cutoff = width // 2

	pl = image[:, :width_cutoff]
	pr = image[:, width_cutoff:]

	return pl, pr

def minify(image):
	height, width = image.shape[:2]	

	x = width * 0.01
	y = height * 0.01
	
	return four_point_transform(
		image, 
		np.array([[width - x, y], [x, y], [x, height - y], [width - x, height - y]])
	)

def detect_rect(image, blur_size, ratio):
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	blurred = cv2.GaussianBlur(gray, blur_size, 0)
	edged = cv2.Canny(blurred, 75, 200)

	cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
	cnts = imutils.grab_contours(cnts)

	if len(cnts) > 0:
		sortedCnts = sorted(cnts, key=cv2.contourArea, reverse=True)
		for c in sortedCnts:
			peri = cv2.arcLength(c, True)
			approx = cv2.approxPolyDP(c, 0.02 * peri, True)

			if len(approx) == 4:
				x, y, w, h = cv2.boundingRect(approx)
				approxRatio = float(w) / h
				if isclose(approxRatio, ratio, abs_tol = 0.2):
					return approx
	
	return None

def detect_circles(image, size_rel):
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]

	cnts = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
	cnts = imutils.grab_contours(cnts)

	height, width = image.shape[:2]

	circles = []
	for c in cnts:
		(x, y, w, h) = cv2.boundingRect(c)

		ratio = float(w) / h
		is_ratio_close = isclose(ratio, 1, abs_tol = 0.1)

		size = height / float(h)
		is_size_close = isclose(size, size_rel, abs_tol = 3)

		if is_ratio_close and is_size_close: 
			circles.append(c)

	return contours.sort_contours(circles, method = "top-to-bottom")[0]

def grade_circles(image, circles, options_count = 5):
	count = int(len(circles) / options_count)

	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]

	max_grade = 0
	grades = np.zeros((count, options_count))

	for (q, i) in enumerate(np.arange(0, len(circles), options_count)):
		cnts = contours.sort_contours(circles[i:i + options_count])[0]

		for (j, c) in enumerate(cnts):
			mask = np.zeros(thresh.shape, dtype="uint8")
			cv2.drawContours(mask, [c], -1, 255, -1)
			
			mask = cv2.bitwise_and(thresh, thresh, mask=mask)
			grade = cv2.countNonZero(mask)

			grades[q][j] = grade

			if (grade > max_grade): 
				max_grade = grade
	
	return grades, max_grade

def detect_bubbled(circle_grades, max_grade, options_count = 5):
	bubbled = np.zeros((len(circle_grades), options_count), dtype=int)

	for q in range(len(circle_grades)):
		for i in range(len(circle_grades[q])):
			if circle_grades[q][i] > (max_grade / 2):
				bubbled[q][i] = 1

	return bubbled	

# logic

def detect_student(image):
	circles = detect_circles(image, STUDENT_SIZE_TO_CIRCLE)
	grades, max_grade = grade_circles(image, circles, 10)
	return detect_bubbled(grades, max_grade, 10)

def detect_answers(image):
	max_grade = 0
	grades = []

	height, width = image.shape[:2]	

	x = 0
	y = height * 0.08
	
	# cut option letters
	img = four_point_transform(
		image, 
		np.array([[width, y], [x, y], [x, height], [width, height]])
	)

	al, ar = split_horizontal(img)

	for answer in [al, ar]:
		circles = detect_circles(answer, ANSWERS_SIZE_TO_CIRCLE)
		grs, max_gr = grade_circles(answer, circles)

		if max_gr > max_grade: max_grade = max_gr
		if len(grades) == 0: grades = grs
		else: grades = np.concatenate((grades, grs), axis = 0)
	
	return detect_bubbled(grades, max_grade)

def recognize(sheet):
	paperRect = detect_rect(sheet, (3, 3), SHEET_RATIO)
	paper = four_point_transform(sheet, paperRect.reshape(4, 2))

	studentRect = detect_rect(paper, (3, 3), STUDENT_SECTION_RATIO)
	student = minify(four_point_transform(paper, studentRect.reshape(4, 2)))
	s_bubbled = detect_student(student)

	answersRect = detect_rect(paper, (3, 3), ANSWERS_SECTION_RATIO)
	answers = minify(four_point_transform(paper, answersRect.reshape(4, 2)))
	a_bubbled = detect_answers(answers)

	return s_bubbled, a_bubbled
