<script lang="ts">
  import { currentTab, toggleModal, isOpenModal } from "../../store";
  import getModalContent from "../../utils/getModalContent";

  let dialogEl: HTMLDialogElement | null = $state(null);
  let tabName = $state(currentTab.get().name);
  let isOpen = $state(isOpenModal.get());

  // Subscribe with cleanup. The previous version called `.subscribe()` at init
  // and never unsubscribed, so every Astro view transition left another
  // listener writing into a dead component.
  $effect(() => {
    const unsubscribeTab = currentTab.subscribe((value) => (tabName = value.name));
    const unsubscribeOpen = isOpenModal.subscribe((value) => (isOpen = value));
    return () => {
      unsubscribeTab();
      unsubscribeOpen();
    };
  });

  const section = $derived(getModalContent(tabName));

  // Drive the real <dialog> element instead of toggling the `open` attribute.
  // showModal() gives us the top layer, ::backdrop, focus trapping, an inert
  // background and native Escape handling for free.
  //
  // The animation is driven with the Web Animations API instead of being left
  // to a CSS transition. `showModal()` renders a previously `display: none`
  // element in a single style change, and an element that was never rendered
  // has no "before-change style" to transition from — so the entry animation
  // depends entirely on `@starting-style` support. WAAPI always has a keyframe
  // to start from. Only `transform` is animated, so the LightningCSS
  // `scale`-folding trap noted in the stylesheet cannot come back.
  const DURATION = 150;
  const EASING = "ease-in-out";
  const OPEN_FRAMES = [
    { opacity: 0, transform: "scale(0.96)" },
    { opacity: 1, transform: "scale(1)" },
  ];
  const CLOSE_FRAMES = [
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.96)" },
  ];

  let runningAnimation: Animation | null = null;

  const reducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const openDialog = (el: HTMLDialogElement) => {
    runningAnimation?.cancel();
    el.showModal();
    if (reducedMotion()) return;
    // No `fill`, so the [open] declarations remain the resting state.
    runningAnimation = el.animate(OPEN_FRAMES, {
      duration: DURATION,
      easing: EASING,
    });
  };

  const closeDialog = (el: HTMLDialogElement) => {
    if (!el.open) return;
    if (reducedMotion()) {
      el.close();
      return;
    }
    runningAnimation?.cancel();
    // Hold the element open until the exit animation finishes, otherwise
    // `close()` drops it out of the top layer mid-fade.
    runningAnimation = el.animate(CLOSE_FRAMES, {
      duration: DURATION,
      easing: EASING,
    });
    const finish = () => {
      runningAnimation = null;
      el.close();
    };
    runningAnimation.finished.then(finish, finish);
  };

  $effect(() => {
    const el = dialogEl;
    if (!el) return;
    if (isOpen && !el.open) {
      openDialog(el);
    } else if (!isOpen && el.open) {
      closeDialog(el);
    }
  });

  // The news popover and the dialog cannot share the screen.
  $effect(() => {
    if (!isOpen) return;
    const news = document.getElementById("news") as
      | (HTMLElement & {
          hidePopover?: () => void;
          showPopover?: () => void;
        })
      | null;
    if (!news) return;
    news.hidePopover?.();
    return () => news.showPopover?.();
  });

  // Escape and `close` are now handled by the browser; keep the store in sync.
  const onDialogClosed = () => {
    if (isOpenModal.get()) toggleModal(false);
  };

  // Escape would make the browser close the dialog immediately, skipping the
  // exit animation, so intercept `cancel` and close it the same way as the
  // button and the backdrop.
  const onDialogCancel = (event: Event) => {
    event.preventDefault();
    if (dialogEl) closeDialog(dialogEl);
  };

  // Clicking the backdrop targets the dialog itself; clicks on the content
  // bubble from a child, so this only fires for genuine backdrop clicks.
  const onBackdropClick = (event: MouseEvent) => {
    if (event.target === dialogEl) toggleModal(false);
  };
</script>

<dialog
  class="dialog"
  bind:this={dialogEl}
  aria-labelledby="modal-title"
  onclose={onDialogClosed}
  oncancel={onDialogCancel}
  onclick={onBackdropClick}
