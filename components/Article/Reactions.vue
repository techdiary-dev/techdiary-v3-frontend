<template>
  <div>
    <div class='reaction'>
      <button class='reaction__button' @click="doReact('HEART', article.slug)">
        <img
          class='reaction__icon'
          :class="{
            'reaction__icon--reacted': reactedByMe('HEART'),
          }"
          src='~/static/reactions/HEART.png'
        />
        <span class='reaction__count text-dark-secondary'>{{
          reactionCount('HEART')
        }}</span>
      </button>

      <button class="reaction__button" @click="doReact('LIKE', article.slug)">
        <img
          class="reaction__icon"
          :class="{
            'reaction__icon--reacted': reactedByMe('LIKE'),
          }"
          src="~/static/reactions/LIKE.png"
        />
        <span class="reaction__count text-dark-secondary">
          {{ reactionCount('LIKE') }}
        </span>
      </button>

      <button
        class="reaction__button"
        @click="doReact('FLYHIGH', article.slug)"
      >
        <img
          class="reaction__icon"
          :class="{
            'reaction__icon--reacted': reactedByMe('FLYHIGH'),
          }"
          src="~/static/reactions/FLYHIGH.png"
        />
        <span class="reaction__count text-dark-secondary">{{
          reactionCount('FLYHIGH')
        }}</span>
      </button>

      <button
        class="reaction__button"
        @click="doReact('UNICORN', article.slug)"
      >
        <img
          class="reaction__icon"
          :class="{
            'reaction__icon--reacted': reactedByMe('UNICORN'),
          }"
          src="~/static/reactions/UNICORN.png"
        />
        <span class="reaction__count text-dark-secondary">{{
          reactionCount('UNICORN')
        }}</span>
      </button>

      <button class="reaction__button" @click="doReact('MONEY', article.slug)">
        <img
          class="reaction__icon"
          :class="{
            'reaction__icon--reacted': reactedByMe('MONEY'),
          }"
          src="~/static/reactions/MONEY.png"
        />
        <span class="reaction__count text-dark-secondary">{{
          reactionCount('MONEY')
        }}</span>
      </button>

      <button class="reaction__button" @click="doReact('PARTY', article.slug)">
        <img
          class="reaction__icon"
          :class="{
            'reaction__icon--reacted': reactedByMe('PARTY'),
          }"
          src="~/static/reactions/PARTY.png"
        />
        <span class="reaction__count text-dark-secondary">{{
          reactionCount('PARTY')
        }}</span>
      </button>

      <button class="reaction__button" @click="doReact('TROPHY', article.slug)">
        <img
          class="reaction__icon"
          :class="{
            'reaction__icon--reacted': reactedByMe('TROPHY'),
          }"
          src="~/static/reactions/TROPHY.png"
        />
        <span class="reaction__count text-dark-secondary">{{
          reactionCount('TROPHY')
        }}</span>
      </button>

      <button class="reaction__button" @click="doReact('CHEER', article.slug)">
        <img
          class="reaction__icon"
          :class="{
            'reaction__icon--reacted': reactedByMe('CHEER'),
          }"
          src="~/static/reactions/CHEER.png"
        />
        <span class="reaction__count text-dark-secondary">{{
          reactionCount('CHEER')
        }}</span>
      </button>
    </div>

    <div class="flex flex-col items-center space-y-5 mt-14">
      <button
        title="bookmark"
        class="focus:outline-none"
        @click="doReact('BOOKMARK', article.slug)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          class="w-8 h-8 stroke-current stroke-1"
          :class="{
            'text-green-600': reactedByMe('BOOKMARK'),
            'fill-current': reactedByMe('BOOKMARK'),
            'text-dark': !reactedByMe('BOOKMARK'),
          }"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          ></path>
        </svg>
      </button>
      <nuxt-link
        class='text-dark'
        v-if='$auth.loggedIn && $auth.user.id == article.user.id'
        :to="{
          name: 'dashboard-diaries-slug-edit',
          params: { slug: article.slug },
        }"
      >
        সংস্কার
      </nuxt-link>

      <progress-ring stroke='5' radius='30' :progress='progress ? progress : 0' />
      <!-- <button
        title="share"
        class="focus:outline-none"
        @click="shareOpen = !shareOpen"
      >
        <svg viewBox="0 0 448 512" class="w-6 h-6 opacity-75 fill-current">
          <path
            d="M352 320c-28.6 0-54.2 12.5-71.8 32.3l-95.5-59.7c9.6-23.4 9.7-49.8 0-73.2l95.5-59.7c17.6 19.8 43.2 32.3 71.8 32.3 53 0 96-43 96-96S405 0 352 0s-96 43-96 96c0 13 2.6 25.3 7.2 36.6l-95.5 59.7C150.2 172.5 124.6 160 96 160c-53 0-96 43-96 96s43 96 96 96c28.6 0 54.2-12.5 71.8-32.3l95.5 59.7c-4.7 11.3-7.2 23.6-7.2 36.6 0 53 43 96 96 96s96-43 96-96c-.1-53-43.1-96-96.1-96zm0-288c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zM96 320c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zm256 160c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"
          ></path>
        </svg>
      </button> -->
      <!-- Share panel -->
      <div
        v-if="shareOpen"
        class="absolute right-0 z-50 px-2 py-3 space-y-4 bg-white border rounded-sm shadow-sm w-52 top-10"
      >
        <a href="#" class="flex items-center space-x-2">
          <svg class="w-4 h-4 text-gray-600 fill-current" viewBox="0 0 512 512">
            <path
              d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
            ></path>
          </svg>

          <span>টুইট করুন</span>
        </a>

        <a href="#" class="flex items-center space-x-2">
          <svg class="w-4 h-4 text-gray-600 fill-current" viewBox="0 0 512 512">
            <path
              d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
            ></path>
          </svg>

          <span>ফেসবুক</span>
        </a>

        <a href="#" class="flex items-center space-x-2">
          <svg class="w-4 h-4 text-gray-600 fill-current" viewBox="0 0 448 512">
            <path
              d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
            ></path>
          </svg>

          <span>লিঙ্কডইন</span>
        </a>

        <a href="#" class="flex items-center space-x-2">
          <svg class="w-4 h-4 text-gray-600 fill-current" viewBox="0 0 512 512">
            <path
              d="M201.5 305.isLiked5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z"
            ></path>
          </svg>

          <span>লিঙ্কডইন</span>
        </a>

        <div>
          <p class='text-sm text-gray-600'>পার্মালিংক</p>
          <input
            type='text'
            value='dddd'
            class='w-full p-2 border focus:outline-none'
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import reactions from '~/mixins/reactions'
export default {
  mixins: [reactions],
  props: ['article', 'progress'],
  data() {
    return {
      reactions: this.article.reactions,
      shareOpen: false
    }
  }
}
</script>

<style scoped lang="scss">
.reaction {
  @apply grid grid-cols-2 gap-6;

  &__button {
    @apply focus:outline-none flex space-x-1 items-center;
  }

  &__icon {
    @apply w-7 h-7;
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);

    &--reacted {
      -webkit-filter: grayscale(0);
      filter: grayscale(0);
    }
  }
}
</style>
