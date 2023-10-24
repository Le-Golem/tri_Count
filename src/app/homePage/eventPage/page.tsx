'use client'
import VérifierAuthentification from '@/core/utils';
import EventPageComponents from './eventPageComponents/event-page-components';
import { useState } from 'react';

export default function EventPage() {
  // const [IsLoggedIn , setIsLoggedIn] = useState(VérifierAuthentification())
  return (
    <>
      <EventPageComponents />
    </>
  )
}
