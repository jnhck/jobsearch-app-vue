<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <job-listing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>
    <div class="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            data-test="previous-page"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            data-test="next-page"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import { FETCH_JOBS, FILTERED_JOBS_BY_ORGANIZATIONS } from "@/store";
import JobListing from "@/components/job-results/JobListing.vue";

export default {
  name: "JobListings",
  components: {
    JobListing,
  },
  computed: {
    ...mapGetters([FILTERED_JOBS_BY_ORGANIZATIONS]),
    currentPage() {
      const pageString = this.$route.query.page || "1";
      return Number.parseInt(pageString);
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : null;
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      const maxPage = Math.ceil(
        this.FILTERED_JOBS_BY_ORGANIZATIONS.length / 10
      );
      return nextPage <= maxPage ? nextPage : null;
    },
    displayedJobs() {
      const pageNumber = this.currentPage;
      const startIndex = (pageNumber - 1) * 10;
      const endIndex = startIndex + 10;
      return this.FILTERED_JOBS_BY_ORGANIZATIONS.slice(startIndex, endIndex);
    },
  },
  async mounted() {
    this.FETCH_JOBS();
  },
  methods: {
    ...mapActions([FETCH_JOBS]),
  },
};
</script>
