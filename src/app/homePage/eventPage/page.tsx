'use client'
import EventPageComponents from '@/components/eventPageComponents/event-page-components';
import VérifierAuthentification from '@/core/utils';
import { useState } from 'react';

export default function EventPage() {
  // const [IsLoggedIn , setIsLoggedIn] = useState(VérifierAuthentification())
  return (
    <>
      <EventPageComponents />
    </>
  )
}
