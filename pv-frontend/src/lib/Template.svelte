<!-- App.svelte -->
<script>
    //localStorage.setItem('storedRoute', '/template');
    import { writable } from 'svelte/store';

    // Store to manage the current screen
    const currentScreen = writable('introduction');

    // Function to change the current screen
    const changeScreen = (screen) => {
        currentScreen.set(screen);
    };

    // Define your content for each section
    let sections = {
        introduction: 'Introduction Section',
        question1: 'Question 1 Section',
        question2: 'Question 2 Section',
        question3: 'Question 3 Section',
        question4: 'Question 4 Section',
        conclusion: 'Conclusion Section',
    };


</script>

<main class="d-flex flex-column justify-content-around">
    <header>
        <h1>Your Mobile App</h1>
    </header>
    
    <!-- <nav>
      <ul>
        {#each Object.keys(sections) as section}
          <li on:click={() => changeScreen(section)}>
            {section.replace(/^\w/, (c) => c.toUpperCase())}
          </li>
        {/each}
      </ul>
    </nav> -->

    <section>
      {#if $currentScreen === 'introduction'}
          <div class="section">
              <p>{sections.introduction}</p>
              <button on:click={() => changeScreen('question1')}>
              Start
              </button>
          </div>
      {/if}
      {#if $currentScreen === 'question1'}
          <div class="section">
              <p>{sections.question1}</p>
              <button on:click={() => changeScreen('question2')}>
              Next
              </button>
          </div>
      {/if}
      {#if $currentScreen === 'question2'}
          <div class="section">
              <p>{sections.question2}</p>
              <button on:click={() => changeScreen('question3')}>
              Next
              </button>
          </div>
      {/if}
      {#if $currentScreen === 'question3'}
          <div class="section">
              <p>{sections.question3}</p>
              <button on:click={() => changeScreen('question4')}>
              Next
              </button>
          </div>
      {/if}
      {#if $currentScreen === 'question4'}
          <div class="section">
              <p>{sections.question4}</p>
              <button on:click={() => changeScreen('conclusion')}>
              Next
              </button>
          </div>
      {/if}
      {#if $currentScreen === 'conclusion'}
          <div class="section">
              <p>{sections.conclusion}</p>
          </div>
      {/if}
    </section>
</main>

<style>
    main {
        max-width: 600px;
        margin: 0 auto;
        padding: 16px;
        height: 100%;
        border: 1px solid #ccc;
    }

    header {
        text-align: center;
    }
    section {
        margin-top: 16px;
    }
    /* Media query for small screens */
    @media (max-width: 600px) {
        main {
            padding: 8px; /* Adjust padding for smaller screens */
        }
    }
</style>