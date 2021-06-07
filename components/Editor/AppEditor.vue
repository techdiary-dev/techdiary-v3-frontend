<template>
  <div>
    <header
      class="sticky top-0 z-10 mx-auto bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 h-[72px] backdrop-filter backdrop-blur max-w-8xl firefox:bg-opacity-90 max-w-4xl px-3 md:px-0"
    >
      <nav class="flex items-center justify-between h-full">
        <nuxt-link
          :to="{ name: 'dashboard-diaries' }"
          class="flex items-center space-x-2 text-dark"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>

          <span>ডায়েরি সমূহ</span>
        </nuxt-link>
        <div class="flex items-center space-x-2">
          <button
            class="flex items-center justify-center px-3 py-2 space-x-1 transition duration-150 transform rounded-md text-dark opacity-90 focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-500"
            @click="openOptions"
          >
            <svg
              class="stroke-1 w-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>সেটিংস</span>
          </button>
          <button
            class='flex items-center justify-center px-5 py-1 rounded-full bg-primary'
            @click='openOptions'
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
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span v-if="loading">অপেক্ষা করুন...</span>
            <span v-else>সেভ করুন</span>
          </button>
        </div>
      </nav>
    </header>
    <!-- ======================================================= -->
    <!-- Editor Content start -->
    <!-- ======================================================= -->
    <div class="max-w-4xl px-3 mx-auto md:px-0 mt-7">
      <input
        type="file"
        class="hidden"
        ref="thumbnailFileInput"
        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
        @change="handleUploadImage"
      />
      <button
        @click="openUploadWindow"
        v-if="!this.article.thumbnail"
        class="flex px-4 py-1 my-4 space-x-1 transition duration-150 transform rounded-md text-dark opacity-90 focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-500"
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4.75 16L7.49619 12.5067C8.2749 11.5161 9.76453 11.4837 10.5856 12.4395L13 15.25M10.915 12.823C11.9522 11.5037 13.3973 9.63455 13.4914 9.51294C13.4947 9.50859 13.4979 9.50448 13.5013 9.50017C14.2815 8.51598 15.7663 8.48581 16.5856 9.43947L19 12.25M6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V6.75C19.25 5.64543 18.3546 4.75 17.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25Z"
          ></path>
        </svg>
        <span>কভার ছবি</span>
      </button>
      <div
        class="relative overflow-hidden rounded-md"
        :style="{ backgroundImage: `url(${this.article.thumbnail})` }"
      >
        <img
          class="object-fit"
          :src="this.article.thumbnail"
          v-if="this.article.thumbnail"
          alt="image cover"
        />
        <button
          @click="removeThumbnail"
          class="absolute p-2 bg-red-500 bg-opacity-50 rounded-md backdrop-blur backdrop-filter right-4 top-2 text-dark hover:bg-opacity-60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
      <div v-if='this.editorLoading' class='grid place-content-center'>
        <loader-spin />
      </div>
      <!-- Title -->
      <input
        type='text'
        class='w-full h-full my-3 text-3xl font-bold bg-transparent text-dark focus:outline-none border-0 focus:ring-0'
        placeholder='ডায়েরির শিরোনাম'
        v-model='article.title'
      />
      <div id='techdiary-editor' class='text-dark td-editor'></div>
    </div>
    <!-- ======================================================= -->
    <!-- Editor Content end -->
    <!-- ======================================================= -->

    <!-- ======================================================= -->
    <!-- Sidebar Content start -->
    <!-- ======================================================= -->
    <div
      class="fixed inset-0 z-30 w-full overflow-y-auto"
      :class="[showOptions ? 'visible' : 'invisible']"
    >
      <div
        class="flex items-end justify-end min-h-screen px-4 pt-4 pb-20 mr-3 text-right sm:block sm:p-0"
      >
        <!--
          Background overlay, show/hide based on modal state.
          Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        -->
        <transition
          enter-active-class="duration-300 ease-out"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            class="fixed inset-0 transition-opacity"
            aria-hidden="true"
            v-if="showOptions"
            @click="closeOptions"
          >
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
        </transition>

        <!--
          Modal panel, show/hide based on modal state.
          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
        <transition
          enter-active-class="duration-300 ease-out"
          enter-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          enter-to-class="translate-y-0 opacity-100 sm:scale-100"
          leave-active-class="duration-200 ease-in"
          leave-class="translate-y-0 opacity-100 sm:scale-100"
          leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="inline-block w-full max-w-sm overflow-hidden text-left align-bottom transition-all transform bg-white rounded-md shadow-xl sm:my-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
            v-if="showOptions"
          >
            <div class="w-full px-4 py-5 bg-white dark:bg-gray-800">
              <div>
                <div class="mt-3 text-center sm:mt-0 sm:text-left">
                  <div class="mt-2">
                    <editor-meta
                      @closeMeta="closeOptions"
                      :loading="loading"
                      :article="article"
                      @saveArticle="() => save()"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import upload from '~/mixins/upload'
