import { defineComponent } from 'vue'

const App = defineComponent(() => {
    const render = () => <router-view />;
    return render
});

export default App