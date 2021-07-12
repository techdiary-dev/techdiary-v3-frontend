<template>
  <div>
    <div v-if="$fetchState.pending" class="wrapper">
      <skelleton-article-details />
    </div>

    <div v-if="!$fetchState.pending && article" class="wrapper">
      <alert v-if="!article.isPublished" class="mb-8">
        অপ্রকাশিত ডায়েরি, তবে আপনি চাইলে URL এর মাধ্যমে যে কাউকে দেখাতে পারবেন।
        <template v-slot:sub-title>
          অপ্রকাশিত ডায়েরি প্রথম পাতায় দেখানো হবে না।
        </template>
      </alert>

      <div class="fixed hidden w-32 md:block top-25">
        <ArticleReactions :article="article" />
      </div>
      <div class="mx-auto md:w-8/12">
        <div v-if="article.thumbnail" class="overflow-hidden rounded-md">
          <image-widget
            crop="scale"
            width="1200"
            fetchFormat="auto"
            quality="auto"
            loading="lazy"
            :imageUrl="article.thumbnail"
            :alt="article.title"
          />
        </div>

        <!-- Title and meta start -->
        <div class="my-4">
          <h2
            class="text-3xl font-bold  md:text-4xl dark:text-gray-300 font-siliguri"
          >
            {{ article.title }}
          </h2>
          <p class="text-dark-secondary">
            {{ $moment(article.created_at).format('LLLL') }}
          </p>
          <!-- tags -->
          <div class="flex flex-wrap text-dark-secondary">
            <nuxt-link
              class="mr-2"
              :to="{ name: 'tags-name', params: { name: tag.name } }"
              v-for="tag in article.tags"
              :key="tag.id"
            >
              #{{ tag.name }}
            </nuxt-link>
          </div>
        </div>

        <!-- Title and meta end -->
        <article-user-info :article="article" />

        <article
          ref="content"
          class="my-6 content-typography text-dark max-w-none"
          :id="article.id"
          v-html="article.body"
        />
        
        <article-comments />
      </div>
    </div>
  </div>
</template>
<script>
import editorjsParser from '~/mixins/editorjsParser'
import reactions from '~/mixins/reactions'
import cloudinary from '~/mixins/cloudinary'

export default {
  name: 'techdiary-details',
  mixins: [reactions, editorjsParser, cloudinary],
  head() {
    return {
      title: this.article?.title,
      meta: [
        {
          name: 'description',
          content: `${this.article?.title} | Techdiary`,
        },
        {
          property: 'og:title',
          content: `${this.article?.title} | Techdiary`,
        },
        {
          property: 'og:image',
          content:
            this.article?.thumbnail ??
            this.socialMediaImage(
              this.article?.title,
              this.article?.user.username
            ),
        },
        {
          property: 'og:image:width',
          content: '1200',
        },

        {
          property: 'og:image:height',
          content: '630',
        },
        {
          property: 'twitter:site',
          content: '630',
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          property: 'twitter:image',
          content: this.article?.thumbnail,
        },
        {
          property: 'keywords',
          content: `${this.article?.tags.map((k) => k.name).join(',')}`,
        },
      ],
    }
  },
  data() {
    return {
      article: null,
      comments: [],
      articleProgress: 0,
      updatedCount: 0,
    }
  },
  mounted() {
     window.addEventListener('scroll', this.changeProgressCircleOnScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.changeProgressCircleOnScroll)
  },
  async fetch() {
    try {
      const { data: article } = await this.$axios.get(
        `api/articles/${this.$route.params.articleSlug}`
      )
      article.data.body = this.editorJsParser(article.data.body)
      // article.data.body = article.data.body
      this.article = article.data
      this.reactions = article.data.reactions
    } catch (error) {
      console.log(error)
      this.$nuxt.error({ statusCode: 400, message: 'ডায়েরি খুঁজে পাওয়া যায়নি' })
    }
  },
  computed: {
    userProfileUrl() {
      return {
        name: 'username',
        params: {
          username: this.article.user.username,
        },
      }
    },
  },
  methods: {
    changeProgressCircleOnScroll() {
      const scrollTop = window.scrollY,
        contentOffsetTop = this.$refs.content?.offsetTop,
        contentHeight = this.$refs.content?.offsetHeight,
        innerHeight = window.innerHeight
      let progress = Math.round(
        ((scrollTop - contentOffsetTop) / (contentHeight - innerHeight)) * 100
      )
      if (progress <= 0) {
        progress = 0
      } else if (progress >= 100 || contentHeight - innerHeight <= 0) {
        progress = 100
      }
      this.articleProgress = progress
    },
  },
}
</script>

<style></style>