>
  <div class="modal-header">
    <h2 id="modal-title" class="modal-title">{section.title}</h2>
    <button
      class="close-button"
      type="button"
      aria-label={`Close ${section.title}`}
      onclick={() => toggleModal(false)}
    >
      <span aria-hidden="true">✖</span>
    </button>
  </div>

  <div class="modal-body">
    {#if section.intro}
      <p class="modal-intro">{section.intro}</p>
    {/if}

    <ul class="entry-list">
      {#each section.items as entry (entry.label)}
        <li class="entry">
          <div class="entry-frame">
            {#if entry.portrait}
              <img
                src={entry.portrait}
                alt=""
                width="32"
                height="32"
                loading="eager"
                decoding="async"
              />
            {:else}
              <span class="entry-initial" aria-hidden="true"
                >{entry.label.charAt(0)}</span
              >
            {/if}
          </div>

          <div class="entry-head">
            <p class="entry-label">{entry.label}</p>
            {#if entry.role}
              <p class="entry-role">{entry.role}</p>
            {/if}
            {#if entry.employer}
              <p class="entry-employer">{entry.employer}</p>
            {/if}
          </div>

          {#if entry.meta?.length}
            <ul class="entry-meta">
              {#each entry.meta as fact (fact)}
                <li>{fact}</li>
              {/each}
            </ul>
          {/if}

          {#if entry.description}
            <p class="entry-description">{entry.description}</p>
          {/if}

          {#if entry.technologies?.length}
            <ul class="entry-tech">
              {#each entry.technologies as tech (tech)}
                <li>{tech}</li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</dialog>

<style>
  /* NOTE: only ever animate `transform` here.
     LightningCSS (the production minifier) folds a standalone `scale`
     declaration into an existing `transform`, so `transform: translate(...)
     scale(0)` + `[open] { scale: 1 }` nets out to scale(0) and the dialog
     renders invisible in a production build only. */
  .dialog {
    /* Centre explicitly with `inset` + `margin: auto` instead of relying on the
       UA `dialog:modal` sheet. That sheet only sets `inset-block: 0` and
       inherits `margin: auto` from `dialog`, so horizontal centring silently
       depends on a UA rule nothing in this file declares — and any future
       override drops the dialog into the top-left corner. Centring this way
       also needs no `translate`, which is what LightningCSS folds `scale`
       into. */
    position: fixed;
    inset: 0;
    margin: auto;
    width: min(30rem, calc(100vw - 2rem));
    max-width: none;
    height: fit-content;
    max-height: min(82dvh, 42rem);
    padding: 0;
    border: 1px solid var(--tekken-line, #3d4552);
    border-radius: 0.25rem;
    background-color: #0a0a0a;
    color: #fff;
    overflow: hidden;
    opacity: 0;
    transform: scale(0.96);
    transition:
      opacity 0.15s ease-in-out,
      transform 0.15s ease-in-out,
      display 0.15s ease-in-out allow-discrete;
  }
  .dialog[open] {
    opacity: 1;
    transform: scale(1);
  }
  .dialog[open] {
    @starting-style {
      opacity: 0;
      transform: scale(0.96);
    }
  }

  /* Replaces the old .modal-dark-veil div. */
  .dialog::backdrop {
    background-color: rgb(0 0 0 / 0.65);
    opacity: 0;
    transition:
      opacity 0.15s ease-in-out,
      display 0.15s ease-in-out allow-discrete,
      overlay 0.15s ease-in-out allow-discrete;
  }
  .dialog[open]::backdrop {
    opacity: 1;
    /* Needed as well as on the dialog itself: without a starting style the
       backdrop has no before-change style either, so it snapped straight to
       full black while the dialog was still fading in. */
    @starting-style {
      opacity: 0;
    }
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    background-color: #553152;
    border-bottom: 1px solid var(--tekken-line, #3d4552);
  }
  .modal-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .close-button {
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    cursor: pointer;
    color: #fff;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    font-size: 0.9rem;
    line-height: 1;
    transition:
      box-shadow 0.15s ease-in-out,
      border-color 0.15s ease-in-out;
  }
  .close-button:hover {
    border-color: #d43458;
    box-shadow: 0 0 10px rgb(85 49 82 / 0.9);
  }
  .close-button:focus-visible {
    outline: 2px solid #d43458;
    outline-offset: 2px;
  }

  .modal-body {
    padding: 1.25rem;
    max-height: calc(min(82dvh, 42rem) - 3rem);
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  .modal-intro {
    margin: 0 0 1rem;
    font-family:
      ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-size: 0.85rem;
    line-height: 1.6;
    color: #c3cad6;
    text-wrap: pretty;
  }

  .entry-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.75rem;
  }
  .entry {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.5rem 0.75rem;
    align-items: center;
    padding: 0.6rem 0.75rem;
    background-color: rgb(38 38 38 / 0.85);
    border: 1px solid var(--tekken-line, #3d4552);
    border-left: 3px solid #d43458;
  }
  .entry-frame {
    grid-row: 1;
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    overflow: hidden;
    background: linear-gradient(160deg, #1f2330, #0a0a0a);
    border: 1px solid var(--tekken-line, #3d4552);
  }
  .entry-frame img {
    max-width: 68%;
    max-height: 68%;
    width: auto;
    height: auto;
  }
  .entry-initial {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1;
    color: #d43458;
  }
  .entry-head {
    grid-row: 1;
    min-width: 0;
  }
  .entry-label {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    line-height: 1.2;
    overflow-wrap: anywhere;
  }
  .entry-role {
    margin: 0.1rem 0 0;
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    color: #d43458;
  }
  .entry-employer {
    margin: 0.05rem 0 0;
    font-size: 0.7rem;
    letter-spacing: 0.04em;
    color: #aab2be;
  }

  /* Full-width rows below the header pair. */
  .entry-meta,
  .entry-description,
  .entry-tech {
    grid-column: 1 / -1;
  }
  .entry-meta,
  .entry-tech {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .entry-meta li,
  .entry-tech li {
    font-family:
      ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-size: 0.68rem;
    letter-spacing: 0.06em;
    padding: 0.15rem 0.45rem;
    border-radius: 2px;
  }
  .entry-meta li {
    text-transform: uppercase;
    color: #d6dbe4;
    background-color: #1b1f27;
    border: 1px solid var(--tekken-line, #3d4552);
  }
  .entry-tech li {
    color: #f3e6ec;
    background: linear-gradient(
      to bottom,
      rgb(85 49 82 / 0.85),
      rgb(43 26 41 / 0.85)
    );
    border: 1px solid rgb(212 52 88 / 0.55);
  }
  .entry-description {
    margin: 0;
    font-family:
      ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-size: 0.82rem;
    line-height: 1.55;
    color: #dfe3ea;
    text-wrap: pretty;
  }

  @media (prefers-reduced-motion: reduce) {
    .dialog,
    .dialog::backdrop,
    .close-button {
      transition: none;
    }
  }
</style>