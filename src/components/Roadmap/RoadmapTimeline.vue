<template>
  <div class="roadmap-timeline">
    <div class="roadmap-header q-mb-lg">
      <h2 class="text-h4 text-weight-bold q-mb-sm">
        🗺️ Дорожная карта развития SeverFans
      </h2>
      <p class="text-body1 text-grey-7">
        План улучшения проекта на 8-12 недель с поэтапным внедрением
      </p>
    </div>

    <!-- Progress Overview -->
    <div class="progress-overview q-mb-xl">
      <q-card class="bg-primary text-white">
        <q-card-section>
          <div class="row items-center">
            <div class="col-12 col-md-6">
              <h3 class="text-h6 q-mb-sm">Общий прогресс</h3>
              <q-linear-progress
                :value="overallProgress"
                color="white"
                class="q-mb-sm"
              />
              <p class="text-caption">{{ Math.round(overallProgress * 100) }}% завершено</p>
            </div>
            <div class="col-12 col-md-6">
              <div class="row q-gutter-sm">
                <div class="col-6">
                  <div class="text-center">
                    <div class="text-h6">{{ completedPhases }}</div>
                    <div class="text-caption">Завершено фаз</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-center">
                    <div class="text-h6">{{ totalPhases }}</div>
                    <div class="text-caption">Всего фаз</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Timeline -->
    <div class="timeline-container">
      <div
        v-for="phase in phases"
        :key="phase.id"
        class="timeline-item"
        :class="{ 'completed': phase.status === 'completed', 'current': phase.status === 'current' }"
      >
        <!-- Phase Card -->
        <q-card class="phase-card q-mb-md" :class="getPhaseCardClass(phase.status)">
          <q-card-section>
            <div class="row items-center q-mb-md">
              <div class="col-auto">
                <q-avatar
                  :color="getPhaseColor(phase.status)"
                  text-color="white"
                  size="48px"
                  class="q-mr-md"
                >
                  <q-icon :name="phase.icon" size="24px" />
                </q-avatar>
              </div>
              <div class="col">
                <h3 class="text-h6 q-mb-xs">{{ phase.title }}</h3>
                <p class="text-caption text-grey-6">{{ phase.duration }}</p>
              </div>
              <div class="col-auto">
                <q-chip
                  :color="getStatusColor(phase.status)"
                  text-color="white"
                  :label="getStatusLabel(phase.status)"
                  size="sm"
                />
              </div>
            </div>

            <p class="text-body2 q-mb-md">{{ phase.description }}</p>

            <!-- Progress Bar -->
            <div v-if="phase.status !== 'pending'" class="q-mb-md">
              <div class="row items-center q-mb-xs">
                <span class="text-caption">Прогресс: {{ Math.round(phase.progress * 100) }}%</span>
                <q-space />
                <span class="text-caption">{{ phase.completedTasks }}/{{ phase.totalTasks }} задач</span>
              </div>
              <q-linear-progress
                :value="phase.progress"
                :color="getPhaseColor(phase.status)"
                class="q-mb-sm"
              />
            </div>

            <!-- Tasks List -->
            <div class="tasks-list">
              <div
                v-for="task in phase.tasks"
                :key="task.id"
                class="task-item q-mb-xs"
                :class="{ 'completed': task.completed }"
              >
                <q-checkbox
                  :model-value="task.completed"
                  :disable="phase.status === 'pending'"
                  :color="getPhaseColor(phase.status)"
                  size="sm"
                />
                <span class="task-text q-ml-sm" :class="{ 'text-strike': task.completed }">
                  {{ task.title }}
                </span>
              </div>
            </div>

            <!-- Phase Details -->
            <q-expansion-item
              v-if="phase.details"
              icon="info"
              label="Подробности"
              class="q-mt-md"
            >
              <q-card-section class="q-pt-none">
                <div class="row q-gutter-md">
                  <div class="col-12 col-md-6">
                    <h4 class="text-subtitle2 q-mb-sm">Приоритеты:</h4>
                    <ul class="text-caption">
                      <li v-for="priority in phase.details.priorities" :key="priority">
                        {{ priority }}
                      </li>
                    </ul>
                  </div>
                  <div class="col-12 col-md-6">
                    <h4 class="text-subtitle2 q-mb-sm">Метрики:</h4>
                    <ul class="text-caption">
                      <li v-for="metric in phase.details.metrics" :key="metric">
                        {{ metric }}
                      </li>
                    </ul>
                  </div>
                </div>
              </q-card-section>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Implementation Variants -->
    <div class="implementation-variants q-mt-xl">
      <h3 class="text-h5 q-mb-md">Варианты внедрения</h3>
      <div class="row q-gutter-md">
        <div class="col-12 col-md-4">
          <q-card class="variant-card" :class="{ 'selected': selectedVariant === 'full' }">
            <q-card-section>
              <h4 class="text-h6 q-mb-sm">Полное внедрение</h4>
              <p class="text-caption q-mb-md">14 недель, 2-3 разработчика</p>
              <q-btn
                :color="selectedVariant === 'full' ? 'primary' : 'grey'"
                :outline="selectedVariant !== 'full'"
                label="Выбрать"
                @click="selectVariant('full')"
                size="sm"
              />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4">
          <q-card class="variant-card" :class="{ 'selected': selectedVariant === 'quick' }">
            <q-card-section>
              <h4 class="text-h6 q-mb-sm">Быстрое внедрение</h4>
              <p class="text-caption q-mb-md">6 недель, 1-2 разработчика</p>
              <q-btn
                :color="selectedVariant === 'quick' ? 'primary' : 'grey'"
                :outline="selectedVariant !== 'quick'"
                label="Выбрать"
                @click="selectVariant('quick')"
                size="sm"
              />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4">
          <q-card class="variant-card selected">
            <q-card-section>
              <h4 class="text-h6 q-mb-sm">Поэтапное внедрение</h4>
              <p class="text-caption q-mb-md">8-12 недель, 1-3 разработчика</p>
              <q-btn
                color="primary"
                label="Выбрано"
                size="sm"
                disabled
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'RoadmapTimeline',
  setup () {
    const selectedVariant = ref('phased')

    const phases = ref([
      {
        id: 1,
        title: 'Критические улучшения',
        duration: '1-2 недели',
        description: 'Безопасность Firebase, улучшение аутентификации, базовая TypeScript интеграция',
        status: 'current',
        progress: 0.4,
        completedTasks: 4,
        totalTasks: 10,
        icon: 'security',
        tasks: [
          { id: 1, title: 'Firebase Configuration Security', completed: true },
          { id: 2, title: 'Authentication Improvements', completed: true },
          { id: 3, title: 'State Management Migration Plan', completed: true },
          { id: 4, title: 'TypeScript Integration', completed: true },
          { id: 5, title: 'Базовое тестирование', completed: false }
        ],
        details: {
          priorities: ['Критическая безопасность', 'Архитектура', 'Типизация'],
          metrics: ['100% Firebase config в env', '0 security vulnerabilities', '>80% TypeScript coverage']
        }
      },
      {
        id: 2,
        title: 'Структурные улучшения',
        duration: '2-3 недели',
        description: 'Реорганизация проекта, создание service layer, улучшение UI/UX',
        status: 'pending',
        progress: 0,
        completedTasks: 0,
        totalTasks: 8,
        icon: 'architecture',
        tasks: [
          { id: 1, title: 'Компонентная архитектура', completed: false },
          { id: 2, title: 'Service Layer', completed: false },
          { id: 3, title: 'Design System', completed: false },
          { id: 4, title: 'Loading States', completed: false }
        ],
        details: {
          priorities: ['Реорганизация', 'UI/UX', 'Архитектура'],
          metrics: ['Структурированный код', 'Переиспользуемые компоненты', 'Улучшенный UX']
        }
      },
      {
        id: 3,
        title: 'Производительность',
        duration: '1-2 недели',
        description: 'Code splitting, caching strategy, оптимизация изображений',
        status: 'pending',
        progress: 0,
        completedTasks: 0,
        totalTasks: 6,
        icon: 'speed',
        tasks: [
          { id: 1, title: 'Code Splitting', completed: false },
          { id: 2, title: 'Caching Strategy', completed: false },
          { id: 3, title: 'Image Optimization', completed: false }
        ],
        details: {
          priorities: ['Производительность', 'Оптимизация', 'Caching'],
          metrics: ['Bundle size < 500KB', 'Lighthouse score > 90', 'Faster loading']
        }
      },
      {
        id: 4,
        title: 'Тестирование',
        duration: '2-3 недели',
        description: 'Unit тесты, component тесты, integration тесты',
        status: 'pending',
        progress: 0,
        completedTasks: 0,
        totalTasks: 12,
        icon: 'bug_report',
        tasks: [
          { id: 1, title: 'Unit Testing', completed: false },
          { id: 2, title: 'Component Testing', completed: false },
          { id: 3, title: 'Integration Testing', completed: false }
        ],
        details: {
          priorities: ['Качество кода', 'Надежность', 'Автоматизация'],
          metrics: ['Code coverage > 80%', 'Automated tests', 'CI/CD pipeline']
        }
      },
      {
        id: 5,
        title: 'Мониторинг и аналитика',
        duration: '1 неделя',
        description: 'Error tracking, analytics, performance monitoring',
        status: 'pending',
        progress: 0,
        completedTasks: 0,
        totalTasks: 4,
        icon: 'analytics',
        tasks: [
          { id: 1, title: 'Error Tracking', completed: false },
          { id: 2, title: 'Analytics', completed: false }
        ],
        details: {
          priorities: ['Мониторинг', 'Аналитика', 'Отслеживание'],
          metrics: ['Error rate < 1%', 'User behavior tracking', 'Performance metrics']
        }
      },
      {
        id: 6,
        title: 'DevOps и автоматизация',
        duration: '1-2 недели',
        description: 'CI/CD pipeline, deployment, monitoring',
        status: 'pending',
        progress: 0,
        completedTasks: 0,
        totalTasks: 6,
        icon: 'settings',
        tasks: [
          { id: 1, title: 'GitHub Actions', completed: false },
          { id: 2, title: 'Deployment', completed: false }
        ],
        details: {
          priorities: ['Автоматизация', 'Deployment', 'CI/CD'],
          metrics: ['Automated deployment', 'Rollback strategy', 'Environment management']
        }
      },
      {
        id: 7,
        title: 'Документация',
        duration: '1 неделя',
        description: 'Developer документация, user guide, API документация',
        status: 'pending',
        progress: 0,
        completedTasks: 0,
        totalTasks: 4,
        icon: 'description',
        tasks: [
          { id: 1, title: 'Developer Documentation', completed: false },
          { id: 2, title: 'User Documentation', completed: false }
        ],
        details: {
          priorities: ['Документация', 'Руководства', 'API docs'],
          metrics: ['Complete documentation', 'User guides', 'Contributing guidelines']
        }
      }
    ])

    const completedPhases = computed(() =>
      phases.value.filter(phase => phase.status === 'completed').length
    )

    const totalPhases = computed(() => phases.value.length)

    const overallProgress = computed(() => {
      const totalProgress = phases.value.reduce((sum, phase) => sum + phase.progress, 0)
      return totalProgress / phases.value.length
    })

    const getPhaseColor = (status) => {
      switch (status) {
        case 'completed': return 'positive'
        case 'current': return 'primary'
        case 'pending': return 'grey'
        default: return 'grey'
      }
    }

    const getStatusColor = (status) => {
      switch (status) {
        case 'completed': return 'positive'
        case 'current': return 'primary'
        case 'pending': return 'grey'
        default: return 'grey'
      }
    }

    const getStatusLabel = (status) => {
      switch (status) {
        case 'completed': return 'Завершено'
        case 'current': return 'В работе'
        case 'pending': return 'Ожидает'
        default: return 'Неизвестно'
      }
    }

    const getPhaseCardClass = (status) => {
      switch (status) {
        case 'completed': return 'phase-completed'
        case 'current': return 'phase-current'
        case 'pending': return 'phase-pending'
        default: return ''
      }
    }

    const selectVariant = (variant) => {
      selectedVariant.value = variant
    }

    return {
      phases,
      selectedVariant,
      completedPhases,
      totalPhases,
      overallProgress,
      getPhaseColor,
      getStatusColor,
      getStatusLabel,
      getPhaseCardClass,
      selectVariant
    }
  }
})
</script>

<style scoped>
.roadmap-timeline {
  max-width: 1200px;
  margin: 0 auto;
}

.roadmap-header {
  text-align: center;
}

.phase-card {
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.phase-current {
  border-left-color: var(--q-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.phase-completed {
  border-left-color: var(--q-positive);
  opacity: 0.8;
}

.phase-pending {
  border-left-color: var(--q-grey-4);
  opacity: 0.6;
}

.tasks-list {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  padding: 12px;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 4px 0;
}

.task-text {
  flex: 1;
  font-size: 0.875rem;
}

.variant-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.variant-card.selected {
  border: 2px solid var(--q-primary);
  transform: translateY(-2px);
}

.variant-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.timeline-container {
  position: relative;
}

.timeline-container::before {
  content: '';
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--q-grey-3);
  z-index: 0;
}

.timeline-item {
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .roadmap-timeline {
    padding: 0 16px;
  }

  .timeline-container::before {
    left: 16px;
  }
}
</style>
