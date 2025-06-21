import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from './index'

// Данные для инициализации таблицы событий
const eventTableData = [
  {
    id: 1,
    text_a: 'text-left',
    text_c: 'primary',
    name: 'Тосно Спб',
    color: 'primary',
    games: 2,
    win: 2,
    draw: 0,
    lose: 0,
    ball_in: 4,
    ball_out: 1,
    score: 6,
    last_game: 'ВВ',
    icon: 'sports_soccer'
  },
  {
    id: 2,
    text_a: 'text-left',
    text_c: 'primary',
    name: 'Север',
    color: 'primary',
    games: 2,
    win: 2,
    draw: 0,
    lose: 0,
    ball_in: 2,
    ball_out: 0,
    score: 6,
    last_game: 'ВВ',
    icon: 'sports_soccer'
  },
  {
    id: 3,
    text_a: 'text-left',
    text_c: 'primary',
    name: 'Псков',
    color: 'primary',
    games: 2,
    win: 1,
    draw: 1,
    lose: 0,
    ball_in: 4,
    ball_out: 3,
    score: 4,
    last_game: 'НВ',
    icon: 'sports_soccer'
  },
  {
    id: 4,
    text_a: 'text-left',
    text_c: 'primary',
    name: 'СШ Ленинградец',
    color: 'primary',
    games: 4,
    win: 1,
    draw: 0,
    lose: 3,
    ball_in: 5,
    ball_out: 6,
    score: 3,
    last_game: 'ПВПП',
    icon: 'sports_soccer'
  },
  {
    id: 5,
    text_a: 'text-left',
    text_c: 'primary',
    name: 'ГОУР Карелия',
    color: 'primary',
    games: 3,
    win: 0,
    draw: 1,
    lose: 2,
    ball_in: 2,
    ball_out: 5,
    score: 1,
    last_game: 'ПНП',
    icon: 'sports_soccer'
  },
  {
    id: 6,
    text_a: 'text-left',
    text_c: 'primary',
    name: 'Химик',
    color: 'primary',
    games: 1,
    win: 0,
    draw: 0,
    lose: 1,
    ball_in: 1,
    ball_out: 3,
    score: 0,
    last_game: 'П',
    icon: 'sports_soccer'
  }
]

// Функция для инициализации коллекции event-table
export const initEventTable = async () => {
  try {
    const eventTableCollectionRef = collection(db, 'event-table')

    // Проверяем, есть ли уже данные в коллекции
    const existingDocs = await getDocs(eventTableCollectionRef)

    if (existingDocs.empty) {
      console.log('Инициализация коллекции event-table...')

      // Добавляем данные в коллекцию
      for (const data of eventTableData) {
        await addDoc(eventTableCollectionRef, data)
      }

      console.log('Коллекция event-table успешно инициализирована')
    } else {
      console.log('Коллекция event-table уже содержит данные')
    }
  } catch (error) {
    console.error('Ошибка при инициализации event-table:', error)
  }
}

// Функция для очистки коллекции (для тестирования)
export const clearEventTable = async () => {
  try {
    const eventTableCollectionRef = collection(db, 'event-table')
    const existingDocs = await getDocs(eventTableCollectionRef)

    for (const docSnapshot of existingDocs.docs) {
      await deleteDoc(doc(db, 'event-table', docSnapshot.id))
    }

    console.log('Коллекция event-table очищена')
  } catch (error) {
    console.error('Ошибка при очистке event-table:', error)
  }
}

// Функция для добавления новой записи
export const addEventTableRecord = async (recordData) => {
  try {
    // Убеждаемся, что у нас есть ball_in и ball_out
    if (!Object.prototype.hasOwnProperty.call(recordData, 'ball_in') || !Object.prototype.hasOwnProperty.call(recordData, 'ball_out')) {
      throw new Error('Поля ball_in и ball_out обязательны')
    }

    const eventTableCollectionRef = collection(db, 'event-table')
    const docRef = await addDoc(eventTableCollectionRef, recordData)
    console.log('Запись добавлена с ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Ошибка при добавлении записи:', error)
    throw error
  }
}
