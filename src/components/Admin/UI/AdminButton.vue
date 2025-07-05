<template>
  <q-btn
    :class="buttonClasses"
    :color="color"
    :text-color="textColor"
    :icon="icon"
    :label="label"
    :loading="loading"
    :disabled="disabled"
    :size="size"
    :flat="flat"
    :outline="outline"
    :round="round"
    :unelevated="unelevated"
    :no-caps="noCaps"
    :dense="dense"
    :no-wrap="noWrap"
    :type="type"
    @click="$emit('click', $event)"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>

    <template v-if="loading" #loading>
      <q-spinner size="sm" />
    </template>
  </q-btn>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'AdminButton',
  props: {
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    },
    textColor: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md', // xs, sm, md, lg, xl
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    flat: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    unelevated: {
      type: Boolean,
      default: false
    },
    noCaps: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: false
    },
    noWrap: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button', // button, submit, reset
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    variant: {
      type: String,
      default: 'default', // default, success, warning, error, info
      validator: (value) => ['default', 'success', 'warning', 'error', 'info'].includes(value)
    }
  },
  emits: ['click'],
  setup (props) {
    const buttonClasses = computed(() => [
      'admin-button',
      `admin-button--${props.variant}`,
      `admin-button--size-${props.size}`
    ])

    return {
      buttonClasses
    }
  }
})
</script>

<style lang="scss" scoped>
.admin-button {
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
}

// Size variants
.admin-button--size-xs {
  font-size: 0.75rem;
  padding: 4px 8px;
  min-height: 24px;
}

.admin-button--size-sm {
  font-size: 0.875rem;
  padding: 6px 12px;
  min-height: 32px;
}

.admin-button--size-md {
  font-size: 1rem;
  padding: 8px 16px;
  min-height: 40px;
}

.admin-button--size-lg {
  font-size: 1.125rem;
  padding: 12px 20px;
  min-height: 48px;
}

.admin-button--size-xl {
  font-size: 1.25rem;
  padding: 16px 24px;
  min-height: 56px;
}

// Variants
.admin-button--success {
  &.q-btn--standard {
    background: #4caf50;
    color: white;

    &:hover {
      background: #45a049;
    }
  }

  &.q-btn--outline {
    color: #4caf50;
    border-color: #4caf50;

    &:hover {
      background: #4caf50;
      color: white;
    }
  }
}

.admin-button--warning {
  &.q-btn--standard {
    background: #ff9800;
    color: white;

    &:hover {
      background: #f57c00;
    }
  }

  &.q-btn--outline {
    color: #ff9800;
    border-color: #ff9800;

    &:hover {
      background: #ff9800;
      color: white;
    }
  }
}

.admin-button--error {
  &.q-btn--standard {
    background: #f44336;
    color: white;

    &:hover {
      background: #d32f2f;
    }
  }

  &.q-btn--outline {
    color: #f44336;
    border-color: #f44336;

    &:hover {
      background: #f44336;
      color: white;
    }
  }
}

.admin-button--info {
  &.q-btn--standard {
    background: #2196f3;
    color: white;

    &:hover {
      background: #1976d2;
    }
  }

  &.q-btn--outline {
    color: #2196f3;
    border-color: #2196f3;

    &:hover {
      background: #2196f3;
      color: white;
    }
  }
}

// Disabled state
.admin-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;

  &:hover {
    transform: none;
    box-shadow: none;
  }
}

// Loading state
.admin-button.q-btn--loading {
  pointer-events: none;
}

// Responsive
@media (max-width: 768px) {
  .admin-button {
    &:hover:not(:disabled) {
      transform: none;
    }
  }

  .admin-button--size-lg,
  .admin-button--size-xl {
    font-size: 1rem;
    padding: 8px 16px;
    min-height: 40px;
  }
}

@media (max-width: 480px) {
  .admin-button {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>
