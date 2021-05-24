<template>
  <div>
    <div class="mb-5">
      <nuxt-link
        :to="{ name: 'dashboard-diaries-new' }"
        class="flex items-center justify-center px-2 py-3 mb-6 transition duration-200 shadow hover:shadow-lg bg-primary rounded-3xl"
      >
        <svg
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span class="inline-block ml-2">নতুন ডায়েরি</span>
      </nuxt-link>

      <nuxt-link
        :to="{ name: 'dashboard-diaries' }"
        class="sidebar__link"
        exact-active-class="sidebar__link--active"
      >
        <svg
          class="w-4 h-4"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>

        <span class="inline-block ml-2">আমার ডায়েরি সমূহ</span>
      </nuxt-link>

      <nuxt-link
        class="sidebar__link"
        :to="{ name: 'dashboard-bookmarks' }"
        exact-active-class="sidebar__link--active"
      >
        <svg
          class="w-4 h-4"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="inline-block ml-2">বুকমার্ক সমূহ</span>
      </nuxt-link>
    </div>

    <div class="mb-5">
      <h3 class="mb-3 text-sm font-bold text-gray-500 dark:text-gray-300">
        সেটিংস
      </h3>

      <nuxt-link
        class="sidebar__link"
        :to="{ name: 'dashboard-settings' }"
        exact-active-class="sidebar__link--active"
      >
        <svg
          class="w-4 h-4"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
          ></path>
        </svg>
        <span class="inline-block ml-2">প্রোফাইল হালনাগাদ</span>
      </nuxt-link>
      <nuxt-link
        title="Sessions"
        :to="{ name: 'dashboard-sessions' }"
        class="sidebar__link"
        exact-active-class="sidebar__link--active"
      >
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <span class="sidebar__label">Sessions</span>
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  &__icon {
    @apply w-4 h-4;
  }
  &__link {
    @apply flex items-center p-1 mb-1 dark:text-gray-300 hover:bg-paste-300 dark:hover:text-gray-800 rounded transition duration-300;
    //&:hover {
    //  --tw-bg-opacity: .70;
    //}

    &--active {
      @apply bg-paste-300 dark:text-gray-800;
    }
  }
  &__label {
    @apply inline-block ml-2;
  }
}
</style>
