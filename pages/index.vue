<template>
  <div>
    <!-- <template #top>
      <hero v-if="!$auth.loggedIn" />
    </template> -->

    <editor-fake-editor />

    <div>
      <ArticleCard
        v-for='article in articles'
        class='mb-5'
        :key='article.id'
        :article='article'
      />

      <div v-observe-visibility='visibilityChanged' />
    </div>
    <div v-if='$fetchState.pending'>
      <template v-for='i in new Array(4)'>

        <skelleton-article-card :key='"article-card " + i' />
      </template>
      <div class='grid place-content-center'>
        <loader-spin />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home',
  head() {
    return {
      title: 'নীড়',
      meta: [
        {
          name: 'description',
          content: `টেকডায়েরি | বাংলার প্রোগ্রামিং নেটওয়ার্ক`
        },
        {
          property: 'og:title',
          content: `টেকডায়েরি | বাংলার প্রোগ্রামিং নেটওয়ার্ক`
        },
        {
          property: 'og:url',
          content: 'https://www.techdiary.dev'
        },
        {
          property: 'og:description',
          content: `টেকডায়েরি | বাংলার প্রোগ্রামিং নেটওয়ার্ক`
        },
        {
          property: 'og:image',
          content:
            'https://res.cloudinary.com/techdiary-dev/image/fetch/c_scale,f_auto,q_auto,w_1200/https://user-images.githubusercontent.com/7611746/82744130-38b0fd80-9d96-11ea-8223-62d62a56566f.png'
        },
        {
          property: 'og:image:width',
          content: '1200'
        },

        {
          property: 'og:image:height',
          content: '630'
        }
      ]
    }
  },
  data() {
    return {
      articles: [],
      pageMeta: {
        current_page: 1,
        last_page: null
      }
    }

  },
  fetchOnServer: false,
  async fetch() {
    try {
      const {
        data,
        meta: { current_page, last_page }
      } = await this.$axios.$get(`/api/articles?page=${this.pageMeta.current_page}`)

      this.articles = this.articles.concat(data)
      this.pageMeta = { current_page, last_page }
    } catch (error) {
      console.log({ error })
    }
  },
  methods: {
    async visibilityChanged(isVisible) {
      if (isVisible) {
        if (this.pageMeta.current_page >= this.pageMeta.last_page) {
          return
        }
        this.pageMeta.current_page++

        await this.$fetch()
      }
    },
  },
}
</script>
