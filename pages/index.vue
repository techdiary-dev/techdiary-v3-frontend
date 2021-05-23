<template>
  <layout-home>
    <template #top>
      <hero v-if="!$auth.loggedIn" />
    </template>

    <editor-fake-editor />

    <div v-if="$fetchState.pending">
      <skelleton-article-card v-for="i in new Array(6)" :key="i" />
    </div>

    <div v-else>
      <ArticleCard
        v-for="article in articles"
        class="mb-5"
        :key="article.id"
        :article="article"
      />
      <div
        v-observe-visibility="visibilityChanged"
        class="flex items-center justify-center"
      >
        <loader-spin />
      </div>
    </div>
  </layout-home>
</template>

<script>
export default {
  head: {
    title: 'নীড়',
    meta: [
      {
        name: 'description',
        content: `টেকডায়েরি | বাংলার প্রোগ্রামিং নেটওয়ার্ক`,
      },
      {
        property: 'og:title',
        content: `টেকডায়েরি | বাংলার প্রোগ্রামিং নেটওয়ার্ক`,
      },
      {
        property: 'og:image',
        content:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616454527/static-assets/ysbycrhmbjdxqirpskdl.jpg',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },

      {
        property: 'og:image:height',
        content: '630',
      },
    ],
  },
  data: () => ({
    articles: [],
    initialLoading: true,
    pageMeta: {
      current_page: 1,
      last_page: null,
    },
  }),
  async fetch() {
    try {
      const {
        data,
        meta: { current_page, last_page }
      } = await this.$axios.$get('/api/articles')

      // this.initialLoading = false

      this.articles = data
      this.pageMeta = { current_page, last_page }
    } catch (error) {
    }
  },
  fetchOnServer: false,
  methods: {
    async loadMore() {
      const { data: articles } = await this.$axios.$get(
        `/api/articles?page=${this.pageMeta.current_page}`
      )
      this.articles.push(...articles)
    },
    async visibilityChanged(isVisible) {
      if (!isVisible) return
      if (this.pageMeta.currentPage >= this.pageMeta.lastPage) return
      this.pageMeta.current_page++
      await this.loadMore()
    },
  },
}
</script>
