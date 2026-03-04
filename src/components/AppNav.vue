<template>
  <nav class="nav">
    <RouterLink to="/select">Hero WAR</RouterLink>
    <RouterLink to="/best-heroes">Best Heroes</RouterLink>
  </nav>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0.75rem;
  z-index: 20;
  display: inline-flex;
  gap: 0.5rem;
  padding: 0.35rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 253, 249, 0.82);
  backdrop-filter: blur(6px);
}

.nav a {
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 600;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.nav a.router-link-active {
  background: var(--ink);
  color: #fff;
}
</style>
