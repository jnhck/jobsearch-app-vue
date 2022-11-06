import { mount } from "@vue/test-utils";
import JobFiltersSidebarOrganizations from "@/components/job-results/job-filters-sidebar/JobFiltersSidebarOrganizations.vue";

describe("JobFiltersSidebarOrganizations", () => {
  it("renders unique list of organization for filtering jobs", async () => {
    const $store = {
      getters: {
        UNIQUE_ORGANIZATIONS: new Set(["Org 1", "Org 2"]),
      },
    };
    const wrapper = mount(JobFiltersSidebarOrganizations, {
      global: {
        mocks: {
          $store,
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const organizationsLabels = wrapper.findAll("[data-test='organization']");
    const organizations = organizationsLabels.map((node) => node.text());
    expect(organizations).toEqual(["Org 1", "Org 2"]);
  });
});
