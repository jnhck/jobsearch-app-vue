import { shallowMount, flushPromises, RouterLinkStub } from "@vue/test-utils";
// import axios from "axios";
// jest.mock("axios");

import JobListings from "@/components/job-results/JobListings.vue";
// beforeEach(() => {
//   axios.get.mockResolvedValue({ data: Array(15).fill({}) });
// });

// afterEach(() => {
//   axios.get.mockReset();
// });

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const createStore = (config = {}) => ({
    state: { jobs: Array(15).fill({}) },
    dispatch: jest.fn(),
    ...config,
  });

  const createConfig = ($route, $store) => ({
    global: {
      mocks: {
        $route,
        $store,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  // it("fetches jobs", () => {
  //   const $route = createRoute();
  //   shallowMount(JobListings, createConfig($route));
  //   expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
  // });

  describe("when components mounts", () => {
    it("makes call to fetch jobs from API", () => {
      const $route = createRoute();
      const dispatch = jest.fn();
      const $store = createStore({ dispatch });
      shallowMount(JobListings, createConfig($route, $store));
      expect(dispatch).toHaveBeenCalledWith("FETCH_JOBS");
    });
  });

  it("creates a job listing for a maximum of 10 jobs per page", async () => {
    // axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const $route = createRoute({ page: "1" });
    const $store = createStore({ state: { jobs: Array(15).fill({}) } });
    const wrapper = shallowMount(JobListings, createConfig($route, $store));
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });

  describe("when query params exclude page number", () => {
    it("displays page number 1", () => {
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params include page number", () => {
    it("displays page number", () => {
      const queryParams = { page: "3" };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch("Page 3");
    });
  });

  describe("when user is on first page of job results", () => {
    it("does not show link to previous page", () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      const previousPageLink = wrapper.find("[data-test='previous-page']");
      expect(previousPageLink.exists()).toBe(false);
    });

    it("shows link to next page", async () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      const $store = createStore({ state: { jobs: Array(15).fill({}) } });
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPageLink = wrapper.find("[data-test='next-page']");
      expect(nextPageLink.exists()).toBe(true);
    });
  });

  describe("when user is on last page of job results", () => {
    it("does not show link to next page", async () => {
      // axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      const $store = createStore({ state: { jobs: Array(15).fill({}) } });
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPageLink = wrapper.find("[data-test='next-page']");
      expect(nextPageLink.exists()).toBe(false);
    });

    it("shows link to previous page", async () => {
      // axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      const $store = createStore({ state: { jobs: Array(15).fill({}) } });
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const previousPageLink = wrapper.find("[data-test='previous-page']");
      expect(previousPageLink.exists()).toBe(true);
    });
  });
});
