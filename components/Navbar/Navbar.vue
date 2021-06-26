<template>
  <div class="fixed top-0 left-0 z-50 w-full">
    <div
      class="flex items-center justify-between px-4 py-1 bg-gray-800 shadow-sm  md:px-10 h-14"
    >
      <nuxt-link :to="{ name: 'index' }">
        <navbar-logo />
      </nuxt-link>

      <navbar-search />

      <div class="flex items-center justify-end">
        <navbar-links class="mr-5" />
        <client-only>
          <navbar-user-action />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$echo
      .join('users')
      .here((users) => {
        this.$store.commit('onlineusers/SET_USERS', users)
      })
      .joining((user) => {
        this.$store.commit('onlineusers/ADD_USER', user)
      })
      .leaving((user) => {
        this.$store.commit('onlineusers/REMOVE_USER', user)
      })
  },
}
</script>
