import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import sections from './content/sections';

function App() {
  return (
    <Layout sections={sections}>
      <Routes>
        {sections
          .filter((s) => s.type === 'lesson')
          .map((s) => (
            <Route key={s.id} path={`/lesson/${s.id}`} element={s.component} />
          ))}
        <Route path="/" element={<Navigate to="/lesson/1" />} />
      </Routes>
    </Layout>
  );
}

export default App;