export default {
  props: {
    'article-data': {
      type: Object,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [upload],
  data() {
    return {
      editor: null,
      showOptions: false,
      editorLoading: false,
      article: {
        body: this.articleData?.body || [],
        tags: this.articleData?.tags || [],
        title: this.articleData?.title || '',
        excerpt: '',
        isPublished: this.articleData?.isPublished || false,
        thumbnail: this.articleData?.thumbnail || ''
      }
    }
  },
  beforeDestroy() {
    this.editor?.destroy()
  },
  updated() {
    console.log({ title: this.article.title, body: this.article.body })
  },
  mounted() {
    const EditorJS = require('@editorjs/editorjs')
    this.editor = new EditorJS({
      data: { blocks: this.article.body },
      logLevel: 'ERROR',
      /**
       * Id of Element that should contain Editor instance
       */
      holder: 'techdiary-editor',
      placeholder: 'চলুন শুরু করা যাক চমৎকার একটা ডায়েরি 😍',
      tools: {
        /**
         * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
         */
        header: {
          class: require('@editorjs/header'),
          inlineToolbar: ['marker', 'link'],
          config: {
            placeholder: 'Header',
            levels: [2, 3],
          },
          shortcut: 'CMD+SHIFT+H',
        },
        underline: require('@editorjs/underline'),

        image: {
          class: require('@editorjs/image'),
          config: {
            uploader: {
              uploadByFile: async (file) => {
                const public_id = await this.uploadFile(
                  file,
                  'techdiary-article-assets'
                )
                const url = this.$cloudinary.image.url(public_id, { crop: 'scale' })

                return {
                  success: 1,
                  file: {
                    url,
                  },
                }
              },
            },
          },
        },

        /**
         * Or pass class directly without any configuration
         */
        //   // image: SimpleImage,

        list: {
          class: require('@editorjs/list'),
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+L',
        },
        inlineCode: {
          class: require('@editorjs/inline-code'),
          shortcut: 'CMD+SHIFT+M',
        },
        checklist: {
          class: require('@editorjs/checklist'),
          inlineToolbar: true,
        },

        quote: {
          class: require('@editorjs/quote'),
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author'
          },
          shortcut: 'CMD+SHIFT+O'
        },

        warning: require('@editorjs/warning'),
        linkTool: {
          class: require('@editorjs/link'),
          config: {
            endpoint: `${process.env.NUXT_ENV_SERVERLESS_URL}/metafetcher`
          }
        },
        marker: {
          class: require('@editorjs/marker'),
          shortcut: 'CMD+SHIFT+M'
        },
        code: require('@/assets/codeTool'),
        embed: {
          class: require('@editorjs/embed'),
          inlineToolbar: true,
          config: {
            services: {
              youtube: true,
              codepen: true,
              codesandbox: {
                regex: /https?:\/\/codesandbox.io\/s\/([^\/\?\&]*)/,
                embedUrl: 'https://codesandbox.io/embed/<%= remote_id %>?codemirror=1&fontsize=14&hidenavigation=1&theme=dark&view=preview',
                html: '<iframe \n' +
                  '     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"\n' +
                  '     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"\n' +
                  '   ></iframe>',
                height: 300,
                width: 600,
                id: (groups) => groups.join('/embed/')
              }
            }
          }
        },
        table: {
          class: require('@editorjs/table'),
          inlineToolbar: true,
          shortcut: 'CMD+ALT+T'
        }
      }, // tools
      onChange: (api) => {
        api.saver.save().then(async (newData) => {
          const newDataImages = newData.blocks.filter(block => block.type === 'image').map(block => block.data.file.url)
          const currentImages = this.article.body.filter(block => block.type === 'image').map(block => block.data.file.url)
          if (newDataImages.length < currentImages.length) {
            const difference = currentImages.filter(image => !newDataImages.includes(image))
            console.log({ difference })
            if (difference.length > 0) {
              await this.$axios.$post(`${process.env.NUXT_ENV_SERVERLESS_URL}/deleteimage`, {
                  asset_url: difference[0]
                }
              )
            }
          }
          this.article.body = newData.blocks
        })
      },
    })
  },
  // beforeDestroy() {
  //   this.editor.destroy()
  // },
  methods: {
    save() {
      this.$emit('editorSaved', this.article)
    },
    openOptions() {
      this.showOptions = true
    },
    closeOptions() {
      this.showOptions = false
    },
    toggleOptions() {
      this.showOptions = !this.showOptions
    },
    openUploadWindow() {
      this.$refs.thumbnailFileInput.click()
    },
    async handleUploadImage(event) {
      this.editorLoading = true
      const file = event.target.files[0]
      if (!file) return

      const public_id = await this.uploadFile(file, 'techdiary-article-covers')
      this.article.thumbnail = this.$cloudinary.image.url(public_id, { crop: 'scale', width: 1500 })
      this.editorLoading = false
    },
    removeThumbnail() {
      this.article.thumbnail = ''
      this.editorLoading = false
    }
  },
}
</script>
<style>
.ce-block__content,
.ce-toolbar__content {
  max-width: unset;
}
.slide-leave-active,
.slide-enter-active {
  transition: 300ms;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
