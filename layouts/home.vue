<template>
  <div>
    <!-- <Navbar /> -->
    <main class="wrapper">
      <div class="grid grid-cols-12 md:space-x-5">
        <section class="hidden col-span-12 md:block md:col-span-3">
          <sidebar-left />
        </section>
        <section class="col-span-12 md:col-span-6">
          <Nuxt />
        </section>

        <section class="hidden col-span-12 md:block md:col-span-3">
          <sidebar-right />
        </section>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  head() {
    return {
      bodyAttrs: {
        class: 'techdiary-body',
      },
    }
  },
}
</script>
