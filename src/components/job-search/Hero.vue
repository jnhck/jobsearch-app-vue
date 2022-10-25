<template>
  <main>
    <section class="flex flex-col h-screen pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-start-1 col-span-1"></div>
        <div class="col-start-2 col-span-5">
          <headline />
          <job-search-form />
        </div>
        <div class="col-start-7 col-span-5 self-center justify-self-center">
          <img
            class="w-96 h-96 object-contain rounded-full drop-shadow-md"
            src="@/assets/chicken.png"
          />
        </div>
        <div class="col-start-12 col-span-1"></div>
      </div>
    </section>
  </main>
</template>

<script>
import Headline from "@/components/job-search/Headline.vue";
import JobSearchForm from "@/components/job-search/JobSearchForm.vue";

export default {
  name: "Hero",
  components: { Headline, JobSearchForm },
};
</script>
