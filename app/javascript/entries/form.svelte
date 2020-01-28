<script>
import Axios from 'axios';
import Flash from '../flash';

export let entryId;

let entry = {
  title: '', body: '', tags: [], published_at: '', draft: false
};
let alert = null;

let publishedAtPattern = '\\d{4}(-|\\/)\\d{2}(-|\\/)\\d{2} +\\d{2}:\\d{2}';

function initTags() {
  let len = entry.tags.length;
  if(len < 5) {
    for(let i = 0; i < 5 - len; i++) {
      entry.tags.push({ name: '' });
    }
  }
}

function getEntry() {
  let path = entryId ? `/entries/${entryId}/edit` : '/entries/new';
  Axios.get(path + '.json').then((res) => {
    entry = res.data.entry;
    initTags();
  });
}

function validate() {
  if(!(entry.body && entry.body.match(/[^\s]+/))) {
    alert = '本文を入力してください。';
    window.scrollTo(0, 0);
    return false;
  }
  return true;
}

function submit() {
  if(!validate()) {
    return;
  }
  let path = entryId ? `/entries/${entryId}` : '/entries';
  Axios({
    method: entryId ? 'patch' : 'post',
    url: path + '.json',
    headers: {
      'X-CSRF-Token' : jQuery('meta[name="csrf-token"]').attr('content')
    },
    data: { entry }
  }).then((res) => {
    Flash.set({ notice: res.data.notice });
    Turbolinks.visit(res.data.location);
  }).catch((error) => {
    if(error.response.status == 422) {
      alert = error.response.data.alert;
    }
    else {
      alert = `${error.response.status} ${error.response.statusText}`;
    }
    window.scrollTo(0, 0);
  });
}

function destroy() {
  if(!confirm('本当に削除しますか?')) {
    return;
  }
  Axios({
    method: 'delete',
    url: `/entries/${entryId}.json`,
    headers: {
      'X-CSRF-Token' : jQuery('meta[name="csrf-token"]').attr('content')
    }
  }).then((res) => {
    Flash.set({ notice: res.data.notice });
    Turbolinks.visit(res.data.location);
  }).catch((error) => {
    alert = `${error.response.status} ${error.response.statusText}`;
    window.scrollTo(0, 0);
  });
}

getEntry();
</script>

<div>
  <form on:submit|preventDefault={submit}>
    {#if alert}
      <div class="alert alert-danger">{alert}</div>
    {/if}
    <div class="form-group">
      <label for="entry-title">タイトル</label>
      <input type="text" bind:value={entry.title} id="entry-title"
        class="form-control" required maxlength="255" pattern=".*[^\s]+.*">
    </div>
    <div class="form-group">
      <label for="entry-body">本文</label>
      <textarea bind:value={entry.body} id="entry-body" cols="80" rows="15"
        class="form-control" required maxlength="40000"></textarea>
    </div>
    <div class="form-group">
      <label for="entry-tag0">タグ</label>
      <div>
        {#each entry.tags as tag}
          <input bind:value={tag.name}
            class="form-control width-auto d-inline-block mr-2" style="width: 17%"
            maxlength="255" >
        {/each}
      </div>
    </div>
    <div class="form-group">
      <label for="entry-published_at">日時</label>
      <input type="text" bind:value={entry.published_at} id="entry-published_at"
        class="form-control"
        pattern={publishedAtPattern}>
    </div>
    <div class="form-group mb-4">
      <input type="checkbox" bind:checked={entry.draft} id="entry-draft" value="1">
      <label for="entry-draft">下書き</label>
    </div>
    <div class="row">
      <div class="col">
        <button type="submit" class="btn btn-outline-primary">
          {#if entryId}更新{:else}作成{/if}
        </button>
      </div>
      {#if entryId}
        <div class="col text-right">
          <button type="button" class="btn btn-outline-danger" on:click={destroy}>削除</button>
        </div>
      {/if}
    </div>
  </form>
</div>