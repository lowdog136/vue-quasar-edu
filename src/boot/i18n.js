import { boot } from 'quasar/wrappers'

// Русские названия месяцев
const russianMonths = [
  'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
  'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
]

export default boot(({ app }) => {
  // Добавляем глобальную функцию для форматирования дат
  app.config.globalProperties.$formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    const month = russianMonths[d.getMonth()]
    const day = d.getDate()
    const year = d.getFullYear()
    return `${month} ${day}, ${year}`
  }
})
