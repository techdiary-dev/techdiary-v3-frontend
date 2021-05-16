<template>
  <aside>
  <!--
    <a
      href="https://contest.techdiary.dev"
      target="_blank"
      class="inline-block mb-2 transition duration-200 hover:shadow-2xl"
    >
      <img
        class="w-full rounded-md"
        src="https://res.cloudinary.com/techdiary-dev/image/upload/v1619780638/static-assets/contest/qms7zyhnak1goc0aydeg.png"
        alt="dev-article-contest-season-1"
      />
    </a>
    -->
    <widgets-login v-if="!$auth.loggedIn" class="mb-8" />
    <widgets-online-users class="mb-4" v-if="$auth.loggedIn" />
    <widgets-latest-registered-users />
    <sidebar-footer />
  </aside>
</template>
