'use client'
import React from "react";
import {useRouter} from "next/navigation";

export default function Main_page() {

  const router = useRouter()

  return (
    <div>
      <h1 className="text-4xl text-center pt-2 font-bold">Hospital Management System</h1>
      <div className="items-center w-full p-8">
        <div className="w-full flex items-end justify-end">
          <button className="grid grid-cols-1 w-40 border-4 rounded-xl border-blue-500" onClick={() => router.push('/report/generate-report')}>Generate Report</button>
        </div>
        <fieldset className="border rounded-xl border-green-500 p-4">
          <legend className="p-2 font-bold">Ward</legend>
          <div className="grid grid-cols-4 space-x-5">
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/ward/all-ward')}>All wards info</button>
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/ward/search-by-id')}>Search by Patient ID</button>
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/ward/search-by-name')}>Search by Patient Name</button>
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/ward/admit-patient')}>Admit Patient</button>
          </div>
        </fieldset>
      </div>
      <div className="items-center w-full p-8">
        <fieldset className="border rounded-xl border-green-500 p-4">
          <legend className="p-2 font-bold">Appointment</legend>
          <div className="grid grid-cols-3 space-x-5">
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/appointment/create-appointment')}>Create Appointment</button>
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/appointment/display')}>Display Appointment</button>
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/appointment/generate-bill')}>Generate Bill</button>
          </div>
        </fieldset>
      </div>
      <div className="items-center w-full p-8">
        <fieldset className="border rounded-xl border-green-500 p-4">
          <legend className="p-2 font-bold">Patient</legend>
          <div className="grid grid-cols-3 space-x-5">
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/patient/register')}>Register</button>
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/patient/update')}>Update</button>
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/patient/display')}>Display</button>
          </div>
        </fieldset>
      </div>
      <div className="items-center w-full p-8">
        <fieldset className="border rounded-xl border-green-500 p-4">
          <legend className="p-2 font-bold">Doctor</legend>
          <div className="grid grid-cols-3 space-x-5">
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/doctor/register')}>Register</button>
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/doctor/update')}>Update</button>
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/doctor/display')}>Display</button>
          </div>
        </fieldset>
      </div>
      <div className="items-center w-full p-8">
        <fieldset className="border rounded-xl border-green-500 p-4">
          <legend className="p-2 font-bold">Nurse</legend>
          <div className="grid grid-cols-3 space-x-5">
            
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/nurse/register')}>Register</button>
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/nurse/update')}>Update</button>
            <button className="p-2 border rounded-xl border-red-500" onClick={() => router.push('/nurse/display')}>Display</button>
          </div>
        </fieldset>
      </div>

    </div>
  )
}