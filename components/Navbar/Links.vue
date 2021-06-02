<template>
  <div class="flex space-x-2" v-bind="$attrs">
    <!--    Home Link-->
    <nuxt-link :to="{ name: 'index' }" class="navbar-link">
      <svg
        width="20"
        class="text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    </nuxt-link>

    <!-- Search icon -->
    <nuxt-link
      class="flex items-center justify-center w-8 h-8 transition duration-150 bg-gray-600 rounded-full md:hidden hover:bg-gray-200 focus:outline-none"
      :to="{ name: 'search' }"
    >
      <svg
        width="20"
        class="text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        />
      </svg>
    </nuxt-link>
    <client-only>
      <!-- new article link -->
      <button @click='goToEditor' class='navbar-link' v-if='$auth.loggedIn'>
        <svg
          width='20'
          class='text-gray-300'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M12 6v6m0 0v6m0-6h6m-6 0H6'
          ></path>
        </svg>
    </button>

      <button @click="colorModeSwitcher" class="navbar-link">
        <svg
          v-if="$colorMode.value === 'light'"
          class="text-gray-300"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          ></path>
        </svg>
        <svg
          v-if="$colorMode.value === 'dark'"
          class="dark:text-gray-300"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      </button>
    </client-only>
  </div>
</template>

<script>
export default {
  methods: {
    colorModeSwitcher() {
      this.$colorMode.preference =
        this.$colorMode.value == 'dark' ? 'light' : 'dark'
    },
    goToEditor() {
      if (this.$auth.loggedIn) {
        this.$router.push({ name: 'dashboard-diaries-new' })
      } else {
        this.$toast.error('নতুন ডায়েরি লিখতে আপনাকে অবশ্যই আগে লগইন করতে হবে।')
      }
    },
  },
}
</script>

<style scoped lang="scss">
.navbar-link {
  @apply flex items-center justify-center w-8 h-8 transition duration-150 rounded-full bg-gray-600 hover:bg-gray-500 focus:outline-none;
}
</style>
