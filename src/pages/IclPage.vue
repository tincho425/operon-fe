<script setup lang="ts">
// IrApp reads window.location.pathname + search as id_resolver automatically,
// so no explicit id_resolver is needed here — matches bfluid-fe-v3 behaviour.
// id_usuario comes from VITE_USER_ID env var; replace with auth store when
// authentication is implemented.
const jsonResolver = {
  id_usuario: import.meta.env.VITE_USER_ID as string ?? '00000000-0000-0000-0000-000000000000',
}
</script>

<template>
  <IrApp :json-resolver="jsonResolver" />
</template>
