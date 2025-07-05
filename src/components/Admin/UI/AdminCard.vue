<template>
  <q-card
    class="admin-card"
    :class="cardClasses"
    :elevation="elevation"
    :flat="flat"
  >
    <!-- Header -->
    <q-card-section v-if="title || $slots.header" class="admin-card-header">
      <div class="row items-center justify-between">
        <div class="row items-center q-gutter-sm">
          <q-icon
            v-if="icon"
            :name="icon"
            :color="iconColor"
            :size="iconSize"
          />
          <div v-if="title" class="text-h6 admin-card-title">{{ title }}</div>
        </div>
        <div v-if="$slots.header" class="admin-card-header-actions">
          <slot name="header" />
        </div>
      </div>
      <div v-if="subtitle" class="text-caption text-grey q-mt-xs">{{ subtitle }}</div>
    </q-card-section>

    <!-- Content -->
    <q-card-section v-if="$slots.default" class="admin-card-content">
      <slot />
    </q-card-section>

    <!-- Actions -->
    <q-card-actions v-if="$slots.actions" class="admin-card-actions">
      <slot name="actions" />
    </q-card-actions>

    <!-- Loading overlay -->
    <q-inner-loading v-if="loading" :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'AdminCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: 'primary'
    },
    iconSize: {
      type: String,
      default: '24px'
    },
    elevation: {
      type: Number,
      default: 2
    },
    flat: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'default', // default, success, warning, error, info
      validator: (value) => ['default', 'success', 'warning', 'error', 'info'].includes(value)
    },
    padding: {
      type: String,
      default: 'md', // none, sm, md, lg
      validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value)
    }
  },
  setup (props) {
    const cardClasses = computed(() => [
      `admin-card--${props.variant}`,
      `admin-card--padding-${props.padding}`
    ])

    return {
      cardClasses
    }
  }
})
</script>

<style lang="scss" scoped>
.admin-card {
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
}

.admin-card-header {
  border-bottom: 1px solid #e0e0e0;
  background: #fafafa;

  .admin-card-title {
    font-weight: 600;
    color: #333;
  }

  .admin-card-header-actions {
    .q-btn {
      margin-left: 8px;
    }
  }
}

.admin-card-content {
  &.admin-card--padding-none {
    padding: 0;
  }

  &.admin-card--padding-sm {
    padding: 12px;
  }

  &.admin-card--padding-md {
    padding: 16px;
  }

  &.admin-card--padding-lg {
    padding: 24px;
  }
}

.admin-card-actions {
  border-top: 1px solid #e0e0e0;
  background: #fafafa;
  padding: 12px 16px;

  .q-btn {
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
}

// Variants
.admin-card--success {
  border-left: 4px solid #4caf50;

  .admin-card-header {
    background: #f1f8e9;
  }
}

.admin-card--warning {
  border-left: 4px solid #ff9800;

  .admin-card-header {
    background: #fff3e0;
  }
}

.admin-card--error {
  border-left: 4px solid #f44336;

  .admin-card-header {
    background: #ffebee;
  }
}

.admin-card--info {
  border-left: 4px solid #2196f3;

  .admin-card-header {
    background: #e3f2fd;
  }
}

// Responsive
@media (max-width: 768px) {
  .admin-card {
    &:hover {
      transform: none;
    }
  }

  .admin-card-header {
    .row {
      flex-direction: column;
      align-items: flex-start;

      .admin-card-header-actions {
        margin-top: 8px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
