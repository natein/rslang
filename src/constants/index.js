import sprintGame from '../assets/sprintGame.svg';
import audio from '../assets/audio.svg';
import ourGame from '../assets/our-game.svg';
import SavannaBackground from '../assets/savanna/savanna_background.svg';
import SoundIcon from '../assets/hud/sound.svg';
import MutedIcon from '../assets/hud/muted.svg';
import CrossIcon from '../assets/hud/cross.svg';
import HeartIcon from '../assets/hud/heart.png';

export const DEVELOPERS = [
  {
    "fullname": "Иван Михальченко",
    "github": "https://github.com/spaceragga"
  },
  {
    "fullname": "Алексей Булгак",
    "github": "https://github.com/aleksei-bulgak-study"
  },
  {
    "fullname": "Николай Волженин",
    "github": "https://github.com/Kvadeck"
  },
  {
    "fullname": "Наталья Эйн",
    "github": "https://github.com/natein"
  },
  {
    "fullname": "Александр Кудрявцев",
    "github": "https://github.com/kvalexandr"
  }
];

export const SECTIONS_EBOOK = [
  {
    group: 0,
    name: 'Раздел 1',
    background: 'rgba(232, 245, 233, 0.5)',
    backgroundBtn: 'rgba(165, 214, 167, 1)',
  },
  {
    group: 1,
    name: 'Раздел 2',
    background: 'rgba(225, 245, 254, 0.5)',
    backgroundBtn: 'rgba(129, 212, 250, 1)',
  },
  {
    group: 2,
    name: 'Раздел 3',
    background: 'rgba(232, 234, 246, 0.5)',
    backgroundBtn: 'rgba(159, 168, 218, 1)',
  },
  {
    group: 3,
    name: 'Раздел 4',
    background: 'rgba(239, 235, 233, 0.5)',
    backgroundBtn: 'rgba(188, 170, 164, 1)',
  },
  {
    group: 4,
    name: 'Раздел 5',
    background: 'rgba(255, 243, 224, 0.5)',
    backgroundBtn: 'rgba(255, 204, 128, 1)',
  },
  {
    group: 5,
    name: 'Раздел 6',
    background: 'rgba(255, 235, 238, 0.5)',
    backgroundBtn: 'rgba(239, 154, 154, 1)',
  },
];

export const GAMES = {
  difficultyTitle: 'Сложность',
  timeout: 3000,
  lifes: 4,

  hud: {
    sound: SoundIcon,
    disableSound: MutedIcon,
    cross: CrossIcon,
    heart: HeartIcon,
  },

  closeModal: {
    title: 'Игра не закончена!',
    description: 'Если вы вернетесь к списку, ваши результаты не будут сохранены',
    closeBtn: 'Закрыть',
    cancelBtn: 'Отмена'
  },
  btnLabel: 'Начать',

  list: [
    {
      code: 'savanna',
      name: 'Саванна',
      description: '«Саванна» - это тренировка которая развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.',
      backgroundImage: SavannaBackground,
      minWords: 4
    },
    {
      code: 'audio',
      name: 'Аудиовызов',
      description: '«Аудиовызов» - это тренировка, которая улучшает восприятие речи на слух.',
      backgroundImage: audio,
      help: [
        'Используйте мышь, чтобы выбрать.', 'Используйте цифровые клавиши от 1 до 5 для выбора ответа', 'Используйте пробел для повтроного звучания слова', 'Используйте клавишу Enter для подсказки или для перехода к следующему слову'
      ]
    },
    {
      code: 'sprint',
      name: 'Спринт',
      description: '«Спринт» - это тренировка для повторения заученных слов из вашего словаря.',
      backgroundImage: sprintGame,
      help: [
        'Используйте мышь, чтобы выбрать.', 'Используйте клавиши влево или вправо'
      ]
    },
    {
      code: 'our-game',
      name: 'Своя игра',
      description: 'Своя игра позволяет изучать написание слов. Вам будет дан перевод слова и ваша задача за отведённое время вписать в поле слово.',
      backgroundImage: ourGame,
      help: [],
    }
  ]
}

export const SECTIONS_DICTIONARY = [
  {
    type: 'study',
    name: 'Изучаемые слова',
    background: 'rgba(255, 235, 238, 0.5)',
    backgroundBtn: 'rgba(239, 154, 154, 1)',
  },
  {
    type: 'hard',
    name: 'Сложные слова',
    background: 'rgba(255, 235, 238, 0.5)',
    backgroundBtn: 'rgba(239, 154, 154, 1)',
  },
  {
    type: 'delete',
    name: 'Удалённые слова',
    background: 'rgba(255, 235, 238, 0.5)',
    backgroundBtn: 'rgba(239, 154, 154, 1)',
  },
];

export const EBOOK_COUNT_PAGES = 30;
export const COUNT_WORDS_ON_PAGE = 20;
