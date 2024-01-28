<script lang="ts">
  import DoctorExercises from "./lib/DoctorExercises.svelte";
  import Login from "./lib/Login.svelte";
  import PatientExercises from "./lib/PatientExercises.svelte";
  import { currentUser } from "./lib/pocketbase";
</script>

<h1>Tyler's Exercise App</h1>

<Login />

{#if $currentUser?.role === "doctor"}
  <DoctorExercises />
{:else if $currentUser?.role === "patient"}
  <PatientExercises />
{:else}
  <p>Must be logged in to view exercises.</p>
{/if}
