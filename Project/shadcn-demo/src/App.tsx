
import './App.css'
import { Button }from './components/ui/button'
import { Card } from './components/ui/card';
import { Input } from './components/ui/input';
import {Avatar}from './components/ui/avatar'



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Button>Click me</Button>
    <Input placeholder="Type something..." />
    <Card className="w-96">
      <h2 className="text-lg font-semibold">Card Title</h2>
      <p className="text-sm text-muted-foreground">Card content goes here.</p>
    </Card>
    <Avatar />
    </>

  )
}

export default App;
