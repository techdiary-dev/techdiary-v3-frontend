<template>
  <div>
    <Navbar />
    <main class="wrapper">
      <div class="grid grid-cols-12 md:space-x-5">
        <section
          class="hidden col-span-12 md:block sticky top-[-300px] md:col-span-3"
          style="align-self: start; top: -300px"
        >
          <sidebar-left />
        </section>
        <section class="col-span-12 md:col-span-6">
          <Nuxt />
        </section>

        <section
          class="hidden col-span-12 md:block sticky top-[-280px] md:col-span-3"
          style="align-self: start"
        >
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
  // computed: {
  //   leftAsideHeight(){
  //     return this.$refs.leftAside.getClientRect().width
  //   },
  //   rightAsideHeight(){
  //     return this.$refs.leftAside.getClientRect().width
  //   },
  // }
}
</script>
