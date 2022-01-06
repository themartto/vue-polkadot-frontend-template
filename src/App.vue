<template>
  <v-app>
    <v-main>
      <v-app-bar elevation="0">
        <v-img
          :src="require('../public/favicon.svg')"
          alt="logo"
          max-height="40px"
          max-width="40px"
        ></v-img>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-tab to="/">Home</v-tab>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-tab>
          <v-btn @click="changeTheme">
            <v-icon>
              mdi-theme-light-dark
            </v-icon>
          </v-btn>
        </v-tab>
        <v-tab @click="openAccountsModal" v-if="!this.$store.state.wallet.address">
          <v-btn rounded depressed color="primary">{{ this.$store.state.wallet }}</v-btn>
        </v-tab>
        <v-tab @click="openAccountsModal" v-else>
          <v-btn rounded depressed color="success">{{ this.$store.state.wallet.address.slice(0, 6) + '...' }}</v-btn>
        </v-tab>
      </v-app-bar>
      <v-container>
        <v-row>
          <v-col></v-col>
          <v-col>
            <v-container>
              <v-row>
                <v-container>
                  <v-card>
                    <v-card-title class="justify-center">Node Info</v-card-title>
                    <v-card-text class="text-center">
                      Chain: {{this.chainData.chain}} <br>
                      Name: {{this.chainData.nodeName}} <br>
                      Node Version: {{this.chainData.nodeVersion}} <br>
                    </v-card-text>
                  </v-card>
                </v-container>
              </v-row>
            </v-container>
          </v-col>
          <v-col></v-col>
        </v-row>
        <v-dialog
          v-model="showAccountsModal"
          width="500"
        >
          <accounts v-if="showAccountsModal" v-on:closeAccountsModalEvent="closeAccountsModal"></accounts>
        </v-dialog>
        <v-row>
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { ApiPromise, WsProvider } from '@polkadot/api'
import { Vue, Component } from 'vue-property-decorator'
import Accounts from './components/Accounts.vue'

@Component({
  components: {
    accounts: Vue.extend(Accounts)
  }
})
export default class App extends Vue {
  wallet = this.$store.state.wallet;
  showAccountsModal = false;
  api = {}
  chainData = {}

  async mounted (): Promise<void> {
    const wsProvider = new WsProvider('ws://localhost:9944')

    this.api = await ApiPromise.create({
      provider: wsProvider
    })

    // @ts-ignore
    await this.api.isReady

    this.chainData = {
      // @ts-ignore
      chain: await this.api.rpc.system.chain(),
      // @ts-ignore
      nodeName: await this.api.rpc.system.name(),
      // @ts-ignore
      nodeVersion: await this.api.rpc.system.version()
    }
  }

  openAccountsModal (): void {
    this.$data.showAccountsModal = true
  }

  closeAccountsModal (): void {
    this.$data.showAccountsModal = false
  }

  changeTheme (): void {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
  }
}
</script>
<style scoped>
</style>
