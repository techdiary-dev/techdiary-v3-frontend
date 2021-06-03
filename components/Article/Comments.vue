<template>
  <div>
    <!-- <button class="w-full py-20 my-6 bg-gray-100 rounded-md shadow">
      <span class="flex items-center justify-center">
        <svg
          width="15"
          height="15"
          class="mr-4"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 9.66667C14 10.0498 13.8478 10.4172 13.5769 10.688C13.306 10.9589 12.9386 11.1111 12.5556 11.1111H3.88889L1 14V2.44444C1 2.06135 1.15218 1.69395 1.42307 1.42307C1.69395 1.15218 2.06135 1 2.44444 1H12.5556C12.9386 1 13.306 1.15218 13.5769 1.42307C13.8478 1.69395 14 2.06135 14 2.44444V9.66667Z"
            stroke="#71717A"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        মন্তব্য যুক্ত করুন
      </span>
    </button> -->

    <div class="mb-6 mt-10" v-if="$auth.loggedIn">
      <textarea
        name="comment"
        rows="3"
        class="w-full h-auto p-3 mb-2 rounded dark:bg-gray-700 bg-gray-50 text-dark"
        v-model="commentText"
      ></textarea>
      <button class="px-3 py-2 rounded bg-primary" @click="commentCreate">
        Submit
      </button>
    </div>
<template v-for='comment in comments'>

  <article-comment

    :comment='comment'
    :key='comment.id'
    :level='0'
  />
</template>
        <div
      class="flex items-center justify-center h-full"
      v-if="$fetchState.pending"
    >
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
    </div>
     <div v-observe-visibility="visibilityChanged" />
  </div>
</template>

<script>
import validationHelper from '~/mixins/validationHelper'
import { mapState } from 'vuex'

export default {
  mixins: [validationHelper],
  data() {
    return {
      articleComments: [],
     pageMeta: { current_page: 1, last_page: 1 },
      commentText: '',
    }
  },
  computed: {
    ...mapState({ comments: (state) => state.comment.comments }),
  },
  fetchOnServer: false,
  async fetch() {
    const {
      data : {data, current_page, last_page },
    } = await this.$axios.get(
      `/api/articles/${this.$route.params.articleSlug}/comments?page=${this.pageMeta.current_page}`
    )
    // const comment = await this.$axios.$get(`/api/articles/${this.$route.params.articleSlug}/comments?page=${1}`)

    this.articleComments = this.articleComments.concat(data)
    this.pageMeta = { current_page, last_page }
    this.$store.commit('comment/SET_COMMENTS', this.articleComments)
  },
  methods: {
    onDelete(comment) {
      this.comments = this.comments.filter((cmnt) => cmnt.id !== comment.id)
    },
    async commentCreate() {
      try {
        let comment = await this.$axios.$post(
          `/api/articles/${this.$route.params.articleSlug}/comments`,
          { body: this.commentText }
        )
        comment = {
          ...comment,
          user: {
            id: this.$auth.user.id,
            name: this.$auth.user.name,
            profilePhoto: this.$auth.user.profilePhoto,
            username: this.$auth.user.username,
          },
        }
        this.$store.commit('comment/CREATE_COMMENT', { comment, level: 0 })
        this.$toast.success('মন্তব্য যুক্ত হয়েছে')
        this.commentText = ''
      } catch (e) {
        if (e.response.status !== 500) {
          const errors = this.jsonToPlainErrorText(e.response.data?.errors)
          this.$toast.error(errors)
        }
      }
    },
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
