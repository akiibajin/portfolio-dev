<script lang="ts">
  import {onMount} from "svelte";
  import { register, type SwiperContainer } from "swiper/element";
  import { isOpenNews } from "../../store"
  import type { SwiperOptions } from "swiper/types";
  register();

  let isOpen = $state(window.innerWidth > 640);
  isOpenNews.subscribe((value) => {
    isOpen = value;
  });
  onMount(() => {
    const swiperEl: SwiperContainer | null = document.querySelector("#news");
  if (swiperEl) {
    const options: SwiperOptions = {
      pagination: {
        clickable: false,
        el: "#pagination",
        bulletActiveClass: "bg-white opacity-100",
        bulletClass:
          "w-2 h-2 rounded-full bg-black inline-block opacity-50 mx-1",
      },
    };
    Object.assign(swiperEl, options);
    swiperEl.initialize();
  }
  });
</script>
<aside class={`${isOpen ? "fixed scale-100 opacity-100 " : "hidden scale-0 opacity-0"} 
lg:fixed lg:scale-100 lg:opacity-100 starting:scale-0 starting:opacity-0  transition-discrete
 transition-all duration-400 bottom-50 lg:bottom-30 bg-transparent right-3 
 lg:right-10 w-60 h-30 rounded-lg
`}
>
  <div
    class="relative top-0 p-px bg-gradient-to-r w-60 h-24 from-blue-500 bg-opacity-70 to-purple-500 overflow-hidden rounded-lg"
  >
    <swiper-container
      space-between={5}
      pagination="true"
      slides-per-view={1}
      autoplay={true}
      init="false"
      id="news"
      class="h-full w-full bg-black rounded-lg"
    >
      <swiper-slide lazy="true" class="flex overflow-hidden rounded-lg items-end justify-center h-full">
        <img
          src="https://th.bing.com/th/id/OIP.Z_QVk4-ITobZ5RNpCEp20gHaEK?rs=1&pid=ImgDetMain"
          alt="marshall law"
          loading="lazy"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <p id="info-p" class="text-pretty font-thin text-sm absolute bottom-0 ">
          New version for this portfolio will come soon 🔥
        </p>
      </swiper-slide>
      <swiper-slide lazy="true" class="flex items-end overflow-hidden rounded-lg justify-center h-full">
        <img
          src="https://www.videogameschronicle.com/files/2023/02/tekken-8-kazuya.jpg"
          alt="kazuya mishima"
          loading="lazy"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <p id="info-p" class="text-pretty font-thin text-sm absolute bottom-0">
          Check out our latest project updates ❤️
        </p>
      </swiper-slide>
      <swiper-slide lazy="true" class="flex items-end  overflow-hidden rounded-lg justify-center h-full">
        <img
          src="https://th.bing.com/th/id/R.9cea29d04f4e05317e0bc506dea5193a?rik=qpqfRbXPTyY9gg&pid=ImgRaw&r=0"
          loading="lazy"
          alt="jin kazama"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <p id="info-p" class="text-pretty font-thin text-sm absolute bottom-0">
          This images are has been lazy loaded 🚀
        </p>
      </swiper-slide>
    </swiper-container>
  </div>
  <div
    id="pagination"
    class="absolute text-end lg:text-center transition-opacity w-full duration-300transform translate-x-0 translate-y-0 z-10"
  >
  </div>
</aside>

<style>
  #info-p {
    text-shadow:  0 0 3px black;
  }
</style>
