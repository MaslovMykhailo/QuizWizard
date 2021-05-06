from flask import Flask, request, abort
from flask_cors import CORS
from recognition import recognize
import numpy as np
import requests
import cv2

app = Flask(__name__)

CORS(app)

@app.route('/recognize')
def recognize_sheet():
  sheet_url = request.args.get('sheet')
  response = requests.get(sheet_url, stream = True)

  if response.status_code == 200:
    binary_sheet = response.content

    np_sheet = np.frombuffer(binary_sheet, np.uint8)
    sheet = cv2.imdecode(np_sheet, cv2.IMREAD_COLOR)

    student, answers = recognize(sheet)
    
    return {
      'student': student.tolist(),
      'answers': answers.tolist()
    }

if __name__ == '__main__':
  app.run(debug=True, port=5000)