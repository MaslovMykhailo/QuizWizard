import {QuizId, QuizSchema} from 'quiz-wizard-schema'

export const initialData: Record<QuizId, QuizSchema> = {
  '6ee6f368-7fda-4726-a04b-1a6bde1230e4': {
    'id': '6ee6f368-7fda-4726-a04b-1a6bde1230e4',
    'name': 'Біологія 11 клас',
    'description': 'Тест з біології для учнів 11 класу.\nРозрахований час виконання 30 хвилин. ',
    'questionsOrder': ['f86b6214-c4d9-4404-a5d9-6e2443cb321f', 'eaad5500-fd39-4bb1-b1a4-6239380d0a09', '0b91a636-2251-453d-ae01-e9391c445823', '1bd19b56-2f63-49fa-bc4e-ea784fd6f980', 'ccdd65f4-7f4f-467d-97b7-1659c6504b54', '6852550a-11a4-48d1-8135-abe9a3570e74', 'e043b962-8a13-4709-91c4-00d3d20fde99', '9d5d2cd6-7b92-4658-b2c4-7a4463453257', '45a37f9a-84fd-416f-89f6-19b4d05fab29', '0389d176-6cd3-4c10-8a4c-853ad789ebd4', 'b0e22604-1b6b-4d48-81a6-b2c5954a7f4a', 'b4004386-d8cb-4449-8332-42ab6a774e36', '1b19a1bc-d43d-49b1-a5c6-d2d33e17a8ed', 'a9d72410-06ec-4c37-9a12-c9ee0c0b3301', 'db48786b-1e42-4b51-80f2-42143cd142ea'],
    'questions': {
      'f86b6214-c4d9-4404-a5d9-6e2443cb321f': {
        'id': 'f86b6214-c4d9-4404-a5d9-6e2443cb321f',
        'text': 'Яка наука досліджує вимерлі організми?',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'палеонтологія',
            'correct': true
          },
          'B': {
            'text': 'морфологія'
          },
          'C': {
            'text': 'еволюційне вчення'
          },
          'D': {
            'text': 'археологія'
          }
        }
      },
      'eaad5500-fd39-4bb1-b1a4-6239380d0a09': {
        'id': 'eaad5500-fd39-4bb1-b1a4-6239380d0a09',
        'text': 'Яка група ліпідів формує основу клітинних мембран?',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'нейтральні жири'
          },
          'B': {
            'text': 'воски'
          },
          'C': {
            'text': 'фосфоліпіди',
            'correct': true
          },
          'D': {
            'text': 'каротиноїди'
          }
        }
      },
      '0b91a636-2251-453d-ae01-e9391c445823': {
        'id': '0b91a636-2251-453d-ae01-e9391c445823',
        'text': 'Рослинна клітина, на відміну від тваринної, має',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'вакуолю з клітинним соком.',
            'correct': true
          },
          'B': {
            'text': 'комплекс Гольджі.'
          },
          'C': {
            'text': 'ендоплазматичну сітку.'
          },
          'D': {
            'text': 'мітохондрії.'
          }
        }
      },
      '1bd19b56-2f63-49fa-bc4e-ea784fd6f980': {
        'id': '1bd19b56-2f63-49fa-bc4e-ea784fd6f980',
        'text': 'Зерниста ендоплазматична сітка відрізняється від незернистої наявністю',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'рибосом.',
            'correct': true
          },
          'B': {
            'text': 'лізосом.'
          },
          'C': {
            'text': 'центросом.'
          },
          'D': {
            'text': 'пероксисом.'
          }
        }
      },
      'ccdd65f4-7f4f-467d-97b7-1659c6504b54': {
        'id': 'ccdd65f4-7f4f-467d-97b7-1659c6504b54',
        'text': 'Мітохондрії називають енергетичними станціями клітини. Така назва органел пов’язана з їхньою функцією',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'синтезу білків.'
          },
          'B': {
            'text': 'синтезу АТФ.',
            'correct': true
          },
          'C': {
            'text': 'транспорту газів, зокрема кисню.'
          },
          'D': {
            'text': 'внутрішньоклітинного травлення.'
          }
        }
      },
      '6852550a-11a4-48d1-8135-abe9a3570e74': {
        'id': '6852550a-11a4-48d1-8135-abe9a3570e74',
        'text': 'Під час досліду з одноклітинною водорістю ацетабулярією (див. рисунок) у водорості Х видалили верхню та середню частини, у водорості Y — верхню та нижню частини. До нижньої частини водорості Х пересадили середню частину водорості Y, у результаті чого штучно створений організм набув вигляду водорості Х. Укажіть правильний висновок з цього експерименту.',
        'cost': 3,
        'answers': {
          'A': {
            'text': 'мітохондрії відповідають за утворення енергії в клітині'
          },
          'B': {
            'text': 'ядро відповідає за збереження спадкової інформації',
            'correct': true
          },
          'C': {
            'text': 'хлоропласти здійснюють процес фотосинтезу'
          },
          'D': {
            'text': 'клітинні мембрани мають властивість відновлюватися'
          }
        },
        'picture': 'http://localhost:4000/static/question-picture/26cdbe8d2bb89d8515d77bec8aa9e92c.jpg'
      },
      'e043b962-8a13-4709-91c4-00d3d20fde99': {
        'id': 'e043b962-8a13-4709-91c4-00d3d20fde99',
        'text': 'На рисунку зображено хромосомний набір',
        'cost': 3,
        'answers': {
          'A': {
            'text': 'здорової жінки.'
          },
          'B': {
            'text': 'здорового чоловіка.',
            'correct': true
          },
          'C': {
            'text': 'жінки, хворої на синдром Дауна.'
          },
          'D': {
            'text': 'чоловіка, хворого на синдром Дауна.'
          }
        },
        'picture': 'http://localhost:4000/static/question-picture/ff3554248fbea9a587d8e4366bee11c9.jpg'
      },
      '9d5d2cd6-7b92-4658-b2c4-7a4463453257': {
        'id': '9d5d2cd6-7b92-4658-b2c4-7a4463453257',
        'text': 'Яку частину квітки позначено на рисунку буквою X?',
        'cost': 3,
        'answers': {
          'A': {
            'text': 'чашолисток'
          },
          'B': {
            'text': 'тичинку'
          },
          'C': {
            'text': 'пелюстку'
          },
          'D': {
            'text': 'маточку',
            'correct': true
          }
        },
        'picture': 'http://localhost:4000/static/question-picture/6e69890442ccade0ce46588b99aebb1c.jpg'
      },
      '45a37f9a-84fd-416f-89f6-19b4d05fab29': {
        'id': '45a37f9a-84fd-416f-89f6-19b4d05fab29',
        'text': 'Яку тканину зображено на рисунку?',
        'cost': 3,
        'answers': {
          'A': {
            'text': 'нервову'
          },
          'B': {
            'text': 'епітеліальну',
            'correct': true
          },
          'C': {
            'text': 'сполучну'
          },
          'D': {
            'text': 'м’язову'
          }
        },
        'picture': 'http://localhost:4000/static/question-picture/6d451e878a710609e2dd6f48fb0d8527.jpg'
      },
      '0389d176-6cd3-4c10-8a4c-853ad789ebd4': {
        'id': '0389d176-6cd3-4c10-8a4c-853ad789ebd4',
        'text': 'До якого рівня організації життя належить об’єкт, зображений на рисунку?',
        'cost': 3,
        'answers': {
          'A': {
            'text': 'молекулярного'
          },
          'B': {
            'text': 'клітинного',
            'correct': true
          },
          'C': {
            'text': 'організмового'
          },
          'D': {
            'text': 'екосистемного'
          }
        },
        'picture': 'http://localhost:4000/static/question-picture/63699ba235a9ef9e4d42f9d3c81fa20b.jpg'
      },
      'b0e22604-1b6b-4d48-81a6-b2c5954a7f4a': {
        'id': 'b0e22604-1b6b-4d48-81a6-b2c5954a7f4a',
        'text': 'У якій структурі рослинної клітини міститься клітинний сік?',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'хлоропласті'
          },
          'B': {
            'text': 'вакуолі',
            'correct': true
          },
          'C': {
            'text': 'рибосомі'
          },
          'D': {
            'text': 'ядрі'
          }
        }
      },
      'b4004386-d8cb-4449-8332-42ab6a774e36': {
        'id': 'b4004386-d8cb-4449-8332-42ab6a774e36',
        'text': 'Клітина кореня жита містить 14 хромосом. Скільки хромосом знаходиться в клітині ендосперму насінини?',
        'cost': 1,
        'answers': {
          'A': {
            'text': '7'
          },
          'B': {
            'text': '14'
          },
          'C': {
            'text': '21',
            'correct': true
          },
          'D': {
            'text': '28'
          }
        }
      },
      '1b19a1bc-d43d-49b1-a5c6-d2d33e17a8ed': {
        'id': '1b19a1bc-d43d-49b1-a5c6-d2d33e17a8ed',
        'text': 'Ботулізм — смертельна хвороба, яку спричиняють токсини бактерії Клостридіум. Який продукт може стати причиною ураження людини ботулізмом?',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'пліснявий хліб'
          },
          'B': {
            'text': 'гнилі фрукти'
          },
          'C': {
            'text': 'немиті овочі'
          },
          'D': {
            'text': 'домашні консерви',
            'correct': true
          }
        }
      },
      'a9d72410-06ec-4c37-9a12-c9ee0c0b3301': {
        'id': 'a9d72410-06ec-4c37-9a12-c9ee0c0b3301',
        'text': 'Збудник якої вірусної хвороби потрапляє в організм людини з продуктами харчування або водою?',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'гепатиту А',
            'correct': true
          },
          'B': {
            'text': 'СНІДу'
          },
          'C': {
            'text': 'поліомієліту'
          },
          'D': {
            'text': 'віспи'
          }
        }
      },
      'db48786b-1e42-4b51-80f2-42143cd142ea': {
        'id': 'db48786b-1e42-4b51-80f2-42143cd142ea',
        'text': 'Гриби подібні до тварин біологічною властивістю',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'накопичувати крохмаль як запасну речовину.'
          },
          'B': {
            'text': 'накопичувати крохмаль як запасну речовину.'
          },
          'C': {
            'text': 'виділяти сечовину в процесі обміну речовин.',
            'correct': true
          },
          'D': {
            'text': 'здійснювати мейоз, статево розмножуватись.'
          }
        }
      }
    },
    'creationDate': '2021-05-07T14:46:56.464Z'
  },
  'a872e160-64ee-4571-a7e7-f1761da7c6bd': {
    'id': 'a872e160-64ee-4571-a7e7-f1761da7c6bd',
    'name': 'English test',
    'description': '',
    'questionsOrder': ['b4bcd5dd-6361-4c68-905b-e64af0ff597f', '83bd9994-667b-426e-ac54-19b775c3cc38', '6b18e75b-dabb-4a13-8bdc-4da1f9e9976e', 'a3653e51-cf4f-4858-9f95-06f4eb094f77', '1a01de47-1e39-48e0-9d40-298802c38d8a', '9b45c7a8-c9cd-43c5-b540-19e434a4b2d4', '727e4ad5-a9b2-436a-b064-2f837d055db1', '29ab52b7-1746-44c3-a790-d360c40b2e10', '112f6ca8-90d7-4422-853e-670df371c3fe', 'b38aa74c-904d-46d6-b38e-2823eff8cb1d', 'ab138084-ceca-41ec-828e-efa9f6a82003', 'e8d636db-cb7e-4a29-8685-c9f520d42dbe', '51ed2ed9-2eca-4624-a6c5-2b82ff098c41', 'acfe5194-11a4-4c13-b62b-148ef3b0c87b', '3256148e-32ff-4c45-aeb8-36e43edb16d0', '16a00935-9356-4fea-9c45-4721c0ed51b1', 'fe8720fd-ae10-421b-9022-e7409e99fd26', '9b293ec6-27a4-42e6-a231-461d120542f7', 'a5aa50bd-83c6-4b17-b1c6-d64aecbf7422', '5aa749cb-466c-4435-b63f-9a13537a1695'],
    'questions': {
      'b4bcd5dd-6361-4c68-905b-e64af0ff597f': {
        'id': 'b4bcd5dd-6361-4c68-905b-e64af0ff597f',
        'text': 'Listen! A siren is ................... .',
        'cost': 2,
        'answers': {
          'A': {
            'text': 'splashing'
          },
          'B': {
            'text': 'wailing',
            'correct': true
          },
          'C': {
            'text': 'crashing'
          },
          'D': {
            'text': 'crashing'
          }
        }
      },
      '83bd9994-667b-426e-ac54-19b775c3cc38': {
        'id': '83bd9994-667b-426e-ac54-19b775c3cc38',
        'text': 'Sam hopes .... an astronaut one day',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'becoming'
          },
          'B': {
            'text': 'become'
          },
          'C': {
            'text': 'to become',
            'correct': true
          }
        }
      },
      '6b18e75b-dabb-4a13-8bdc-4da1f9e9976e': {
        'id': '6b18e75b-dabb-4a13-8bdc-4da1f9e9976e',
        'text': 'The man sitting next to me on the plane was very nervous. He..............................before.',
        'cost': 2,
        'answers': {
          'A': {
            'text': 'didn’t fly'
          },
          'B': {
            'text': 'hadn’t flown ',
            'correct': true
          },
          'C': {
            'text': 'hasn’t flown'
          },
          'D': {
            'text': 'wasn’t flying'
          }
        }
      },
      'a3653e51-cf4f-4858-9f95-06f4eb094f77': {
        'id': 'a3653e51-cf4f-4858-9f95-06f4eb094f77',
        'text': 'Where’s the book I gave you? What...............................with it?',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'have you been doing'
          },
          'B': {
            'text': 'have you been doing'
          },
          'C': {
            'text': 'have you done',
            'correct': true
          }
        }
      },
      '1a01de47-1e39-48e0-9d40-298802c38d8a': {
        'id': '1a01de47-1e39-48e0-9d40-298802c38d8a',
        'text': '"Paul lost his watch." "Well, if he had looked after it, he ... it."',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'won´t lose '
          },
          'B': {
            'text': 'wouldn’t lose'
          },
          'C': {
            'text': 'wouldn´t have lost',
            'correct': true
          }
        }
      },
      '9b45c7a8-c9cd-43c5-b540-19e434a4b2d4': {
        'id': '9b45c7a8-c9cd-43c5-b540-19e434a4b2d4',
        'text': 'My father ... to be a teacher, but now he has retired.',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'used',
            'correct': true
          },
          'B': {
            'text': 'got used '
          },
          'C': {
            'text': 'is used'
          }
        }
      },
      '727e4ad5-a9b2-436a-b064-2f837d055db1': {
        'id': '727e4ad5-a9b2-436a-b064-2f837d055db1',
        'text': 'In recent years there has been a large increase .............. the number of people who take no regular exercise',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'of'
          },
          'B': {
            'text': 'in',
            'correct': true
          },
          'C': {
            'text': 'for'
          }
        }
      },
      '29ab52b7-1746-44c3-a790-d360c40b2e10': {
        'id': '29ab52b7-1746-44c3-a790-d360c40b2e10',
        'text': 'By noon, Joe ......... for three hours.',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'is going to fish '
          },
          'B': {
            'text': 'will be fishing '
          },
          'C': {
            'text': 'will have been fishing',
            'correct': true
          }
        }
      },
      '112f6ca8-90d7-4422-853e-670df371c3fe': {
        'id': '112f6ca8-90d7-4422-853e-670df371c3fe',
        'text': 'It rained so hard the whole village ..................',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'scalded '
          },
          'B': {
            'text': 'burnt'
          },
          'C': {
            'text': 'flooded',
            'correct': true
          }
        }
      },
      'b38aa74c-904d-46d6-b38e-2823eff8cb1d': {
        'id': 'b38aa74c-904d-46d6-b38e-2823eff8cb1d',
        'text': 'I haven\'t seen Mark for weeks.” “Well, I …. him this afternoon. Why don\'t you come along?”',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'am meeting ',
            'correct': true
          },
          'B': {
            'text': 'have met'
          },
          'C': {
            'text': 'meet'
          }
        }
      },
      'ab138084-ceca-41ec-828e-efa9f6a82003': {
        'id': 'ab138084-ceca-41ec-828e-efa9f6a82003',
        'text': 'I can\'t believe you\'re going on a cruise this summer; it must be costing the ..............!',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'earth',
            'correct': true
          },
          'B': {
            'text': 'fortune'
          },
          'C': {
            'text': 'nickel'
          }
        }
      },
      'e8d636db-cb7e-4a29-8685-c9f520d42dbe': {
        'id': 'e8d636db-cb7e-4a29-8685-c9f520d42dbe',
        'text': 'Try ................ with olive oil. It\'ll taste better.',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'to cook '
          },
          'B': {
            'text': 'cooking ',
            'correct': true
          },
          'C': {
            'text': 'cook'
          }
        }
      },
      '51ed2ed9-2eca-4624-a6c5-2b82ff098c41': {
        'id': '51ed2ed9-2eca-4624-a6c5-2b82ff098c41',
        'text': '"Where is my bank book?" "If you ... in the drawer, you\'ll find it."',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'had looked '
          },
          'B': {
            'text': 'looked'
          },
          'C': {
            'text': 'look',
            'correct': true
          }
        }
      },
      'acfe5194-11a4-4c13-b62b-148ef3b0c87b': {
        'id': 'acfe5194-11a4-4c13-b62b-148ef3b0c87b',
        'text': '"This cake tastes very sweet." "I think I put ... sugar in it."',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'a lot '
          },
          'B': {
            'text': 'too much ',
            'correct': true
          },
          'C': {
            'text': 'too many'
          }
        }
      },
      '3256148e-32ff-4c45-aeb8-36e43edb16d0': {
        'id': '3256148e-32ff-4c45-aeb8-36e43edb16d0',
        'text': 'Neil was reading the newspaper when he came ............. an article about an old friend of his.',
        'cost': 2,
        'answers': {
          'A': {
            'text': 'into'
          },
          'B': {
            'text': 'across',
            'correct': true
          },
          'C': {
            'text': 'on'
          },
          'D': {
            'text': 'up with'
          }
        }
      },
      '16a00935-9356-4fea-9c45-4721c0ed51b1': {
        'id': '16a00935-9356-4fea-9c45-4721c0ed51b1',
        'text': 'Jenny seems …. very happy these days.',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'to be',
            'correct': true
          },
          'B': {
            'text': 'be'
          },
          'C': {
            'text': 'being'
          }
        }
      },
      'fe8720fd-ae10-421b-9022-e7409e99fd26': {
        'id': 'fe8720fd-ae10-421b-9022-e7409e99fd26',
        'text': '“I ….. to reach Jane on the phone all day.” “Don\'t you know? She\'s gone on holiday.”',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'tried'
          },
          'B': {
            'text': 'have been trying ',
            'correct': true
          },
          'C': {
            'text': 'have tried'
          }
        }
      },
      '9b293ec6-27a4-42e6-a231-461d120542f7': {
        'id': '9b293ec6-27a4-42e6-a231-461d120542f7',
        'text': 'By the time Eric ……… at the airport, his flight had already departed.',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'has arrived '
          },
          'B': {
            'text': 'has arrived ',
            'correct': true
          },
          'C': {
            'text': 'has arrived '
          }
        }
      },
      'a5aa50bd-83c6-4b17-b1c6-d64aecbf7422': {
        'id': 'a5aa50bd-83c6-4b17-b1c6-d64aecbf7422',
        'text': 'She was grateful to all the volunteers ............ their help.',
        'cost': 2,
        'answers': {
          'A': {
            'text': 'for',
            'correct': true
          },
          'B': {
            'text': 'for'
          },
          'C': {
            'text': 'of'
          },
          'D': {
            'text': 'in'
          }
        }
      },
      '5aa749cb-466c-4435-b63f-9a13537a1695': {
        'id': '5aa749cb-466c-4435-b63f-9a13537a1695',
        'text': 'Lisa ... the house when her husband came home.',
        'cost': 1,
        'answers': {
          'A': {
            'text': 'paints'
          },
          'B': {
            'text': 'has painted '
          },
          'C': {
            'text': 'has painted ',
            'correct': true
          }
        }
      }
    },
    'creationDate': '2021-05-07T18:40:37.103Z'
  }
}
