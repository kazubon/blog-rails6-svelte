<script>
import Axios from 'axios';
import qs from 'qs';

export let query;

let entries = [];
let entriesCount = 0;
let offset = 0;

$: showMore = (entries.length < entriesCount);

function getEntries() {
  let params = { ...query, offset: offset };
  let path = '/entries.json?' + qs.stringify(params);
  Axios.get(path).then((res) => {
    entries = entries.concat(res.data.entries);
    entriesCount = res.data.entries_count;
  });
}

function moreClicked() {
  offset += 20;
  getEntries();
}

function sortPath(key) {
  let params = { ...query, sort: key };
  return '/entries?' + qs.stringify(params);
}

getEntries();
</script>

<div>
  <div class="text-right mb-3">
    {entriesCount}件 | 
    {#if query.sort == 'stars'}<a href={sortPath('date')}>日付順</a>{:else}日付順{/if}
    |
    {#if query.sort != 'stars'}<a href={sortPath('stars')}>いいね順</a>{:else}いいね順{/if}
  </div>
  <div class="entries mb-4">
    {#each entries as entry (entry.id)}
      <div class="entry">
        <div>
          <a href={entry.path}>
            {#if entry.draft}（下書き）{/if} {entry.title}
          </a>
        </div>
        <div class="text-right text-secondary">
          <a href={entry.user_path}>{entry.user_name}</a> |
          {#each entry.tags as tag (tag.id)}
            <a class="mr-2" href={tag.tag_path}>{tag.name}</a>
          {/each}|
          {entry.published_at} |
          {#if entry.stars_count > 0}
            <span class="text-warning">★{entry.stars_count}</span>
          {/if}
        </div>
      </div>
    {/each}
  </div>
  {#if showMore}
    <div>
      <button type="button" on:click={moreClicked} class="btn btn-outline-secondary w-100">もっと見る</button>
    </div>
  {/if}
</div>
