<template>
  <div class='flex flex-col min-h-[80vh] overflow-y-auto'>
    <section class='flex justify-between'>
      <button @click='closeMeta' class='grid place-content-center bg-red-500 text-white rounded-md p-2'>
        <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>

      <button
        @click="$emit('saveArticle')"
        class='flex items-center justify-center px-5 py-1 text-gray-700 rounded-full bg-primary'
      >
        <svg
          v-if='loading'
          class='w-5 h-5 mr-2 animate-spin'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            class='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            stroke-width='4'
          ></circle>
          <path
            class='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
        <span v-if='loading'>অপেক্ষা করুন</span>
        <span v-else>সেভ করুন</span>
      </button>
    </section>
    <section class='my-4'>
      <h3 class='text-dark text-xl font-bold tracking-relaxed my-3'>আপনি কি ডায়েরি পাবলিশ করার জন্যে প্রস্তুত? </h3>
      <p class='text-dark leading-relaxed'>সব কিছু ঠিকমত দেখে নিন। ডায়েরি যদি প্রথম পাতায় দেখাতে চান, তাহলে <strong>"ডায়েরি
        পাবলিশ
        করুন"</strong> এর পাশে
        টিক চিহ্ন দিন</p>
    </section>


    <div class='my-3 px-3 py-4 border border-gray-500 rounded '>
      <label for='multi-tag' class='text-dark text-lg font-bold'>ট্যাগ</label>
      <multi-select
        id='multi-tag'
        placeholder='ট্যাগ নির্বাচন করুন'
        class='mt-3'
        selectLabel='নির্বাচন করতে এন্টার চাপুন'
        tagPlaceholder='ট্যাগ তৈরি করতে এন্টার চাপুন'
        :options='tagOptions'
        :multiple='true'
        :hideSelected='true'
        :taggable='true'
        :max='10'
        @tag='createNewTag'
        track-by='id'
        label='name'
        v-model='article.tags'
        :closeOnSelect='false'
      ></multi-select>
    </div>
    <div class='flex items-center text-dark ml-2'>
      <input type='checkbox' class='text-primary rounded' id='isPublished' v-model='article.isPublished' />
      <label class='ml-2' for='isPublished'>ডায়েরি পাবলিশ করুন</label>
    </div>


  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tagOptions: [],
    }
  },
  async mounted() {
    const { data } = await this.$axios.$get('/api/tags')
    this.tagOptions = data
  },
  methods: {
    async createNewTag(name) {
      const { data } = await this.$axios.$post('/api/tags', { name })
      this.tagOptions.push(data)
      this.article.tags.push(data)
    },
    closeMeta() {
      this.$emit('closeMeta')
    }
  },
}
</script>
