import StatsService from './statsService'

/**
 * Инициализация статистики в Firebase
 * Запускается один раз для создания базовой статистики
 */
export const initializeDashboardStats = async () => {
  try {
    console.log('Initializing dashboard stats...')

    // Создаем базовую статистику
    const baseStats = await StatsService.initializeStats()
    console.log('Base stats created:', baseStats)

    // Обновляем статистику игр и новостей
    await StatsService.refreshAllStats()
    console.log('Stats refreshed successfully')

    return true
  } catch (error) {
    console.error('Error initializing dashboard stats:', error)
    return false
  }
}

/**
 * Проверка и создание статистики если её нет
 */
export const ensureStatsExist = async () => {
  try {
    const stats = await StatsService.getStats()
    console.log('Stats exist:', stats)
    return true
  } catch (error) {
    console.log('Stats do not exist, creating...')
    return await initializeDashboardStats()
  }
}

export default {
  initializeDashboardStats,
  ensureStatsExist
}
