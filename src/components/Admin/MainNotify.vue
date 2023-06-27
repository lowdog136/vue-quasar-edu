<template>
  <div class="q-pa-md">
    <div class="row q-gutter-sm">
      <q-btn no-caps color="primary" @click="triggerCustomRegisteredType2" label="Прочтите пожалуйста" />
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'

export default {
  setup () {
    const $q = useQuasar()

    /**
     * The reason we have this here
     * is that the type needs to be
     * registered before using it.
     *
     * The best place would be a boot file instead
     * of a .vue file, otherwise it'll keep on
     * registering it every time your component
     * gets to be used :)
     */

    $q.notify.registerType('my-notif', {
      icon: 'announcement',
      progress: true,
      color: 'primary',
      textColor: 'orange-14',
      classes: 'glossy'
    })

    return {
      triggerCustomRegisteredType2 () {
        // this one overrides some of the original
        // options of the "my-notif" registered type
        $q.notify({
          type: 'my-notif',
          icon: 'info',
          message: 'Здраствуйте.<br> Если вы хотите каким то образом помочь в развитии сайта напиште мне на электронную почту. Мне нужен помощник по сайту. Нужно его наполнить информацией о команде, болельщиках. Почта: lowdog{одинтришесть}@gmail.com <br> Спасибо<br>',
          caption: 'SeverFans - сайт болельщиков ФК "Север" Мурманск',
          html: true,
          color: 'black'
        })
      }
    }
  }
}
</script>
