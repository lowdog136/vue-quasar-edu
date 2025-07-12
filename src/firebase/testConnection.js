import { db } from './index'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'

/**
 * Тест подключения к Firebase и загрузки данных
 */
export const testFirebaseConnection = async () => {
  console.log('🧪 Начинаем тест подключения к Firebase...')

  try {
    // Тест 1: Проверяем подключение к коллекции all-games
    console.log('📊 Тест 1: Проверка коллекции all-games...')
    const gamesRef = collection(db, 'all-games')
    const gamesSnap = await getDocs(gamesRef)
    console.log(`✅ Коллекция all-games доступна. Документов: ${gamesSnap.size}`)

    // Выводим первые 3 игры для проверки
    let count = 0
    gamesSnap.forEach(doc => {
      if (count < 3) {
        const gameData = doc.data()
        console.log(`🎮 Игра ${count + 1}:`, {
          id: doc.id,
          event: gameData.event,
          date: gameData.date,
          datestamp: gameData.datestamp
        })
        count++
      }
    })

    // Тест 2: Проверяем коллекцию siteNews
    console.log('📰 Тест 2: Проверка коллекции siteNews...')
    const newsRef = collection(db, 'siteNews')
    const newsSnap = await getDocs(newsRef)
    console.log(`✅ Коллекция siteNews доступна. Документов: ${newsSnap.size}`)

    // Тест 3: Проверяем коллекцию dashboard-stats
    console.log('📈 Тест 3: Проверка коллекции dashboard-stats...')
    const statsRef = collection(db, 'dashboard-stats')
    const statsSnap = await getDocs(statsRef)
    console.log(`✅ Коллекция dashboard-stats доступна. Документов: ${statsSnap.size}`)

    return {
      success: true,
      games: gamesSnap.size,
      news: newsSnap.size,
      stats: statsSnap.size
    }
  } catch (error) {
    console.error('❌ Ошибка тестирования Firebase:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Тест с использованием onSnapshot (как в других компонентах)
 */
export const testFirebaseWithSnapshot = () => {
  console.log('🔄 Тест с onSnapshot...')

  const gamesRef = collection(db, 'all-games')

  const unsubscribe = onSnapshot(gamesRef, (querySnapshot) => {
    console.log(`📊 onSnapshot: Найдено ${querySnapshot.size} игр`)

    querySnapshot.forEach((doc, index) => {
      if (index < 3) {
        const gameData = doc.data()
        console.log(`🎮 onSnapshot Игра ${index + 1}:`, {
          id: doc.id,
          event: gameData.event,
          date: gameData.date
        })
      }
    })

    // Отписываемся после первого получения данных
    unsubscribe()
  }, (error) => {
    console.error('❌ Ошибка onSnapshot:', error)
  })
}
