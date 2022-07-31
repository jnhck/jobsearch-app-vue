import { mount } from "@vue/test-utils";
import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays the company name", () => {
    const wrapper = mount(MainNav);
    expect(wrapper.text()).toMatch("Hobo Careers");
  });

  it("displays menu items for navigation", () => {
    const wrapper = mount(MainNav);
    const navigationMenuItems = wrapper.findAll(
      "[data-test='main-nav-list-item']"
    );
    const navigationMenuItemTexts = navigationMenuItems.map((item) =>
      item.text()
    );
    expect(navigationMenuItemTexts).toEqual([
      "Teams",
      "Locations",
      "Life at Hobo Corp",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });
});
