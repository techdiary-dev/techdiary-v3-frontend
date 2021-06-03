<template>
  <div
    v-if='comment.children'
    class='pl-3 my-3 ml-5 border border-gray-300 border-opacity-25 border-dashed rounded dark:border-gray-800'
  >
    <article-comment-body
      :comment='comment'
      :level='level'
      :showReplyButton='showReplyButton'
    />
    <template v-for='childComment in comment.children'>
      <ArticleComment
        :comment='childComment'
        :key='childComment.id'
        :level='level + 1'
      />
    </template>

  </div>
  <div
    class="pl-3 my-3 ml-5 border border-gray-300 border-opacity-25 border-dashed rounded dark:border-gray-800"
    v-else
  >
    <article-comment-body
      :comment="comment"
      :showReplyButton="showReplyButton"
      :level="level"
    />
  </div>
</template>

<script>
export default {
  props: ['comment', 'level'],
  data() {
    return {
      showReplyButton: this.level < 2,
    }
  },
}
</script>
