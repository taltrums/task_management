import TaskList from "../components/TaskList";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task Management App</h1>
      <TaskList />
    </main>
  );
}