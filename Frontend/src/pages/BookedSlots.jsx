import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";

const BookedSlots = () => {
  const [therapist, setTherapist] = useState(null);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const therapistRef = collection(db, "therapists");
        const therapistQuery = query(therapistRef, orderBy("createdAt", "desc"), limit(1));
        const therapistSnapshot = await getDocs(therapistQuery);
  
        if (therapistSnapshot.empty) {
          console.warn("No therapist found");
          return;
        }
  
        const therapistData = therapistSnapshot.docs[0].data();
        setTherapist(therapistData);
  
        const slotsRef = collection(db, "slots");
        const slotsQuery = query(slotsRef, where("status", "==", "booked"));
        const slotsSnapshot = await getDocs(slotsQuery);
  
        let startTime = parseInt(therapistData.startTime) || 10;
  
        // Sort: urgent ones first
        const sortedDocs = slotsSnapshot.docs.sort((a, b) => {
          const urgencyA = a.data().urgent === true ? 1 : 0;
          const urgencyB = b.data().urgent === true ? 1 : 0;
          return urgencyB - urgencyA;
        });
  
        const updatedSlots = sortedDocs.map((doc, index) => {
          const data = doc.data();
          const slotTime = `${formatTime(startTime)} - ${formatTime(startTime + 1)}`;
          startTime += 1;
  
          return {
            ...data,
            slotId: data.slotId || doc.id || `SLOT-${index + 1}`,
            slotTime,
          };
        });
  
        setSlots(updatedSlots);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };
  
    fetchBookedSlots();
  }, []);

  const formatTime = (hour) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${suffix}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">📋 Booked Slots</h1>

        {therapist && (
          <div className="mb-10 bg-purple-50 border border-purple-200 rounded-lg p-5">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Latest Therapist Available</h2>
            <p className="text-gray-700"><strong>Name:</strong> {therapist.name}</p>
            <p className="text-gray-700"><strong>Starts From:</strong> 10:00 AM</p>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Slot Details</h2>
          {slots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slots.map((slot) => (
                <div
                  key={slot.slotId}
                  className="bg-white border border-gray-200 rounded-lg shadow p-5 hover:shadow-md transition duration-200"
                >
                  <p className="text-lg text-purple-700 font-medium mb-1">
                    Slot ID: <span className="text-gray-800">{slot.slotId}</span>
                  </p>
                  <p className="text-md text-gray-600">
                    Time: <span className="font-semibold">{slot.slotTime}</span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No slots booked yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookedSlots;
