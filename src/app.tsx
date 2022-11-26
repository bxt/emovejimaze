import { useState } from 'preact/hooks'
import './app.css'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>emovejimaze</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Hello, world!
        </p>
      </div>
      <footer class="footer">
        &copy; 2022 by <a href="http://bernhardhaeussner.de/">Bernhard Häussner</a>, code on <a href="https://github.com/bxt/emovejimaze">GitHub</a>.
      </footer>
    </>
  )
}
