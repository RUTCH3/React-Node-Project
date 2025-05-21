import './App.css'
import EventDetailsForUser from './components/event-details-for-user';
import EventsUserList from './components/events-user-list';
import MainMenu from './components/main-menu'
import ProducerMenu from './components/producer-menu.tsx';
import ProducerDetailes from './components/producer-details.tsx';
import AddProducer from './components/add-producer.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddEvent from './components/add-event.tsx';

export const router = createBrowserRouter([
  { path: '/', element: <MainMenu /> },
  {
    path: 'user',
    children: [
      { path: '', element: <EventsUserList /> },
      { path: ':id', element: < EventDetailsForUser /> },
      // { path: ':update', element: < AddProducer /> },
      // { path: ':delete', element: < ProducerDetailes /> }
    ]
  },
  {
    path: 'producer',
    children: [
      { path: '', element: < ProducerMenu /> },
      { path: 'edit/:new', element: <AddEvent /> },
      { path: ':id', element: <ProducerDetailes /> },
      { path: 'edit', element: <AddProducer /> },
      { path: 'update', element: <AddProducer /> }]
  }
]);

const App = () => {
  return <RouterProvider router={router} />
}

export default App
