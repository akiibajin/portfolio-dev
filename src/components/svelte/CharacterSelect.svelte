<script lang="ts">
  import { currentTab } from "../../store";
  import getModalContent from "../../utils/getModalContent";
  import type { IDefs } from "../../global/constants";

  let { name, position, backPath } = $props<{
    name: keyof IDefs;
    position: number;
    backPath: string;
  }>();

  const section = $derived(getModalContent(name));
  const items = $derived(section.items);
  const count = $derived(items.length);

  /** Committed choice — what the player has locked in. */
  let selected = $state(0);
  /** Transient pointer preview, cleared as soon as the pointer leaves. */
  let hovered = $state<number | null>(null);

  const active = $derived(hovered ?? selected);
  const item = $derived(items[active] ?? items[0]);
  let listEl: HTMLUListElement | null = $state(null);

  // Publish the tab so the background carousel and footer marquee stay in sync.
  $effect(() => {
    currentTab.set({ name, position });
  });

  // Guard against a stale index if the section shrinks on a view transition.
  $effect(() => {
    if (selected >= count) selected = 0;
    if (hovered !== null && hovered >= count) hovered = null;
  });

  const indexFrom = (target: EventTarget | null) => {
    const el = (target as HTMLElement | null)?.closest<HTMLElement>("[data-index]");
    return el ? Number(el.dataset.index) : null;
  };

  // The roster is a single horizontal row, so moving the selection past the
  // visible edge has to pull the tile into view or arrow keys look broken.
  const revealCard = (index: number) => {
    const card = listEl?.querySelectorAll<HTMLElement>('[role="option"]')[index];
    card?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const select = (index: number, moveFocus = false) => {
    if (index < 0 || index >= count) return;
    selected = index;
    revealCard(index);
    if (moveFocus) {
      listEl
        ?.querySelectorAll<HTMLButtonElement>('[role="option"]')
        [index]?.focus();
    }
  };

  const onPointerOver = (event: PointerEvent) => {
    const index = indexFrom(event.target);
    if (index === null || index === hovered) return;
    // Touch pointers have no hover state, so never hijack the tapped item.
    if (!window.matchMedia("(hover: hover)").matches) return;
    hovered = index;
  };

  const onFocusIn = (event: FocusEvent) => {
    const index = indexFrom(event.target);
    if (index === null) return;
    // Focus is authoritative: drop any stale hover preview.
    selected = index;
    hovered = null;
  };

  const onKeydown = (event: KeyboardEvent) => {
    const last = count - 1;
    let next: number;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "]": // RB shoulder button
        next = selected === last ? 0 : selected + 1;
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "[": // LB shoulder button
        next = selected === 0 ? last : selected - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    select(next, true);
  };
</script>

<section class="character-select" aria-labelledby="select-heading">
  <a class="back-button" href={backPath} aria-label="Back to menu">
    <span class="back-circle" aria-hidden="true">B</span>
    <span class="back-label">Back</span>
  </a>

  <header class="select-header">
    <h2 id="select-heading" class="select-heading">{section.title}</h2>
    <p class="select-counter" aria-hidden="true">
      {String(active + 1).padStart(2, "0")}<span class="counter-sep">/</span
      >{String(count).padStart(2, "0")}
    </p>
  </header>

  {#if section.intro}
    <p class="select-intro">{section.intro}</p>
  {/if}

  {#if item}
  <article class="detail">
    <div class="detail-head">
      <div class="detail-frame">
        {#if item.portrait}
          <img
            src={item.portrait}
            alt=""
            width="96"
            height="96"
            loading="eager"
            decoding="async"
          />
        {:else}
          <span class="detail-initial" aria-hidden="true"
            >{item.label.charAt(0)}</span
          >
        {/if}
      </div>
      <div class="detail-titles">
        <p class="detail-kicker">{section.title}</p>
        <h3 class="detail-title" aria-live="polite">{item.label}</h3>
        {#if item.role}
          <p class="detail-role">{item.role}</p>
        {/if}
        {#if item.employer}
          <p class="detail-employer">{item.employer}</p>
        {/if}
      </div>
    </div>

    {#if item.meta?.length}
      <ul class="detail-meta">
        {#each item.meta as entry (entry)}
          <li>{entry}</li>
        {/each}
      </ul>
    {/if}

    {#if item.description}
      <p class="detail-description">{item.description}</p>
    {/if}

    {#if item.technologies?.length}
      <h4 class="detail-subhead">Technologies</h4>
      <ul class="tech-list">
        {#each item.technologies as tech (tech)}
          <li class="tech-chip">{tech}</li>
        {/each}
      </ul>
    {/if}

    {#if item.impact}
      <p class="detail-impact">
        <span class="impact-label">Impact</span>
        {item.impact}
      </p>
    {/if}

    <p class="detail-hint">
      Browse with <kbd>&larr;</kbd><kbd>&rarr;</kbd> · Confirm with
      <kbd>Enter</kbd>
    </p>
  </article>
  {/if}

  <div class="select-stage">
    <ul
      class="char-grid"
      role="listbox"
      aria-label={`${section.title} — ${count} ${count === 1 ? "entry" : "entries"}`}
      bind:this={listEl}
      onpointerover={onPointerOver}
      onpointerleave={() => (hovered = null)}
      onfocusin={onFocusIn}
      onkeydown={onKeydown}
    >
      {#each items as character, i (character.label)}
        <li class="char-box" data-index={i} role="presentation">
          <button
            type="button"
            role="option"
            class="char-card"
            class:is-selected={i === selected}
            class:is-hovered={i === hovered}
            aria-selected={i === selected}
            tabindex={i === selected ? 0 : -1}
            onclick={() => select(i)}
          >
            <span class="char-portrait">
              {#if character.portrait}
                <img
                  src={character.portrait}
                  alt=""
                  width="48"
                  height="48"
                  loading="lazy"
                  decoding="async"
                />
              {:else}
                <span class="char-initial" aria-hidden="true"
                  >{character.label.charAt(0)}</span
                >
              {/if}
            </span>
            <span class="char-label">
              <strong>{character.label}</strong>
              {#if character.role}
                <small>{character.role}</small>
              {/if}
            </span>
          </button>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  :global(:root) {
    --tekken-pink: #d43458;
    --tekken-plum: #553152;
    --tekken-ink: #0a0a0a;
    --tekken-line: #3d4552;
  }

  .character-select {
    width: 100%;
    min-width: 100%;
    margin-inline: auto;
    padding: 4.5rem 1rem 2rem;
    box-sizing: border-box;
  }

  /* ---------- Back button ---------- */
  .back-button {
    position: fixed;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 40;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem 0.25rem 0.25rem;
    text-decoration: none;
    border-radius: 0.25rem;
  }
  .back-circle {
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: #fff;
    color: #4a5565;
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 1;
    transition: box-shadow 0.15s ease-in-out;
  }
  .back-label {
    color: #fff;
    font-weight: 400;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-size: 0.8rem;
    text-shadow: 0 0 6px #000;
  }
  .back-button:hover .back-circle {
    box-shadow:
      0 0 10px var(--tekken-pink),
      0 0 20px var(--tekken-plum);
  }
  .back-button:focus-visible {
    outline: 2px solid var(--tekken-pink);
    outline-offset: 3px;
  }
  /* Reclaim horizontal room on the narrowest screens; the accessible name
     stays on the anchor. */
  .back-label {
    display: none;
  }

  @media (width >= 30rem) {
    .back-label {
      display: block;
    }
  }

  /* ---------- Header ---------- */
  .select-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 0.6rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--tekken-line);
  }
  .select-heading {
    margin: 0;
    font-size: clamp(1.5rem, 5vw, 2.25rem);
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #fff;
    text-shadow: 0 0 12px var(--tekken-plum);
  }
  .select-counter {
    margin: 0;
    font-size: 1rem;
    letter-spacing: 0.15em;
    color: #cbd2dd;
    font-variant-numeric: tabular-nums;
  }
  .counter-sep {
    color: var(--tekken-pink);
    margin-inline: 0.25rem;
  }

  .select-intro {
    margin: 0 0 1.25rem;
    max-width: 46rem;
    font-family:
      ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-size: 0.88rem;
    line-height: 1.6;
    color: #c3cad6;
    text-wrap: pretty;
  }

  /* Roster row on top, detail panel underneath. */
  .select-stage {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* ---------- Detail card ---------- */
  .detail {
    background-color: rgb(10 10 10 / 0.88);
    border: 1px solid var(--tekken-line);
    border-left: 3px solid var(--tekken-pink);
    border-radius: 0.25rem;
    padding: 1rem;
    display: grid;
    gap: 0.75rem;
    align-content: start;
    box-shadow: inset 0 0 40px rgb(85 49 82 / 0.55);
  }
  .detail-head {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    min-width: 0;
  }
  .detail-frame {
    flex: 0 0 4rem;
    width: 4rem;
    height: 4rem;
    display: grid;
    place-items: center;
    background: linear-gradient(160deg, #1f2330, #0a0a0a);
    border: 1px solid var(--tekken-line);
    overflow: hidden;
  }
  .detail-frame img {
    max-width: 68%;
    max-height: 68%;
    width: auto;
    height: auto;
  }
  .detail-initial {
    font-size: 2.25rem;
    font-weight: 600;
    color: var(--tekken-pink);
    line-height: 1;
  }
  .detail-titles {
    min-width: 0;
  }
  .detail-kicker {
    margin: 0;
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #8f98a6;
  }
  .detail-title {
    margin: 0.15rem 0 0;
    font-size: clamp(1.5rem, 6vw, 2.25rem);
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    line-height: 1.05;
    color: #fff;
    text-wrap: balance;
  }
  .detail-role {
    margin: 0.3rem 0 0;
    font-size: 0.9rem;
    letter-spacing: 0.08em;
    color: var(--tekken-pink);
  }
  .detail-employer {
    margin: 0.1rem 0 0;
    font-size: 0.8rem;
    letter-spacing: 0.06em;
    color: #aab2be;
  }

  .detail-meta {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
  }
  .detail-meta li {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #d6dbe4;
    background-color: #1b1f27;
    border: 1px solid var(--tekken-line);
    padding: 0.2rem 0.5rem;
  }

  .detail-description {
    margin: 0;
    font-family:
      ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-size: 0.9rem;
    line-height: 1.55;
    color: #dfe3ea;
    text-wrap: pretty;
  }

  .detail-subhead {
    margin: 0;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #8f98a6;
  }
  .tech-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin: 0;
    padding: 0;
  }
  .tech-chip {
    font-family:
      ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    color: #f3e6ec;
    background: linear-gradient(
      to bottom,
      rgb(85 49 82 / 0.85),
      rgb(43 26 41 / 0.85)
    );
    border: 1px solid rgb(212 52 88 / 0.55);
    border-radius: 2px;
    padding: 0.2rem 0.5rem;
  }

  .detail-impact {
    margin: 0;
    display: flex;
    gap: 0.5rem;
    align-items: baseline;
    font-family:
      ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-size: 0.85rem;
    line-height: 1.5;
    color: #e8ecf2;
  }
  .impact-label {
    flex: 0 0 auto;
    font-family: inherit;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #0a0a0a;
    background-color: var(--tekken-pink);
    padding: 0.15rem 0.4rem;
  }

  .detail-hint {
    margin: 0;
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #8f98a6;
  }
  .detail-hint kbd {
    font-family: inherit;
    font-size: 0.62rem;
    color: #e8ecf2;
    border: 1px solid var(--tekken-line);
    padding: 0.05rem 0.3rem;
    margin-inline: 0.1rem;
  }

  /* ---------- Roster ---------- */
  /* Tiles wrap into as many rows as they need. They scroll sideways only if a
     single tile is ever wider than the container. */
  .char-grid {
    list-style: none;
    margin: 0;
    margin-top: 2rem;
    /* Bottom padding keeps the scrollbar off the card borders. */
    padding: 0 0 0.35rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    min-width: 0;
    overflow-x: auto;
    overflow-y: hidden;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
    scrollbar-color: var(--tekken-plum) transparent;
  }
  .char-box {
    flex: 0 0 auto;
    width: clamp(4.25rem, 21vw, 5.25rem);
    scroll-snap-align: center;
  }
  .char-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0;
    text-align: left;
    cursor: pointer;
    color: #fff;
    background-color: rgb(10 10 10 / 0.82);
    border: 1px solid var(--tekken-line);
    transition:
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out,
      transform 0.15s ease-in-out,
      background-color 0.15s ease-in-out;
  }
  .char-portrait {
    flex: none;
    width: 100%;
    aspect-ratio: 3 / 4;
    display: grid;
    place-items: center;
    overflow: hidden;
    background: linear-gradient(160deg, #1f2330, #0a0a0a);
  }
  .char-portrait img {
    max-width: 62%;
    max-height: 62%;
    width: auto;
    height: auto;
  }
  .char-initial {
    font-size: clamp(1.1rem, 3.6vw, 1.5rem);
    font-weight: 600;
    color: var(--tekken-pink);
    line-height: 1;
  }
  .char-label {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.1rem;
    padding: clamp(0.28rem, 1.3vw, 0.45rem) clamp(0.28rem, 1.1vw, 0.4rem);
    background-color: rgb(38 38 38 / 0.9);
    border-top: 1px solid var(--tekken-line);
  }
  .char-label strong {
    font-weight: 500;
    font-size: clamp(0.66rem, 2.4vw, 0.85rem);
    letter-spacing: 0.05em;
    line-height: 1.2;
    overflow-wrap: anywhere;
  }
  .char-label small {
    font-family:
      ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-weight: 400;
    font-size: clamp(0.52rem, 1.85vw, 0.62rem);
    color: #aab2be;
    line-height: 1.25;
  }

  /* Hover previews; the committed selection is deliberately louder. Lifting
     the tile reads better now that the roster runs horizontally. */
  .char-card.is-hovered {
    border-color: var(--tekken-plum);
    box-shadow: 0 0 12px rgb(85 49 82 / 0.8);
    transform: translateY(-3px);
  }
  .char-card.is-selected {
    border-color: var(--tekken-pink);
    box-shadow:
      0 0 12px var(--tekken-plum),
      inset 0 0 0 1px var(--tekken-pink);
    transform: translateY(-5px);
    background-color: rgb(10 10 10 / 0.95);
  }
  .char-card.is-selected .char-label {
    background: linear-gradient(to bottom, var(--tekken-pink), #3a1f36);
    border-top-color: var(--tekken-pink);
  }
  .char-card.is-selected .char-label strong {
    color: #fff;
  }
  .char-card.is-selected .char-label small {
    color: rgb(255 255 255 / 0.85);
  }
  /* Inset ring: an outside offset would be clipped by the strip's overflow. */
  .char-card:focus-visible {
    outline: 2px solid var(--tekken-pink);
    outline-offset: -2px;
  }

  /* ---------- Wider tiles ---------- */
  @media (width >= 30rem) {
    .char-box {
      width: 6.5rem;
    }
  }

  @media (width >= 48rem) {
    .char-box {
      width: 7.5rem;
    }
    .char-grid {
      gap: 0.6rem;
    }
  }

  @media (width >= 80rem) {
    .character-select {
      padding-inline: 1.5rem;
    }
    .char-box {
      width: 9rem;
    }
    .char-grid {
      gap: 0.75rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .char-card,
    .back-circle {
      transition: none;
    }
    .char-card.is-hovered,
    .char-card.is-selected {
      transform: none;
    }
    .char-card.is-selected {
      box-shadow:
        0 0 0 2px var(--tekken-pink),
        inset 0 0 0 1px var(--tekken-pink);
    }
  }
</style>
