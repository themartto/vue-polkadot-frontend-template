import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: colors.grey.darken1,
        secondary: colors.grey.darken3,
        accent: colors.green.darken4,
        background: colors.grey.darken4
      }
    },
    dark: true
  }
})
