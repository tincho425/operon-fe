<script setup lang="ts">
// Overview page — shell only.
// The content area below is reserved for ICL (IrApp component).
// See bfluid-fe-v3 for the integration pattern:
//   <IrApp :json-resolver="{ id_usuario: user.id }" />

const devComponents = [{
    type: 'IrIterator',  
props: {  
    'type': 'IrDataCard',
    'dense': true,
    'width': 4,
    'columns': 3,
    'items': [
      {
          'title': 'Users',
          'value': '11',
          'subtitle': 'defined active users',
          'id': '/users/find_'
      },
      {
          'title': 'Sessions',
          'value': '4',
          'subtitle': 'active sessions',
          'id': '/users/find_'
      },
      {
          'title': 'Pages',
          'value': '143',
          'subtitle': 'total number of active pages',
          'id': '/admin_pages/find_'
      },
      {
          'title': 'Pages called',
          'value': '530 (E: 4)',
          'subtitle': 'total number of pages called by users (last 30 days)',
          'id': ''
      },
      {
          'title': 'Transactions',
          'value': '726',
          'subtitle': 'count calls to your database functions (last 30 days)',
          'id': '/transaction_log/find_'
      },
      {
          'title': 'Errors',
          'value': '0',
          'subtitle': 'errors from your database functions (last 30 days)',
          'id': '/transaction_error/find_'
      }
  ],
    'rowsPerPage': -1,
    'comportamiento': {
        'type': 'navigator',
        'id_columna': 'id',
        'id_resolver': '##'
    },
    'hideDefaultFooter': true

  /* nodes: defaultNodes,
  edges: defaultEdges, */
}}];
</script>

<template>
  <div>
    <!-- Page header (part of the shell, not ICL content) -->
    <div class="page-header">
      <div class="page-title">
        <h1>Overview</h1>
        <p>Live metrics for the Administration system.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-outline">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <path d="M13.5 5.5A6.5 6.5 0 1 0 14.5 9"/>
            <polyline points="14.5,2 14.5,6 10.5,6"/>
          </svg>
          Last 30 days
        </button>
        <button class="btn btn-primary">+ New report</button>
      </div>
    </div>

    <!--
      ══════════════════════════════════════════════════════════
      ICL CONTENT AREA
      This section will be rendered by <IrApp> once integrated.
      The backend controls which components are shown here via
      the id_resolver (page path) mechanism — same pattern as
      bfluid-fe-v3.

      Integration steps:
        1. Uncomment ICL plugin in src/main.ts
        2. Replace this placeholder with:
           <IrApp :json-resolver="{ id_usuario: user.id }" />
      ══════════════════════════════════════════════════════════
    -->
      <IrApp :dev-components="devComponents" />
    <div class="icl-content-area">
      
      <div class="icl-placeholder">
        <span class="icl-badge">ICL</span>
        <p class="icl-title">Content rendered by IrApp</p>
        <p class="icl-desc">
          Dynamic page content (metric cards, charts, tables) will be served by the
          backend via ICL's component resolver, following the same pattern as
          <strong>bfluid-fe-v3</strong>.
        </p>
        <code class="icl-code">&lt;IrApp :json-resolver="{ id_usuario }" /&gt;</code>
      </div>
    </div>
  </div>
</template>
