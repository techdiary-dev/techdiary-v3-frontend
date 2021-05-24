<template>
  <div>
    <div class="p-4 my-4 bg-yellow-100 border-2 border-yellow-200">
      <div class="flex justify-between">
        <p>পেইজ ভিউ</p>
        <div>
          <svg
            v-if="$fetchState.pending"
            class="w-5 h-5 mr-2 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span v-else>{{ $bn(pageviews) }}</span>
        </div>
      </div>

      <div class="flex justify-between">
        <p>ভিজিটর</p>
        <svg
          v-if="$fetchState.pending"
          class="w-5 h-5 mr-2 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span v-else>{{ $bn(visitors) }}</span>
      </div>

      <div class="flex justify-between">
        <p>গড় স্থায়িত্বকাল</p>
        <div>
          <svg
            v-if="$fetchState.pending"
            class="w-5 h-5 mr-2 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span v-else>{{ average_duration }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  fetchOnServer: false,
  props: ['url'],
  data() {
    return {
      pageviews: 0,
      visit_duration: 0,
      visitors: 0,
    }
  },
  async fetch() {
    const { results } = await this.$axios.$get(
      'https://techdiary-stats.netlify.app/.netlify/functions/page-views?url=' +
        this.url
    )
    this.pageviews = results.pageviews.value
    this.visit_duration = results.visit_duration.value
    this.visitors = results.visitors.value
  },
  computed: {
    average_duration() {
      const minutes = Math.floor(this.visit_duration / 60)
      const seconds = Math.floor(this.visit_duration % 60)
      return `${this.$bn(minutes)}মি. ${this.$bn(seconds)}সে.`
    },
  },
}
</script>
