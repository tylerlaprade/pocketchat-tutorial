<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { currentUser, pb } from "./pocketbase";

  let newExercise: Exercise = { name: "", description: "" };
  let exercises: Exercise[] = [];
  let unsubscribe: () => void;

  onMount(async () => {
    const resultList = await pb
      .collection<Exercise>("exercises")
      .getList(1, 50, {
        sort: "created",
        expand: "user",
      });
    exercises = resultList.items;

    unsubscribe = await pb
      .collection<Exercise>("exercises")
      .subscribe("*", async ({ action, record }) => {
        if (action === "create") {
          const owner = await pb.collection<User>("users").getOne(record.owner);
          record.expand = { owner };
          exercises = [...exercises, record];
        }
        if (action === "delete") {
          exercises = exercises.filter((m) => m.id !== record.id);
        }
      });
  });

  onDestroy(() => {
    unsubscribe?.();
  });

  async function addExercise() {
    const data = {
      ...newExercise,
      owner: $currentUser.id,
    };
    const createdMessage = await pb
      .collection<Exercise>("exercises")
      .create(data);
    newExercise = { name: "", description: "" };
  }
</script>

<div class="exercises">
  {#each exercises as exercise (exercise.id)}
    <div>
      <div>
        <b>
          {exercise.name}
        </b>
        <p>{exercise.description}</p>
      </div>
    </div>
  {/each}
</div>

<form on:submit|preventDefault={addExercise}>
  <input
    placeholder="Exercise name"
    type="text"
    bind:value={newExercise.name}
  />

  <input
    placeholder="Exercise description"
    type="text"
    bind:value={newExercise.description}
  />
  <button type="submit">Add</button>
</form>
