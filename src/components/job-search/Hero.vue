<template>
  <main class="flex flex-col h-screen">
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
    <spotlight class="flex flex-row justify-center pb-16">
      <template #default="{ img, title, description }">
        <router-link
          to="/jobs/results"
          class="flex flex-col mx-5 border rounded-lg w-72 bg-brand-gray-2 h-96"
        >
          <img :src="img" class="object-contain rounded-t-lg" />
          <div class="h-48 px-6 py-4 mt-3">
            <h3 class="text-lg font-medium">
              {{ title }}
            </h3>

            <p class="mt-3 text-sm">
              {{ description }}
            </p>
          </div>
          <router-link
            to="/jobs/results"
            class="px-6 pb-4 text-sm text-brand-blue-1"
            >See Jobs</router-link
          >
        </router-link>
      </template>
    </spotlight>
  </main>
</template>

<script>
import Headline from "@/components/job-search/Headline.vue";
import JobSearchForm from "@/components/job-search/JobSearchForm.vue";
import Spotlight from "@/components/job-search/Spotlight.vue";

export default {
  name: "Hero",
  components: { Headline, JobSearchForm, Spotlight },
};
</script>
