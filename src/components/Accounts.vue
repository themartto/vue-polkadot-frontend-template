<template>
  <transition name="modal">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Choose your account
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-select
            dense
            v-model="selected"
            :items="this.allAccounts"
            item-text="address"
            return-object
            outlined
            label="Choose Account"
          ></v-select>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          rounded
          depressed
          color="success"
          @click="close"
        >
          Accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'

@Component
export default class Accounts extends Vue {
  selected = {};
  allAccounts = [];

  async mounted (): Promise<void> {
    const extensions = await web3Enable('polkadot web app')

    if (extensions.length === 0) {
      // no extension installed, or the user did not accept the authorization
      // in this case we should inform the use and give a link to the extension
      // some notification handler
    }

    // @ts-ignore
    this.allAccounts = await web3Accounts()
  }

  close (): void {
    this.$store.commit('setWallet', this.selected)
    this.$emit('closeAccountsModalEvent')
  }
}
</script>

<style scoped>
</style>
