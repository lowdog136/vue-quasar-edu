import { db } from './index'
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  serverTimestamp
} from 'firebase/firestore'

/**
 * Сервис для работы со статистикой дашборда
 */
class StatsService {
  constructor () {
    this.statsCollection = 'dashboard-stats'
    this.statsDoc = 'main-stats'
  }

  /**
   * Получить текущую статистику
   */
  async getStats () {
    try {
      const statsRef = doc(db, this.statsCollection, this.statsDoc)
      const statsSnap = await getDoc(statsRef)

      if (statsSnap.exists()) {
        return statsSnap.data()
      } else {
        // Если статистики нет, создаем базовую
        return await this.initializeStats()
      }
    } catch (error) {
      console.error('Error getting stats:', error)
      throw error
    }
  }

  /**
   * Инициализировать базовую статистику
   */
  async initializeStats () {
    const baseStats = {
      totalGames: 0,
      newGamesThisWeek: 0,
      totalNews: 0,
      lastNewsDate: '',
      totalUsers: 0,
      newUsersThisWeek: 0,
      systemHealth: 100,
      lastUpdated: serverTimestamp(),
      version: '1.0.0'
    }

    try {
      await this.updateStats(baseStats)
      return baseStats
    } catch (error) {
      console.error('Error initializing stats:', error)
      throw error
    }
  }

  /**
   * Обновить статистику
   */
  async updateStats (newStats) {
    try {
      const statsRef = doc(db, this.statsCollection, this.statsDoc)
      await setDoc(statsRef, {
        ...newStats,
        lastUpdated: serverTimestamp()
      })
    } catch (error) {
      console.error('Error updating stats:', error)
      throw error
    }
  }

  /**
   * Обновить статистику игр
   */
  async updateGamesStats () {
    try {
      // Получаем все игры
      const gamesRef = collection(db, 'all-games')
      const gamesSnap = await getDocs(gamesRef)
      const totalGames = gamesSnap.size

      // Подсчитываем игры за последнюю неделю
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)

      let newGamesThisWeek = 0
      gamesSnap.forEach(doc => {
        const gameData = doc.data()
        if (gameData.datestamp) {
          const gameDate = gameData.datestamp.toDate ? gameData.datestamp.toDate() : new Date(gameData.datestamp)
          if (gameDate >= weekAgo) {
            newGamesThisWeek++
          }
        }
      })

      // Обновляем статистику
      const currentStats = await this.getStats()
      await this.updateStats({
        ...currentStats,
        totalGames,
        newGamesThisWeek
      })

      return { totalGames, newGamesThisWeek }
    } catch (error) {
      console.error('Error updating games stats:', error)
      throw error
    }
  }

  /**
   * Обновить статистику новостей
   */
  async updateNewsStats () {
    try {
      // Получаем все новости
      const newsRef = collection(db, 'siteNews')
      const newsSnap = await getDocs(newsRef)
      const totalNews = newsSnap.size

      // Находим последнюю новость
      let lastNewsDate = ''
      let latestDate = null

      newsSnap.forEach(doc => {
        const newsData = doc.data()
        if (newsData.date) {
          const newsDate = newsData.date.toDate ? newsData.date.toDate() : new Date(newsData.date)
          if (!latestDate || newsDate > latestDate) {
            latestDate = newsDate
            lastNewsDate = newsDate.toLocaleDateString('ru-RU')
          }
        }
      })

      // Обновляем статистику
      const currentStats = await this.getStats()
      await this.updateStats({
        ...currentStats,
        totalNews,
        lastNewsDate
      })

      return { totalNews, lastNewsDate }
    } catch (error) {
      console.error('Error updating news stats:', error)
      throw error
    }
  }

  /**
   * Обновить статистику при добавлении новой игры
   */
  async onGameAdded () {
    try {
      await this.updateGamesStats()
      console.log('Games stats updated after new game added')
    } catch (error) {
      console.error('Error updating stats after game added:', error)
    }
  }

  /**
   * Обновить статистику при добавлении новой новости
   */
  async onNewsAdded () {
    try {
      await this.updateNewsStats()
      console.log('News stats updated after new news added')
    } catch (error) {
      console.error('Error updating stats after news added:', error)
    }
  }

  /**
   * Обновить статистику при удалении игры
   */
  async onGameDeleted () {
    try {
      await this.updateGamesStats()
      console.log('Games stats updated after game deleted')
    } catch (error) {
      console.error('Error updating stats after game deleted:', error)
    }
  }

  /**
   * Обновить статистику при удалении новости
   */
  async onNewsDeleted () {
    try {
      await this.updateNewsStats()
      console.log('News stats updated after news deleted')
    } catch (error) {
      console.error('Error updating stats after news deleted:', error)
    }
  }

  /**
   * Обновить всю статистику
   */
  async refreshAllStats () {
    try {
      await Promise.all([
        this.updateGamesStats(),
        this.updateNewsStats()
      ])

      return await this.getStats()
    } catch (error) {
      console.error('Error refreshing all stats:', error)
      throw error
    }
  }

  /**
   * Получить статистику с автоматическим обновлением
   */
  async getStatsWithRefresh () {
    try {
      const stats = await this.getStats()

      // Проверяем, когда последний раз обновлялась статистика
      const lastUpdated = stats.lastUpdated?.toDate ? stats.lastUpdated.toDate() : new Date(stats.lastUpdated)
      const now = new Date()
      const hoursSinceUpdate = (now - lastUpdated) / (1000 * 60 * 60)

      // Обновляем статистику, если прошло больше часа
      if (hoursSinceUpdate > 1) {
        return await this.refreshAllStats()
      }

      return stats
    } catch (error) {
      console.error('Error getting stats with refresh:', error)
      throw error
    }
  }
}

export default new StatsService()
