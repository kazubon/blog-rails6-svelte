<script>
import Axios from 'axios';

export let entryId;
export let starCount;
export let starrable;

let count = starCount;

function submit() {
  Axios({
    method: 'patch',
    url: `/entries/${entryId}/star.json`,
    headers: {
      'X-CSRF-Token' : jQuery('meta[name="csrf-token"]').attr('content')
    }
  }).then((res) => {
    count = res.data.count;
  });
}
</script>

<div class="text-right">
  <big class="d-inline-block p-1 border rounded">
    {#if starrable}
      <a href="#" class="mr-1 ml-1 text-decoration-none"
          on:click|preventDefault={submit} title="いいね">👍</a>
    {/if}
    {#if count > 0}
      <span class="text-warning mr-1 ml-1">⭐️ {count}</span>
    {/if}
  </big>
</div>