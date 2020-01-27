<script>
export let query;

let title = query.title;
let tag = query.tag;
</script>

<div>
  <form action="/entries" method="get" class="form-inline mb-4">
    <input type="text" name="title" class="form-control mr-3 mb-2"
      bind:value={title} placeholder="タイトル">
    <input type="text" name="tag" class="form-control mr-3 mb-2"
      bind:value={tag} placeholder="タグ">
    <input type="hidden" name="sort" value={query.sort || ''}>
    <input type="hidden" name="user_id" value={query.user_id || ''}>
    <button type="submit" class="btn btn-outline-primary mb-2">検索</button>
  </form>
</div>