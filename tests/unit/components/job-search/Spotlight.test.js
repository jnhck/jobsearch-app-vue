import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
jest.mock("axios");

import Spotlight from "@/components/job-search/Spotlight.vue";

describe("Spotlight", () => {
  const mockSpotlightResponse = (data = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          img: "img",
          title: "title",
          description: "description",
          ...data,
        },
      ],
    });
  };

  it("provides img attribute to parent component", async () => {
    const data = { img: "image.jpg" };
    mockSpotlightResponse(data);
    const wrapper = mount(Spotlight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.img }}</h1>
        </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("image.jpg");
  });

  it("provides title attribute to parent component", async () => {
    const data = { title: "very good title" };
    mockSpotlightResponse(data);
    const wrapper = mount(Spotlight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.title }}</h1>
        </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("very good title");
  });

  it("provides description attribute to parent component", async () => {
    const data = { description: "very good description" };
    mockSpotlightResponse(data);
    const wrapper = mount(Spotlight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.description }}</h1>
        </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("very good description");
  });
});
