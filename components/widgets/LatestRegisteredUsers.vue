<template>
  <div>
    <h3 class='-mb-4 text-dark'>সর্বশেষ নিবন্ধিত ব্যবহারকারী</h3>

    <div v-if='$fetchState.pending'>
      <skelleton-user-list v-for='i in new Array(10)' :key='i' />
    </div>
    <div v-else>
      <div v-for='user in users' :key='user.id' class='flex items-center my-4'>
        <nuxt-link
          :to="{ name: 'username', params: { username: user.username } }"
        >
          <div class="w-10 h-10 overflow-hidden rounded-full">
            <image-widget
              crop="scale"
              width="40"
              fetchFormat="auto"
              quality="auto"
              loading="lazy"
              :imageUrl="user.profilePhoto"
            />
          </div>
        </nuxt-link>

        <div class="ml-2">
          <h3 class="text-lg text-dark">
            <nuxt-link
              :to="{ name: 'username', params: { username: user.username } }"
            >
              {{ user.name }}
            </nuxt-link>
          </h3>
          <p class='text-sm text-dark-secondary'>
            {{ $moment(user.joined).fromNow() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  fetchOnServer: false,
  async fetch() {
    const { data: users } = await this.$axios.$get('/api/users?limit=10')
    this.users = users
  },

  data() {
    return {
      users: [],
    }
  },
}
</script>
