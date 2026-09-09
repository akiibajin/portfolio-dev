<script lang="ts">
  import { onMount } from "svelte";
  import { currentTab } from "../../store";
  import getModalContent from "../../utils/getModalContent";
  import type { IDefs } from "../../global/constants";

  let { name, position, backPath } = $props<{
    name: keyof IDefs;
    position: number;
    backPath: string;
  }>();

  const cleanText = (html: string) => html.replace(/<[^>]*>/g, "").trim();

  const section = $derived(getModalContent(name));

  const characters = $derived(
    section.tableInfo.tableBody.map((row) => {
      const portrait = row[0]?.toLowerCase().includes("<img") ? row[0] : "";
      const labelIndex = row.findIndex(
        (cell) => !cell.toLowerCase().includes("<img")
      );
      const label = cleanText(row[labelIndex] ?? row[0]);
      const bio = row
        .filter((_, i) => i !== labelIndex && i !== 0)
        .map(cleanText)
        .filter(Boolean);
      return { portrait, label, bio };
    })
  );

  let selected = $state(0);

  onMount(() => {
    currentTab.set({ name, position });
  });
</script>

<section class="character-select">
  <a class="back-button" href={backPath} aria-label="Back to menu" title="Back to menu">
    <span class="back-circle">B</span>
    <span class="back-label">Back</span>
  </a>

  <div class="select-stage">
    <aside class="char-preview">
      <div class="preview-frame">
        {#if characters[selected].portrait}
          {@html characters[selected].portrait}
        {:else}
          <span class="preview-initial">{characters[selected].label.charAt(0)}</span>
        {/if}
      </div>
      <h3>{characters[selected].label}</h3>
      <p class="preview-bio">
        {characters[selected].bio.join(" • ") || section.title}
      </p>
      <p class="preview-hint">Press A to confirm</p>
    </aside>

    <ul class="char-grid" role="listbox" aria-label={section.title}>
      {#each characters as character, i}
        <li class="char-box">
          <button
            type="button"
            role="option"
            aria-selected={i === selected}
            class:selected={i === selected}
            class="char-card"
            onclick={() => (selected = i)}
            onmouseover={() => (selected = i)}
            onfocus={() => (selected = i)}
          >
            <div class="char-portrait">
              {#if character.portrait}
                {@html character.portrait}
              {:else}
                <span class="char-initial">{character.label.charAt(0)}</span>
              {/if}
            </div>
            <div class="char-label">
              <strong>{character.label}</strong>
              {#if character.bio.length}
                <small>{character.bio.join(" • ")}</small>
              {/if}
            </div>
          </button>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .character-select {
    flex: 1;
    min-height: calc(100dvh - 2rem);
    width: calc(100vw - 2rem);
    display: grid;
    place-items: center;
    position: relative;
  }
  .back-button {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 50;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }
  .back-circle {
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: #fff;
    color: #808080;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1;
    transition: box-shadow 0.15s ease-in-out;
  }
  .back-label {
    color: #fff;
    font-weight: 100;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-size: 0.875rem;
  }
  .back-button:hover .back-circle {
    box-shadow: 0 0 10px #d43458, 0 0 20px #553152;
  }
  .select-stage {
    display: grid;
    grid-template-columns: minmax(0, 8rem) 1fr;
    gap: 1rem;
    align-items: start;
    justify-items: center;
    width: 100%;
    height: calc(100dvh - 2rem);
    max-width: 100%;
    min-height: 0;
    padding: 4rem 1rem 1rem;
    box-sizing: border-box;
  }
  .char-grid {
    list-style: none;
    padding: 0 0.25rem 0 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    min-height: 0;
    overscroll-behavior: contain;
  }
  .char-box {
    flex: 0 0 auto;
    width: 100%;
  }
  .char-card {
    width: 100%;
    padding: 0;
    border: 1px solid #4a5565;
    background-color: #0a0a0a;
    cursor: pointer;
    color: #fff;
    text-align: left;
    display: flex;
    align-items: stretch;
    transition:
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out,
      transform 0.15s ease-in-out;
  }
  .char-portrait {
    flex: 0 0 4.5rem;
    width: 4.5rem;
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    overflow: hidden;
    background: linear-gradient(160deg, #1f2330, #0a0a0a);
  }
  .char-portrait :global(img) {
    height: 2.5rem;
    width: auto;
    margin-inline: auto;
  }
  .char-initial {
    font-size: 2rem;
    color: #9dc3e6;
    opacity: 0.7;
  }
  .char-label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    min-width: 0;
    padding: 0.5rem 0.75rem;
    background-color: #262626;
    border-left: 1px solid #4a5565;
    gap: 0.125rem;
  }
  .char-label strong {
    font-weight: 300;
    font-size: 1rem;
    letter-spacing: 0.05em;
  }
  .char-label small {
    font-weight: 100;
    font-size: 0.7rem;
    color: #b6bcc6;
    line-height: 1.1;
  }
  .char-box:hover .char-card,
  .char-box:focus-within .char-card,
  .char-card.selected {
    border-color: #d43458;
    box-shadow: 0 0 10px #553152, 0 0 20px #553152;
    transform: scale(1.02);
  }
  .char-card.selected .char-label {
    background: linear-gradient(to right, #d43458, #553152);
  }
  .char-preview {
    display: grid;
    gap: 0.5rem;
    text-align: center;
    width: 100%;
    justify-self: center;
  }
  .preview-frame {
    aspect-ratio: 3 / 4;
    display: grid;
    place-items: center;
    border: 1px solid #4a5565;
    background: linear-gradient(160deg, #1f2330, #0a0a0a);
    box-shadow: inset 0 0 30px #553152;
    overflow: hidden;
  }
  .preview-frame :global(img) {
    height: clamp(4rem, 14vw, 8rem);
    width: auto;
    margin-inline: auto;
  }
  .preview-initial {
    font-size: clamp(4rem, 14vw, 8rem);
    color: #9dc3e6;
    opacity: 0.8;
  }
  .char-preview h3 {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-size: 0.85rem;
    word-break: break-word;
  }
  .preview-bio {
    margin: 0;
    font-weight: 100;
    font-size: 0.75rem;
    color: #b6bcc6;
    line-height: 1.3;
    word-break: break-word;
  }
  .preview-hint {
    margin: 0.5rem 0 0;
    font-weight: 100;
    font-size: 0.6rem;
    color: #d43458;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  @media (width >= 64rem) {
    .select-stage {
      grid-template-columns: 1fr;
      justify-items: center;
      gap: 2rem;
      height: auto;
      padding: 1rem;
    }
    .char-preview {
      justify-self: start;
      margin-left: clamp(0rem, 3vw, 3rem);
      width: min(100%, 30rem);
    }
    .preview-frame :global(img) {
      height: 10rem;
    }
    .preview-initial {
      font-size: 10rem;
    }
    .char-preview h3 {
      font-size: inherit;
    }
    .preview-bio {
      font-size: 0.875rem;
    }
    .preview-hint {
      font-size: 0.75rem;
      letter-spacing: 0.2em;
    }
    .char-grid {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0;
      overflow: visible;
      height: auto;
    }
    .char-box {
      flex: 0 1 7rem;
      min-width: 6rem;
      width: auto;
    }
    .char-card {
      display: block;
    }
    .char-portrait {
      width: auto;
      flex: none;
      aspect-ratio: 3 / 4;
    }
    .char-portrait :global(img) {
      height: 3.5rem;
    }
    .char-initial {
      font-size: 2.5rem;
    }
    .char-label {
      border-left: none;
      border-top: 1px solid #4a5565;
      justify-content: flex-start;
    }
    .char-label strong {
      font-size: 1rem;
    }
    .char-label small {
      font-size: 0.7rem;
    }
  }
</style>
