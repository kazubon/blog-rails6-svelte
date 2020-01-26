<script>
import Form from './search_form';
import List from './list';

export let query;
</script>

<div>
  <Form query={query} />
  <List query={query} />
</div>
