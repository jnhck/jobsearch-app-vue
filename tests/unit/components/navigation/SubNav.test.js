import { mount } from "@vue/test-utils";
import SubNav from "@/components/navigation/SubNav";

describe("SubNav", () => {
  describe("when user is on job page", () => {
    it("displays job count", () => {
      const $route = {
        name: "JobResults",
      };

      const wrapper = mount(SubNav, {
        global: {
          mocks: {
            $route,
          },
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(true);
    });
  });
  describe("when user is not on job page", () => {
    it("does _not_ display job count", () => {
      const $route = {
        name: "Home",
      };

      const wrapper = mount(SubNav, {
        global: {
          mocks: {
            $route,
          },
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
