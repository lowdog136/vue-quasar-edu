<template>
  <div class="admin-content-dashboard">
    <!-- Page Header -->
    <div class="content-header q-mb-lg">
      <div class="row items-center justify-between">
        <div>
          <h1 class="text-h4 q-mb-xs">Управление контентом</h1>
          <p class="text-grey-6">Создание, редактирование и мониторинг контента</p>
        </div>
        <div class="row q-gutter-sm">
          <AdminButton
            icon="add"
            label="Создать контент"
            variant="primary"
            @click="createContent"
          />
          <AdminButton
            icon="refresh"
            label="Обновить"
            variant="info"
            @click="refreshContent"
            :loading="loading"
          />
        </div>
      </div>
    </div>

    <!-- Content Overview -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Всего публикаций"
          :subtitle="`${contentStats.totalPosts} статей`"
          icon="article"
          icon-color="primary"
          variant="info"
        >
          <div class="text-h3 text-primary q-mb-sm">{{ contentStats.totalPosts }}</div>
          <div class="text-caption">
            <q-icon name="trending_up" color="positive" size="sm" />
            <span class="q-ml-xs">+{{ contentStats.newPostsThisWeek }} за неделю</span>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Черновики"
          :subtitle="`${contentStats.drafts} на доработке`"
          icon="edit"
          icon-color="warning"
          variant="warning"
        >
          <div class="text-h3 text-orange q-mb-sm">{{ contentStats.drafts }}</div>
          <div class="text-caption">
            <q-icon name="schedule" color="grey" size="sm" />
            <span class="q-ml-xs">Требуют внимания</span>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Просмотры"
          :subtitle="`${contentStats.totalViews} просмотров`"
          icon="visibility"
          icon-color="success"
          variant="success"
        >
          <div class="text-h3 text-positive q-mb-sm">{{ contentStats.totalViews }}</div>
          <div class="text-caption">
            <q-icon name="trending_up" color="positive" size="sm" />
            <span class="q-ml-xs">+{{ contentStats.viewsGrowth }}%</span>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <AdminCard
          title="Комментарии"
          :subtitle="`${contentStats.totalComments} комментариев`"
          icon="comment"
          icon-color="info"
          variant="info"
        >
          <div class="text-h3 text-info q-mb-sm">{{ contentStats.totalComments }}</div>
          <div class="text-caption">
            <q-icon name="trending_up" color="positive" size="sm" />
            <span class="q-ml-xs">+{{ contentStats.commentsGrowth }}%</span>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- Content Management -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-lg-8">
        <AdminCard
          title="Последние публикации"
          icon="article"
          icon-color="primary"
        >
          <div class="content-list">
            <div
              v-for="post in recentPosts"
              :key="post.id"
              class="content-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div class="col">
                  <div class="row items-center q-gutter-sm">
                    <q-avatar size="40px" :color="post.categoryColor">
                      <q-icon :name="post.categoryIcon" color="white" />
                    </q-avatar>
                    <div>
                      <div class="text-subtitle2 text-weight-medium">{{ post.title }}</div>
                      <div class="text-caption text-grey">
                        {{ post.category }} • {{ post.author }} • {{ post.date }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row items-center q-gutter-sm">
                  <div class="text-caption text-grey">
                    <q-icon name="visibility" size="sm" />
                    {{ post.views }}
                  </div>
                  <div class="text-caption text-grey">
                    <q-icon name="comment" size="sm" />
                    {{ post.comments }}
                  </div>
                  <q-chip
                    :color="getStatusColor(post.status)"
                    text-color="white"
                    size="sm"
                  >
                    {{ post.status }}
                  </q-chip>
                </div>
              </div>
              <div class="row q-mt-sm">
                <AdminButton
                  icon="edit"
                  label="Редактировать"
                  variant="default"
                  size="sm"
                  outline
                  @click="editPost(post.id)"
                />
                <AdminButton
                  icon="visibility"
                  label="Просмотр"
                  variant="info"
                  size="sm"
                  outline
                  @click="viewPost(post.id)"
                />
                <AdminButton
                  icon="delete"
                  label="Удалить"
                  variant="error"
                  size="sm"
                  outline
                  @click="deletePost(post.id)"
                />
              </div>
            </div>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-lg-4">
        <AdminCard
          title="Категории контента"
          icon="category"
          icon-color="success"
        >
          <div class="categories-list">
            <div
              v-for="category in contentCategories"
              :key="category.name"
              class="category-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div class="row items-center q-gutter-sm">
                  <q-icon :name="category.icon" :color="category.color" size="sm" />
                  <div>
                    <div class="text-caption text-weight-medium">{{ category.name }}</div>
                    <div class="text-caption text-grey">{{ category.count }} публикаций</div>
                  </div>
                </div>
                <div class="text-caption text-grey">{{ category.percentage }}%</div>
              </div>
              <q-linear-progress
                :value="category.percentage / 100"
                :color="category.color"
                class="q-mt-xs"
              />
            </div>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- Content Performance -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-6">
        <AdminCard
          title="Топ публикаций"
          icon="trending_up"
          icon-color="primary"
        >
          <div class="top-posts">
            <div
              v-for="(post, index) in topPosts"
              :key="post.id"
              class="top-post-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div class="col">
                  <div class="text-caption text-weight-medium">{{ post.title }}</div>
                  <div class="text-caption text-grey">{{ post.views }} просмотров</div>
                </div>
                <div class="text-caption text-grey">#{{ index + 1 }}</div>
              </div>
              <q-linear-progress
                :value="post.views / topPosts[0].views"
                color="primary"
                class="q-mt-xs"
              />
            </div>
          </div>
        </AdminCard>
      </div>

      <div class="col-12 col-md-6">
        <AdminCard
          title="Активность авторов"
          icon="people"
          icon-color="success"
        >
          <div class="authors-activity">
            <div
              v-for="author in authorsActivity"
              :key="author.name"
              class="author-item q-mb-md"
            >
              <div class="row items-center justify-between">
                <div class="row items-center q-gutter-sm">
                  <q-avatar size="32px" :color="author.color">
                    {{ author.name.charAt(0) }}
                  </q-avatar>
                  <div>
                    <div class="text-caption text-weight-medium">{{ author.name }}</div>
                    <div class="text-caption text-grey">{{ author.posts }} публикаций</div>
                  </div>
                </div>
                <div class="text-caption text-grey">{{ author.views }} просмотров</div>
              </div>
              <q-linear-progress
                :value="author.posts / Math.max(...authorsActivity.map(a => a.posts))"
                :color="author.color"
                class="q-mt-xs"
              />
            </div>
          </div>
        </AdminCard>
      </div>
    </div>

    <!-- Content Calendar -->
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <AdminCard
          title="Календарь публикаций"
          icon="calendar_today"
          icon-color="info"
        >
          <div class="content-calendar">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-8">
                <div class="calendar-placeholder">
                  <q-icon name="calendar_today" size="100px" color="grey-4" />
                  <div class="text-h6 text-grey-6 q-mt-md">Календарь публикаций</div>
                  <div class="text-caption text-grey">Здесь будет календарь с запланированными публикациями</div>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="upcoming-posts">
                  <h6 class="text-subtitle1 q-mb-md">Предстоящие публикации</h6>
                  <div
                    v-for="post in upcomingPosts"
                    :key="post.id"
                    class="upcoming-post-item q-mb-sm"
                  >
                    <div class="row items-center q-gutter-sm">
                      <q-icon :name="post.icon" :color="post.color" size="sm" />
                      <div class="col">
                        <div class="text-caption text-weight-medium">{{ post.title }}</div>
                        <div class="text-caption text-grey">{{ post.scheduledDate }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import AdminCard from 'components/Admin/UI/AdminCard.vue'
import AdminButton from 'components/Admin/UI/AdminButton.vue'

export default defineComponent({
  name: 'AdminContent',
  components: {
    AdminCard,
    AdminButton
  },
  setup () {
    const loading = ref(false)

    // Mock content statistics
    const contentStats = ref({
      totalPosts: 89,
      newPostsThisWeek: 12,
      drafts: 5,
      totalViews: 45620,
      viewsGrowth: 15.3,
      totalComments: 234,
      commentsGrowth: 8.7
    })

    const recentPosts = ref([
      {
        id: 1,
        title: 'Новый сезон начинается!',
        category: 'Новости клуба',
        categoryIcon: 'sports_soccer',
        categoryColor: 'primary',
        author: 'Администратор',
        date: '2 часа назад',
        views: 1240,
        comments: 23,
        status: 'Опубликовано'
      },
      {
        id: 2,
        title: 'Интервью с главным тренером',
        category: 'Интервью',
        categoryIcon: 'mic',
        categoryColor: 'success',
        author: 'Редактор',
        date: '1 день назад',
        views: 890,
        comments: 15,
        status: 'Опубликовано'
      },
      {
        id: 3,
        title: 'Анализ последнего матча',
        category: 'Аналитика',
        categoryIcon: 'analytics',
        categoryColor: 'warning',
        author: 'Аналитик',
        date: '2 дня назад',
        views: 1560,
        comments: 31,
        status: 'Черновик'
      }
    ])

    const contentCategories = ref([
      { name: 'Новости клуба', count: 35, percentage: 39, icon: 'sports_soccer', color: 'primary' },
      { name: 'Интервью', count: 18, percentage: 20, icon: 'mic', color: 'success' },
      { name: 'Аналитика', count: 15, percentage: 17, icon: 'analytics', color: 'warning' },
      { name: 'История', count: 12, percentage: 13, icon: 'history', color: 'info' },
      { name: 'Другое', count: 9, percentage: 11, icon: 'more_horiz', color: 'grey' }
    ])

    const topPosts = ref([
      { id: 1, title: 'Победа в чемпионате!', views: 3240 },
      { id: 2, title: 'Новый игрок в команде', views: 2890 },
      { id: 3, title: 'Интервью с капитаном', views: 2150 },
      { id: 4, title: 'Анализ сезона', views: 1890 },
      { id: 5, title: 'История клуба', views: 1560 }
    ])

    const authorsActivity = ref([
      { name: 'Администратор', posts: 25, views: 12400, color: 'primary' },
      { name: 'Редактор', posts: 18, views: 8900, color: 'success' },
      { name: 'Аналитик', posts: 12, views: 6700, color: 'warning' },
      { name: 'Журналист', posts: 8, views: 4200, color: 'info' }
    ])

    const upcomingPosts = ref([
      {
        id: 1,
        title: 'Пресс-конференция',
        scheduledDate: 'Завтра, 15:00',
        icon: 'event',
        color: 'primary'
      },
      {
        id: 2,
        title: 'Обзор матча',
        scheduledDate: 'Послезавтра, 20:00',
        icon: 'sports_soccer',
        color: 'success'
      },
      {
        id: 3,
        title: 'Интервью с игроком',
        scheduledDate: 'Четверг, 12:00',
        icon: 'mic',
        color: 'warning'
      }
    ])

    const getStatusColor = (status) => {
      switch (status) {
        case 'Опубликовано':
          return 'positive'
        case 'Черновик':
          return 'warning'
        case 'На модерации':
          return 'info'
        default:
          return 'grey'
      }
    }

    const createContent = () => {
      console.log('Creating new content')
      // Логика создания контента
    }

    const editPost = (postId) => {
      console.log('Editing post:', postId)
      // Логика редактирования поста
    }

    const viewPost = (postId) => {
      console.log('Viewing post:', postId)
      // Логика просмотра поста
    }

    const deletePost = (postId) => {
      console.log('Deleting post:', postId)
      // Логика удаления поста
    }

    const refreshContent = async () => {
      loading.value = true
      // Имитация загрузки данных
      await new Promise(resolve => setTimeout(resolve, 1000))
      loading.value = false
    }

    onMounted(() => {
      refreshContent()
    })

    return {
      loading,
      contentStats,
      recentPosts,
      contentCategories,
      topPosts,
      authorsActivity,
      upcomingPosts,
      getStatusColor,
      createContent,
      editPost,
      viewPost,
      deletePost,
      refreshContent
    }
  }
})
</script>

<style lang="scss" scoped>
.admin-content-dashboard {
  .content-header {
    h1 {
      margin: 0;
      color: #333;
    }
  }

  .content-list {
    .content-item {
      padding: 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #fafafa;

      &:hover {
        background: #f5f5f5;
      }
    }
  }

  .categories-list {
    .category-item {
      padding: 8px 0;
    }
  }

  .top-posts {
    .top-post-item {
      padding: 8px 0;
    }
  }

  .authors-activity {
    .author-item {
      padding: 8px 0;
    }
  }

  .content-calendar {
    .calendar-placeholder {
      height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #999;
    }

    .upcoming-posts {
      .upcoming-post-item {
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .admin-content-dashboard {
    .content-header {
      .row {
        flex-direction: column;
        align-items: flex-start;

        .row {
          margin-top: 16px;
          width: 100%;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
